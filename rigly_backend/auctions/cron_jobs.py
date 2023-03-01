import datetime
import os

from django.template.loader import render_to_string

from api.utils import send_rigly_emails
from auctions import config
from auctions.models import Bids, AuctionResult, AuctionList
from commerce.settings import BASE_DIR


def send_winner_email(bid_obj, win_bid_obj, to_email):
    path = os.path.join(BASE_DIR, 'auctions/templates/auction_email_templates/')
    html_message = render_to_string(path + 'after_win.html',
                                    {"customer_name": bid_obj.user.username, "product_name": win_bid_obj.auction_list.title,
                                     "currency": config.CURRENCY, "base_price": win_bid_obj.auction_list.starting_bid,
                                     "bid_amount": win_bid_obj.bid, "frontend_domain_url": config.FRONTEND_END_URL,
                                     "product_handle": win_bid_obj.auction_list.slug_category})
    subject = "Congratulations! You Win Auction - " + win_bid_obj.auction_list.title
    send_rigly_emails(subject, [to_email], '', html_message)


def send_auction_loosing_email(user, loose_bid_obj, highest_bid, to_email):
    path = os.path.join(BASE_DIR, 'auctions/templates/auction_email_templates/')
    html_message = render_to_string(path + 'courtesy_email.html',
                                    {"customer_name": user.username, "product_name": loose_bid_obj.auction_list.title,
                                     "currency": config.CURRENCY, "base_price": loose_bid_obj.auction_list.starting_bid,
                                     "bid_amount": loose_bid_obj.bid, "frontend_domain_url": config.FRONTEND_END_URL,
                                     "product_handle": loose_bid_obj.auction_list.slug_category,
                                     "highest_bid": highest_bid})
    subject = "Sorry! You Loose Auction - " + loose_bid_obj.auction_list.title
    send_rigly_emails(subject, [to_email], '', html_message)


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
                winner.append(bid_obj)
                to_email = bid_obj.user.email
            else:
                is_winner = 0
                looser.append(bid_obj.user.email)
                send_auction_loosing_email(bid_obj.user, bid_obj, highest_bid, bid_obj.user.email)
            AuctionResult.objects.create(auction=auction_obj, position=position_count, user=bid_obj.user,
                                         bid_price=bid_obj.bid, is_winner=is_winner)
    send_winner_email(bid_obj, winner[0] , to_email)
    # send_auction_loosing_email(bid_obj, looser)


def on_auction_expiry(expired_auctions):
    for auction_obj in expired_auctions:
        is_already_expired = auction_obj.is_expired
        if not is_already_expired:
            auction_obj.is_auction_active = False
            auction_obj.is_expired = True
            auction_obj.save()

            announce_winner_and_add_auction_results(auction_obj)


def on_start_auction(auctions_to_start):
    for auction_obj in auctions_to_start:
        auction_obj.is_auction_active = True
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
