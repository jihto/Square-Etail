from django.shortcuts import render
from django.http import JsonResponse, HttpResponse  
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
import json
from .models import Order, OrderDetails
from products.models import Product
from .serializers import serialize_order
import random
import requests
from rest_framework.views import APIView
from rest_framework import permissions
from django.contrib.auth.models import User
from .serializers import OrderDetailsSerializer

@csrf_exempt
@api_view(['GET'])
def user_order(request, *args, **kwargs):  
    user_id = request.GET.get("userId")  
    print(user_id)
    orders = Order.objects.filter(userId=user_id) 
    orders_list = [serialize_order(order) for order in orders] 
    return JsonResponse(orders_list, safe=False)


def create_notification_to_nest(ids, type):
    print("Id: " , ids )
    print("Type: " , type )

    url =  'http://localhost:3000/notification/create/' + type
    data = {'recipient': ids}  
    try:
        response = requests.post(url, json=data) 
        if response.status_code <= 201: 
            return response.json()
        else: 
            return JsonResponse({'status': 'error', 'message': 'Token expired'}, status=response.status_code)
    except Exception as e:
        print("Error:", e)
        return JsonResponse({'status': 'error', 'message': str(e)}, status=500)

def are_order_details_confirmed(order_id): 
    print("Order ID: ", order_id)
    order = Order.objects.get(pk=order_id) 
    order_details = order.order_details.all() 
    all_confirmed = all(detail.isConfirm for detail in order_details) 
    return all_confirmed


class GetSellerOrder(APIView):
    permission_classes = [permissions.IsAuthenticated]	
    def post(self, request): 
        product_id = request.POST.get("productId") 
        query_img = request.FILES.get('picture') 
        content = request.POST.get("content")
        user_create =  request.user.username


def create_order_details(order_id, product_id, quantity):
    try: 
        order = Order.objects.get(pk=order_id)
        product = Product.objects.select_related('created_by').get(pk=product_id)  
        seller_name = User.objects.get(username = product.created_by.username)
        order_detail = OrderDetails.objects.create(
            order=order,
            product=product,
            quantity=quantity,
            seller_name= seller_name,
            isConfirm=False
        ) 
        create_notification_to_nest(str(product.created_by.id), "order") 
    except Order.DoesNotExist:
        return JsonResponse({'error': 'Order does not exist'}, status=404)
    except Product.DoesNotExist:
        return JsonResponse({'error': 'Product does not exist'}, status=404)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)

@csrf_exempt 
@api_view(['POST'])
def create_order(request, *args, **kwargs):
    try:  
        customer_name = request.POST.get('customerName')
        payment_id = request.POST.get('paymentId')
        address = request.POST.get('address')
        shopping_cart_id = request.POST.get('shoppingCartId')
        phone = request.POST.get('phone') 
        list_products = json.loads(request.POST.get('listProducts')) 
        total_price = float(request.POST.get('totalPrice'))
        user_id = request.POST.get('userId')
        #loop and get product id and number product
        products =[({ 'product': product_data['product']['id'], "count": product_data['count']}) for product_data in list_products] 
        
        # create new order to database
        random_code = ''.join(random.choices('0123456789', k=6))
        order = Order.objects.create( 
            customerName=customer_name,
            paymentId=payment_id + random_code,
            address=address,
            shoppingCartId=shopping_cart_id,
            phone=phone, 
            userId=user_id,
            totalPrice=total_price,
            listProducts=products,
        ) 
        order.save() 
        for product in products:
            create_order_details(order.id, product['product'], product['count'])
        noti = create_notification_to_nest(user_id, "success")  
        return JsonResponse({'message': 'Order created successfully', "code": random_code}, status=201)
    except Exception as e: 
        print(str(e))
        return JsonResponse({'error': 'Missing fields data'}, status=500)

class GetOrderDetails(APIView):
    permission_classes = [permissions.IsAuthenticated]	
    def get(self, request): 
        try:
            seller_name = request.user.id
            order_details = OrderDetails.objects.filter(seller_name=seller_name)
            serializer = OrderDetailsSerializer(order_details, many=True) 
            pending_orders = [order for order in serializer.data if order['status'] == "pending"]
            completed_orders = [order for order in serializer.data if order['status'] != "pending"]
            data = {
                'pendingOrders': pending_orders,
                'completedOrders': completed_orders
            }
            return JsonResponse({ "success": " Get data order details succes", "data": data }, status=200)
        except Exception as e: 
            print(str(e))
            return JsonResponse({'error': str(e)}, status=500)
        
class ConfirmOrderDetail(APIView):
    permission_classes = [permissions.IsAuthenticated]	
    def put(self, request):
        try:
            order_detail_id = request.POST.get("orderDetailId")   
            order_detail = OrderDetails.objects.get(id=order_detail_id) 
            product = Product.objects.get(pk=order_detail.product_id)  
            product.stock = product.stock - 1
            order_detail.isConfirm = True
            order_detail.status = "processing"
            product.save()
            order_detail.save()
            if are_order_details_confirmed(order_detail.order_id): 
                order = Order.objects.get(pk=order_detail.order_id) 
                order.isConfirm = True
                order.status = "processing"
                create_notification_to_nest(order.userId, "confirm")
                order.save()
            serializer = OrderDetailsSerializer(order_detail, many =False)
            serialized_data = serializer.data
            return JsonResponse({ "success": " Confirm Order success", "data": serialized_data }, safe=False)
        except Exception as e: 
            print(str(e))
            return JsonResponse({'error': str(e)}, status=500)


class CancelOrderDetail(APIView):
    permission_classes = [permissions.IsAuthenticated]	
    def put(self, request):
        try:
            order_detail_id = request.POST.get("orderDetailId")   
            order_detail = OrderDetails.objects.get(id=order_detail_id) 
            order_detail.status = "cancel"
            order_detail.save()
            order = Order.objects.get(pk=order_detail.order_id) 
            order.isConfirm = False
            order.status = "cancel"
            create_notification_to_nest(order.userId, "cancel")
            order.save()
            serializer = OrderDetailsSerializer(order_detail)
            serialized_data = serializer.data
            return JsonResponse({ "success": " Cancel Order success", "data": serialized_data }, safe=False)
        except Exception as e: 
            print(str(e))
            return JsonResponse({'error': str(e)}, status=500)