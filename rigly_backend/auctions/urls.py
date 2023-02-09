from django.urls import path, include

from . import views
from .authentication import login

urlpatterns = [
    path("", views.index, name="index"),
    # path("login", login.login, name="login"),
    path("logout", login.logout, name="logout"),
    # path("callback", login.callback, name="callback"),
    path('', include('social_django.urls')),
    path("create", views.create, name="create"),
    path("auctions/<int:bidid>", views.listingpage, name="listingpage"),
    path("watchlist/<str:username>", views.watchlistpage, name="watchlistpage"),
    path("added", views.addwatchlist, name="addwatchlist"),
    path("delete", views.deletewatchlist, name="deletewatchlist"),
    path("bidlist", views.bid, name="bid"),
    path("comments", views.allcomments, name="allcomments"),
    path("win_ner", views.win_ner, name="win_ner"),
    path("winnings", views.winnings, name="winnings"),
    path("cat_list", views.cat_list, name="cat_list"),
    path("categories/<str:category_name>", views.cat, name="cat"),
    path("get_present_bid/<int:auction_id>", views.get_present_bid, name="get_present_bid"),
    path("save_proxy_amount", views.save_proxy_amount, name="save_proxy_amount"),
]
