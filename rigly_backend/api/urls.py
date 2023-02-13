from django.urls import path, re_path
from rest_framework import routers
from django.conf.urls import include
from . import views, bids, payment
from api.auctions import AuctionViewSet
from .profile import UserProfile

router = routers.DefaultRouter()
router.register(r'auctions', AuctionViewSet, basename='auction_views')

urlpatterns = [
    path("", views.HomePage, name="index"),
    path("header/", views.HeaderDataView, name="Header Data"),
    path('product/<str:pk>/', views.ProductApi, name="ProductApi"),
    path('create-user/', views.createUser, name="ProductApi"),
    path('create-user/', views.createUser, name="ProductApi"),
    path('place-bid/', bids.BidsList.as_view()),
    path('place-automatic-bid/', bids.AutomaticBidsList.as_view()),
    path('update-payment-status/', payment.PaymentDetails.as_view()),
    path('profile/', UserProfile.as_view()),
    path('profile/<int:pk>/', UserProfile.as_view()),
    re_path(r'^v1/', include(router.urls))
    # path('auctions/<int:pk>/', auctions.AuctionsViewSet,
]
