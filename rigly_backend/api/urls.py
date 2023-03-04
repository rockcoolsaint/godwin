from django.urls import path, re_path
from rest_framework import routers
from django.conf.urls import include
from . import views, bids, payment, orders
from api.auctions import AuctionViewSet
from .profile import UserProfile, UserView

router = routers.DefaultRouter()
router.register(r'auctions', AuctionViewSet, basename='auction_views')

urlpatterns = [
    # other routes
    path("get_homepage_data/", views.get_homepage_data, name="get_homepage_data"),
    path("header/", views.get_header_data, name="get_header_data"),

    # auction routes
    # TODO - append auction result only if expired
    path('auctions/<str:pk>/complete_auction_detail/', AuctionViewSet().complete_auction_detail,
         name='complete_auction_detail'),
    # path('product/<str:pk>/', views.ProductApi, name="ProductApi"),

    # bid routes
    path('place-bid/', bids.BidsList.as_view()),
    path('place-automatic-bid/', bids.AutomaticBidsList.as_view()),

    # payment routes
    path('update-payment-status/', payment.VerificationPayment.as_view()),
    path('orders', orders.Orders.as_view()),
    path('orders/<int:pk>', orders.Orders.as_view()),
    path('orders/update', orders.Orders.as_view()),
    path('payments/webhook', payment.PaymentsWebhook.as_view()),
    path('payments/<str:pk>', payment.Payments.as_view()),

    # user api routes
    path('profile/', UserProfile.as_view()),
    # path('profile/<int:pk>/', UserProfile.as_view()),
    path('create-user/', UserView.as_view(), name="UserApi"),
    re_path(r'^v1/', include(router.urls))
]
