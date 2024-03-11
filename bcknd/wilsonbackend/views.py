from b2sdk.v1 import B2Api, InMemoryAccountInfo
import os
from dotenv import load_dotenv
from django.http import JsonResponse
from rest_framework import status
from rest_framework.decorators import api_view, authentication_classes, permission_classes, parser_classes
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser
from supabase_py import create_client
from .models import MediaItem, MediaFile
from .serializers import MediaItemSerializer, MediaFileSerializer, MediaFileSupabaseSerializer
import logging
import hashlib
from datetime import datetime

load_dotenv()

logger = logging.getLogger('wilsonbackend')


supabase = create_client(os.getenv('SUPABASE_URL'), os.getenv('SUPABASE_KEY'))
info = InMemoryAccountInfo()
b2_api = B2Api(info)
b2_api.authorize_account("production", os.getenv('B2_ACCOUNT_ID'), os.getenv('B2_APPLICATION_KEY'))

def calculate_file_sha1(file_path):
    sha1 = hashlib.sha1()
    with open(file_path, 'rb') as f:
        while True:
            data = f.read(8192)  # Leer en bloques de 8K
            if not data:
                break
            sha1.update(data)
    return sha1.hexdigest()

@api_view(['POST'])
@parser_classes([MultiPartParser])
def create_media_view(request):
    logger.debug("Entering create_media_view")

    if request.method == 'POST' and request.FILES.get('file'):
        file = request.FILES['file']
        logger.info(f"Received file: {file.name}")

        # Calcular el SHA1 del archivo
        file_sha1 = calculate_file_sha1(file.temporary_file_path())
        logger.debug(f"File SHA1: {file_sha1}")

        # Obtener el objeto Bucket
        bucket_name = os.getenv('B2_BUCKET_NAME')
        try:
            bucket = b2_api.get_bucket_by_name(bucket_name)
        except Exception as e:
            logger.error(f"Error al obtener el bucket: {str(e)}")
            return Response({"error": "Error al obtener el bucket"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        # Subir el archivo
        try:
            uploaded_file = bucket.upload_local_file(
                local_file=file.temporary_file_path(),
                file_name=file.name,
                file_info={'sha1': file_sha1}
            )
            logger.info("Archivo subido exitosamente a Backblaze B2")
        except Exception as e:
            logger.error(f"Error al subir archivo a Backblaze B2: {str(e)}")
            return Response({"error": "Error al subir archivo a Backblaze B2"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        # Obtener la URL de descarga
        try:
            file_name = uploaded_file.file_name
            bucket_name = os.getenv('B2_BUCKET_NAME')
            file_url = f"https://f005.backblazeb2.com/file/{bucket_name}/{file_name}"
            logger.info(f"File uploaded to Backblaze B2: {file_url}")
        except Exception as e:
            logger.error(f"Error al obtener la URL de descarga: {str(e)}")
            return Response({"error": "Error al obtener la URL de descarga"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        # Validación de longitud de los campos filename y file_url
        filename = request.data.get('filename', 'default_filename')
        file_url = file_url if len(file_url) <= 100 else file_url[:100]

        data = {
            'filename': filename if len(filename) <= 100 else filename[:100],  # Ajusta la longitud si es necesario
            'file': file_url,
            'created_at': datetime.now().isoformat(),
            'updated_at': datetime.now().isoformat()
        }
        response = supabase.table('wilsonbackend_mediafile').insert(data).execute()

        if 'data' in response:
            logger.info("Information saved in Supabase")
            return Response(response['data'], status=status.HTTP_201_CREATED)
        elif 'error' in response:
            logger.error(f"Error in Supabase: {response['error']}")
            return Response({"error": response['error']}, status=status.HTTP_400_BAD_REQUEST)
        else:
            logger.error("Unknown error with Supabase")
            return Response({"error": "Unknown error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    else:
        logger.warning("No file received")
        return Response({"error": "No file provided"}, status=status.HTTP_400_BAD_REQUEST)

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
            return Response(response['data'][0], status=status.HTTP_200_OK)
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
def get_all_media_items_view(request):
    media_items = MediaItem.objects.all()
    serializer = MediaItemSerializer(media_items, many=True)
    return Response(serializer.data)