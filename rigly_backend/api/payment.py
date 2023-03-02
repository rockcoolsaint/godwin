import json

from rest_framework.views import APIView

from api.permissions import ValidateAuth0TokenPermission
from auctions.models import Payment, AuctionPayment
from rest_framework.response import Response

class PaymentDetails(APIView):
    """
    All payment apis
    """
    permission_classes = [ValidateAuth0TokenPermission]

    # def get(self, request, format=None):
    #     snippets = Snippet.objects.all()
    #     serializer = SnippetSerializer(snippets, many=True)
    #     return Response(serializer.data)

    def post(self, request):
        body_unicode = request.body.decode('utf-8')
        data = json.loads(body_unicode)
        if data["status"] == "paid":
            request.user.is_paid = True
            payment, crt = Payment.objects.get_or_create(transaction_id=data["id"])
            if crt:
                payment.extra_info = data
                payment.payment_status = data["status"]
                payment.save()
            request.user.payment = payment
            request.user.save()
        return Response("Updated")

class Payments(APIView):
    def post(self, request):
        body_unicode = request.body.decode('utf-8')
        data = json.loads(body_unicode)
        try:
            auction_payment = AuctionPayment.objects.get(order_id=data["order_id"])
            return Response({
                'order_id': auction_payment.order_id,
                'payment_id': auction_payment.payment_id,
                'price': auction_payment.price,
                'fee': auction_payment.fee,
                'status': auction_payment.status
            }, status=200)
        except AuctionPayment.DoesNotExist:
            return Response({}, status=400)


class PaymentWebhook(APIView):
    def post(self, request):
        auction_payment, crt = AuctionPayment.objects.get_or_create(
            order_id=request.data.get('order_id'),
            defaults={
                'payment_id': request.data.get('id'),
                'price': request.data.get('price'),
                'fee': request.data.get('fee'),
                'status': request.data.get('status')
            }
        )

        if not crt:
            auction_payment.status = request.data.get('status')
            auction_payment.save()
            return Response({}, status=200)

        return Response({}, status=500)