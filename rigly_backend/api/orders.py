import json
import requests
from rest_framework.views import APIView

from api.permissions import ValidateAuth0TokenPermission
from auctions.models import AuctionList, AuctionResult, Order, OrderPayment
from rest_framework.response import Response

from .serializers import ProductDetailedSerializer


def get_or_create_payment(amount, order):
    payment_response = requests.post(
        "https://dev-api.opennode.com/v1/charges",
        data=json.dumps({
            "amount": amount,
            "description": "lorem ipsum",
            "currency": "USD",
            "customer_email": "kevin@rigly.io",
            "notif_email": "kevin@rigly.io",
            "customer_name": "Kevin Karsopawiro",
            "order_id": order.id,
            "callback_url": "http://localhost:8000/",
            "success_url": "http://localhost:3000/checkout/success?order_id=" + str(order.id),
            "auto_settle": False,
            "ttl": 10,
        }),
        headers={
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": "200fa722-c686-47b0-83d3-b76ea4b865b7",
        }
    )

    payment_obj = payment_response.json()
    payment_data = payment_obj['data']

    return OrderPayment.objects.get_or_create(
        order_id=order,
        defaults={
            'order_id': order.id,
            'payment_id': payment_data['id'],
            'amount': amount
        }
    )


class Orders(APIView):
    # Read
    def get(self, request, pk=None):
        order = Order.objects.get(id=pk)

        auction = AuctionList.objects.get(id=order.auction.id)
        serialized_auction = ProductDetailedSerializer(
            auction, many=False, context={"request": request})
        payment = OrderPayment.objects.get(order_id=order)

        return Response({
            'id': order.id,
            'auction': serialized_auction.data,
            'payment': payment.payment_id,
            'fee': order.fee,
            'price': order.price-order.fee,
            'total': order.price,
            'status': order.status
        }, status=200)

    # Create
    def post(self, request):
        body_unicode = request.body.decode('utf-8')
        data = json.loads(body_unicode)

        # Get auction payment data by slug
        auction = AuctionList.objects.get(slug_category=data["slug"])

        user_id = 1
        winning_bid = AuctionResult.objects.get(auction=auction)

        price = winning_bid.bid_price
        mining_deposit = price / 100 * 10
        fee = price / 100 * 3.5
        total = price + mining_deposit + fee

        # Create the order for the auction
        order, order_crt = Order.objects.get_or_create(
            auction_id=auction.id,
            defaults={
                'auction': auction,
                'price': total,
                'fee': fee,
                'status': 'unpaid'
            }
        )

        payment, payment_crt = get_or_create_payment(total, order)

        return Response({
            'user_id': user_id,
            'order_id': order.id,
            'payment_id': payment.payment_id,
            'price': order.price,
            'fee': order.fee,
            'status': order.status,
            'checkout_url': "https://dev-checkout.opennode.com/" + str(payment.payment_id)
        }, status=200)
