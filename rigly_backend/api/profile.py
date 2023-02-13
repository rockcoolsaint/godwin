import json

from rest_framework import status
from rest_framework.views import APIView

from api.bids import BidsList
from api.permissions import ValidateAuth0TokenPermission
from api.serializers import UserSerializer
from auctions.models import User

from rest_framework.response import Response


class UserProfile(APIView):
    """
    All payment apis
    """

    # permission_classes = [ValidateAuth0TokenPermission]

    # def get(self, request, format=None):
    #     snippets = Snippet.objects.all()
    #     serializer = SnippetSerializer(snippets, many=True)
    #     return Response(serializer.data)

    def get(self, request):
        # user = request.user
        user = User.objects.filter()[1]
        serializer = UserSerializer(user)
        bid_history = BidsList().get_bid_history(user)
        return Response({"user": serializer.data, "history": bid_history}, status=status.HTTP_200_OK)

    def put(self, request, pk, format=None):
        user = User.objects.filter(id=pk)
        serializer = UserSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
