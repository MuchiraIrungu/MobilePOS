from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import Shop, Staff, User

@admin.register(Shop)
class ShopAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'location', 'is_active']
    search_fields = ['name', 'email']

@admin.register(Staff)
class StaffAdmin(admin.ModelAdmin):
    list_display = ['user', 'shop', 'is_active']
    search_fields = ['user__email', 'shop__name']
    raw_id_fields = ['user', 'managed_by']  
    list_filter = ['is_active']

@admin.register(User)
class UserAdmin(BaseUserAdmin):
    list_display = ['email', 'first_name', 'last_name', 'role', 'is_active']
    list_editable = ['role']  # allows editing role directly from list
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Personal info', {'fields': ('first_name', 'last_name')}),
        ('Permissions', {'fields': ('role', 'is_active', 'is_staff', 'is_superuser')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'first_name', 'last_name', 'role', 'password1', 'password2'),
        }),
    )
    search_fields = ['email']
    ordering = ['email']

