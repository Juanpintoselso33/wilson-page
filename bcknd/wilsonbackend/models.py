from django.db import models
from taggit.managers import TaggableManager
from model_utils.managers import InheritanceManager

class MediaFile(models.Model):
    objects = InheritanceManager()
    filename = models.CharField(max_length=255)
    file = models.FileField(upload_to='media_files/')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class Video(MediaFile):
    duration = models.DurationField()
    thumbnail = models.URLField()
    resolution = models.CharField(max_length=50, default='1080p')  # Nuevo campo
    format = models.CharField(max_length=10, default='mp4')  # Nuevo campo
    subtitles_url = models.URLField(null=True, blank=True) 

class Audio(MediaFile):
    duration = models.DurationField()
    bitrate = models.IntegerField()
    format = models.CharField(max_length=10, default='mp3')  # Añade un valor por defecto aquí
class Image(MediaFile):
    width = models.IntegerField()
    height = models.IntegerField()
    format = models.CharField(max_length=10, default='jpeg')  # Añade un valor por defecto aquí
class MediaItem(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    category = models.CharField(max_length=100, default='general')   # Nuevo campo
    creator = models.CharField(max_length=255, default='admin')  # Nuevo campo
    preview_url = models.URLField(null=True, blank=True)  # Nuevo campo
    status = models.CharField(max_length=50, default='active')  # Nuevo campo
    publish_date = models.DateTimeField(null=True, blank=True)  # Nuevo campo
    media_files = models.ManyToManyField(MediaFile, related_name='media_items')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    tags = TaggableManager()