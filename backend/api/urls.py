from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import EmployeeViewSet, RegisterView, CustomTokenObtainPairView

router = DefaultRouter()
router.register(r'employees', EmployeeViewSet)

urlpatterns = [
    path("register/", RegisterView.as_view(), name="register"),
    path("login/", CustomTokenObtainPairView.as_view(), name="login"),
    path('', include(router.urls)),
]