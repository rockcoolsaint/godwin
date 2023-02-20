from rest_framework import serializers

from .models import *
from auctions.models import AuctionList, User, Bids, AuctionResult, AuctionMetaData, AuctionType


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            'id', 'first_name', 'email', 'username', 'last_name', 'is_paid', 'is_coupon_used', 'coupon', 'date_joined',
            'profile_pik', 'phone_number', 'address')


class HeaderDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = HeaderData
        fields = '__all__'


class HomePageSerializer(serializers.ModelSerializer):
    products = serializers.SerializerMethodField()

    class Meta:
        model = HomePageData
        fields = '__all__'

    def get_products(self, instance):
        products_instances = AuctionList.objects.filter(category=instance.show_collection)
        product_data = ProductDetailedSerializer(products_instances, many=True,
                                                 context={"request": self.context['request']}).data
        return product_data


class ProductMetaSerializer(serializers.ModelSerializer):
    class Meta:
        model = AuctionMetaData
        fields = '__all__'


class AuctionResultSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = AuctionResult
        fields = '__all__'


class ProductTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = AuctionType
        fields = '__all__'


class ProductDetailedSerializer(serializers.ModelSerializer):
    auction_meta = ProductMetaSerializer()
    auction_type = ProductTypeSerializer()
    bid_count = serializers.SerializerMethodField('get_bid_count')
    current_bid = serializers.SerializerMethodField('get_current_bid')

    class Meta:
        model = AuctionList
        fields = '__all__'

    def get_current_bid(self, obj):
        """
        getting current bid for current auction and appending with that auction instance
        :param obj:
        :return:
        """
        from api.utils import minbid
        bids_present = Bids.objects.filter(auction_list=obj)
        current_bid, bid_obj = minbid(obj.starting_bid, bids_present)
        return current_bid

    def get_bid_count(self, obj):
        """
        getting current bid for current auction and appending with that auction instance
        :param obj:
        :return:
        """
        bid_count = Bids.objects.filter(auction_list=obj).count()
        return bid_count


class ProductSerializer(serializers.ModelSerializer):
    current_bid = serializers.SerializerMethodField('get_current_bid')

    class Meta:
        model = AuctionList
        fields = '__all__'

    def get_current_bid(self, obj):
        """
        getting current bid for current auction and appending with that auction instance
        :param obj:
        :return:
        """
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
        """
        Appending auction result status for current user
        :param obj:
        :return:
        """
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
