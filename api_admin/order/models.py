from django.db import models
from django.db.models import JSONField
from products.models import Product 
from django.contrib.auth.models import User

class Order(models.Model):  
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('processing', 'Processing'),
        ('cancel', 'Cancel'),
        ('completed', 'Completed'), 
    ] 
    customerName = models.CharField(max_length=255)
    paymentId = models.CharField(max_length=100)
    address = models.TextField()
    shoppingCartId = models.CharField(max_length=100, default=0)
    phone = models.CharField(max_length=20)
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default='pending') 
    isConfirm = models.BooleanField(default=False)
    listProducts = JSONField(default=list)  
    userId = models.CharField(max_length=26)
    totalPrice = models.FloatField(default=0)
    createdAt = models.DateTimeField(auto_now_add=True)

    def get_products(self):
        order_data = []
        for item in self.listProducts:
            product_id = item['product'] 
            count = item['count']
            product = Product.objects.get(pk=product_id)
            product_data = {
                'id': product.id,
                'name': product.name,
                'price': product.price,
                'picture': str(product.picture1) if product.picture1 else None, 
            } 
            order_detail =  {
                "count": count,
                "product": product_data,
            }
            order_data.append(order_detail)
        return order_data 

    def __str__(self):
        return self.customerName


class OrderDetails(models.Model): 
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('processing', 'Processing'),
        ('cancel', 'Cancel'),
        ('completed', 'Completed'), 
    ] 
    order = models.ForeignKey(Order, related_name='order_details', on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    seller_name = models.ForeignKey(User, on_delete=models.CASCADE, default=None)
    quantity = models.PositiveIntegerField()
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default='pending') 
    isConfirm = models.BooleanField(default=False)
    createdAt = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Order: {self.order.customerName}, Product: {self.product.name}, Quantity: {self.quantity}"
