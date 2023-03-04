from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils import timezone
from ckeditor.fields import RichTextField
from django.utils.text import slugify

import uuid
# AUCTION_TYPES = (
#     ('I', 'Immediate delivery'),
#     ('F', 'Forward date'),
#     ('U', 'Upfront payment'),
# )


class BaseModel(models.Model):
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(
        null=True, blank=True, auto_now=True, editable=True)
    deleted = models.BooleanField(default=False)
    version = models.CharField(default='v1', max_length=10)


class Coupons(BaseModel):
    code = models.CharField(max_length=200)

    def __str__(self):
        return "Coupons " + str(self.id) + " - " + self.code

    class Meta:
        verbose_name = "Coupons"
        verbose_name_plural = "Coupons"


class Payment(BaseModel):
    payment_status = models.CharField(max_length=100)
    transaction_id = models.TextField()
    extra_info = models.JSONField(blank=True, null=True)

    def __str__(self):
        return "Payment " + str(self.transaction_id) + " - " + self.payment_status

    class Meta:
        verbose_name = "Payment"
        verbose_name_plural = "Payments"


class User(AbstractUser):
    payment = models.ForeignKey(
        Payment, blank=True, null=True, on_delete=models.CASCADE)
    is_paid = models.BooleanField(default=False)
    coupon = models.ForeignKey(
        Coupons, blank=True, null=True, on_delete=models.CASCADE)
    is_coupon_used = models.BooleanField(default=False)
    profile_pik = models.URLField(
        blank=True, null=True, default="https://auctions.rigly.io/media/auction_profile_images/profile_dummy.jpg")
    uploaded_profile = models.ImageField(
        upload_to='images/user_profile_images', null=True, blank=True)
    bidding_name = models.CharField(max_length=1000, default="Anonymous")
    phone_number = models.CharField(max_length=100, blank=True, null=True)
    address = models.TextField(blank=True, null=True)
    newsletter_subscribe = models.BooleanField(default=True)
    telegram_username = models.CharField(
        max_length=1000, blank=True, null=True)
    mining_pool_stratum_address = models.TextField(blank=True, null=True)
    mining_pool_username = models.CharField(
        max_length=1000, blank=True, null=True)
    refer_code = models.CharField(
        max_length=100, blank=True, null=True, default=uuid.uuid4().hex[:10].upper())
    referral_code = models.CharField(max_length=100, blank=True, null=True)

    def __str__(self):
        return "User " + str(self.id) + " - " + self.email

    class Meta:
        verbose_name = "User"
        verbose_name_plural = "Users"


class Collection(BaseModel):
    collection_name = models.CharField(max_length=640)

    def __str__(self):
        return self.collection_name

    class Meta:
        verbose_name = "Collection"
        verbose_name_plural = "Collections"


class AuctionMetaData(models.Model):
    profile_image_1 = models.FileField(
        upload_to='auction_profile_images', null=True, blank=True, max_length=800)
    profile_image_2 = models.FileField(
        upload_to='auction_profile_images', null=True, blank=True, max_length=800)
    profile_image_3 = models.FileField(
        upload_to='auction_profile_images', null=True, blank=True, max_length=800)
    site_photo = models.FileField(
        upload_to='auction_profile_images', null=True, blank=True, max_length=800)
    live_feed_image = models.FileField(
        upload_to='auction_profile_images', null=True, blank=True, max_length=800)
    hash_price_image = models.FileField(
        upload_to='auction_profile_images', null=True, blank=True, max_length=800)
    power_source = models.CharField(max_length=204, null=True, blank=True)
    asic_model = models.CharField(max_length=204, null=True, blank=True)
    terms_link = models.CharField(max_length=1504, null=True, blank=True)
    hashrate = models.CharField(max_length=104, null=True, blank=True)
    location = models.CharField(max_length=104, null=True, blank=True)
    current_hash_price = models.CharField(max_length=64, null=True, blank=True)
    days_of_mining = models.CharField(max_length=104, null=True, blank=True)
    hours_per_day = models.CharField(max_length=104, null=True, blank=True)

    # def __str__(self):
    #     return self.id

    class Meta:
        verbose_name = "Auction Meta Data"
        verbose_name_plural = "Auctions Meta Data"


