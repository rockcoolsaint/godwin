import json

from rest_framework.views import APIView

from api.permissions import ValidateAuth0TokenPermission
from auctions.models import Payment

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
