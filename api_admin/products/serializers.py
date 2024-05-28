from rest_framework import serializers

from .models import Product, Category, Reviews

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['name', 'slug']


class ProductSerializer(serializers.ModelSerializer):
    categories = CategorySerializer(many=True, read_only=True)
    created_by = serializers.ReadOnlyField(source='created_by.username')
 
    class Meta:
        model = Product
        fields = '__all__'

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        if instance.picture1:
            representation['picture1'] = instance.picture1.url.replace('%3A', ':')[1:]
        if instance.picture2:
            representation['picture2'] = instance.picture2.url.replace('%3A', ':')[1:]
        if instance.picture3:
            representation['picture3'] = instance.picture3.url.replace('%3A', ':')[1:]
        return representation

class ReviewsSerializer(serializers.ModelSerializer):  
    def get_picture(self, obj):  
        return obj.picture.url.replace('%3A', ':')
    class Meta:
        model = Reviews
        fields = ['id', 'user_create', 'product', 'content', 'picture', 'createdAt']


def serialize_product(product):
    product_data = {
        'id': product.id,
        'name': product.name,
        'description': product.description,
        'created_by': product.created_by.username,  
        'picture1': str(product.picture1),
        'picture2':  str(product.picture2),
        'picture3':  str(product.picture3),
        'price': product.price,
        'stock': product.stock,
        'createdAt': product.createdAt,
        'categories':  [{"id":category.id, "name": category.name} for category in product.categories.all()] ,
        'views': len(product.views),
        'size': product.size
    }  
    return product_data
