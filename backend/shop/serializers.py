from rest_framework import serializers
from .models import Brand, Bicycle, Cart, ArchivedCart, ProductInstance
from django.contrib.auth.models import User


class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brand
        fields = ['uuid', 'brand_name']


class BicycleSerializer(serializers.ModelSerializer):
    brand = serializers.SlugRelatedField(
        slug_field='brand_name',
        queryset=Brand.objects.all()
    )

    class Meta:
        model = Bicycle
        fields = '__all__'


class CartSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = Cart
        fields = ['id', 'user']


class ProductInstanceSerializer(serializers.ModelSerializer):
    cart = serializers.HiddenField(default=None)
    product = serializers.SlugRelatedField(
        slug_field='uuid',
        queryset=Bicycle.objects.all()
    )

    class Meta:
        model = ProductInstance
        fields = ['cart', 'product', 'instance_coef']


class ArchivedCartSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = ArchivedCart
        fields = '__all__'
