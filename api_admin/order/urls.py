# urls.py
from django.urls import path
from .views import user_order, create_order
from . import views
from django.views.decorators.csrf import csrf_exempt

from . import views


app_name = 'order'

urlpatterns = [
    path('', user_order, name='user_order'), 
    path('create', csrf_exempt(create_order)), 
    path("order_details", views.GetOrderDetails.as_view()),
    path("confirm", views.ConfirmOrderDetail.as_view()),
    path("cancel", views.CancelOrderDetail.as_view()),
]
