from django.contrib import admin
from django.db.models import F
from django.utils.html import format_html

from .models import Product


class LowStockFilter(admin.SimpleListFilter):
    title = 'Stock Level'
    parameter_name = 'stock_level'

    def lookups(self, request, model_admin):
        return (
            ('low', 'Low Stock'),
            ('out', 'Out of Stock'),
            ('ok', 'In Stock'),
        )

    def queryset(self, request, queryset):
        if self.value() == 'low':
            return queryset.filter(stock_quantity__lte=F('low_stock_threshold'), stock_quantity__gt=0)
        if self.value() == 'out':
            return queryset.filter(stock_quantity=0)
        if self.value() == 'ok':
            return queryset.filter(stock_quantity__gt=F('low_stock_threshold'))
        return queryset


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = [
        'name', 'barcode', 'sku', 'category', 'shop',
        'selling_price_display', 'cost_price_display', 'profit_display',
        'stock_status', 'is_active', 'created_at',
    ]
    search_fields = ['name', 'barcode', 'sku', 'category']
    list_filter = ['shop', 'category', 'is_active', 'is_deleted', 'created_at', LowStockFilter]
    ordering = ['-created_at']
    list_per_page = 25
    date_hierarchy = 'created_at'
    actions = ['mark_as_active', 'mark_as_inactive', 'soft_delete', 'restore_deleted']

    fieldsets = (
        ('Basic Information', {'fields': ('id', 'name', 'barcode', 'sku', 'category', 'shop')}),
        ('Product Details', {'fields': ('description', 'image')}),
        ('Pricing', {'fields': ('selling_price', 'cost_price', 'profit_readonly'), 'classes': ('collapse',)}),
        ('Inventory', {
            'fields': ('stock_quantity', 'low_stock_threshold', 'max_stock', 'is_low_stock_readonly'),
            'classes': ('collapse',),
        }),
        ('Status & Tracking', {
            'fields': ('is_active', 'is_deleted', 'created_at', 'created_by', 'updated_at', 'updated_by'),
            'classes': ('collapse',),
        }),
    )

    readonly_fields = [
        'id', 'created_at', 'updated_at', 'created_by', 'updated_by',
        'profit_readonly', 'is_low_stock_readonly',
    ]

    def get_readonly_fields(self, request, obj=None):
        return self.readonly_fields + ['id'] if obj else self.readonly_fields

    def get_queryset(self, request):
        queryset = super().get_queryset(request)
        if request.user.is_superuser:
            return queryset
        return queryset.filter(shop__staff_members__user=request.user, shop__staff_members__is_active=True).distinct()

    def save_model(self, request, obj, form, change):
        if not change:
            obj.created_by = request.user
        obj.updated_by = request.user
        super().save_model(request, obj, form, change)

    # --- Display helpers ---

    def selling_price_display(self, obj):
        return format_html('<span style="color: green; font-weight: bold;">KES {}</span>', f"{obj.selling_price:,.2f}")
    selling_price_display.short_description = 'Selling Price'

    def cost_price_display(self, obj):
        return format_html('<span style="color: #666;">KES {}</span>', f"{obj.cost_price:,.2f}")
    cost_price_display.short_description = 'Cost Price'

    def profit_display(self, obj):
        color = 'green' if obj.profit > 0 else 'red'
        return format_html('<span style="color: {}; font-weight: bold;">KES {}</span>', color, f"{obj.profit:,.2f}")
    profit_display.short_description = 'Profit'

    profit_readonly = profit_display
    profit_readonly.short_description = 'Profit (Calculated)'

    def stock_status(self, obj):
        if obj.stock_quantity == 0:
            color, label = '#FF6B6B', 'OUT'
        elif obj.is_low_stock:
            color, label = '#E24B4A', 'LOW'
        else:
            color, label = '#1D9E75', 'OK'
        return format_html('<span style="color: {}; font-weight: bold;">{} ({} units)</span>', color, label, obj.stock_quantity)
    stock_status.short_description = 'Stock Status'

    def is_low_stock_readonly(self, obj):
        color = '#E24B4A' if obj.is_low_stock else 'green'
        label = 'YES' if obj.is_low_stock else 'NO'
        return format_html('<span style="color: {}; font-weight: bold;">{} (threshold: {} units)</span>', color, label, obj.low_stock_threshold)
    is_low_stock_readonly.short_description = 'Low Stock?'

    # --- Actions ---

    def mark_as_active(self, request, queryset):
        updated = queryset.update(is_active=True, updated_by=request.user)
        self.message_user(request, f'{updated} product(s) marked as active.')
    mark_as_active.short_description = 'Mark selected as active'

    def mark_as_inactive(self, request, queryset):
        updated = queryset.update(is_active=False, updated_by=request.user)
        self.message_user(request, f'{updated} product(s) marked as inactive.')
    mark_as_inactive.short_description = 'Mark selected as inactive'

    def soft_delete(self, request, queryset):
        updated = queryset.update(is_deleted=True, updated_by=request.user)
        self.message_user(request, f'{updated} product(s) soft-deleted.')
    soft_delete.short_description = 'Soft delete selected'

    def restore_deleted(self, request, queryset):
        updated = queryset.update(is_deleted=False, updated_by=request.user)
        self.message_user(request, f'{updated} product(s) restored.')
    restore_deleted.short_description = 'Restore selected'