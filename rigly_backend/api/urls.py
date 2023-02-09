from django.urls import path, include

from . import views

urlpatterns = [
    path("", views.HomePage, name="index"),
    path('product/<str:pk>/', views.ProductApi, name="ProductApi"),
]