class AuctionType(models.Model):
    type = models.CharField(max_length=100, default='Immediate delivery')
    percentage = models.IntegerField(default=100)

    def __str__(self):
        return self.type + " - Percentage : " + str(self.percentage) + "%"


class AuctionList(BaseModel):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=64)
    sub_title = models.CharField(max_length=504, null=True, blank=True)
    description = RichTextField(null=True,
                                blank=True)  # CharField cannot be left without giving a max_length, Textfield can
    starting_bid = models.IntegerField()
    auction_start_date = models.DateTimeField(blank=True, null=True)
    expiry_at = models.DateTimeField(default=timezone.now)
    is_expired = models.BooleanField(default=False)
    category = models.ForeignKey(
        Collection, on_delete=models.CASCADE, null=True, blank=True)
    proxy_increement = models.IntegerField(default=2)
    is_auction_active = models.BooleanField(default=True)
    auction_status = models.CharField(max_length=100, default='enabled')
    slug_category = models.SlugField(
        default='', editable=False, null=True, blank=True, max_length=250)
    auction_type = models.ForeignKey(
        AuctionType, on_delete=models.CASCADE, blank=True, null=True)
    payment_address = models.CharField(max_length=500, blank=True, null=True)
    payment_address_qr = models.FileField(
        upload_to='payment_qr', null=True, blank=True, max_length=800)
    auction_meta = models.ForeignKey(
        AuctionMetaData, on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return str(self.id) + " - " + self.title

    class Meta:
        verbose_name = "Auction"
        verbose_name_plural = "Auctions"

    def save(self, *args, **kwargs):
        value = self.title[0:250]
        self.slug_category = slugify(value, allow_unicode=True)
        super().save(*args, **kwargs)


class ProxyBids(BaseModel):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    auction_list = models.ForeignKey(
        AuctionList, on_delete=models.CASCADE, null=True, blank=True)
    maximum_amount = models.BigIntegerField(default=0)
    history_values = models.TextField(default="")

    def __str__(self):
        return self.auction_list.title + " - " + self.user.first_name

    class Meta:
        verbose_name = "Proxy Bide"
        verbose_name_plural = "Proxy Bids"


class Bids(BaseModel):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    auction_list = models.ForeignKey(
        AuctionList, on_delete=models.CASCADE, blank=True, null=True)
    bid = models.BigIntegerField()
    is_proxy = True
    max_proxy_amount = 100

    def __str__(self):
        return self.auction_list.title + " - " + self.user.first_name

    class Meta:
        verbose_name = "Bide"
        verbose_name_plural = "Bids"


class AuctionResult(BaseModel):
    auction = models.ForeignKey(AuctionList, on_delete=models.CASCADE)
    position = models.IntegerField(default=0)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    bid_price = models.BigIntegerField(default=0)
    is_winner = models.BooleanField(default=0)

    def __str__(self):
        return self.auction.title + " - " + self.user.first_name + " - Winner : " + str(self.is_winner)

    class Meta:
        verbose_name = "Auction Result"
        verbose_name_plural = "Auction Results"


class Order(BaseModel):
    class OrderStatus(models.TextChoices):
        UNPAID = 'unpaid'
        PARTIALLY_PAID = 'partial'
        PAID = 'paid'
    user = models.ForeignKey(User, on_delete=models.PROTECT)
    auction = models.ForeignKey(AuctionList, on_delete=models.PROTECT)
    price = models.BigIntegerField()
    total = models.BigIntegerField()
    mining_deposit = models.BigIntegerField()
    auction_fee = models.BigIntegerField()
    status = models.CharField(
        max_length=7,
        choices=OrderStatus.choices,
        default=OrderStatus.UNPAID,
    )


class OrderPayment(models.Model):
    class OrderPaymentStatus(models.TextChoices):
        PROCESSING = 'processing'
        PAID = 'paid'
    order = models.ForeignKey(Order, on_delete=models.PROTECT)
    payment_id = models.TextField(null=True)
    original_amount = models.BigIntegerField()
    amount = models.BigIntegerField()
    promo_code = models.TextField(null=True)
    status = models.CharField(
        max_length=10,
        choices=OrderPaymentStatus.choices,
        default=OrderPaymentStatus.PROCESSING,
    )
