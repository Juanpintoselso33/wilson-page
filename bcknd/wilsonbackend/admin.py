from django.contrib import admin
from .models import MediaFile, MediaItem

@admin.register(MediaFile)
class MediaFileAdmin(admin.ModelAdmin):
    list_display = ('filename', 'created_at', 'updated_at')
    list_filter = ('created_at',)
    search_fields = ('filename',)

@admin.register(MediaItem)
class MediaItemAdmin(admin.ModelAdmin):
    list_display = ('name', 'media_file', 'created_at', 'updated_at')
    list_filter = ('created_at',)
    search_fields = ('name', 'description')
