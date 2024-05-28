from django.core.serializers import serialize
from rest_framework import serializers
from .models import OrderDetails, Order
from products.models import Product

def serialize_order(order):
    order_data = {
        'id': order.id,
        'customerName': order.customerName,
        'paymentId': order.paymentId,
        'address': order.address,
        'shoppingCartId': order.shoppingCartId,
        'phone': order.phone,
        'status': order.status,
        'isConfirm': order.isConfirm,
        'userId': order.userId,
        'totalPrice': order.totalPrice,
        'createdAt': order.createdAt,
        'products': order.get_products(),   
    }
    return order_data

def serializer_order_detail(order_detail):
    order_detail_data = {
        
    }

class ProductSerializer(serializers.ModelSerializer):
    picture1 = serializers.SerializerMethodField()

    def get_picture1(self, obj):  
        return obj.picture1.url.replace('%3A', ':')

    class Meta:
        model = Product
        fields = ['id', 'name', 'stock' , 'price', 'picture1', 'description'] 

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ['id', 'customerName', 'paymentId', 'createdAt', 'address', 'phone'] 

class OrderDetailsSerializer(serializers.ModelSerializer):
    order = OrderSerializer()
    product = ProductSerializer()

    class Meta:
        model = OrderDetails
        fields = ['id', 'order', 'product', 'quantity', 'isConfirm', 'status'] 
