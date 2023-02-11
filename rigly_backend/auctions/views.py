import datetime
import os

from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render, redirect
from django.template.loader import render_to_string
from django.urls import reverse

from api.utils import minbid, send_rigly_emails
from commerce.settings import BASE_DIR
from . import config
from .models import *
from django.contrib.auth.decorators import login_required
from django.contrib import messages
import json
from rest_framework import status
from django.db.models import Max


def index(request):
    # print('***'*20)
    # print(request.session.get("user"))
    print(request.user, "**************")
    import http.client

    conn = http.client.HTTPSConnection("")

    headers = {
        'authorization': "Bearer eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIiwiaXNzIjoiaHR0cHM6Ly9kZXYtanBwenAycXdjdGcyOGhibS51cy5hdXRoMC5jb20vIn0..iWNJLwBzI1pYuRjF.2eFNq9haeDoZ5oRaPcz4aCR3bmD5lpFUarefnzTOoM6IgcSs9BlIPDEx-_gU6nckI5VIZruYLutWbotK7surA_i_vWeGXBVAF3V2QvYoQvRy-TEt0vqiIlC_PzhR2-mBOWCjVjR5L7eZGQr1X22WOVcPpwXj9fGxagri57urPawwOfRLOCCB_44gWv6PXI3-2m_4q_lmoFy3OFS6lq1t_UKeJJogDNqdsA0_JO0p46EJEvJ_6I5ywjv1Yckkq__ONro5kwxUx5ofk7bDOdBbjzeszHUGrxKUH3RExLlruBvW8IIGf-WeCfzX8dsXegv47eAlstNVbR6TqhpYRFFxAsPT.3fDMT-cC4FXpL0bm2v8FRA"}

    conn.request("GET", "/{config.AUTH0_DOMAIN}/api/v2/users?search_engine=v3", headers=headers)

    res = conn.getresponse()
    data = res.read()

    print(data.decode("utf-8"))
    return render(request, "auctions/index.html", {
        "a1": AuctionList.objects.filter(active_bool=True),
    })


@login_required(login_url='login')
def create(request):
    if request.method == "POST":
        m = AuctionList()
        m.user = request.user
        m.title = request.POST["create_title"]
        m.desc = request.POST["create_desc"]
        m.starting_bid = request.POST["create_initial_bid"]
        m.image_url = request.POST["img_url"]
        m.category = request.POST["category"]
        # m = AuctionList(title = title, desc=desc, starting_bid = starting_bid, image_url = image_url, category = category)
        m.save()
        return redirect("index")
    return render(request, "auctions/create.html")


def listingpage(request, bidid):
    biddesc = AuctionList.objects.get(pk=bidid, active_bool=True)
    bids_present = Bids.objects.filter(auction_list__id=bidid)

    bids_present = Bids.objects.filter(auction_list=biddesc)
    present_bid, bid_obj = minbid(biddesc.starting_bid, bids_present)

    return render(request, "auctions/listingpage.html", {
        "list": biddesc,
        "present_bid_detail": bid_obj,
        "comments": Comments.objects.filter(auction_list__id=bidid),
        "present_bid": present_bid,
    })


def check_proxy_and_create_bid(max_proxy_amount, auction_obj, present_bid, user):
    max_proxy_amount = int(max_proxy_amount)
    proxy_increement = auction_obj.proxy_increement

    proxy_bid = ProxyBids.objects.filter(auction_list=auction_obj).aggregate(Max('maximum_amount'))

    print('**/**' * 5)
    # print(proxy_bid["maximum_amount__max"] is not None and proxy_bid["maximum_amount__max"] != 0)
    # print(proxy_increement)
    # print(proxy_bid["maximum_amount__max"])

    if proxy_bid["maximum_amount__max"] is not None and proxy_bid["maximum_amount__max"] != 0:
        if max_proxy_amount < proxy_bid["maximum_amount__max"]:
            print("in new case")
            # Or CASE 2 : current user maximum amount less than overall max amount
            new_bid_amount = max_proxy_amount + proxy_increement
        else:
            new_bid_amount = proxy_increement + proxy_bid["maximum_amount__max"]
        proxy_obj = ProxyBids.objects.filter(auction_list=auction_obj,
                                             maximum_amount=proxy_bid["maximum_amount__max"]).first()
    else:
        print("in else")
        new_bid_amount = proxy_increement + present_bid
        proxy_obj = None

    saved = 0
    if proxy_obj is not None:
        print("proxy obj is not None case")
        if max_proxy_amount < proxy_bid["maximum_amount__max"]:
            mybid = Bids(user=proxy_obj.user, auction_list=auction_obj, bid=new_bid_amount)
            mybid.save()
            saved = 1
        # CASE: for same user icreasing proxy max but auction winner is already him
        elif proxy_obj.user != user:
            # Create Bid
            mybid = Bids(user=user, auction_list=auction_obj, bid=new_bid_amount)
            mybid.save()
            saved = 1

    print("new id amount", new_bid_amount, "max amount proxy", proxy_bid["maximum_amount__max"])
    # print(proxy_obj.__dict__, "**********************")
    print('**/**' * 5)

    if new_bid_amount > int(max_proxy_amount):
        return 0, "Amount limit exceeds"

    if not saved and proxy_obj is None:
        mybid = Bids(user=user, auction_list=auction_obj, bid=new_bid_amount)
        mybid.save()
        saved = 1

    if not saved:
        return 0, "Current user trying to place automatic bid but he has the current bid so no new bid"

    return new_bid_amount, "Success"


