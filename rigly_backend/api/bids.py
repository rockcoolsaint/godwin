import json
import os
from datetime import datetime

from django.db.models import Max
from django.template.loader import render_to_string

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from api.permissions import ValidateAuth0TokenPermission
from auctions import config
from auctions.models import Bids, AuctionList, ProxyBids
from commerce.settings import BASE_DIR
from .serializers import BidsSerializer, BidHistorySerializer
from .utils import send_rigly_emails, minbid
import threading


def send_outbid_email(user, win_bid_obj, outbid_obj):
    path = os.path.join(BASE_DIR, 'auctions/templates/auction_email_templates/')
    html_message = render_to_string(path + 'after_being_outbid.html',
                                    {"your_bid": outbid_obj.bid, "customer_name": user.username,
                                     "product_name": win_bid_obj.auction_list.title,
                                     "currency": config.CURRENCY,
                                     "frontend_domain_url": config.FRONTEND_END_URL,
                                     "product_handle": win_bid_obj.auction_list.slug_category})
    subject = "Oops! You have been outbid"
    to_email = [user.email]
    send_rigly_emails(subject, to_email, '', html_message)


def send_bid_place_email(user, bid_obj):
    path = os.path.join(BASE_DIR, 'auctions/templates/auction_email_templates/')
    html_message = render_to_string(path + 'bid_placed_successfully.html',
                                    {"customer_name": user.username, "product_name": bid_obj.auction_list.title,
                                     "currency": config.CURRENCY, "base_price": bid_obj.auction_list.starting_bid,
                                     "bid_amount": bid_obj.bid, "frontend_domain_url": config.FRONTEND_END_URL,
                                     "product_handle": bid_obj.auction_list.slug_category})
    subject = "Congratulations! Your Bid Is Placed Successfully"
    to_email = [user.email]
    send_rigly_emails(subject, to_email, '', html_message)


def send_proxy_bid_place_email(user, bid_obj):
    path = os.path.join(BASE_DIR, 'auctions/templates/auction_email_templates/')
    html_message = render_to_string(path + 'after_customer_proxy_bid.html',
                                    {"customer_name": user.username, "product_name": bid_obj.auction_list.title,
                                     "currency": config.CURRENCY, "base_price": bid_obj.auction_list.starting_bid,
                                     "proxy_bid": bid_obj.bid, "frontend_domain_url": config.FRONTEND_END_URL,
                                     "product_handle": bid_obj.auction_list.slug_category})
    subject = "Congratulations! Your Automatic Bid Is Placed Successfully"
    to_email = [user.email]
    send_rigly_emails(subject, to_email, '', html_message)


