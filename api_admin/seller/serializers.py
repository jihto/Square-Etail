from rest_framework import serializers
from django.contrib.auth import authenticate
from django.http import JsonResponse  
from django.contrib.auth import get_user_model
Seller = get_user_model()

class UserLoginSerializer(serializers.Serializer):
	username = serializers.CharField()
	password = serializers.CharField()
	##
	def check_user(self, clean_data):
		user = authenticate(username=clean_data['username'], password=clean_data['password'])
		if not user:
			raise JsonResponse({"error": True, "message": "You are not authorized to access this resource."}, status=403)
		return user

class SellerSerializer(serializers.ModelSerializer):
	class Meta:
		model = Seller
		fields = ('id','first_name', 'last_name', 'email',"username")
		
def StatisticSerializer(product):
	data ={

	}
	return data