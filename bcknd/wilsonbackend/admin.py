from django.contrib import admin
from .models import MediaFile, MediaItem

@admin.register(MediaFile)
class MediaFileAdmin(admin.ModelAdmin):
    list_display = ('filename', 'created_at', 'updated_at')
    list_filter = ('created_at',)
    search_fields = ('filename',)

@admin.register(MediaItem)
class MediaItemAdmin(admin.ModelAdmin):
    list_display = ('name', 'display_media_files', 'created_at', 'updated_at')

    def display_media_files(self, obj):
        return ", ".join([media_file.filename for media_file in obj.media_files.all()])
    display_media_files.short_description = 'Media Files'