def save_proxy_amount(request):
    auction_id = request.POST.get("auction_id")
    max_proxy_amount = request.POST.get("proxy_amount")
    auction_obj = AuctionList.objects.get(id=auction_id)
    if not auction_obj.active_bool:
        return HttpResponse(json.dumps({"status": "Auction Not Active"}),
                            content_type="application/json", status=status.HTTP_400_BAD_REQUEST)
    proxy_bid_obj, crt = ProxyBids.objects.get_or_create(auction_list=auction_obj,
                                                         user=request.user
                                                         )

    proxy_bid_obj.history_values += str(max_proxy_amount) + "\n"
    proxy_bid_obj.maximum_amount = max_proxy_amount
    if not crt:
        proxy_bid_obj.updated_at = datetime.datetime.now()
    proxy_bid_obj.save()

    bids_present = Bids.objects.filter(auction_list__id=auction_id)
    current_bid, bid_obj = minbid(proxy_bid_obj.auction_list.starting_bid, bids_present)

    print(bid_obj, bid_obj.user.username, "*****bid obj*********")

    # case 1 if multiple proxy bids are present and greater than current bid
    all_proxy_objs = ProxyBids.objects.filter(maximum_amount__gt=current_bid).order_by('maximum_amount')
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
        user = request.user
        top_bidder_obj = None

    if top_bidder_obj is not None:
        if new_bid_amount > max_value:
            new_bid_amount = max_value
            top_bidder_obj = all_proxy_objs.last()
            user = top_bidder_obj.user

        # case - when max value user is same as current user
        print(user, user.username, "*******usre*******")
        if bid_obj.user == request.user:
            pass
        else:
            new_bid = Bids(user=user, auction_list=auction_obj, bid=new_bid_amount)
            new_bid.save()

    return HttpResponse(json.dumps({"status": "Saved Successfully", "new_bid_amount": new_bid_amount}),
                        content_type="application/json", status=status.HTTP_200_OK)

    # if present_bid > int(max_proxy_amount):
    #     message = f"Sorry, {max_proxy_amount} is less. It should be more than ${present_bid}."
    #     return HttpResponse(json.dumps({"Error": message}), content_type="application/json",
    #                         status=status.HTTP_400_BAD_REQUEST)
    # else:
    #     new_bid_amount, response_msg = check_proxy_and_create_bid(max_proxy_amount, auction_obj,
    #                                                               present_bid,
    #                                                               request.user)
    #
    #     if response_msg is not "Success":
    #         proxy_bid_obj.history_values += str(max_proxy_amount) + "\n"
    #         proxy_bid_obj.maximum_amount = max_proxy_amount
    #         if not crt:
    #             proxy_bid_obj.updated_at = datetime.datetime.now()
    #         proxy_bid_obj.save()
    #
    #         return HttpResponse(json.dumps({"Error": response_msg}), content_type="application/json",
    #                             status=status.HTTP_400_BAD_REQUEST)
    #
    # proxy_bid_obj.history_values += str(max_proxy_amount) + "\n"
    # proxy_bid_obj.maximum_amount = max_proxy_amount
    # if not crt:
    #     proxy_bid_obj.updated_at = datetime.datetime.now()
    # proxy_bid_obj.save()
    #
    # return HttpResponse(json.dumps({"status": "Saved Successfully", "new_bid_amount": new_bid_amount}),
    #                     content_type="application/json", status=status.HTTP_200_OK)


@login_required(login_url='login')
def watchlistpage(request, username):
    # present_w = WatchList.objects.get(user = "username")
    list_ = WatchList.objects.filter(user=username)
    return render(request, "auctions/WatchList.html", {
        "user_watchlist": list_,
    })


@login_required(login_url='login')
def addwatchlist(request):
    nid = request.GET["listid"]

    # below line of code will select a table of watchlist that has my name, then
    # when we loop in this watchlist, there r two fields present, to browse watch_list 
    # watch_list.id == AuctionList.id, similar for all

    list_ = WatchList.objects.filter(user=request.user)

    # when you below line, you shld convert id to int inorder to compare or else == wont work

    for items in list_:
        if int(items.watch_list.id) == int(nid):
            return watchlistpage(request, request.user)

    newwatchlist = WatchList(watch_list=AuctionList.objects.get(pk=nid), user=request.user)
    newwatchlist.save()
    # this message remains untill u reload
    messages.success(request, "Item added to watchlist")

    return listingpage(request, nid)


