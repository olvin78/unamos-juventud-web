"""URL configuration del proyecto config.

Las rutas limpias (/nosotros/, /actualidad/, …) viven en la app `web`.
Aquí se montan junto con el admin, los estáticos de desarrollo y las
redirecciones de compatibilidad con las direcciones antiguas (*.html).
"""
from django.conf import settings
from django.contrib import admin
from django.http import HttpResponseRedirect
from django.urls import include, path, re_path
from django.views.static import serve

# /templates/nosotros.html → /nosotros/
PAGINAS_ANTIGUAS = {
    'index': '/',
    'nosotros': '/nosotros/',
    'actualidad': '/actualidad/',
    'actividades': '/actividades/',
    'medioambiente': '/medioambiente/',
    'donaciones': '/donaciones/',
    'contacto': '/contacto/',
    'privacidad': '/privacidad/',
    'aviso-legal': '/aviso-legal/',
    'cookies': '/cookies/',
}


def pagina_antigua(request, nombre):
    """Compatibilidad: /templates/nosotros.html → /nosotros/"""
    return HttpResponseRedirect(PAGINAS_ANTIGUAS.get(nombre, '/'))


def noticia_antigua(request):
    """Compatibilidad: /templates/noticia.html?id=2 → /noticia/2/"""
    try:
        pk = int(request.GET.get('id', 1))
    except ValueError:
        pk = 1
    return HttpResponseRedirect(f'/noticia/{pk}/')


urlpatterns = [
    path('', include('web.urls')),
    path('admin/', admin.site.urls),
    # Direcciones antiguas (enlaces externos y marcadores)
    path('templates/noticia.html', noticia_antigua),
    re_path(r'^templates/(?P<nombre>[\w-]+)\.html$', pagina_antigua),
    re_path(r'^(?P<nombre>[\w-]+)\.html$', pagina_antigua),
    # Estáticos generados con Tailwind CLI y favicon
    re_path(
        r'^static/(?P<path>.*)$',
        serve,
        {'document_root': settings.STATICFILES_DIRS[0]},
    ),
    path(
        'favicon.ico',
        serve,
        {'path': 'static/img/logos/favicon.svg', 'document_root': settings.BASE_DIR},
        name='favicon',
    ),
]
