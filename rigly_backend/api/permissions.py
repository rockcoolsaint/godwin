import json
import re

from jose import jwt
from rest_framework.permissions import BasePermission, IsAuthenticated, SAFE_METHODS
from rest_framework.response import Response
from rest_framework.views import APIView
from social_core.backends.auth0 import Auth0OAuth2

from auctions import config
from auctions.models import User


class ValidateAuth0TokenPermission(BasePermission):
    def has_permission(self, request, view):
        user_access_token = request.META['HTTP_AUTHORIZATION'].split(' ')[-1]

        jwks = Auth0OAuth2().get_json(Auth0OAuth2().api_path('.well-known/jwks.json'))
        issuer = Auth0OAuth2().api_path()
        audience = config.REACT_APP_AUTH0_CLIENT_ID  # CLIENT_ID
        payload = jwt.decode(user_access_token,
                             jwks,
                             algorithms=['RS256'],
                             audience=audience,
                             issuer=issuer)
        fullname, first_name, last_name = Auth0OAuth2().get_user_names(payload['name'])

        email = payload['email']

        if '@' in email and '.' in email and len(email) > 4:
            user, crt = User.objects.get_or_create(email=payload["email"])
            if crt:
                user.username = payload["nickname"]+payload['sub'].replace('|','_')
                user.email_verified = payload["email_verified"]
                user.first_name = fullname
                user.last_name = last_name
                user.set_password(payload["nickname"] + "_" + payload['sub'])
                user.save()

            request.user = user
        else:
            return False

        return True