@login_required(login_url='login')
def deletewatchlist(request):
    rm_id = request.GET["listid"]
    list_ = WatchList.objects.get(pk=rm_id)

    # this message remains untill u reload
    messages.success(request, f"{list_.watch_list.title} is deleted from your WatchList.")
    list_.delete()

    # you cannot call a fuction  from views as a return value
    return redirect("index")


def get_present_bid(request, auction_id):
    bids_query = Bids.objects.filter(auction_list__id=auction_id)
    max_bids_present = bids_query.aggregate(Max("bid"))
    bids_obj = bids_query.filter(bid=max_bids_present["bid__max"]).values('bid', 'user__username')
    return HttpResponse(json.dumps({"data": bids_obj[0]}), content_type="application/json")


@login_required(login_url='login')
def bid(request):
    bid_amnt = request.GET["bid_amnt"]
    list_id = request.GET["list_d"]
    source = request.GET["source"]
    # print('*'*20)
    # print(source)
    bids_present = Bids.objects.filter(auction_list__id=list_id)
    startingbid = AuctionList.objects.get(pk=list_id)
    if not startingbid.active_bool:
        return HttpResponse(json.dumps({"status": "Auction Not Active"}),
                            content_type="application/json", status=status.HTTP_400_BAD_REQUEST)
    min_req_bid, bid_obj = minbid(startingbid.starting_bid, bids_present)
    message = ""
    print(min_req_bid, "min req bid")
    if int(bid_amnt) > int(min_req_bid):
        auction_list = AuctionList.objects.get(id=list_id)
        mybid = Bids(user=request.user, auction_list=auction_list, bid=bid_amnt)
        mybid.save()

        # CASE : check if any user has specified maximum amount more than this users amount
        print("checking case *******************8")
        proxy_bid = ProxyBids.objects.filter(auction_list=auction_list).aggregate(Max('maximum_amount'))
        messages.success(request, "Bid Placed")
        message = "Bid Placed"
        print("Proxy amount: ", proxy_bid)
        if proxy_bid["maximum_amount__max"] is not None and proxy_bid["maximum_amount__max"] != 0:
            new_bid_amount = auction_list.proxy_increement + int(bid_amnt)
            if new_bid_amount <= proxy_bid["maximum_amount__max"]:
                print("creating new bid for another user")
                proxy_obj = ProxyBids.objects.filter(auction_list=auction_list,
                                                     maximum_amount=proxy_bid["maximum_amount__max"]).first()
                if proxy_obj.user != request.user:
                    # if new_bid_amount == proxy_bid["maximum_amount__max"]
                    new_bid = Bids(user=proxy_obj.user, auction_list=auction_list, bid=new_bid_amount)
                    new_bid.save()
        # return redirect("index")
    else:
        message = f"Sorry, {bid_amnt} is less. It should be more than ${min_req_bid}."

    if source == "list_page":
        # print('### ### ' * 20)
        bidid = list_id
        biddesc = AuctionList.objects.get(pk=bidid, active_bool=True)
        bids_present = Bids.objects.filter(auction_list=biddesc)
        min_req_bid, bid_obj = minbid(biddesc.starting_bid, bids_present)
        response_data = {
            "present_bid": min_req_bid,
            "message": message
        }
        return HttpResponse(json.dumps(response_data), content_type="application/json")

    messages.warning(request, f"Sorry, {bid_amnt} is less. It should be more than {min_req_bid}$.")
    return listingpage(request, list_id)


# shows comments made by different user and allows to add comments
@login_required(login_url='login')
def allcomments(request):
    comment = request.GET["comment"]
    username = request.user.username
    list_id = request.GET["listid"]
    new_comment = Comments(user=username, comment=comment, auction_list__id=list_id)
    new_comment.save()
    return listingpage(request, list_id)


# shows message abt winner when bid is closed
def win_ner(request):
    bid_id = request.GET["listid"]
    bids_present = Bids.objects.filter(auction_list__id=bid_id)
    biddesc = AuctionList.objects.get(pk=bid_id, active_bool=True)
    max_bid, bid_obj = minbid(biddesc.starting_bid, bids_present)
    try:
        # checks if anyone other than list_owner win the bid
        winner_object = Bids.objects.get(bid=max_bid, auction_list__id=bid_id)
        winner_obj = AuctionList.objects.get(id=bid_id)
        win = Winner(bid_win_list=winner_obj, user=winner_object.user)
        winners_name = winner_object.user

    except:
        # if no-one placed a bid, and if bid is closed by list_owner, owner wins the bid
        winner_obj = AuctionList.objects.get(starting_bid=max_bid, id=bid_id)
        win = Winner(bid_win_list=winner_obj, user=winner_obj.user)
        winners_name = winner_obj.user

    # Check Django Documentary for Updating attributes based on existing fields.
    biddesc.active_bool = False
    biddesc.save()

    # saving winner details
    win.save()
    messages.success(request, f"{winners_name} won {win.bid_win_list.title}.")
    return redirect("index")


