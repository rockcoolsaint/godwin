from api.bids import BidsList
from api.serializers import UserSerializer
import json
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from social_core.backends.auth0 import Auth0OAuth2
from jose import jwt
from auctions import config
from auctions.models import User


class UserProfile(APIView):
    """
    user profile get and update
    """

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


class UserView(APIView):
    """
    create user at backend after successfull auth0 login
    """

    def decode_auth0_jwt(self, token):
        jwks = Auth0OAuth2().get_json(Auth0OAuth2().api_path('.well-known/jwks.json'))
        issuer = Auth0OAuth2().api_path()
        audience = config.REACT_APP_AUTH0_CLIENT_ID  # CLIENT_ID
        payload = jwt.decode(token,
                             jwks,
                             algorithms=['RS256'],
                             audience=audience,
                             issuer=issuer)
        return payload

    def post(self, request):
        """
        register a user after successfull login from auth0
        :param request: request data returned by auth0
        :return: User data after being created
        """
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        data = body

        payload = self.decode_auth0_jwt(data['__raw'])

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
        serializer = UserSerializer(user)

        return Response(serializer.data)
