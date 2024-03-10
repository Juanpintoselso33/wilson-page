from django.db import models

class MediaFile(models.Model):
    filename = models.CharField(max_length=255)
    file = models.FileField(upload_to='media_files/')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class MediaItem(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    media_file = models.ForeignKey(MediaFile, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