class AutomaticBidsList(APIView):
    permission_classes = [ValidateAuth0TokenPermission]

    def place_automatic_bid(self, max_proxy_amount, auction_id):
        auction_obj = AuctionList.objects.get(id=auction_id)
        if not auction_obj.is_auction_active:
            return {"status": "Auction Not Active"}, status.HTTP_400_BAD_REQUEST
        proxy_bid_obj, crt = ProxyBids.objects.get_or_create(auction_list=auction_obj,
                                                             user=self.request.user
                                                             )

        proxy_bid_obj.history_values += str(max_proxy_amount) + "\n"
        proxy_bid_obj.maximum_amount = max_proxy_amount
        if not crt:
            proxy_bid_obj.updated_at = datetime.now()
        proxy_bid_obj.save()

        bids_present = Bids.objects.filter(auction_list__id=auction_id)
        current_bid, bid_obj = minbid(proxy_bid_obj.auction_list.starting_bid, bids_present)

        # print(bid_obj, bid_obj.user.username, "*****bid obj*********")

        # case 1 if multiple proxy bids are present and greater than current bid
        all_proxy_objs = ProxyBids.objects.filter(maximum_amount__gt=current_bid, auction_list__id=auction_id).order_by('maximum_amount')
        all_proxy_bids = all_proxy_objs.values_list(
            'maximum_amount', flat=True)
        list_of_proxy_bids = list(all_proxy_bids)

        # CASE : check present bid > max val
        if len(all_proxy_bids) > 1:
            second_max_value = list_of_proxy_bids[-2]
            max_value = list_of_proxy_bids[-1]
            print('*' * 50)
            print(all_proxy_bids, second_max_value, max_value)
            new_bid_amount = second_max_value + auction_obj.proxy_increement
            top_bidder_obj = all_proxy_objs.last()
            user = top_bidder_obj.user
        elif len(all_proxy_bids) == 1:
            max_value = list_of_proxy_bids[-1]
            new_bid_amount = current_bid + auction_obj.proxy_increement
            top_bidder_obj = all_proxy_objs.first()
            user = top_bidder_obj.user
        else:
            new_bid_amount = current_bid
            user = self.request.user
            top_bidder_obj = None

        if top_bidder_obj is not None:
            if new_bid_amount > max_value:
                new_bid_amount = max_value
                top_bidder_obj = all_proxy_objs.last()
                user = top_bidder_obj.user

            # case - when max value user is same as current user
            if bid_obj.user == self.request.user:
                pass
            else:
                new_bid = Bids(user=user, auction_list=auction_obj, bid=new_bid_amount)
                new_bid.save()
                # send_proxy_bid_place_email(user, new_bid)
                t = threading.Thread(target=send_proxy_bid_place_email,
                                     args=(user, new_bid), kwargs={},
                                     daemon=True)
                t.start()
                bids_present_check = Bids.objects.filter(auction_list__id=auction_id).order_by('bid')
                second_max_bid_obj = list(bids_present_check)[-2]
                # send_outbid_email(second_max_bid_obj.user, top_bidder_obj, second_max_bid_obj)
                t = threading.Thread(target=send_outbid_email,
                                     args=(second_max_bid_obj.user, top_bidder_obj, second_max_bid_obj), kwargs={},
                                     daemon=True)
                t.start()
        return {"status": "Saved Successfully", "new_bid_amount": new_bid_amount}, status.HTTP_200_OK

    def post(self, request, format=None):
        body_unicode = request.body.decode('utf-8')
        data = json.loads(body_unicode)
        max_bid_amnt = data["proxy_bid_amnt"]
        auction_id = data["list_id"]
        if request.user.is_paid or request.user.is_coupon_used:
            place_bid_response, status_code = self.place_automatic_bid(max_bid_amnt, auction_id)
            all_bids, current_bid = BidsList().get_all_bids(auction_id)
            bids_serializer = BidsSerializer(all_bids, many=True, context={"request": request})
            return Response(
                {"place_bid_status": place_bid_response, "bids": bids_serializer.data, "current_bid": current_bid},
                status=status_code)
        else:
            return Response({"message": "User status Unpaid"}, status=status.HTTP_200_OK)


