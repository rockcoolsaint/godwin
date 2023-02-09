from django.contrib.auth.decorators import login_required
from django.http import HttpResponse

from auctions import config
import json
from authlib.integrations.django_client import OAuth
from django.conf import settings
from django.shortcuts import redirect, render, redirect
from django.urls import reverse
from urllib.parse import quote_plus, urlencode

# from auctions.models import SocialAuthUser

oauth = OAuth()

oauth.register(
    "auth0",
    client_id=config.AUTH0_CLIENT_ID,
    client_secret=config.AUTH0_CLIENT_SECRET,
    client_kwargs={
        "scope": "openid profile email",
    },
    server_metadata_url=f'https://{config.AUTH0_DOMAIN}/.well-known/openid-configuration'
)


def login(request):
    print(config.AUTH0_CLIENT_ID)
    return oauth.auth0.authorize_redirect(
        request, request.build_absolute_uri(reverse("callback")).replace('http', 'https')
    )


def callback(request):
    try:
        token = oauth.auth0.authorize_access_token(request)
        request.session["user"] = token
        # request.session["user"]["userinfo"]
        # print(request, "userinfhnjhgo", request.session["user"]["userinfo"])
        # userinfo = request.session["user"]["userinfo"]
        # user, crt = SocialAuthUser.objects.get_or_create(email=userinfo["email"])
        # if crt:
        #     user.username = userinfo["nickname"]
        #     user.first_name = userinfo["name"]
        #     user.profile_picture = userinfo["picture"]
        #     user.verified = userinfo["email_verified"]
        #     user.is_active = userinfo["verified"]
        # user.updated_at = userinfo["updated_at"]
        # user.save()
        return redirect(request.build_absolute_uri(reverse("index")))
    except Exception as e:
        print("***************", str(e))
        return HttpResponse("Callback crashes")


# def logout(request):
#     request.session.clear()
#
#     return redirect(
#         f"https://{config.AUTH0_DOMAIN}/v2/logout?"
#         + urlencode(
#             {
#                 "returnTo": request.build_absolute_uri(reverse("index")).replace('http', 'https'),
#                 "client_id": config.AUTH0_CLIENT_ID,
#             },
#             quote_via=quote_plus,
#         ),
#     )

from django.contrib.auth import logout as django_logout


@login_required
def logout(request):
    django_logout(request)
    domain = settings.SOCIAL_AUTH_AUTH0_DOMAIN
    client_id = settings.SOCIAL_AUTH_AUTH0_KEY
    return_to = request.build_absolute_uri('/')  # this can be current domain
    return redirect(f'https://{domain}/v2/logout?client_id={client_id}&returnTo={return_to}')
