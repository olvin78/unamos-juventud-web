"""URLs de la web de Juventud Renovadora (rutas limpias, sin .html)."""
from django.urls import path

from . import views

urlpatterns = [
    path('', views.InicioView.as_view(), name='inicio'),
    path(
        'nosotros/',
        views.PaginaView.as_view(template_name='nosotros.html', pagina='nosotros'),
        name='nosotros',
    ),
    path(
        'medioambiente/',
        views.PaginaView.as_view(
            template_name='medioambiente.html', pagina='medioambiente'
        ),
        name='medioambiente',
    ),
    path(
        'donaciones/',
        views.PaginaView.as_view(
            template_name='donaciones.html', pagina='donaciones'
        ),
        name='donaciones',
    ),
    path(
        'contacto/',
        views.PaginaView.as_view(template_name='contacto.html', pagina='contacto'),
        name='contacto',
    ),
    path(
        'privacidad/',
        views.PaginaView.as_view(
            template_name='privacidad.html', pagina='privacidad'
        ),
        name='privacidad',
    ),
    path(
        'aviso-legal/',
        views.PaginaView.as_view(
            template_name='aviso-legal.html', pagina='aviso-legal'
        ),
        name='aviso-legal',
    ),
    path(
        'cookies/',
        views.PaginaView.as_view(template_name='cookies.html', pagina='cookies'),
        name='cookies',
    ),
    path('actualidad/', views.ActualidadListView.as_view(), name='actualidad'),
    path('actividades/', views.ActividadesListView.as_view(), name='actividades'),
    path('noticia/<int:pk>/', views.NoticiaDetailView.as_view(), name='noticia'),
]
