from django.db import models

class MediaFile(models.Model):
    name = models.CharField(max_length=255)
    alternativeText = models.CharField(max_length=255, blank=True)
    caption = models.CharField(max_length=255, blank=True)
    width = models.IntegerField(null=True, blank=True)
    height = models.IntegerField(null=True, blank=True)
    formats = models.JSONField(null=True, blank=True)
    hash = models.CharField(max_length=255)
    ext = models.CharField(max_length=255)
    mime = models.CharField(max_length=255)
    size = models.DecimalField(max_digits=10, decimal_places=2)
    url = models.URLField()
    preview_url = models.URLField(null=True, blank=True)
    provider = models.CharField(max_length=255)
    provider_metadata = models.JSONField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
