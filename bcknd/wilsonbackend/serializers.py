from rest_framework import serializers
from .models import MediaFile, MediaItem

class MediaFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = MediaFile
        fields = '__all__'

class MediaItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = MediaItem
        fields = '__all__'
        depth = 1 

class MediaFileSupabaseSerializer(serializers.Serializer):
    filename = serializers.CharField(max_length=200)
    file = serializers.URLField()