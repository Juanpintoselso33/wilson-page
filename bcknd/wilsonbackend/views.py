from b2sdk.v1 import B2Api, InMemoryAccountInfo
import os
from dotenv import load_dotenv
from rest_framework import status
from rest_framework.decorators import api_view, authentication_classes, permission_classes, parser_classes
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser
from supabase_py import create_client
from .models import MediaItem, MediaFile, Video, Audio, Image
import logging
from .serializers import MediaFileSerializer, MediaItemSerializer
from moviepy.editor import VideoFileClip
from .utils import calculate_file_sha1, determine_file_type_and_folder, upload_file_to_bucket, generate_and_upload_thumbnail, create_and_upload_media_file

# Load environment variables and initialize logging and clients
load_dotenv()
logger = logging.getLogger('wilsonbackend')
supabase = create_client(os.getenv('SUPABASE_URL'), os.getenv('SUPABASE_KEY'))
info = InMemoryAccountInfo()
b2_api = B2Api(info)
b2_api.authorize_account("production", os.getenv('B2_ACCOUNT_ID'), os.getenv('B2_APPLICATION_KEY'))


@api_view(['POST'])
@parser_classes([MultiPartParser])
def create_media_file_view(request):
    if request.FILES.get('file'):
        file = request.FILES['file']
        # Asegúrate de pasar los argumentos correctos a la función
        media_file = create_and_upload_media_file(file, request.data, b2_api, logger)
        return Response({"success": "Media file created", "file_id": media_file.id}, status=status.HTTP_201_CREATED)
    else:
        return Response({"error": "No file provided"}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@parser_classes([MultiPartParser])
def create_media_view(request):
    existing_media_files_ids = request.data.getlist('existing_media_files_ids', [])
    media_files = []

    # Verificar la existencia de MediaFiles antes de crear el MediaItem
    for media_file_id in existing_media_files_ids:
        try:
            media_file = MediaFile.objects.get(id=media_file_id)
            media_files.append(media_file)
        except MediaFile.DoesNotExist:
            logger.error(f"MediaFile with id {media_file_id} does not exist.")
            return Response({"error": f"MediaFile with id {media_file_id} does not exist."}, status=status.HTTP_400_BAD_REQUEST)

    # Verificar si se subieron nuevos archivos y procesarlos
    if request.FILES.getlist('files'):
        for file in request.FILES.getlist('files'):
            media_file = create_and_upload_media_file(file, request.data, b2_api, logger)
            media_files.append(media_file)

    # Si no hay MediaFiles existentes o nuevos, no crear el MediaItem
    if not media_files:
        return Response({"error": "No MediaFiles provided"}, status=status.HTTP_400_BAD_REQUEST)

    # Crear el MediaItem con los datos proporcionados
    media_item_data = {
        'name': request.data.get('name'),
        'description': request.data.get('description'),
        'category': request.data.get('category', 'general'),
        'creator': request.data.get('creator', 'admin'),
        'preview_url': request.data.get('preview_url'),
        'status': request.data.get('status', 'active'),
        'publish_date': request.data.get('publish_date'),
    }
    media_item = MediaItem.objects.create(**media_item_data)

    # Asociar los MediaFiles validados al MediaItem
    for media_file in media_files:
        media_item.media_files.add(media_file)

    # Añadir etiquetas (tags) si existen
    tags = request.data.get('tags', '').split(',')  # Asume que las etiquetas vienen en una cadena separada por comas
    media_item.tags.add(*tags)

    return Response({"success": "Media item and files processed"}, status=status.HTTP_201_CREATED)
   

@api_view(['DELETE'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def delete_media_view(request, media_id):
    try:
        response = supabase.table('wilsonbackend_mediafile').delete().eq('id', media_id).execute()
        if response.data:
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            return Response({"error": "Error deleting media file"}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        logger.error(f"Error deleting media file: {str(e)}")
        return Response({"error": "Error deleting media file"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
def test_b2_connection_view(request):
    try:
        # List contents in the new Backblaze B2 bucket
        bucket_name = os.getenv('B2_BUCKET_NAME')  # Obtener el nombre del bucket desde las variables de entorno
        bucket = b2_api.get_bucket_by_name(bucket_name)  # Obtener el bucket por su nombre

        bucket_contents = []  # Inicializar una lista para almacenar los contenidos del bucket

        for file_version in bucket.ls():
            file_info = {
                'file_name': file_version.file_name,
                'file_id': file_version.file_id,
                'size': file_version.size,
                'content_type': file_version.content_type
            }
            bucket_contents.append(file_info)

        return Response(bucket_contents, status=status.HTTP_200_OK)
    except Exception as e:
        error_message = {
            'error': 'Error listing contents in the new bucket',
            'details': str(e)
        }
        return Response(error_message, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
def get_media_by_id_view(request, media_id):
    print("Media ID:", media_id)  # Debugging
    print("Media ID type:", type(media_id))
    try:
        response = supabase.table('wilsonbackend_mediafile').select('*').eq('id', str(media_id)).execute()
        print("Response type:", type(response))  # Debug response type
        print("Response data type:", type(response['data']))  # Debug 'data' type in response
        if response['data'] and isinstance(response['data'], list):
            # Directly return the data without using a serializer
            media_file_data = response['data'][0]
            media_file_data['thumbnail'] = media_file_data.get('thumbnail', None)  # Ensure thumbnail URL is included
            return Response(media_file_data, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Media file not found"}, status=status.HTTP_404_NOT_FOUND)
    except KeyError as e:
        logger.error(f"KeyError: {str(e)}")
        return Response({"error": "Key error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    except TypeError as e:
        logger.error(f"TypeError: {str(e)}")
        return Response({"error": "Type error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



@api_view(['PUT'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def update_media_view(request, media_id):
    try:
        data = request.data
        # Validate and clean data before updating
        # ...

        response = supabase.table('media_files').update(data).eq('id', media_id).execute()
        if response.data:
            return Response(response.data[0], status=status.HTTP_200_OK)
        else:
            return Response({"error": "Error updating media file"}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        logger.error(f"Error updating media file: {str(e)}")
        return Response({"error": "Error updating media file"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
def get_all_mediafiles_view(request):
    media_files = MediaFile.objects.all()
    serializer = MediaFileSerializer(media_files, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_media_file_by_id_view(request, media_file_id):
    try:
        media_file = MediaFile.objects.get_subclass(id=media_file_id)
        response_data = {
            'id': media_file.id,
            'filename': media_file.filename,
            'file': media_file.file.url,
            'created_at': media_file.created_at,
            'updated_at': media_file.updated_at,
        }
        
        if isinstance(media_file, Video):
            response_data.update({
                'duration': media_file.duration,
                'thumbnail': media_file.thumbnail if media_file.thumbnail else None,
                'resolution': media_file.resolution,
                'format': media_file.format,
                'subtitles_url': media_file.subtitles_url if hasattr(media_file, 'subtitles_url') else None,
            })
        elif isinstance(media_file, Audio):
            response_data.update({
                'duration': media_file.duration,
                'bitrate': media_file.bitrate,
                'format': media_file.format,
            })
        elif isinstance(media_file, Image):
            response_data.update({
                'width': media_file.width,
                'height': media_file.height,
                'format': media_file.format,
            })

        return Response(response_data, status=status.HTTP_200_OK)
    except MediaFile.DoesNotExist:
        return Response({"error": "Media file not found"}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
def get_all_media_items_view(request):
    media_items = MediaItem.objects.all()
    serializer = MediaItemSerializer(media_items, many=True)
    return Response(serializer.data)