"""
URL configuration for config project.

Django mantiene el panel de administración y sirve la web estática
(templates/*.html, incluida la portada index.html) generada con Tailwind CLI.
"""
from django.conf import settings
from django.contrib import admin
from django.http import HttpResponseRedirect
from django.urls import path, re_path
from django.views.static import serve
from django.views.generic import RedirectView

from config.views import NoticiaDetailView

INDEX = "/templates/index.html"


def noticia_antigua(request):
    """Compatibilidad: /templates/noticia.html?id=2 → /noticia/2/"""
    try:
        pk = int(request.GET.get("id", 1))
    except ValueError:
        pk = 1
    return HttpResponseRedirect(f"/noticia/{pk}/")


urlpatterns = [
    path(
        "",
        RedirectView.as_view(url=INDEX, permanent=False),
        name="home",
    ),
    path(
        "index.html",
        RedirectView.as_view(url=INDEX, permanent=False),
    ),
    path(
        "noticia/<int:pk>/",
        NoticiaDetailView.as_view(),
        name="noticia",
    ),
    path("templates/noticia.html", noticia_antigua),
    re_path(
        r"^templates/(?P<path>[\w./-]+\.html)$",
        serve,
        {"document_root": settings.BASE_DIR / "templates"},
    ),
    re_path(
        r"^static/(?P<path>.*)$",
        serve,
        {"document_root": settings.STATICFILES_DIRS[0]},
    ),
    path(
        "favicon.ico",
        serve,
        {"path": "static/img/logos/favicon.svg", "document_root": settings.BASE_DIR},
        name="favicon",
    ),
    path("admin/", admin.site.urls),
]
