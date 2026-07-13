from django.db import models
import uuid
from django.contrib.auth import get_user_model
from accounts.models import Shop
from django.core.validators import MinValueValidator

User = get_user_model()

def product_image_path(instance, filename):
       return f"shops/{instance.shop.name}/products/{filename}"

class Tracking(models.Model):
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='created_products')
    updated_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='updated_products')
    is_active = models.BooleanField(default=True)
    is_deleted = models.BooleanField(default=False)

    class Meta:
       abstract = True

class Product(Tracking):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    shop = models.ForeignKey(Shop, on_delete=models.CASCADE,related_name='products', db_index=True)
    sku = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    barcode = models.CharField(max_length=200, blank=False, db_index=True)
    name = models.CharField(max_length=300, blank=True)
    category = models.CharField(max_length=200, db_index=True)
    selling_price = models.DecimalField(
        default=0.00, 
        max_digits=10, 
        decimal_places=2,
        validators=[MinValueValidator(0)] 
    )
    cost_price = models.DecimalField(
        default=0.00, 
        max_digits=10, 
        decimal_places=2,
        validators=[MinValueValidator(0)]
    )
    stock_quantity = models.IntegerField(
        default=0, 
        validators=[MinValueValidator(0)]
    )
    low_stock_threshold = models.IntegerField(
        default=0,
        validators=[MinValueValidator(0)]
    )
    #is_low_stock = models.BooleanField(default=False)
    max_stock = models.IntegerField(
        default=0,
        validators=[MinValueValidator(0)]
    )
    image = models.ImageField( upload_to=product_image_path, blank=True, null=True)

    class Meta:
       unique_together = [('barcode', 'shop'),('shop','sku')]
       ordering = ['-created_at']


    @property
    def profit(self):
       return self.selling_price - self.cost_price
    
    @property
    def is_low_stock(self):
       return self.stock_quantity <= self.low_stock_threshold

    def __str__(self):
     return f"{self.name or 'Unnamed'} - {self.barcode} ({self.shop.name}) (ID: {self.id})"
    