# checks winner
def winnings(request):
    try:
        your_win = Winner.objects.filter(user=request.user)
    except:
        your_win = None

    return render(request, "auctions/winnings.html", {
        "user_winlist": your_win,
    })


# shows lists that are present in a specific category
def cat(request, category_name):
    category = AuctionList.objects.filter(category=category_name)
    return render(request, "auctions/index.html", {
        "a1": category,
    })


# shows all categories in which object is listed
def cat_list(request):
    # unlike filter that takes a values of object_name in model, to
    # display objectname use .values('name of section from your object')
    # and when you add distinct() along with it
    # it shows only unique names, omits duplicates

    category_present = AuctionList.objects.values('category').distinct()
    return render(request, "auctions/category.html", {
        "cat_list": category_present,
    })


def send_winner_email(user, win_bid_obj, to_email):
    path = os.path.join(BASE_DIR, 'auctions/templates/auction_email_templates/')
    html_message = render_to_string(path + 'after_win.html',
                                    {"customer_name": user.username, "product_name": win_bid_obj.auction_list.title,
                                     "currency": config.CURRENCY, "base_price": win_bid_obj.auction_list.starting_bid,
                                     "bid_amount": win_bid_obj.bid, "frontend_domain_url": config.FRONTEND_END_URL,
                                     "product_handle": win_bid_obj.auction_list.slug_category})
    subject = "Congratulations! You Win Auction - " + win_bid_obj.auction_list.title
    send_rigly_emails(subject, to_email, '', html_message)


def send_auction_loosing_email(user, loose_bid_obj, highest_bid, to_email):
    path = os.path.join(BASE_DIR, 'auctions/templates/auction_email_templates/')
    html_message = render_to_string(path + 'courtesy_email.html',
                                    {"customer_name": user.username, "product_name": loose_bid_obj.auction_list.title,
                                     "currency": config.CURRENCY, "base_price": loose_bid_obj.auction_list.starting_bid,
                                     "bid_amount": loose_bid_obj.bid, "frontend_domain_url": config.FRONTEND_END_URL,
                                     "product_handle": loose_bid_obj.auction_list.slug_category,
                                     "highest_bid": highest_bid})
    subject = "Sorry! You Loose Auction - " + loose_bid_obj.auction_list.title
    send_rigly_emails(subject, to_email, '', html_message)


def announce_winner_and_add_auction_results(auction_obj):
    all_auction_bids = Bids.objects.filter(auction_list=auction_obj).order_by("-bid")

    position_list = []
    looser = []
    winner = []
    position_count = 0
    highest_bid = 0
    for bid_obj in all_auction_bids:
        if bid_obj.user.username in position_list:
            pass
        else:

            position_list.append(bid_obj.user.username)
            position_count += 1
            if position_count == 1:
                is_winner = 1
                highest_bid = bid_obj.bid
                winner.append(bid_obj.user.email)
            else:
                is_winner = 0
                looser.append(bid_obj.user.email)
            AuctionResult.objects.create(auction=auction_obj, position=position_count, user=bid_obj.user,
                                         bid_price=bid_obj.bid, is_winner=is_winner)
    # send_winner_email(bid_obj, winner)
    # send_auction_loosing_email(bid_obj, looser)


def on_auction_expiry(expired_auctions):
    for auction_obj in expired_auctions:
        is_already_expired = auction_obj.is_expired
        if not is_already_expired:
            auction_obj.active_bool = False
            auction_obj.is_expired = True
            auction_obj.save()

            announce_winner_and_add_auction_results(auction_obj)


def on_start_auction(auctions_to_start):
    for auction_obj in auctions_to_start:
        print(auction_obj.expiry_at, "***start")
        auction_obj.active_bool = True
        auction_obj.save()


# TODO - put cron jobs in separate file
def start_auctions_and_check_auctions_expiry():
    """
    check expiry for all auctions
    :return: expired_auction_ids
    """
    # on_auction_expiry()
    current_date = datetime.datetime.now()
    expired_auctions = AuctionList.objects.filter(expiry_at__lte=current_date)
    on_auction_expiry(expired_auctions)

    # Start Auctions
    start_auctions = AuctionList.objects.filter(auction_start_date__gte=current_date)
    on_start_auction(start_auctions)
    # return HttpResponse("done " + str(current_date))
    print("cron job running ************8")
