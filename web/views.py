"""Vistas del sitio con clases basadas en vistas genéricas de Django.

Todas leen de la base de datos (modelos de `web.models`, editables en /admin/):

- PaginaView (TemplateView): páginas institucionales estáticas.
- InicioView (TemplateView): portada con noticias, agenda y efemérides.
- ActualidadListView / ActividadesListView (ListView): listados con filtros.
- NoticiaDetailView (DetailView): detalle con anterior/siguiente (404 si no existe).
"""
from django.views.generic import DetailView, ListView, TemplateView

from .models import Actividad, Efemeride, Noticia

# Elementos que muestra cada listado
NOTICIAS_POR_PAGINA = 6
ACTIVIDADES_POR_PAGINA = 6


class PaginaMixin:
    """Añade al contexto la página activa para marcar el menú (aria-current)."""

    pagina = ''

    def get_context_data(self, **kwargs):
        contexto = super().get_context_data(**kwargs)
        contexto['pagina'] = self.pagina
        return contexto


class PaginaView(PaginaMixin, TemplateView):
    """Página institucional: una plantilla y una entrada de menú.

    Se configura en urls.py con
    PaginaView.as_view(template_name='nosotros.html', pagina='nosotros')
    """

    template_name = ''
    pagina = ''


class InicioView(PaginaMixin, TemplateView):
    """Portada: header transparente sobre el hero y listas de resumen."""

    template_name = 'index.html'
    pagina = 'inicio'

    def get_context_data(self, **kwargs):
        contexto = super().get_context_data(**kwargs)
        contexto.update({
            'cabecera_transparente': True,
            'noticias': Noticia.objects.all()[:3],
            'actividades': Actividad.objects.filter(
                estado=Actividad.Estado.PROXIMA
            )[:3],
            'efemerides': Efemeride.objects.all()[:5],
        })
        return contexto


class ActualidadListView(PaginaMixin, ListView):
    """Listado de noticias; los filtros por categoría son de cliente."""

    model = Noticia
    template_name = 'actualidad.html'
    context_object_name = 'noticias'
    paginate_by = NOTICIAS_POR_PAGINA
    pagina = 'actualidad'


class ActividadesListView(PaginaMixin, ListView):
    """Calendario de actividades; los filtros por estado son de cliente."""

    model = Actividad
    template_name = 'actividades.html'
    context_object_name = 'actividades'
    paginate_by = ACTIVIDADES_POR_PAGINA
    pagina = 'actividades'


class NoticiaDetailView(PaginaMixin, DetailView):
    """Detalle de noticia: /noticia/<id>/ (404 si no existe)."""

    model = Noticia
    template_name = 'noticia.html'
    context_object_name = 'noticia'
    pagina = 'actualidad'

    def get_context_data(self, **kwargs):
        contexto = super().get_context_data(**kwargs)
        contexto['anterior'] = (
            Noticia.objects.filter(pk__lt=self.object.pk).order_by('-pk').first()
        )
        contexto['siguiente'] = (
            Noticia.objects.filter(pk__gt=self.object.pk).order_by('pk').first()
        )
        return contexto
