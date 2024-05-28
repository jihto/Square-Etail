
from django.urls import  path
from . import views 

urlpatterns = [    
	path('', views.RetrieveUserView.as_view()),  
	path('categories', views.Categories.as_view()),  
	path('statistic', views.Statistic.as_view()), 
    path('statistic/product', views.StatisticProductCreated.as_view()),  
    path('statistic/order', views.StatisticOrderConfirm.as_view()),   
    path('statistic/views', views.StatisticViews.as_view()),     
]
