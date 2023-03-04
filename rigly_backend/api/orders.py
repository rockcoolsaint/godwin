import json
import math
from rest_framework.views import APIView

from api.permissions import ValidateAuth0TokenPermission
from auctions.models import AuctionList, Order, OrderPayment
from rest_framework.response import Response
from .serializers import ProductDetailedSerializer
from shared.orders import create_order, create_payment

PROMO_CODES = {
    "EMPOWER": 10,
    "LOVERIGLY": 15,
    "8DF4502SD": 20
}


class Orders(APIView):
    # Read
    def get(self, request, pk=None):
        try:
            order = Order.objects.get(id=pk)

            auction = AuctionList.objects.get(id=order.auction.id)
            serialized_auction = ProductDetailedSerializer(
                auction, many=False, context={"request": request})
            payment = OrderPayment.objects.get(order_id=order)

            return Response({
                'id': order.id,
                'auction': serialized_auction.data,
                'payment': payment.payment_id,
                'auction_fee': order.auction_fee,
                'mining_deposit': order.mining_deposit,
                'price': order.price,
                'total': order.total,
                'status': order.status
            }, status=200)

        except Order.DoesNotExist:
            return Response({}, status=400)

    def put(self, request):
        body_unicode = request.body.decode('utf-8')
        data = json.loads(body_unicode)

        # Client has not sent correct data.
        if 'order_id' not in data or 'promo_code' not in data:
            return Response({}, status=400)

        order_id = data['order_id']
        promo_code = data['promo_code']

        order = Order.objects.get(id=order_id)

        # Order could not be found.
        if order is None:
            return Response({}, status=400)

        payment = OrderPayment.objects.get(order_id=order.id)

        # Promo code is invalid
        if promo_code.upper() not in PROMO_CODES:
            return Response({'error': 'Invalid promo code.'}, status=200)

        discount_percentage = PROMO_CODES[promo_code.upper()]

        # Recalculate
        new_total = math.ceil(
            payment.original_amount / 100 * (100 - discount_percentage))

        # Create new payment
        payment_data = create_payment(new_total, order)

        # Update db.
        payment.payment_id = payment_data['id']
        payment.amount = new_total
        payment.promo_code = promo_code.upper()
        payment.save()

        return Response({
            "amount": payment.amount,
            "promo_code": promo_code.upper(),
            "discount": discount_percentage,
            'checkout_url': "https://dev-checkout.opennode.com/" + str(payment.payment_id)
        }, status=200)

    # Create
    def post(self, request):
        body_unicode = request.body.decode('utf-8')
        data = json.loads(body_unicode)

        auction = AuctionList.objects.get(slug_category=data["slug"])
        user_id = 1
        order, payment = create_order(auction)

        if order is None:
            return Response({
                'error': {
                    'message': 'Internal server error'
                }
            }, status=500)

        return Response({
            'user_id': order.user_id,
            'order_id': order.id,
            'payment_id': payment.payment_id,
            'price': order.price,
            'total': order.total,
            'mining_deposit': order.mining_deposit,
            'auction_fee': order.auction_fee,
            'status': order.status,
            'checkout_url': "https://dev-checkout.opennode.com/" + str(payment.payment_id)
        }, status=200)
