from b2sdk.v1 import B2Api, InMemoryAccountInfo
import os
from dotenv import load_dotenv
import logging
import hashlib
from datetime import datetime
from moviepy.editor import VideoFileClip
import tempfile
from .models import MediaFile, Video, Audio, Image as ImageModel
from datetime import timedelta
from PIL import Image
from pydub.utils import mediainfo
from pydub import AudioSegment
from datetime import timedelta

AudioSegment.converter = r'C:\ffmpeg\bin\ffmpeg.exe'
AudioSegment.ffprobe = r'C:\ffmpeg\bin\ffprobe.exe'

load_dotenv()

def determine_video_duration(file_path):
    with VideoFileClip(file_path) as video:
        return video.duration

def determine_video_resolution(file_path):
    with VideoFileClip(file_path) as video:
        width, height = video.size
        return f"{width}x{height}"

def calculate_file_sha1(file_path):
    sha1 = hashlib.sha1()
    with open(file_path, 'rb') as f:
        while True:
            data = f.read(8192)  # Leer en bloques de 8K
            if not data:
                break
            sha1.update(data)
    return sha1.hexdigest()

def determine_file_type_and_folder(mime_type):
    if mime_type.startswith('image/'):
        return 'images/'
    elif mime_type.startswith('video/'):
        return 'videos/'
    elif mime_type.startswith('audio/'):
        return 'audios/'
    else:
        return 'others/'
    
def upload_file_to_bucket(file, file_name_with_path, file_sha1, b2_api, logger):
    bucket_name = os.getenv('B2_BUCKET_NAME')
    try:
        bucket = b2_api.get_bucket_by_name(bucket_name)
        # Check if file is a TemporaryUploadedFile and has a temporary file path
        if hasattr(file, 'temporary_file_path'):
            file_path = file.temporary_file_path()
        else:
            # Handle InMemoryUploadedFile by creating a temporary file
            with tempfile.NamedTemporaryFile(delete=False) as tmp:
                for chunk in file.chunks():
                    tmp.write(chunk)
                file_path = tmp.name
        # Use file_path for uploading
        uploaded_file = bucket.upload_local_file(
            local_file=file_path,
            file_name=file_name_with_path,
            file_info={'sha1': file_sha1}
        )
        logger.info("File successfully uploaded to Backblaze B2")
        return f"https://f005.backblazeb2.com/file/{bucket_name}/{file_name_with_path}"
    except Exception as e:
        logger.error(f"Error uploading file to Backblaze B2: {str(e)}")
        raise
    
def generate_and_upload_thumbnail(file, folder_path, b2_api, bucket_name, logger):
    with tempfile.NamedTemporaryFile(delete=False, suffix='.png') as tmpfile:
        thumbnail_path = tmpfile.name
    clip = VideoFileClip(file.temporary_file_path())
    clip.save_frame(thumbnail_path, t=1)
    thumbnail_file_name_with_path = f"{folder_path}thumbnails/{os.path.basename(thumbnail_path)}"
    try:
        bucket = b2_api.get_bucket_by_name(bucket_name)
        uploaded_thumbnail = bucket.upload_local_file(
            local_file=thumbnail_path,
            file_name=thumbnail_file_name_with_path,
        )
        thumbnail_url = f"https://f005.backblazeb2.com/file/{bucket_name}/{thumbnail_file_name_with_path}"
        logger.info(f"Thumbnail uploaded to Backblaze B2: {thumbnail_url}")
        return thumbnail_url
    finally:
        os.remove(thumbnail_path)

def create_and_upload_media_file(file, request_data, b2_api, logger):    
     # Separar el nombre del archivo de su extensión
    base_name, extension = os.path.splitext(file.name)
    # Ajusta el número 95 según sea necesario para asegurar que la longitud total no exceda los 100 caracteres
    truncated_base_name = base_name[:95 - len(extension)]
    file.name = f"{truncated_base_name}{extension}" 
    logger.info(f"File name truncated to {file.name} with length {len(file.name)}")
    logger.info("Starting to process media file")

    mime_type = file.content_type
    folder_path = determine_file_type_and_folder(mime_type)
    # Check if file is a TemporaryUploadedFile and has a temporary file path    
    if hasattr(file, 'temporary_file_path'):
        file_path = file.temporary_file_path()
    else:
        # Handle InMemoryUploadedFile by creating a temporary file
        with tempfile.NamedTemporaryFile(delete=False) as tmp:
            for chunk in file.chunks():
                tmp.write(chunk)
            file_path = tmp.name
    file_sha1 = calculate_file_sha1(file_path)
    logger.info(f"File SHA1 calculated: {file_sha1}")
    file_name_with_path = f"{folder_path}{file.name}"
    file_url = upload_file_to_bucket(file, file_name_with_path, file_sha1, b2_api, logger)
    logger.info(f"File uploaded to bucket: {file_url}")
    # Continue with the rest of your function using file_path as needed

    if mime_type.startswith('video/'):
        logger.info("Processing video file")
        video_duration_seconds = determine_video_duration(file.temporary_file_path())
        video_duration = timedelta(seconds=video_duration_seconds)
        thumbnail_url = generate_and_upload_thumbnail(file, folder_path, b2_api, os.getenv('B2_BUCKET_NAME'), logger)
        video_resolution = determine_video_resolution(file.temporary_file_path())
        video_format = file.name.split('.')[-1]
        media_file = Video.objects.create(
            filename=file.name,
            file=file_url,
            duration=video_duration,
            thumbnail=thumbnail_url,
            resolution=video_resolution,
            format=video_format,
        )
        logger.info("Video file processed")
    elif mime_type.startswith('audio/'):
        logger.info("Processing audio file")
        # Ensure you have the correct file path for the audio file
        if hasattr(file, 'temporary_file_path'):
            file_path = file.temporary_file_path()
        else:
            with tempfile.NamedTemporaryFile(delete=False) as tmp:
                for chunk in file.chunks():
                    tmp.write(chunk)
                file_path = tmp.name
        audio_info = mediainfo(file_path)
        duration_timedelta = timedelta(seconds=float(audio_info['duration']))
        bitrate = int(audio_info['bit_rate'])       
        # Use filename instead of file_name when creating the object
        media_file = Audio.objects.create(
            filename=file.name,  # Corrected keyword argument
            file=file_url,
            duration=duration_timedelta,
            bitrate=bitrate,
            format=file.name.split('.')[-1],
        )
        logger.info("Audio file processed")
    elif mime_type.startswith('image/'):
        logger.info("Processing image file")
        # Ensure file_path is correctly determined as shown previously
        with Image.open(file_path) as img:
            width, height = img.size
            format = img.format.lower()
        media_file = ImageModel.objects.create(
            filename=file.name,
            file=file_url,
            width=width,
            height=height,
            format=format,
        )
        logger.info("Image file processed")
    else:
        logger.info("Processing generic media file")
        media_file = MediaFile.objects.create(
            filename=file.name,
            file=file_url,
        )
        logger.info("Generic media file processed")

    logger.info("Media file processing completed")
    return media_file
