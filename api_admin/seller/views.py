# Create your views here. 
from rest_framework.views import APIView
from rest_framework.response import Response 
from rest_framework import permissions, status 
from .serializers import SellerSerializer 
from products.models import Product , Category
from django.http import JsonResponse 
from django.db.models import Count, Sum , F, Value, IntegerField 
from django.contrib.postgres.aggregates import ArrayAgg
from order.models import OrderDetails
from django.db.models.functions import TruncMonth, TruncWeek, Coalesce
from django.utils import timezone 
from collections import defaultdict  
from datetime import datetime
def get_seller_product_stats(seller):
    # Total product had sold 
    # total_products_sold = OrderDetails.objects.filter(seller_name=seller.id).aggregate(total_products=Sum('quantity'))['total_products'] or 0
    # Total number of views of all products created by the seller
    product_views = Product.objects.filter(created_by=seller.id).values_list('views', flat=True) 
    total_views = sum([len(views) for views in product_views])
    total_products = len(product_views)
    total_completed_products = OrderDetails.objects.filter(
            seller_name=seller.id,
            status='completed'
        ).aggregate(total_completed_products=Sum('quantity'))['total_completed_products'] or 0
    total_peading_products = OrderDetails.objects.filter(
            seller_name=seller.id,
            status='pending'
        ).aggregate(total_completed_products=Sum('quantity'))['total_completed_products'] or 0
    return total_products, total_views, total_completed_products, total_peading_products



class RetrieveUserView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def get(self, request):
        try:
            user = request.user 
            seller = SellerSerializer(user)
            categories = Category.objects.all() 
            categories_data = list(categories.values('id', 'name'))

            response_data = {
                'seller': seller.data,
                'categories': categories_data
            }
            return Response(response_data, status=status.HTTP_200_OK) 
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    
class Statistic(APIView):
    permission_classes = [permissions.IsAuthenticated]	
    def get(self, request): 
        try:
            total_products, total_views, total_completed_products, total_peading_products = get_seller_product_stats(request.user)
            data = {
                "totalProducts": total_products,
                "totalViews" : total_views,
                "totalCompletedProducts" : total_completed_products,
                "totalPeadingProducts": total_peading_products
            }
            return JsonResponse({"message": "Get statistic success", "data": data}, status=200) 
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
        

class Categories(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def get(self, request):
        try:
            categories = Category.objects.all() 
            result =  list(categories.values())
            return JsonResponse({"success": "Get categories success", "data": result}, status=200)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

class StatisticProductCreated(APIView):
    permission_classes = [permissions.IsAuthenticated] 
    def get(self, request):
        try:
            start_date = timezone.now() - timezone.timedelta(days=365)
            products_per_week = list(Product.objects
                .filter(created_by=request.user, createdAt__gte=start_date)
                .annotate(week=TruncWeek('createdAt'))
                .values('week')
                .annotate(count=Count('id'))
                .order_by('week')
                .values('week', 'count'))

            result = [0] * 4  # Initialize the result array with 4 elements

            for product_dict in products_per_week:
                week = product_dict['week'].isocalendar()[1] # Week numbers start from 1
                count = product_dict['count'] 
                week_index = (week - 1) // 4  # Convert week number to 4 quarter intervals
                print("Week _ index: ", week_index)
                result[week_index - 2] += count
                print(result)
            return JsonResponse({"success": "get statistic success", "data": result}, status=200)
        except Exception as e:
            return JsonResponse({'error': True, "message": str(e)}, status=500)

class StatisticOrderConfirm(APIView):
    permission_classes = [permissions.IsAuthenticated]	
    def get(self, request):   
        try:
            start_date = timezone.now() - timezone.timedelta(days=365) 
            orders_per_month = list(OrderDetails.objects
                        .filter(seller_name = request.user, createdAt__gte=start_date)
                        .annotate(month=TruncMonth('createdAt'))
                        .values('month')
                        .annotate(count=Count('id'))
                        .order_by('month')
                        .values('month', 'count'))

            # Initialize an array with 12 elements, all set to 0
            result = [0] * 12
            print("orders_per_month" , orders_per_month)

            # Fill the result array with the count of orders for each month
            for order_dict in orders_per_month:
                month = order_dict['month'].month -1 # Months are zero-indexed
                count = order_dict['count']
                result[month] = count
            print(result) 
            return JsonResponse({"success": "get statistic success", "data": result}, status=200)
        except Exception as e:
            return JsonResponse({'error':True, "message":  str(e)}, status=500)
        

class StatisticViews(APIView):
    permission_classes = [permissions.IsAuthenticated]	
    def get(self, request):   
        try: 
            current_year = datetime.now().year 
            monthly_views = Product.objects.filter(created_by=request.user, createdAt__year=current_year).annotate(month=TruncMonth('createdAt')).values('month').annotate(views_count=Count('views')).order_by('month').values('month', 'views_count')
            print(monthly_views)
            # Create a list to store the monthly views
            monthly_views_list = [0] * 12

            # Populate the list with the views count for each month
            for view in monthly_views:
                print(view)
                month = view['month'].month - 1
                count = view['views_count']
                monthly_views_list[month] = count

            return JsonResponse({"success": "get statistic success", "data": monthly_views_list}, status=200)
        except Exception as e:
            return JsonResponse({'error':True, "message":  str(e)}, status=500)