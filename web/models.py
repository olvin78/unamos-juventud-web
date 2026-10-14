"""Modelos del sitio: noticias, calendario de actividades y efemérides.

El contenido se administra desde /admin/ (no en ficheros Python).
Las plantillas usan las propiedades de cada modelo para las fechas y chips.
"""
from datetime import date

from django.db import models

MESES = ('ene', 'feb', 'mar', 'abr', 'may', 'jun',
         'jul', 'ago', 'sep', 'oct', 'nov', 'dic')


def fecha_corta(fecha: date) -> str:
    """12/09/2026 → «12 sep 2026» (formato compacto usado en tarjetas)."""
    return f'{fecha.day} {MESES[fecha.month - 1]} {fecha.year}'


class Noticia(models.Model):
    """Noticia, comunicado o actividad publicada en Actualidad."""

    class Categoria(models.TextChoices):
        COMUNICADO = 'Comunicado', 'Comunicado'
        FORMACION = 'Formación', 'Formación'
        ACTIVIDADES = 'Actividades', 'Actividades'
        ORGANIZACION = 'Organización', 'Organización'
        COMUNIDAD = 'Comunidad', 'Comunidad'
        EDUCACION = 'Educación', 'Educación'

    fecha = models.DateField('Fecha de publicación')
    categoria = models.CharField(
        'Categoría', max_length=20, choices=Categoria.choices,
        default=Categoria.COMUNICADO,
    )
    titulo = models.CharField('Título', max_length=150)
    resumen = models.CharField('Resumen', max_length=300)
    img = models.CharField(
        'Imagen', max_length=60,
        help_text='Nombre del fichero en static/img/noticias/ (por ejemplo: noticia-1.jpg)',
    )
    contenido = models.JSONField(
        'Contenido', default=list,
        help_text='Lista de párrafos del cuerpo de la noticia',
    )

    class Meta:
        ordering = ['-fecha', '-pk']
        verbose_name = 'Noticia'
        verbose_name_plural = 'Noticias'

    def __str__(self):
        return self.titulo

    @property
    def fecha_compacta(self) -> str:
        return fecha_corta(self.fecha)

    @property
    def fecha_legible(self) -> str:
        return fecha_corta(self.fecha)


class Actividad(models.Model):
    """Entrada del calendario de actividades juveniles."""

    class Modalidad(models.TextChoices):
        PRESENCIAL = 'Presencial', 'Presencial'
        VIRTUAL = 'Virtual', 'Virtual'
        MIXTA = 'Mixta', 'Mixta'

    class Estado(models.TextChoices):
        PROXIMA = 'proxima', 'Próxima'
        PENDIENTE = 'pendiente', 'Pendiente de confirmación'
        FINALIZADA = 'finalizada', 'Finalizada'

    CHIPS = {
        Estado.PROXIMA: 'chip--proxima',
        Estado.PENDIENTE: 'chip--pendiente',
        Estado.FINALIZADA: 'chip--finalizada',
    }

    fecha = models.DateField('Fecha')
    nombre = models.CharField('Nombre', max_length=150)
    descripcion = models.CharField('Descripción', max_length=300)
    modalidad = models.CharField(
        'Modalidad', max_length=20, choices=Modalidad.choices,
        default=Modalidad.PRESENCIAL,
    )
    estado = models.CharField(
        'Estado', max_length=20, choices=Estado.choices,
        default=Estado.PROXIMA,
    )

    class Meta:
        ordering = ['-fecha', '-pk']
        verbose_name = 'Actividad'
        verbose_name_plural = 'Actividades'

    def __str__(self):
        return f'{self.fecha:%d/%m/%Y} · {self.nombre}'

    @property
    def dia(self) -> str:
        return f'{self.fecha.day:02d}'

    @property
    def mes(self) -> str:
        return MESES[self.fecha.month - 1]

    @property
    def anio(self) -> int:
        return self.fecha.year

    @property
    def estado_texto(self) -> str:
        return self.get_estado_display()

    @property
    def estado_clase(self) -> str:
        return self.CHIPS[self.estado]


class Efemeride(models.Model):
    """Fecha de referencia cultural, histórica o social de Nicaragua."""

    class Tipo(models.TextChoices):
        CULTURA = 'Cultura', 'Cultura'
        AMBIENTE = 'Ambiente', 'Ambiente'
        JUVENTUD = 'Juventud', 'Juventud'
        HISTORIA = 'Historia', 'Historia'

    fecha = models.DateField('Fecha')
    titulo = models.CharField('Título', max_length=120)
    detalle = models.CharField('Detalle', max_length=160)
    tipo = models.CharField(
        'Tipo', max_length=20, choices=Tipo.choices, default=Tipo.CULTURA
    )

    class Meta:
        ordering = ['-fecha', '-pk']
        verbose_name = 'Efemeride'
        verbose_name_plural = 'Efemérides'

    def __str__(self):
        return f'{self.fecha:%d/%m} · {self.titulo}'

    @property
    def dia(self) -> str:
        return f'{self.fecha.day:02d}'

    @property
    def mes(self) -> str:
        return MESES[self.fecha.month - 1]
