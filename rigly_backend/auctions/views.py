from django.shortcuts import render

from api.serializers import BidsSerializer
from auctions.models import AuctionResult, AuctionList, Bids


# def detailed_auction_view(request, auction_id):
#     # TODO - bidding details view
#     product = AuctionList.objects.get(id=auction_id)
#     all_bids = Bids.objects.filter(auction_list=product).order_by('-created_at')
#     already_exist_users = []
#
#     for bid in all_bids:
#         if bid.user.email not in already_exist_users:
#             already_exist_users.append(bid.user.email)
#
#
#     all_bids = Bids.objects.filter(auction_list=product).order_by('-created_at')
#     final_bid_data = []
#     for bid_data in all_bids:
#         if bid_data.user.email not in already_exist_users:
#             already_exist_users.append(bid_data.user.email)
#             other_bids = Bids.objects.filter(auction_list=product, user=bid_data.user).exclude(id=bid_data.id).order_by(
#                 '-created_at')
#             bid_data["other_bids"] = other_bids
#             final_bid_data.append(bid_data)
#     #bids_serializer = BidsSerializer(other_bids, many=True, context={"request": request})
#
#     # TODO - auction details view
#     # TODO - product details view
#     # TODO - winner details view
#     # TODO - auction results details view
#     context = {
#         "bids": final_bid_data
#     }
#
#     print(context, "**************")
#     return render(request, 'auctions/auction_detailed_view.html', context)



def detailed_auction_view(request, auction_id):
    # TODO - bidding details view
    product = AuctionList.objects.get(id=auction_id)
    all_bids = Bids.objects.filter(auction_list=product).order_by('-created_at')
    already_exist_users = []
    check_arr = []

    for bid in all_bids:
        temp_dict = {}
        if bid.user not in check_arr:
            temp_dict[bid.user.username] = bid.user.__dict__
            check_arr.append(bid.user)
            user_bids = Bids.objects.filter(auction_list=product, user=bid.user).order_by('-created_at')
            #already_exist_users[bid.user.username].update(user_bids)
            temp_dict.setdefault("bids", []).append(user_bids.values())
            already_exist_users.append(temp_dict)

    context = {
        "bids": already_exist_users
    }

    print(context, "**************")
    return render(request, 'auctions/auction_detailed_view.html', context)
