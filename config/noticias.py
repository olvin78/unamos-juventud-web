"""Datos de demostración de noticias.

Fuente de verdad para la vista de detalle (DetailView).
Las tarjetas de listado usan una copia ligera en static/js/main.js.
Cuando haya contenido oficial, sustituir esta lista por un modelo de BD.
"""

MESES_ES = ('ene', 'feb', 'mar', 'abr', 'may', 'jun',
            'jul', 'ago', 'sep', 'oct', 'nov', 'dic')

NOTICIAS = [
    {
        'id': 1,
        'fecha': '2026-09-12',
        'categoria': 'Comunicado',
        'titulo': 'Convocatoria a reunión informativa',
        'resumen': 'Convocatoria abierta a la juventud para participar en un encuentro informativo sobre los ejes de trabajo de la organización.',
        'img': 'noticia-1.jpg',
        'contenido': [
            'Juventud Renovadora convoca a la juventud de Unamos a una reunión informativa donde se presentarán los ejes de trabajo del periodo y los canales abiertos de participación. El encuentro está pensado como un espacio de diálogo, no solo de anuncios: quienes asistan podrán proponer, preguntar y vincularse a las actividades que se organicen desde la red juvenil.',
            'En la reunión se abordarán tres temas centrales: la agenda de formación política y ciudadana, los espacios de participación comunitaria y los programas de actividades abiertas al público. También se explicará cómo funcionan los grupos de trabajo y cómo cualquier joven interesada o interesado puede sumarse a ellos.',
            'La participación es libre y gratuita. Las personas menores de edad deberán venir acompañadas de su madre, padre o tutor legal. Al finalizar la sesión se abrirá un turno de preguntas y se compartirán los medios de contacto oficiales para mantenerse informado.',
            'Este contenido es una demostración de cómo se vería el detalle de una noticia en el sitio; el texto definitivo deberá ser validado y publicado por la organización.',
        ],
    },
    {
        'id': 2,
        'fecha': '2026-09-05',
        'categoria': 'Formación',
        'titulo': 'Taller de participación y liderazgo juvenil',
        'resumen': 'Espacio de formación política y ciudadana orientado a jóvenes interesados en el liderazgo comunitario y la participación pública.',
        'img': 'noticia-2.jpg',
        'contenido': [
            'El taller de participación y liderazgo juvenil es un espacio de formación dirigido a jóvenes interesados en incidir en su comunidad desde la política y la ciudadanía. La formación combina contenidos teóricos con dinámicas prácticas de debate, trabajo en equipo y diseño de proyectos comunitarios.',
            'Los módulos del taller incluyen: introducción a la participación ciudadana, herramientas de comunicación pública, organización de asambleas y elaboración de propuestas. Cada sesión termina con un ejercicio práctico que las y los participantes podrán aplicar en su propio barrio o comunidad.',
            'Las plazas son limitadas y la inscripción se gestiona a través de los canales oficiales de Juventud Renovadora. No se requiere experiencia previa en política partidaria: el único requisito es el interés por el compromiso comunitario.',
            'Este contenido es una demostración editorial; la programación definitiva del taller será confirmada por la organización.',
        ],
    },
    {
        'id': 3,
        'fecha': '2026-08-28',
        'categoria': 'Actividades',
        'titulo': 'Jornada de actividad abierta al público',
        'resumen': 'Jornada abierta a la comunidad con actividades de diálogo, convivencia y compromiso ciudadano.',
        'img': 'noticia-3.jpg',
        'contenido': [
            'La jornada de actividad abierta reúne actividades de convivencia, diálogo y participación abiertas a toda la comunidad. El objetivo es acercar la organización a la gente joven del municipio en un ambiente distendido, con espacios para escuchar, proponer y conocer de primera mano los proyectos en curso.',
            'La programación incluye mesas de diálogo sobre educación, empleo y participación; dinámicas de equipo; y un espacio cultural donde jóvenes de la región podrán compartir sus talentos. Todas las actividades son gratuitas y no requieren inscripción previa.',
            'La sede y el horario definitivos se anunciarán por los canales oficiales con la debida antelación. Se recomienda seguir las publicaciones para confirmar detalles antes de asistir.',
            'Este contenido es una demostración de la vista de detalle; la información logística real será publicada por la organización.',
        ],
    },
    {
        'id': 4,
        'fecha': '2026-08-19',
        'categoria': 'Organización',
        'titulo': 'Reunión de planificación de actividades',
        'resumen': 'Reunión de trabajo interno para organizar la agenda de actividades y prioridades del periodo.',
        'img': 'noticia-4.jpg',
        'contenido': [
            'La reunión de planificación es un espacio de trabajo interno donde los equipos de Juventud Renovadora organizan la agenda de actividades, asignan responsabilidades y definen prioridades del periodo. Es parte del funcionamiento ordinario de la red juvenil.',
            'En esta ocasión se revisaron los resultados de las actividades recientes, se calendarizaron los próximos encuentros de formación y se acordaron los mecanismos de coordinación con los grupos locales. También se definió el calendario editorial del sitio web: cada actividad y comunicado tendrá su ficha pública.',
            'Las conclusiones de la reunión se comunican a la militancia y al público a través de los canales oficiales, garantizando transparencia en el uso del tiempo y los recursos de la organización.',
            'Este contenido es una demostración; el acta y los acuerdos definitivos serán emitidos por la organización.',
        ],
    },
    {
        'id': 5,
        'fecha': '2026-08-10',
        'categoria': 'Comunidad',
        'titulo': 'Espacio de diálogo con la comunidad',
        'resumen': 'Encuentro abierto para escuchar propuestas de la comunidad y fortalecer los vínculos con la juventud.',
        'img': 'noticia-5.jpg',
        'contenido': [
            'El espacio de diálogo con la comunidad es un encuentro abierto donde Juventud Renovadora escucha las necesidades y propuestas de la gente joven y de las familias de Unamos. La participación de la comunidad no es decorativa: sus aportes alimentan directamente la agenda de actividades de la organización.',
            'Durante el encuentro se recogieron propuestas sobre espacios de recreación, programas de formación y mejoras en los servicios básicos dirigidos a jóvenes. Cada propuesta quedó registrada para su análisis por los equipos de trabajo.',
            'La organización reitera su compromiso de mantener canales de escucha permanentes, no solo en jornadas puntuales. Los comentarios y sugerencias pueden enviarse también a través del formulario de contacto del sitio.',
            'Este contenido es una demostración editorial pendiente de validación institucional.',
        ],
    },
    {
        'id': 6,
        'fecha': '2026-07-30',
        'categoria': 'Educación',
        'titulo': 'Ciclo de encuentros educativos',
        'resumen': 'Ciclo de encuentros educativos sobre participación, democracia y ciudadanía dirigido a jóvenes.',
        'img': 'noticia-6.jpg',
        'contenido': [
            'El ciclo de encuentros educativos ofrece sesiones sobre participación, democracia y ciudadanía dirigidas a jóvenes de la región. Cada sesión combina una breve exposición con un debate moderado, de modo que todas las personas asistentes puedan intervenir y compartir sus puntos de vista.',
            'Los temas del ciclo incluyen: derechos y deberes ciudadanos, participación juvenil en la vida pública, defensa del medio ambiente y cultura nicaragüense. Las sesiones son gratuitas y están abiertas al público en general, con especial interés en el público estudiantil.',
            'Quienes completen el ciclo recibirán un reconocimiento de participación. La programación y las sedes de cada sesión se publicarán con anticipación en los canales oficiales.',
            'Este contenido es una demostración de la vista dinámica de noticia; el programa real será confirmado por la organización.',
        ],
    },
]

for _n in NOTICIAS:
    _a, _m, _d = _n['fecha'].split('-')
    _n['fecha_legible'] = f"{int(_d)} {MESES_ES[int(_m) - 1]} {_a}"
