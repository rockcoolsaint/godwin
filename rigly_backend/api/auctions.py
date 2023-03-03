from django.http import HttpResponse, JsonResponse
from django.shortcuts import get_object_or_404
from rest_framework import viewsets, status
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.response import Response

from api.bids import BidsList
from api.serializers import ProductSerializer, ProxyDataSerializer, BidsSerializer, ProductMetaSerializer, ProductDetailedSerializer, \
    AuctionResultSerializer
from api.utils import minbid
from auctions.models import AuctionList, Bids, AuctionMetaData, AuctionResult, ProxyBids
from rest_framework.decorators import action


class AuctionViewSet(viewsets.ViewSet, LimitOffsetPagination):
    """
    A simple ViewSet for listing or retrieving users.
    """

    def list(self, request):
        queryset = AuctionList.objects.filter(auction_status='enabled')
        # serializer = ProductSerializer(queryset, many=True)
        page = self.paginate_queryset(queryset, request)
        if page is not None:
            serializer = ProductDetailedSerializer(page, many=True)
            paginated_response = self.get_paginated_response(serializer.data)
        return Response(paginated_response.data, status=status.HTTP_200_OK)

    def retrieve(self, request, pk=None):
        all_bids, current_bid = BidsList().get_all_bids(pk)
        bids_serializer = BidsSerializer(
            all_bids, many=True, context={"request": request})
        return Response({"bids": bids_serializer.data, "current_bid": current_bid})

    @action(detail=False, methods=["GET"])
    def complete_auction_detail(self, request, pk=None):
        product = AuctionList.objects.get(slug_category=pk)
        serializer = ProductDetailedSerializer(
            product, many=False, context={"request": request})

        bids = Bids.objects.filter(
            auction_list=product).order_by('-created_at')
        bids_serializer = BidsSerializer(
            bids, many=True, context={"request": request})
        proxy_bids = ProxyBids.objects.filter(
            auction_list=product).order_by('-created_at')
        proxy_serializer = ProxyDataSerializer(
            proxy_bids, many=True, context={"request": request})
        min_req_bid, current_bid_obj = minbid(product.starting_bid, bids)
        current_bid_serializer = BidsSerializer(
            current_bid_obj, context={"request": request})

        winner_data = {}
        if product.is_expired:
            try:
                winner = AuctionResult.objects.get(
                    auction=product, is_winner=True)
                winner_data = AuctionResultSerializer(
                    winner, many=False, context={"request": request}).data
            except:
                pass

        return JsonResponse(
            {"Product": serializer.data, "Bids": bids_serializer.data, "CurrentBid": current_bid_serializer.data,
             "winner": winner_data, "proxy_bid": proxy_serializer.data})
