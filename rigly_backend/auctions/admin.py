from django.contrib import admin
from .models import *
from import_export.admin import ImportExportModelAdmin


class TimeAdmin(admin.ModelAdmin):
    readonly_fields = ('updated_at',)


class SlugTimeAdmin(admin.ModelAdmin):
    readonly_fields = ('updated_at', 'slug_category')


# Register your models here.
admin.site.register(User)
admin.site.register(Payment, TimeAdmin)
admin.site.register(Collection, TimeAdmin)
# admin.site.register(AuctionList, SlugTimeAdmin)


@admin.register(AuctionMetaData)
class AuctioMetaDataAdmin(ImportExportModelAdmin):
    pass


@admin.register(AuctionList)
class AuctionListAdmin(ImportExportModelAdmin):
    pass


admin.site.register(Bids, TimeAdmin)
admin.site.register(AuctionResult, TimeAdmin)
# admin.site.register(AuctionMetaData)
admin.site.register(AuctionType)
admin.site.register(ProxyBids, TimeAdmin)
admin.site.register(Order)
admin.site.register(OrderPayment)