class BidsList(APIView):
    """
    List all snippets, or create a new snippet.
    """
    permission_classes = [ValidateAuth0TokenPermission]

    # def get(self, request, format=None):
    #     snippets = Snippet.objects.all()
    #     serializer = SnippetSerializer(snippets, many=True)
    #     return Response(serializer.data)
    def get_bid_history(self, user):
        # user = self.request.user
        try:
            all_bids = Bids.objects.filter(user=user).order_by('-created_at')
            filtered_user_bids = []
            auctions = []
            for bid in all_bids:
                if bid.auction_list.id not in auctions:
                    filtered_user_bids.append(bid)
                    auctions.append(bid.auction_list.id)

            bids_serializer = BidHistorySerializer(filtered_user_bids, many=True)
            return bids_serializer.data
        except:
            return []

    def get_all_bids(self, auction_id):
        auction_obj = AuctionList.objects.get(id=auction_id)
        all_bids = Bids.objects.filter(auction_list=auction_obj)
        current_bid, bid_obj = minbid(auction_obj.starting_bid, all_bids)
        return all_bids, current_bid

    def place_bid(self, bid_amnt, list_id):
        # print('User in Bid')
        # print(self.request.user)
        bids_present = Bids.objects.filter(auction_list__id=list_id)
        startingbid = AuctionList.objects.get(pk=list_id)
        if not startingbid.is_auction_active:
            return {"error": "Auction Not Active"}
        min_req_bid, bid_obj = minbid(startingbid.starting_bid, bids_present)
        message = ""
        if int(bid_amnt) > int(min_req_bid):
            auction_list = AuctionList.objects.get(id=list_id)
            mybid = Bids(user=self.request.user, auction_list=auction_list, bid=bid_amnt)
            mybid.save()
            # send_bid_place_email(self.request.user, mybid)
            t = threading.Thread(target=send_bid_place_email,
                                 args=(self.request.user, mybid), kwargs={},
                                 daemon=True)
            t.start()
            bids_present_check = Bids.objects.filter(auction_list__id=list_id).order_by('bid')
            if len(bids_present_check) > 1:
                second_max_bid_obj = list(bids_present_check)[-2]
                # send_outbid_email(second_max_bid_obj.user, mybid, second_max_bid_obj)
                t = threading.Thread(target=send_outbid_email,
                                     args=(second_max_bid_obj.user, mybid, second_max_bid_obj), kwargs={},
                                     daemon=True)
                t.start()

            # CASE : check if any user has specified maximum amount more than this users amount
            proxy_bid = ProxyBids.objects.filter(auction_list=auction_list).aggregate(Max('maximum_amount'))
            message = "Bid Placed"
            if proxy_bid["maximum_amount__max"] is not None and proxy_bid["maximum_amount__max"] != 0:
                new_bid_amount = auction_list.proxy_increement + int(bid_amnt)
                if new_bid_amount <= proxy_bid["maximum_amount__max"]:
                    proxy_obj = ProxyBids.objects.filter(auction_list=auction_list,
                                                         maximum_amount=proxy_bid["maximum_amount__max"]).first()
                    if proxy_obj.user != self.request.user:
                        # if new_bid_amount == proxy_bid["maximum_amount__max"]
                        new_bid = Bids(user=proxy_obj.user, auction_list=auction_list, bid=new_bid_amount)
                        new_bid.save()
                        # send_proxy_bid_place_email(proxy_obj.user, new_bid)
                        t = threading.Thread(target=send_proxy_bid_place_email,
                                             args=(proxy_obj.user, new_bid), kwargs={},
                                             daemon=True)
                        t.start()
                        bids_present_check = Bids.objects.filter(auction_list__id=list_id).order_by('bid')
                        if len(bids_present_check) > 1:
                            second_max_bid_obj = list(bids_present_check)[-2]

                            # send_outbid_email(second_max_bid_obj.user, new_bid, second_max_bid_obj)
                            t = threading.Thread(target=send_outbid_email,
                                                 args=(second_max_bid_obj.user, new_bid, second_max_bid_obj), kwargs={},
                                                 daemon=True)
                            t.start()

            # return redirect("index")
        else:
            message = f"Sorry, {bid_amnt} is less. It should be more than ${min_req_bid}."

        # print('### ### ' * 20)
        bidid = list_id
        biddesc = AuctionList.objects.get(pk=bidid, is_auction_active=True)
        bids_present = Bids.objects.filter(auction_list=biddesc)
        min_req_bid, bid_obj = minbid(biddesc.starting_bid, bids_present)
        response_data = {
            "present_bid": min_req_bid,
            "message": message
        }

        return response_data

    def post(self, request, format=None):
        body_unicode = request.body.decode('utf-8')
        data = json.loads(body_unicode)
        bid_amnt = data["bid_amnt"]
        auction_id = data["list_id"]
        # print(request.user, "**************")
        if request.user.is_paid or request.user.is_coupon_used:
            place_bid_status = self.place_bid(bid_amnt, auction_id)
            all_bids, current_bid = self.get_all_bids(auction_id)
            bids_serializer = BidsSerializer(all_bids, many=True, context={"request": request})
            return Response(
                {"place_bid_status": place_bid_status, "bids": bids_serializer.data, "current_bid": current_bid},
                status=status.HTTP_200_OK)
        else:
            return Response({"message": "User status Unpaid"}, status=status.HTTP_200_OK)
