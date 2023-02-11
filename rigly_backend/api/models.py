from django.db import models
from ckeditor.fields import RichTextField

from django.core.files import File
import os
import urllib

from auctions.models import Collection, AuctionList


# Create your models here.
class HomePageData(models.Model):
    title = models.CharField(max_length=500)
    description = RichTextField()
    image_file = models.FileField(upload_to='images', null=True, blank=True)
    show_collection = models.ForeignKey(Collection, on_delete=models.CASCADE, null=True, blank=True)
