from django.shortcuts import get_object_or_404, render, redirect 
from .models import Category, Product, Reviews
from rest_framework.decorators import api_view
from datetime import datetime
from PIL import Image
import numpy as np
from .feature_extrator import FeatureExtractor
from django.core.files.storage import FileSystemStorage
from pathlib import Path
from django.conf import settings
from django.http import JsonResponse, HttpResponse 
from django.contrib.auth.decorators import login_required  
from .models import Product   
from django.views.decorators.csrf import csrf_exempt
import json
from django.core.serializers import serialize
from django.db.models import Q
import requests
from rest_framework.views import APIView
from rest_framework import permissions, status 
from django.contrib.auth.models import User
from .serializers import serialize_product,ReviewsSerializer , ProductSerializer

UPLOADED_DIR = Path("./products/static/uploaded")
IMAGE_DIR = Path("./products/static/img")
IMAGE_DIR.mkdir(parents=True, exist_ok=True) 
UPLOADED_DIR.mkdir(parents=True, exist_ok=True) 
feature_dir = Path(__file__).resolve().parent / "static" / "feature"
fe = FeatureExtractor(reduced_dim=128) 
features = []
img_paths = []

if feature_dir.is_dir():
    # Iterate over the .npy files in the directory
    for feature_path in feature_dir.glob("*.npy"):
        features.append(np.load(feature_path))
        img_paths.append(Path("./products/static/img") / (feature_path.stem + ".jpg"))
    features = np.array(features)
else:
    print("Directory does not exist:", feature_dir)  

def get_products_by_category():
    categories = Category.objects.all()
    products_by_category = {}

    for category in categories:
        products = Product.objects.filter(categories=category)
        products_by_category[category] = products

    return products_by_category

def send_user_ids_to_nest(ids, token):
    url =  'http://localhost:3000/user'
    data = {'usersId': ids}
    headers = {'Authorization': f'Bearer {token}'} 
    try:
        response = requests.post(url, json=data, headers=headers) 
        if response.status_code <= 201:
            print("Data sent id comments successfully")
            return response.json()
        else:
            print("Failed to send data")
    except Exception as e:
        print("Error:", e)

@csrf_exempt
def all_products(request, *args, **kwargs):  
    if request.method == 'POST':
        query_img = request.FILES.get('query_img')
        print("Image Upload: ", query_img)
        if not query_img or query_img.content_type not in ['image/jpeg', 'image/png']:
            return JsonResponse({'error': "This is not a image"}, status=500)
        if query_img.size == 0:
            return HttpResponse("Error: Failed to extract features from the uploaded image.") 
        try: 
            img = Image.open(query_img)  # Open as PIL Image
            uploaded_img_path = UPLOADED_DIR / (datetime.now().isoformat().replace(":", ".") + "_" + query_img.name)
            img.save(uploaded_img_path)  # Save query image
            query = fe.extract(img)   
            print(f"Feature vector shape: {query.shape}") 
            dists = np.linalg.norm(features - query, axis=1)  
            ids = np.argsort(dists)[:8]  
            pictures = [str(img_paths[id]) for id in ids]  
            query = Q()
            for url in pictures: 
                query |= Q(picture1__icontains=url) 
            products = Product.objects.filter(query)   
            list_product = list(products.values())
            return JsonResponse(list_product, safe=False)
        except Exception as e: 
            print(f"Error processing image: {e}") 
            return JsonResponse({'error': str(e)}, status=500)
    else: 
        try: 
            results = []
            search = request.GET.get('search')
            creator_username = request.GET.get('createBy')
            print("search: ", search)
            print("category : ", creator_username) 
            if creator_username:
                creator = User.objects.get(username=creator_username)
                results = Product.objects.filter(created_by=creator)
            elif search:
                results = Product.objects.filter(Q(name__icontains=search)).select_related('created_by')
            else:
                results = Product.objects.all().select_related('created_by') 

            products_list = [ serialize_product(product) for product in results]  
            return JsonResponse(products_list, safe=False)
        except Exception as e: 
            print(f"Error processing image: {e}") 
            return HttpResponse("Error: Failed to get product.")  

@csrf_exempt
def getProducts(request, *args, **kwargs):   
    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        product_ids = data.get('productIds', [])    
        products = Product.objects.filter(id__in=product_ids)    
        serialized_products = list(products.values())
        return JsonResponse( serialized_products, safe=False) 

