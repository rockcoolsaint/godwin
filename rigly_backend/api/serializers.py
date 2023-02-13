from rest_framework import serializers
# from rest_framework import users # remove this
from django.contrib.auth import get_user_model  # add this

from .models import *
from auctions.models import AuctionList, User, Bids, AuctionResult
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            'id', 'first_name', 'email', 'username', 'last_name', 'is_paid', 'is_coupon_used', 'coupon', 'date_joined',
            'profile_pik', 'phone_number', 'address')


class collectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = AuctionList
        fields = '__all__'


class headerSerializer(serializers.ModelSerializer):
    class Meta:
        model = HeaderData
        fields = '__all__'


class homeSerializer(serializers.ModelSerializer):
    products = serializers.SerializerMethodField()

    class Meta:
        model = HomePageData
        fields = '__all__'

    def get_products(self, instance):
        # Filter using the Auction model instance and the category related_name
        # (which in this case defaults to products_set)
        products_instances = AuctionList.objects.filter(category=instance.show_collection)
        return collectionSerializer(products_instances, many=True, context={"request": self.context['request']}).data


class ProductSerializer(serializers.ModelSerializer):
    current_bid = serializers.SerializerMethodField('get_current_bid')

    class Meta:
        model = AuctionList
        fields = '__all__'

    def get_current_bid(self, obj):
        from api.utils import minbid
        bids_present = Bids.objects.filter(auction_list=obj)
        current_bid, bid_obj = minbid(obj.starting_bid, bids_present)
        return current_bid


class BidsSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Bids
        fields = '__all__'


class ProductHistorySerializer(serializers.ModelSerializer):
    # auction_winner = serializers.SerializerMethodField('get_current_bid')
    user_auction_status = serializers.SerializerMethodField('get_user_auction_status')

    class Meta:
        model = AuctionList
        fields = '__all__'

    def get_user_auction_status(self, obj):
        if obj.is_expired:
            # check current user winner or not
            auction_result = AuctionResult.objects.get(auctions=obj, is_winner=True)
            if auction_result.user == obj.user:
                return "winner"
            else:
                return "looser"
        else:
            return "pending"


class BidHistorySerializer(serializers.ModelSerializer):
    auction_list = ProductHistorySerializer()

    class Meta:
        model = Bids
        fields = '__all__'


class RegisterSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all())]
    )

    password = serializers.CharField(
        write_only=True, required=True, validators=[validate_password])

    class Meta:
        model = User
        fields = ('username', 'password',
                  'email', 'first_name')

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError(
                {"password": "Password fields didn't match."})
        return attrs

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            # last_name=validated_data['last_name']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user
