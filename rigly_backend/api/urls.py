from django.urls import path, include

from . import views, bids

urlpatterns = [
    path("", views.HomePage, name="index"),
    path('product/<str:pk>/', views.ProductApi, name="ProductApi"),
    path('create-user/', views.createUser, name="ProductApi"),
    path('place-bid/', bids.BidsList.as_view()),
    path('place-automatic-bid/', bids.AutomaticBidsList.as_view()),
]
