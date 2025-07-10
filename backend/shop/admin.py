from django.contrib import admin
from .models import Bicycle, Brand, ProductInstance, Cart, ArchivedCart

# Register your models here.
admin.site.register(ProductInstance)
admin.site.register(Cart)
admin.site.register(ArchivedCart)# Unregister the default User model

@admin.register(Brand)
class BrandAdmin(admin.ModelAdmin):
    list_display = [fields.name for fields in Brand._meta.fields]


@admin.register(Bicycle)
class BicycleAdmin(admin.ModelAdmin):
    list_display = [fields.name for fields in Bicycle._meta.fields]
    list_filter = ['brand']
    search_fields = ['model_name', 'brand__brand_name']
    prepopulated_fields = {'model_name': ('brand',)}