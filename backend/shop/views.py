from django.shortcuts import render
from .models import Bicycle, ProductInstance, Cart, ArchivedCart

from rest_framework import viewsets, serializers
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import status
from .serializers import BicycleSerializer, CartSerializer, ProductInstanceSerializer
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny

class BicycleViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    queryset = Bicycle.objects.all()
    serializer_class = BicycleSerializer


class ProductInstanceViewSet(viewsets.ModelViewSet):
    queryset = ProductInstance.objects.all()
    serializer_class = ProductInstanceSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        cart = Cart.objects.filter(user=self.request.user).first()
        return ProductInstance.objects.filter(cart=cart)

    def perform_create(self, serializer):
        cart = Cart.objects.filter(user=self.request.user).first()
        if not cart:
            cart = Cart.objects.create(user=self.request.user)
        product = serializer.validated_data['product']
        instance = self.get_queryset().filter(product=product).first()
        # Проверяем остаток на складе
        if instance:
            if instance.instance_coef >= product.number_in_stock:
                raise serializers.ValidationError("Нельзя добавить больше товаров, чем есть на складе.")
            instance.increment_instance()
            instance.save()
            return Response({"status": "Количество увеличено", "instance_coef": instance.instance_coef}, status=status.HTTP_200_OK)
        else:
            if product.number_in_stock < 1:
                raise serializers.ValidationError("Товара нет на складе.")
            serializer.save(cart=cart)
        return Response({"status": "Товар добавлен в корзину"}, status=status.HTTP_201_CREATED)

    @action(detail=False, methods=['post'])
    def decrement(self, request):
        """
        Уменьшает количество товара в корзине по product_id.
        Если количество становится 0 — удаляет товар из корзины.
        В теле запроса: { "product": "<uuid>" }
        """
        product_id = request.data.get("product")
        if not product_id:
            return Response({"error": "Продукт не найден"}, status=status.HTTP_400_BAD_REQUEST)
        cart = Cart.objects.filter(user=request.user).first()
        if not cart:
            return Response({"error": "Корзина не найдена."}, status=status.HTTP_404_NOT_FOUND)
        instance = ProductInstance.objects.filter(cart=cart, product__uuid=product_id).first()
        if not instance:
            return Response({"error": "Товар не найден в корзине."}, status=status.HTTP_404_NOT_FOUND)
        if instance.instance_coef > 1:
            instance.instance_coef -= 1
            instance.save()
            return Response({'status': 'Количество уменьшено', 'instance_coef': instance.instance_coef})
        else:
            instance.delete()
            return Response({'status': 'Товар удалён из корзины'}, status=status.HTTP_204_NO_CONTENT)


class RegisterViewSet(viewsets.ViewSet):
    permission_classes = [AllowAny]

    def create(self, request):
        username = request.data.get("username")
        password = request.data.get("password")
        password_confirm = request.data.get("password_confirm")
        if not username or not password or not password_confirm:
            return Response({"error": "Username and passwords are required."}, status=400)
        if password != password_confirm:
            return Response({"error": "Passwords do not match."}, status=400)
        if User.objects.filter(username=username).exists():
            return Response({"error": "Username already exists."}, status=400)
        user = User.objects.create_user(username=username, password=password)
        user.save()
        token, created = Token.objects.get_or_create(user=user)
        if created:
            token.save()
        return Response({"token":token.key}, status=201)


class LoginViewSet(viewsets.ViewSet):
    permission_classes = [AllowAny]

    def login(self, request):
        username = request.data.get("username")
        password = request.data.get("password")
        if not username or not password:
            return Response({"error": "Username and password are required."}, status=400)
        user = authenticate(request, username=username, password=password)
        if user is not None:
            token, created = Token.objects.get_or_create(user=user)
            if created:
                token.save()
            return Response({"token": token.key}, status=200)
        else:
            return Response({"error": "Invalid credentials."}, status=401)
        
    def logout(self, request):
        token = request.auth
        if token:
            token.delete()
            return Response({"status": "Logged out successfully."}, status=204)
        return Response({"error": "No active session found."}, status=404)
    

class CartViewSet(viewsets.ViewSet):
    
    def get_cart(self, user):
        cart, created = Cart.objects.get_or_create(user=user)
        return cart, created
    
    def list(self, request):
        cart = self.get_cart(request.user)
        instance = ProductInstance.objects.filter(cart=cart)
        serializer = ProductInstanceSerializer(instance, many=True)
        return Response({
            "cart": CartSerializer(cart).data,
            "products": serializer.data,
            "total_price": cart.get_total_price()
        })

    @action(detail=False, methods=['post'])
    def order(self, request):
        cart = self.get_cart(request.user)
        instances = ProductInstance.objects.filter(cart=cart)
        if not instances.exists():
            return Response({
                "error": "Cart is empty."
            }, status=status.HTTP_400_BAD_REQUEST)
        ArchivedCart.objects.create(
            user=request.user,
            detailes={
                "products": ProductInstanceSerializer(instances, many=True).data,
                "total_price": cart.get_total_price()
            }
        )
        instances.delete()  # Clear the cart after archiving
        return Response({
            "status": "Order placed successfully.",
            "archived_cart_id": ArchivedCart.objects.last().id
        }, status=status.HTTP_201_CREATED)
