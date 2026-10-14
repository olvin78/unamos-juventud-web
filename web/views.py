"""Vistas del sitio con clases basadas en vistas genéricas de Django.

- PaginaView (TemplateView): páginas institucionales estáticas.
- InicioView (TemplateView): portada, con datos para las listas de home.
- ActualidadListView / ActividadesListView (ListView): listados.
- NoticiaDetailView (DetailView): detalle con anterior/siguiente.
"""
from django.http import Http404
from django.views.generic import DetailView, ListView, TemplateView

from .data import ACTIVIDADES, EFEMERIDES, NOTICIAS


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
    """Portada: el header se superpone al hero y las listas se recortan."""

    template_name = 'index.html'
    pagina = 'inicio'

    def get_context_data(self, **kwargs):
        contexto = super().get_context_data(**kwargs)
        contexto.update({
            'cabecera_transparente': True,
            'noticias': NOTICIAS[:3],
            'actividades': ACTIVIDADES[:3],
            'efemerides': EFEMERIDES[:5],
        })
        return contexto


class ActualidadListView(PaginaMixin, ListView):
    """Listado de noticias con filtros por categoría (cliente)."""

    template_name = 'actualidad.html'
    context_object_name = 'noticias'
    queryset = NOTICIAS[:6]
    pagina = 'actualidad'


class ActividadesListView(PaginaMixin, ListView):
    """Listado de actividades con filtros por estado (cliente)."""

    template_name = 'actividades.html'
    context_object_name = 'actividades'
    queryset = ACTIVIDADES[:6]
    pagina = 'actividades'


class NoticiaDetailView(PaginaMixin, DetailView):
    """Detalle de noticia: /noticia/<id>/ (404 si no existe).

    Trabaja con la lista NOTICIAS (demo). Si más adelante se crea un modelo
    en el admin, basta con declarar model = Noticia y eliminar get_object().
    """

    template_name = 'noticia.html'
    context_object_name = 'noticia'
    pagina = 'actualidad'

    def get_object(self, queryset=None):
        pk = self.kwargs.get('pk')
        noticia = next((n for n in NOTICIAS if n['id'] == pk), None)
        if noticia is None:
            raise Http404(f'No existe la noticia {pk}')
        return noticia

    def get_context_data(self, **kwargs):
        contexto = super().get_context_data(**kwargs)
        indice = NOTICIAS.index(self.object)
        contexto['anterior'] = NOTICIAS[indice - 1] if indice > 0 else None
        contexto['siguiente'] = (
            NOTICIAS[indice + 1] if indice + 1 < len(NOTICIAS) else None
        )
        return contexto
