from django.urls import path
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView
from .views import LoginView, StaffView, LogoutView, ShopView

router = DefaultRouter()
router.register('shops', ShopView, basename='shop')
router.register('staff', StaffView, basename='staff')

urlpatterns = [
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token-refresh'),
] + router.urls