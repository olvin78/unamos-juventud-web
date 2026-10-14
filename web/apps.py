from django.apps import AppConfig


class WebConfig(AppConfig):
    """Configuración de la app con el contenido público del sitio."""

    default_auto_field = 'django.db.models.BigAutoField'
    name = 'web'
    verbose_name = 'Sitio web'
