import json
import requests
from rest_framework.views import APIView

from api.permissions import ValidateAuth0TokenPermission
from auctions.models import Payment, AuctionList, OrderPayment
from rest_framework.response import Response


class VerificationPayment(APIView):
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
            payment, crt = Payment.objects.get_or_create(
                transaction_id=data["id"])
            if crt:
                payment.extra_info = data
                payment.payment_status = data["status"]
                payment.save()
            request.user.payment = payment
            request.user.save()
        return Response("Updated")


class Payments(APIView):
    def get(self, request, pk=None):
        try:
            payment = OrderPayment.objects.get(
                payment_id=pk)

            return Response({
                'order_id': payment.order.id,
                'payment_id': payment.payment_id,
                'original_amount': payment.original_amount,
                'amount': payment.amount,
                'status': payment.status,
                'promo_code': payment.promo_code,
                'checkout_url': "https://dev-checkout.opennode.com/" + str(payment.payment_id)
            }, status=200)

        except OrderPayment.DoesNotExist:
            return Response({}, status=400)


class PaymentsWebhook(APIView):
    def post(self, request):
        payment = OrderPayment.objects.get(
            order_id=request.data.get('order_id')
        )

        payment.status = request.data.get('status')
        payment.save()

        return Response({}, status=200)
