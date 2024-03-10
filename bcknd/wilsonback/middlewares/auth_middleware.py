# bcknd/wilsonback/middlewares/auth_middleware.py

from django.utils.deprecation import MiddlewareMixin
from rest_framework import authentication, exceptions

class AuthMiddleware(MiddlewareMixin):
    def process_request(self, request):
        try:
            # Lógica de autenticación aquí
            # Por ejemplo, verificar el token de autenticación en el encabezado de la solicitud
            auth_header = request.META.get('HTTP_AUTHORIZATION')
            if auth_header:
                # Verificar y validar el token de autenticación
                # ...
                # Si la autenticación es exitosa, puedes almacenar la información del usuario en request.user
                request.user = authenticated_user
            else:
                # Si no se proporciona un token de autenticación, puedes lanzar una excepción o realizar alguna acción específica
                raise exceptions.AuthenticationFailed('No se proporcionó un token de autenticación')
        except exceptions.AuthenticationFailed as e:
            # Manejar errores de autenticación
            return JsonResponse({'error': str(e)}, status=401)
