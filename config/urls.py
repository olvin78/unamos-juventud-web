"""
URL configuration for config project.

Django mantiene el panel de administración y sirve la web estática
(templates/*.html, incluida la portada index.html) generada con Tailwind CLI.
"""
from django.conf import settings
from django.contrib import admin
from django.urls import path, re_path
from django.views.static import serve
from django.views.generic import RedirectView

INDEX = "/templates/index.html"

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
    re_path(
        r"^templates/(?P<path>[\w./-]+\.html)$",
        serve,
        {"document_root": settings.BASE_DIR / "templates"},
    ),
    path(
        "favicon.ico",
        serve,
        {"path": "static/img/logos/favicon.svg", "document_root": settings.BASE_DIR},
        name="favicon",
    ),
    path("admin/", admin.site.urls),
]
