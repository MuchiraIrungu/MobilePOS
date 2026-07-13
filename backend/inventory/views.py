from django.contrib.auth import get_user_model
from django.db import IntegrityError, transaction
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.exceptions import ValidationError
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import Product
from .serializers import ProductCreateSerializer, ProductUpdateSerializer, ProductListSerializer

User = get_user_model()


class ProductView(viewsets.ModelViewSet):
    """
    Handles listing, retrieving, creating, updating, and soft-deleting
    products scoped to the shops the authenticated user is staff of.
    """
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['category', 'is_active', 'shop']
    search_fields = ['name', 'barcode', 'sku']
    ordering_fields = ['created_at', 'stock_quantity', 'selling_price']

    def get_queryset(self):
        return (
            Product.objects
            .filter(
                shop__staff_members__user=self.request.user,
                shop__staff_members__is_active=True,
                is_deleted=False,
            )
            .select_related('shop')
            .distinct()
        )

    def get_serializer_class(self):
        if self.action == 'create':
            return ProductCreateSerializer
        if self.action in ('update', 'partial_update'):
            return ProductUpdateSerializer
        return ProductListSerializer

    def perform_create(self, serializer):
        try:
            serializer.save(created_by=self.request.user, updated_by=self.request.user)
        except IntegrityError:
            raise ValidationError({'detail': 'A product with this barcode or SKU already exists for this shop.'})

    def perform_update(self, serializer):
        serializer.save(updated_by=self.request.user)

    def perform_destroy(self, instance):
        instance.is_deleted = True
        instance.is_active = False
        instance.updated_by = self.request.user
        instance.save(update_fields=['is_deleted', 'is_active', 'updated_by', 'updated_at'])

    @action(detail=False, methods=['post'])
    def bulk_create(self, request):
        serializer = self.get_serializer(data=request.data, many=True)
        serializer.is_valid(raise_exception=True)
        serializer.save(created_by=request.user, updated_by=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    @action(detail=True, methods=['post'])
    def adjust_stock(self, request, pk=None):
        delta = request.data.get('delta')
        if delta is None:
            return Response({'error': 'delta is required'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            delta = int(delta)
        except (TypeError, ValueError):
            return Response({'error': 'delta must be an integer'}, status=status.HTTP_400_BAD_REQUEST)

        with transaction.atomic():
            product = Product.objects.select_for_update().get(pk=self.get_object().pk)
            new_qty = product.stock_quantity + delta
            if new_qty < 0:
                return Response({'error': 'Insufficient stock'}, status=status.HTTP_400_BAD_REQUEST)
            product.stock_quantity = new_qty
            product.updated_by = request.user
            product.save(update_fields=['stock_quantity', 'updated_by', 'updated_at'])

        return Response(ProductListSerializer(product).data)