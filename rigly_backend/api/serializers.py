from rest_framework import serializers
# from rest_framework import users # remove this
from django.contrib.auth import get_user_model # add this

from .models import *
from auctions.models import AuctionList


class collectionSerializer(serializers.ModelSerializer):

    class Meta:
        model = AuctionList
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

    class Meta:
        model = AuctionList
        fields = '__all__'