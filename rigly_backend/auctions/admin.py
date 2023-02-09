from django.contrib import admin
from .models import *

# class auction(admin.ModelAdmin):
#     list_display = ("id" , "user", "active_bool","title" , "desc" , "starting_bid" , "image_url" , "category")

# class watchl(admin.ModelAdmin):
#     list_display = ("id", "watch_list" , "user")

# class bds(admin.ModelAdmin):
#     list_display = ("id","user","listingid","bid")

# class comme(admin.ModelAdmin):
#     list_display = ("id","user", "comment", "listingid")

# class win(admin.ModelAdmin):
#     list_display = ("id","user", "bid_win_list")

class TimeAdmin(admin.ModelAdmin):
    readonly_fields = ('updated_at',)

class SlugTimeAdmin(admin.ModelAdmin):
    readonly_fields = ('updated_at','slug_category')

# Register your models here.
admin.site.register(User)
admin.site.register(Collection, TimeAdmin)
admin.site.register(AuctionList, SlugTimeAdmin)
admin.site.register(Bids, TimeAdmin)
admin.site.register(Comments, TimeAdmin)
admin.site.register(WatchList, TimeAdmin)
admin.site.register(Winner, TimeAdmin)
admin.site.register(ProxyBids, TimeAdmin)
