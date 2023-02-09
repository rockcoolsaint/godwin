from django.shortcuts import render

from rest_framework.response import Response
from rest_framework.decorators import api_view

from .models import *
from auctions.models import AuctionList
from .serializers import *

# Create your views here.
@api_view(['GET'])
def HomePage(request):
    home1 = HomePageData.objects.all()
    serializer = homeSerializer(home1, many = True, context={"request": request})
    return Response(serializer.data)


@api_view(['GET'])
def ProductApi(request, pk):
    product = AuctionList.objects.get(slug_category=pk)
    serializer = ProductSerializer(product, many=False, context={"request": request})
    return Response(serializer.data)
