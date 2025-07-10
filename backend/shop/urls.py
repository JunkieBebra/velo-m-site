from rest_framework import routers
from .views import BicycleViewSet, ProductInstanceViewSet, RegisterViewSet, LoginViewSet, CartViewSet
from django.urls import path, include

router = routers.SimpleRouter()
router.register(r'bicycles', BicycleViewSet, basename='bicycle')
router.register(r'product-instances', ProductInstanceViewSet, basename='product-instance')
router.register(r'cart', CartViewSet, basename='cart')

urlpatterns = [
    path('register/', RegisterViewSet.as_view({'post': 'create'}), name='register'),
    path('login/', LoginViewSet.as_view({'post': 'login'}), name='login'),
    path('logout/', LoginViewSet.as_view({'post': 'logout'}), name='logout'),
    path('', include(router.urls)),
]
