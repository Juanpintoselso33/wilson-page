from django.urls import path
from wilsonbackend.views import (
    create_media_view,
    get_media_by_id_view,
    update_media_view,
    delete_media_view,
    test_b2_connection_view,
    get_all_media_items_view,
    get_all_mediafiles_view
    # Importa otras vistas relacionadas con los archivos multimedia...
)

urlpatterns = [
    path('media/', create_media_view, name='create_media'),
    path('media/<int:media_id>/', get_media_by_id_view, name='get_media_by_id'),
    path('media/<int:media_id>/update/', update_media_view, name='update_media'),
    path('media/<int:media_id>/delete/', delete_media_view, name='delete_media'),
    path('api/test-b2-connection/', test_b2_connection_view, name='test_b2_connection'),
    path('media-items/', get_all_media_items_view, name='get_all_media_items'),
    path('media-files/', get_all_mediafiles_view, name='get_all_mediafiles'),
    # Agrega otras URL relacionadas con los archivos multimedia...
]