@csrf_exempt 
def getReviews(request, *args, **kwargs):     
    if request.method == "GET":
        try:
            product_id = request.GET.get("productId")  
            token = request.GET.get("token")   
            reviews = Reviews.objects.filter(product=product_id).order_by('-createdAt') 
            reviews_list = list(reviews.values()) 
            ids = [item["user_create"] for item in reviews_list]
            data_user = send_user_ids_to_nest(ids, token)
            print(data_user)
            try:
                user_dict = {u["_id"]: u for u in data_user}
                for item in reviews_list:
                    user_id = item["user_create"]
                    if user_id in user_dict:
                        item["user_create"] = user_dict[user_id] 
                return JsonResponse(reviews_list, safe=False)
            except Exception as e:
                return JsonResponse({'error': str(e)}, status=500)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    
def saveImageUpload(query_img):  
    if query_img: 
        if not query_img or query_img.content_type not in ['image/jpeg', 'image/png']: 
            return JsonResponse({'error': True, 'message':'Picture has to image'}, status=404)
        img = Image.open(query_img)  # Open as PIL Image
        uploaded_img_path = UPLOADED_DIR / (datetime.now().isoformat().replace(":", ".") + "_" + query_img.name)
        img.save(uploaded_img_path)
        picture = "http:\\\\localhost:8000\\" + str(uploaded_img_path)
        return picture
    else:
        return "" 

def saveImageUploadFeature(query_img):
    if query_img: 
        if not query_img or query_img.content_type not in ['image/jpeg', 'image/png']: 
            return JsonResponse({'error': True, 'message':'Picture has to image'}, status=404)
        img = Image.open(query_img)  # Open as PIL Image
        uploaded_img_path = IMAGE_DIR / (datetime.now().isoformat().replace(":", ".") + "_" + query_img.name)
        img.save(uploaded_img_path)
        feature = fe.extract(img)   
        feature_path = Path("./products/static/feature") / (uploaded_img_path.stem + ".npy") 
        np.save(feature_path, feature) 
        picture = "http:\\\\localhost:8000\\" + str(uploaded_img_path)
        return picture, feature
    else:
        return "" 

@csrf_exempt 
def createReviews(request, id):
    if request.method == 'POST':
        try:
            user_id = request.POST.get("userId") 
            query_img = request.FILES.get('picture') 
            content = request.POST.get("content")  
            picture =  saveImageUpload(query_img) 
            product = Product.objects.get(pk=id)
            newReviews = Reviews.objects.create(
                picture=picture,
                user_create = user_id,
                content = content,
                product = product 
            ) 
            comment_list = ReviewsSerializer(newReviews, many=False) 
            return JsonResponse({"message": "reviews success", "data": comment_list.data }, status=200)
        except Reviews.DoesNotExist:
            return JsonResponse({'error': 'reviews does not exist'}, status=404)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
   
class CreateProduct(APIView):
    permission_classes = [permissions.IsAuthenticated]	
    def post(self, request): 
        name = request.POST.get("name") 
        picture1 = request.FILES.get('picture1') 
        picture2 = request.FILES.get('picture2') 
        picture3 = request.FILES.get('picture3') 
        description = request.POST.get("description")
        price =  request.POST.get("price")
        stock =  request.POST.get("stock")
        size =  json.loads(request.POST.get("size")) 
        category_ids = json.loads(request.POST.get("categories")) 
        seller_username = request.user.username 
        picture, feature = saveImageUploadFeature(picture1)
        print("feature = ", feature)
        picture2 = saveImageUpload(picture2)
        picture3 = saveImageUpload(picture3)
        try:
            created_by = User.objects.get(username=seller_username)
            newProduct = Product.objects.create(
                name=name,
                picture1=picture,  
                picture2=picture2,  
                picture3=picture3,  
                description=description,  
                price=float(price),   
                stock=int(stock),     
                created_by=created_by,
                size=size
            )   
            categories = Category.objects.filter(id__in=category_ids)
            newProduct.categories.set(categories) 
            serialized_product = serialize('json', [newProduct])
            product_data = json.loads(serialized_product)[0]['fields']
            return JsonResponse({"success": "Create new Product success", "data": product_data}, status=200) 
        except Product.DoesNotExist:
            return JsonResponse({'error': 'Product does not exist'}, status=404)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

