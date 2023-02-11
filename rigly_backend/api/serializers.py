from rest_framework import serializers
# from rest_framework import users # remove this
from django.contrib.auth import get_user_model  # add this

from .models import *
from auctions.models import AuctionList, User, Bids
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


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


class BidsSerializer(serializers.ModelSerializer):
    user = UserSerializer()

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
