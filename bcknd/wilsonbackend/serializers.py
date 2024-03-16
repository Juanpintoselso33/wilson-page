from rest_framework import serializers

from .models import MediaFile, MediaItem, Video, Audio, Image

class MediaFileSerializer(serializers.ModelSerializer):
    extra_fields = serializers.SerializerMethodField()

    class Meta:
        model = MediaFile
        fields = '__all__'

    def get_extra_fields(self, obj):        
        if isinstance(obj, Video):            
            return {
                'duration': obj.duration,
                'thumbnail': obj.thumbnail,
                'resolution': obj.resolution,
                'format': obj.format,
                'subtitles_url': obj.subtitles_url,
            }
        elif isinstance(obj, Audio):
            return {
                'duration': obj.duration,
                'bitrate': obj.bitrate,
                'format': obj.format,
            }
        elif isinstance(obj, Image):
            return {
                'width': obj.width,
                'height': obj.height,
                'format': obj.format,
        }
        return {}
        
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        extra_fields = self.get_extra_fields(instance)
        if extra_fields:  # Check if extra_fields is not empty
            representation['extra_fields'] = extra_fields
        return representation

class VideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Video
        fields = '__all__'

class AudioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Audio
        fields = '__all__'

class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = '__all__'

class MediaItemSerializer(serializers.ModelSerializer):
    media_files = serializers.SerializerMethodField()

    class Meta:
        model = MediaItem
        fields = '__all__'

    def get_media_files(self, obj):
        # Manually fetch and serialize MediaFile instances as their specific subclasses
        serialized_files = []
        for media_file in obj.media_files.all().select_subclasses():
            if isinstance(media_file, Video):
                serialized_files.append(VideoSerializer(media_file).data)
            elif isinstance(media_file, Audio):
                serialized_files.append(AudioSerializer(media_file).data)
            elif isinstance(media_file, Image):
                serialized_files.append(ImageSerializer(media_file).data)
        return serialized_files