class UpdateProduct(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def put(self, request, product_id):
        try:
            product = Product.objects.get(id=product_id, created_by=request.user)
        except Product.DoesNotExist:
            return JsonResponse({'error': 'Product not found or you are not authorized to update this product.'}, status=404) 
        name = request.data.get("name")
        picture1 = request.FILES.get('picture1')
        picture2 = request.FILES.get('picture2')
        picture3 = request.FILES.get('picture3')
        description = request.data.get("description")
        price = request.data.get("price")
        stock = request.data.get("stock")
        size = json.loads(request.data.get("size", '[]'))
        category_ids = request.data.get("categories", '[]') 
        print("ID: ", category_ids)
        if picture1:
            picture, feature = saveImageUploadFeature(picture1)
            product.picture1 = picture
            print("feature = ", feature)
        if picture2:
            picture2 = saveImageUpload(picture2)
            product.picture2 = picture2 
        if picture3:
            picture3 = saveImageUpload(picture3)
            product.picture3 = picture3 
        if name:
            product.name = name 
        if description:
            product.description = description 
        if price:
            product.price = float(price) 
        if stock:
            product.stock = int(stock) 
        if size:
            product.size = size 
        if category_ids:
            product.categories.set(category_ids)
        # product.save() 
        serialized_product = serialize('json', [product])
        product_data = json.loads(serialized_product)[0]['fields']
        product_data['id'] = product.id
        return JsonResponse({"success": "Product updated successfully.", "data": product_data}, status=200)

class GetProduct(APIView):
    permission_classes = [permissions.IsAuthenticated]	
    def get(self, request):   
        try: 
            products = Product.objects.filter(created_by=request.user, isDeleted = False).order_by('-createdAt') 
            products_list = [ serialize_product(product) for product in products]  
            return JsonResponse({"success": True, "message": "Get product success", "products" : products_list}, status=200)
        except Product.DoesNotExist:
            return JsonResponse({'error':True, "message": 'Product does not exist'}, status=404)
        except Exception as e:
            return JsonResponse({'error':True, "message":  str(e)}, status=500)

class GetProductInTheTrash(APIView):
    permission_classes = [permissions.IsAuthenticated]	
    def get(self, request):  
        seller_username = request.user.username  
        try:
            created_by = User.objects.get(username=seller_username)
            products = Product.objects.filter(created_by=created_by, isDeleted = True).order_by('-createdAt') 
            products_list = list(products.values())   
            return JsonResponse({"success": True, "message": "Get product success", "products" : products_list}, status=200)
        except Product.DoesNotExist:
            return JsonResponse({'error':True, "message": 'Product does not exist'}, status=404)
        except Exception as e:
            return JsonResponse({'error':True, "message":  str(e)}, status=500)


class ViewsProduct(APIView):
    def put(self, request, param=None, productId = None):
        try: 
            if param is not None and productId is not None:     
                product = get_object_or_404(Product, pk=productId)
                if product:
                    if param not in product.views: 
                        product.views.append(param)
                        product.save()
                        return JsonResponse({"message": "View added successfully"})
                    else:
                        return JsonResponse({"error": "View already exists"}, status=400)
                else:
                    return JsonResponse({"error": "Product not found"}, status=404) 
            else:
                return JsonResponse({'error': "Success. No param provided."}, status=400)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

class DeletedProduct(APIView):
    permission_classes = [permissions.IsAuthenticated]	
    def post(self, request, id = None):   
        try:
            if id is not None:     
                Product.objects.filter(id=id).update(isDeleted=True)
                return JsonResponse({"success": "Deleted product success" }, status=200)
            else:
                return JsonResponse({'error': "Success. No param provided."}, status=400)
        except Product.DoesNotExist:
            return JsonResponse({'error':'Product does not exist'}, status=404)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
        
class RestoreProduct(APIView):
    permission_classes = [permissions.IsAuthenticated]	
    def post(self, request, id = None):   
        try:
            if id is not None:     
                Product.objects.filter(id=id).update(isDeleted=False)
                return JsonResponse({"success": True, "message": "Restore product success"}, status=200)
            else:
                return JsonResponse({'error': "Success. No param provided."}, status=400)
        except Product.DoesNotExist:
            return JsonResponse({'error':True, "message": 'Product does not exist'}, status=404)
        except Exception as e:
            return JsonResponse({'error':True, "message":  str(e)}, status=500)
 