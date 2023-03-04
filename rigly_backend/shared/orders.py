import json
import math
import requests
from auctions.models import AuctionResult, Order, OrderPayment


def create_payment(amount, order):
    payment_response = requests.post(
        "https://dev-api.opennode.com/v1/charges",
        data=json.dumps({
            "amount": amount,
            "description": "lorem ipsum",
            # "currency": "USD",
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

    if 'message' in payment_obj:
        print('Could not create payment: ' + payment_obj['message'])
        return None

    return payment_obj['data']


def get_or_create_payment(amount, order):
    payment = create_payment(amount, order)

    if payment is None:
        return None

    return OrderPayment.objects.get_or_create(
        order_id=order,
        defaults={
            'order_id': order.id,
            'payment_id': payment['id'],
            'original_amount': amount,
            'amount': amount
        }
    )


def create_order(auction):
    user_id = auction.user.id
    winning_bid = AuctionResult.objects.get(auction=auction)

    auction_fee_percentage = 3.5
    mining_deposit_percentage = 10

    price = winning_bid.bid_price
    mining_deposit = math.ceil(price / 100 * mining_deposit_percentage)
    auction_fee = math.ceil(price / 100 * auction_fee_percentage)
    total = price + mining_deposit + auction_fee

    order, order_crt = Order.objects.get_or_create(
        auction_id=auction.id,
        defaults={
            'user': auction.user,
            'auction': auction,
            'price': price,
            'total': total,
            'mining_deposit': mining_deposit,
            'auction_fee': auction_fee,
            'status': 'unpaid'
        }
    )

    payment, payment_crt = get_or_create_payment(total, order)

    if payment is None:
        order.delete()
        return None

    return order, payment
