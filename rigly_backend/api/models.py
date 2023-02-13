from django.db import models
from ckeditor.fields import RichTextField

from django.core.files import File
import os
import urllib

from auctions.models import Collection, AuctionList


class HeaderData(models.Model):
    annoucement_message = models.CharField(max_length=1500, null=True, blank=True)
    header_logo = models.FileField(upload_to='images', null=True, blank=True, max_length=800)


# Create your models here.
class HomePageData(models.Model):
    title = models.CharField(max_length=500)
    description = RichTextField()
    image_file = models.FileField(upload_to='images', null=True, blank=True)
    show_collection = models.ForeignKey(Collection, on_delete=models.CASCADE, null=True, blank=True)
    mining_info_image_1 = models.FileField(upload_to='images', null=True, blank=True, max_length=800)
    mining_info_title_1 = models.CharField(max_length=500, null=True, blank=True)
    mining_info_description_1 = RichTextField(null=True, blank=True)
    mining_info_url_1 = models.CharField(max_length=500, null=True, blank=True)
    mining_info_image_2 = models.FileField(upload_to='images', null=True, blank=True, max_length=800)
    mining_info_title_2 = models.CharField(max_length=500, null=True, blank=True)
    mining_info_description_2 = RichTextField(null=True, blank=True)
    mining_info_url_2 = models.CharField(max_length=500, null=True, blank=True)
    mining_info_image_3 = models.FileField(upload_to='images', null=True, blank=True, max_length=800)
    mining_info_title_3 = models.CharField(max_length=500, null=True, blank=True)
    mining_info_description_3 = RichTextField(null=True, blank=True)
    mining_info_url_3 = models.CharField(max_length=500, null=True, blank=True)
    about_us_1_image = models.FileField(upload_to='images', null=True, blank=True, max_length=800)
    about_us_1_title = models.CharField(max_length=500, null=True, blank=True)
    about_us_1_sub_title = RichTextField(null=True, blank=True)
    about_us_1_url = models.CharField(max_length=500, null=True, blank=True)

    about_us_2_image = models.FileField(upload_to='images', null=True, blank=True, max_length=800)
    about_us_2_title = models.CharField(max_length=500, null=True, blank=True)
    about_us_2_sub_title = RichTextField(null=True, blank=True)
    about_us_2_url = models.CharField(max_length=500, null=True, blank=True)

    about_us_3_image = models.FileField(upload_to='images', null=True, blank=True, max_length=800)
    about_us_3_title = models.CharField(max_length=500, null=True, blank=True)
    about_us_3_sub_title = RichTextField(null=True, blank=True)
    about_us_3_url = models.CharField(max_length=500, null=True, blank=True)
