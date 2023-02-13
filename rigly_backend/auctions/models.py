from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils import timezone
from ckeditor.fields import RichTextField
from django.utils.text import slugify


class BaseModel(models.Model):
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(null=True, blank=True, auto_now=True, editable=True)
    deleted = models.BooleanField(default=False)
    version = models.CharField(default='v1', max_length=10)


class Coupons(BaseModel):
    code = models.CharField(max_length=200)


class Payment(BaseModel):
    payment_status = models.CharField(max_length=100)
    transaction_id = models.TextField()
    extra_info = models.JSONField(blank=True, null=True)


class User(AbstractUser):
    payment = models.ForeignKey(Payment, blank=True, null=True, on_delete=models.CASCADE)
    is_paid = models.BooleanField(default=False)
    coupon = models.ForeignKey(Coupons, blank=True, null=True, on_delete=models.CASCADE)
    is_coupon_used = models.BooleanField(default=False)
    profile_pik = models.URLField(blank=True, null=True)
    phone_number = models.CharField(max_length=100, blank=True, null=True)
    address = models.TextField(blank=True, null=True)


class Collection(BaseModel):
    collection_name = models.CharField(max_length=640)

    def __str__(self):
        return self.collection_name


class AuctionList(BaseModel):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=64)
    sub_title = models.CharField(max_length=504, null=True, blank=True)
    hashrate = models.CharField(max_length=104, null=True, blank=True)
    location = models.CharField(max_length=104, null=True, blank=True)
    current_hash_price = models.CharField(max_length=64, null=True, blank=True)
    days_of_mining = models.CharField(max_length=104, null=True, blank=True)
    hours_per_day = models.CharField(max_length=104, null=True, blank=True)
    power_source = models.CharField(max_length=204, null=True, blank=True)
    asic_model = models.CharField(max_length=204, null=True, blank=True)
    terms_link = models.CharField(max_length=1504, null=True, blank=True)
    desc = RichTextField(null=True, blank=True)  # CharField cannot be left without giving a max_length, Textfield can
    starting_bid = models.IntegerField()
    auction_start_date = models.DateTimeField(blank=True, null=True)
    expiry_at = models.DateTimeField(default=timezone.now)
    is_expired = models.BooleanField(default=False)
    category = models.ForeignKey(Collection, on_delete=models.CASCADE, null=True, blank=True)
    proxy_increement = models.IntegerField(default=2)

    site_photo = models.FileField(upload_to='images', null=True, blank=True, max_length=800)

    profile_image_1 = models.FileField(upload_to='images', null=True, blank=True, max_length=800)
    profile_image_2 = models.FileField(upload_to='images', null=True, blank=True, max_length=800)
    profile_image_3 = models.FileField(upload_to='images', null=True, blank=True, max_length=800)

    live_feed_image = models.FileField(upload_to='images', null=True, blank=True, max_length=800)

    hash_price_image = models.FileField(upload_to='images', null=True, blank=True, max_length=800)

    active_bool = models.BooleanField(default=True)
    auction_status = models.CharField(max_length=100, default='enabled')
    slug_category = models.SlugField(default='', editable=False, null=True, blank=True, max_length=250)

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        value = self.title[0:250]
        self.slug_category = slugify(value, allow_unicode=True)
        super().save(*args, **kwargs)


class ProxyBids(BaseModel):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    auction_list = models.ForeignKey(AuctionList, on_delete=models.CASCADE, null=True, blank=True)
    maximum_amount = models.IntegerField(default=0)
    history_values = models.TextField(default="")


class Bids(BaseModel):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    auction_list = models.ForeignKey(AuctionList, on_delete=models.CASCADE, blank=True, null=True)
    bid = models.IntegerField()
    is_proxy = True
    max_proxy_amount = 100


class Comments(BaseModel):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    comment = models.TextField()
    auction_list = models.ForeignKey(AuctionList, on_delete=models.CASCADE, blank=True, null=True)


class WatchList(BaseModel):
    watch_list = models.ForeignKey(AuctionList, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)


class AuctionResult(BaseModel):
    auction = models.ForeignKey(AuctionList, on_delete=models.CASCADE)
    position = models.IntegerField(default=0)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    bid_price = models.IntegerField(default=0)
    is_winner = models.BooleanField(default=0)

# class Winner(BaseModel):
#     auction_result = models.ForeignKey(AuctionResult, on_delete=models.CASCADE)
#     auction = models.ForeignKey(AuctionResult, on_delete=models.CASCADE)
#     user = models.ForeignKey(User, on_delete=models.CASCADE)
#     bid_price = models.IntegerField(default=0)
