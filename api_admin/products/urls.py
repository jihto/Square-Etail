from django.urls import path 
from . import views 
app_name = 'store'

urlpatterns = [
    path('', views.all_products), 
    path('products/', views.getProducts), 
    path('reviews/', views.getReviews), 
    path('reviews/create/<str:id>', views.createReviews), 
    path('product/create', views.CreateProduct.as_view()),  
    path('product/update/<str:product_id>', views.UpdateProduct.as_view()),  
    path('product/created', views.GetProduct.as_view()),
    path('product/isDeleted', views.GetProductInTheTrash.as_view()),  
    path('product/views/<str:param>/<str:productId>', views.ViewsProduct.as_view()),  
    path('product/deleted/<str:id>', views.DeletedProduct.as_view()),  
    path('product/restore/<str:id>', views.RestoreProduct.as_view()),   
]