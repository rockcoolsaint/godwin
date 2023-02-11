from django.http import HttpResponse
from jose import jwt
from rest_framework.response import Response
from rest_framework.decorators import api_view

from auctions import config
from auctions.models import Bids
from auctions.views import minbid

from .serializers import *

import json
from social_core.backends.auth0 import Auth0OAuth2


# Create your views here.
@api_view(['GET'])
def HomePage(request):
    home1 = HomePageData.objects.all()
    serializer = homeSerializer(home1, many=True, context={"request": request})
    return Response(serializer.data)


@api_view(['GET'])
def ProductApi(request, pk):
    product = AuctionList.objects.get(slug_category=pk)
    serializer = ProductSerializer(product, many=False, context={"request": request})

    print(serializer.data, "product data")
    print("____________________-")

    bids = Bids.objects.filter(auction_list=product).order_by('-created_at')
    bids_serializer = BidsSerializer(bids, many=True, context={"request": request})
    print(bids_serializer.data, "bids data")

    min_req_bid, current_bid_obj = minbid(product.starting_bid, bids)
    current_bid_serializer = BidsSerializer(current_bid_obj, context={"request": request})

    return Response(
        {"Product": serializer.data, "Bids": bids_serializer.data, "CurrentBid": current_bid_serializer.data})


@api_view(['POST'])
def createUser(request):
    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)
    data = body
    # print(data['__raw'])

    id_token = data['__raw']
    jwks = Auth0OAuth2().get_json(Auth0OAuth2().api_path('.well-known/jwks.json'))
    issuer = Auth0OAuth2().api_path()
    audience = config.REACT_APP_AUTH0_CLIENT_ID  # CLIENT_ID
    payload = jwt.decode(id_token,
                         jwks,
                         algorithms=['RS256'],
                         audience=audience,
                         issuer=issuer)
    fullname, first_name, last_name = Auth0OAuth2().get_user_names(payload['name'])
    user_data = {'username': payload['nickname'],
                 'email': payload['email'],
                 'email_verified': payload.get('email_verified', False),
                 'fullname': fullname,
                 'first_name': first_name,
                 'last_name': last_name,
                 'picture': payload['picture'],
                 'user_id': payload['sub']}

    user, crt = User.objects.get_or_create(email=data["email"])
    user.username = payload["nickname"]
    user.email_verified = payload["email_verified"]
    user.first_name = fullname
    user.last_name = last_name
    user.set_password(data["nickname"] + "_" + payload['sub'])
    user.save()

    return Response(user_data)

@api_view(['POST'])
def placeBid(request):
    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)
    data = body
    # print(data)
    return Response(data)