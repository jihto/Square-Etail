from django.db import models
from django.urls import reverse 
from django.db.models import JSONField
from django.contrib.auth.models import User
class ProductManager(models.Manager):
    def get_queryset(self):
        return super(ProductManager, self).get_queryset().filter(is_active=True)


class Category(models.Model):
    name = models.CharField(max_length=255, db_index=True)
    slug = models.SlugField(max_length=255, unique=True)

    class Meta:
        verbose_name_plural = 'categories'

    def get_absolute_url(self):
        return reverse('store:category_list', args=[self.slug])

    def __str__(self):
        return self.name


class Product(models.Model):
    categories = models.ManyToManyField(Category) 
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True) 
    created_by = models.ForeignKey(User, on_delete=models.CASCADE) 
    picture1 = models.ImageField(upload_to='./static/img/', blank=True, null=True)
    picture2 = models.ImageField(upload_to='./static/img/', blank=True, null=True)
    picture3 = models.ImageField(upload_to='./static/img/', blank=True, null=True)
    slug = models.SlugField(max_length=255)
    price = models.FloatField(max_length=6)
    stock = models.IntegerField(default=0) 
    size = JSONField(default=list)
    views=JSONField(default=list)
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)
    isDeleted = models.BooleanField(default=False)
    objects = models.Manager() 

    class Meta:
        verbose_name_plural = 'Products'
        ordering = ('-createdAt',)

    def get_absolute_url(self):
        return reverse('store:product_detail', args=[self.slug])
 
    
    def __str__(self):
        return self.name
    


class Reviews(models.Model):
    user_create  = models.CharField(max_length=50, blank=False)
    product = models.ForeignKey(Product, related_name='reviews_order', on_delete=models.CASCADE) 
    content = models.CharField(max_length=255)
    picture = models.ImageField(upload_to='./static/reviews/', blank=True) 
    createdAt = models.DateTimeField(auto_now_add=True) 

    def __str__(self):
        return self.content