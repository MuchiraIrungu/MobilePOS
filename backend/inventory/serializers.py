from rest_framework import serializers
from .models import Product
from django.contrib.auth import get_user_model
import re 
from accounts.models import Shop

User = get_user_model()

class ProductCreateSerializer(serializers.ModelSerializer):

    """
    Serializer for creating and updating products.
    
    Validations:
    - Selling price must be >= cost price
    - Stock quantity must be <= max stock
    - Barcode must be EAN-13 (13 digits), EAN-8 (8 digits), or QR code
    - SKU must be unique per shop
    - Category must be from predefined choices
    """

    class Meta:
        model = Product
        fields = ['id','shop','sku','description','barcode','name','category','selling_price','cost_price'
                  ,'stock_quantity','low_stock_threshold','max_stock','image']

    def validate(self, data):
        selling_price = data.get('selling_price', getattr(self.instance, 'selling_price', None))
        cost_price = data.get('cost_price', getattr(self.instance, 'cost_price', None))
        if selling_price is not None and cost_price is not None and selling_price < cost_price:
            raise serializers.ValidationError({'selling_price': 'Cannot be less than cost price.'})

        stock_quantity = data.get('stock_quantity', getattr(self.instance, 'stock_quantity', None))
        max_stock = data.get('max_stock', getattr(self.instance, 'max_stock', None))
        if stock_quantity is not None and max_stock is not None and stock_quantity > max_stock:
            raise serializers.ValidationError({'stock_quantity': 'Cannot exceed max stock.'})

        sku = data.get('sku')
        shop = data.get('shop', getattr(self.instance, 'shop', None))
        if sku and shop:
            qs = Product.objects.filter(shop=shop, sku=sku)
            if self.instance:
                qs = qs.exclude(pk=self.instance.pk)
            if qs.exists():
                raise serializers.ValidationError({'sku': 'This SKU already exists in your shop.'})
        return data
    
    def validate_shop(self, shop):
        request = self.context['request']
        if not shop.staff_members.filter(user=request.user, is_active=True).exists():
            raise serializers.ValidationError("You don't have access to this shop.")
        return shop
    
    def validate_barcode(self, value):
        if not value:
            raise serializers.ValidationError(
                "Barcode value cannot be empty. "
            )
        
        value_str = value
        barcode_formats = ['EAN-13', 'EAN-8', 'QR']

        is_ean13 = len(value_str) == 13 and value_str.isdigit()
        is_ean8 = len(value_str) == 8 and value_str.isdigit()
        is_qr = bool(re.match(r'^[A-Za-z0-9\-_]{1,100}$', value_str))

        if not (is_ean13 or is_ean8 or (is_qr and 'QR' in barcode_formats)):
            raise serializers.ValidationError(
                f"Invalid barcode format or length. Must match {barcode_formats}."
            )
        return value
    
    def validate_low_stock_threshold(self, value):
        if value < 0 :
            raise serializers.ValidationError(
                'Low stock threshold must be greater than 0',
            )
        return value
    
    
        
    
class ProductUpdateSerializer(ProductCreateSerializer):
    class Meta(ProductCreateSerializer.Meta):
        read_only_fields = ProductCreateSerializer.Meta.read_only_fields + ['shop', 'sku', 'barcode']

class ProductListSerializer(serializers.ModelSerializer):
    profit = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)
    is_low_stock = serializers.BooleanField(read_only=True)
    shop_name = serializers.CharField(source='shop.name', read_only=True)

    class Meta:
        model = Product
        fields = [
            'id', 'shop', 'shop_name', 'sku', 'name', 'barcode', 'category',
            'selling_price', 'cost_price', 'profit', 'stock_quantity',
            'low_stock_threshold', 'max_stock', 'is_low_stock', 'image',
            'is_active', 'created_at', 'updated_at',
        ]
        read_only_fields = fields