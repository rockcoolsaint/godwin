import datetime

from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render, redirect
from django.urls import reverse

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
    proxy_increement = auction_obj.proxy_increement

    proxy_bid = ProxyBids.objects.filter(auction_list=auction_obj).aggregate(Max('maximum_amount'))
    
    print('**/**'*5)
    print(proxy_bid["maximum_amount__max"] is not None and proxy_bid["maximum_amount__max"] != 0)
    print(proxy_increement)
    print(proxy_bid["maximum_amount__max"])

    if proxy_bid["maximum_amount__max"] is not None and proxy_bid["maximum_amount__max"] != 0:
        new_bid_amount = proxy_increement + proxy_bid["maximum_amount__max"]
        proxy_obj = ProxyBids.objects.filter(auction_list=auction_obj,
                                             maximum_amount=proxy_bid["maximum_amount__max"]).first()
    else:
        new_bid_amount = proxy_increement + present_bid
        proxy_obj = None

    saved = 0
    if proxy_obj is not None:
        #if proxy_obj.user != user:
            # Create Bid
            mybid = Bids(user=user, auction_list=auction_obj, bid=new_bid_amount)
            mybid.save()
            saved = 1

    if new_bid_amount > int(max_proxy_amount):
        return 0, "Amount limit exceeds"

    # if not saved:
    #     return 0, "Current user trying to place automatic bid but he has the current bid so no new bid"

    return new_bid_amount, "Success"


def save_proxy_amount(request):
    auction_id = request.POST.get("auction_id")
    max_proxy_amount = request.POST.get("proxy_amount")
    # print(auction_id, proxy_amount, "***********")
    auction_obj = AuctionList.objects.get(id=auction_id)
    proxy_bid_obj, crt = ProxyBids.objects.get_or_create(auction_list=auction_obj,
                                                         user=request.user
                                                         )

    bids_present = Bids.objects.filter(auction_list__id=auction_id)
    present_bid, bid_obj = minbid(proxy_bid_obj.auction_list.starting_bid, bids_present)

    # CASE : check present bid > max val
    if present_bid > int(max_proxy_amount):
        message = f"Sorry, {max_proxy_amount} is less. It should be more than ${present_bid}."
        return HttpResponse(json.dumps({"Error": message}), content_type="application/json",
                            status=status.HTTP_400_BAD_REQUEST)
    else:
        new_bid_amount, response_msg = check_proxy_and_create_bid(max_proxy_amount, auction_obj,
                                                                  present_bid,
                                                                  request.user)

        if response_msg is not "Success":
            return HttpResponse(json.dumps({"Error": response_msg}), content_type="application/json",
                                status=status.HTTP_400_BAD_REQUEST)

    proxy_bid_obj.history_values += str(max_proxy_amount) + "\n"
    proxy_bid_obj.maximum_amount = max_proxy_amount
    if not crt:
        proxy_bid_obj.updated_at = datetime.datetime.now()
    proxy_bid_obj.save()

    return HttpResponse(json.dumps({"status": "Saved Successfully", "new_bid_amount": new_bid_amount}),
                        content_type="application/json", status=status.HTTP_200_OK)


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


# this function returns minimum bid required to place a user's bid
def minbid(min_bid, present_bid):
    bid_obj = None
    for bids_list in present_bid:
        if min_bid < int(bids_list.bid):
            bid_obj = bids_list
            min_bid = int(bids_list.bid)
    return min_bid, bid_obj


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
