from django.contrib import admin

# Register your models here.
from .models import Product, Category, Reviews

admin.site.register(Reviews)

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ['name', 'created_by', 'slug', 'price',
                    'stock', 'createdAt', 'updatedAt', 'description']
    list_filter = ['stock', 'createdAt']
    list_editable = ['price', 'stock']
    prepopulated_fields = {'slug': ('name',)}


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug'] 
    prepopulated_fields = {'slug': ('name',)}

     
