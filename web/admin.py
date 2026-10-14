"""Registro de los modelos del sitio en el panel de administración."""
from django.contrib import admin

from .models import Actividad, Efemeride, Noticia


@admin.register(Noticia)
class NoticiaAdmin(admin.ModelAdmin):
    list_display = ('fecha', 'categoria', 'titulo')
    list_filter = ('categoria', 'fecha')
    search_fields = ('titulo', 'resumen')
    date_hierarchy = 'fecha'
    fieldsets = (
        ('Publicación', {'fields': ('fecha', 'categoria')}),
        ('Contenido', {'fields': ('titulo', 'resumen', 'contenido')}),
        ('Imagen', {'fields': ('img',)}),
    )


@admin.register(Actividad)
class ActividadAdmin(admin.ModelAdmin):
    list_display = ('fecha', 'nombre', 'modalidad', 'estado')
    list_filter = ('estado', 'modalidad', 'fecha')
    search_fields = ('nombre', 'descripcion')
    date_hierarchy = 'fecha'
    ordering = ('-fecha',)


@admin.register(Efemeride)
class EfemerideAdmin(admin.ModelAdmin):
    list_display = ('fecha', 'titulo', 'tipo')
    list_filter = ('tipo',)
    search_fields = ('titulo', 'detalle')
    date_hierarchy = 'fecha'
    ordering = ('-fecha',)


admin.site.site_header = 'Juventud Renovadora UNAMOS'
admin.site.site_title = 'JR UNAMOS'
admin.site.index_title = 'Administración del sitio'
