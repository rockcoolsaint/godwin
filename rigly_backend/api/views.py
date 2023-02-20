from rest_framework.response import Response
from rest_framework.decorators import api_view

from .serializers import *


@api_view(['GET'])
def get_homepage_data(request):
    """
    Api is returning content for home page
    :param request:
    :return:
    """
    home_page_data = HomePageData.objects.all()
    serializer = HomePageSerializer(home_page_data, many=True, context={"request": request})
    return Response(serializer.data)


@api_view(['GET'])
def get_header_data(request):
    """
    This api is returning the headers data
    :param request:
    :return:
    """
    header_data = HeaderData.objects.all()
    serializer = HeaderDataSerializer(header_data, many=True, context={"request": request})
    return Response(serializer.data)
