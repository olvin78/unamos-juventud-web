"""Vistas del sitio (solo la de detalle de noticia por ahora)."""
from django.http import Http404
from django.views.generic import DetailView

from .noticias import NOTICIAS


class NoticiaDetailView(DetailView):
    """Detalle de una noticia: /noticia/<id>/

    Trabaja con la lista NOTICIAS (demo). Si más adelante se crea un modelo
    en el admin, basta con eliminar get_object() y añadir model = Noticia.
    """
    template_name = 'noticia.html'
    context_object_name = 'noticia'

    def get_object(self, queryset=None):
        pk = self.kwargs.get('pk')
        noticia = next((n for n in NOTICIAS if n['id'] == pk), None)
        if noticia is None:
            raise Http404(f'No existe la noticia {pk}')
        return noticia

    def get_context_data(self, **kwargs):
        ctx = super().get_context_data(**kwargs)
        i = NOTICIAS.index(self.object)
        ctx['anterior'] = NOTICIAS[i - 1] if i > 0 else None
        ctx['siguiente'] = NOTICIAS[i + 1] if i + 1 < len(NOTICIAS) else None
        return ctx
