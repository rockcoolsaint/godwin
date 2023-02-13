from django.shortcuts import get_object_or_404
from rest_framework import viewsets, status
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.response import Response

from api.bids import BidsList
from api.serializers import ProductSerializer, BidsSerializer
from auctions.models import AuctionList


class AuctionViewSet(viewsets.ViewSet, LimitOffsetPagination):
    """
    A simple ViewSet for listing or retrieving users.
    """

    def list(self, request):
        queryset = AuctionList.objects.filter(auction_status='enabled')
        # serializer = ProductSerializer(queryset, many=True)
        page = self.paginate_queryset(queryset, request)
        if page is not None:
            serializer = ProductSerializer(page, many=True)
            paginated_response = self.get_paginated_response(serializer.data)
        return Response(paginated_response.data, status=status.HTTP_200_OK)

    def retrieve(self, request, pk=None):
        all_bids, current_bid = BidsList().get_all_bids(pk)
        bids_serializer = BidsSerializer(all_bids, many=True, context={"request": request})
        return Response({"bids": bids_serializer.data, "current_bid": current_bid})
