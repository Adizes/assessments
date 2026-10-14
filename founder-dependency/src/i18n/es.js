/* Founder Dependency Assessment — Español
 * Mismas llaves que en.js. Los `value` de las opciones NO se traducen (van al Sheet / HubSpot).
 */
FD_I18N.es = {
  code: 'es',
  langName: 'Español',
  locale: 'es-MX',

  ui: {
    start: 'Comenzar la evaluación',
    continue: 'Continuar',
    back: 'Atrás',
    next: 'Siguiente',
    ok: 'OK',
    pressEnter: 'presiona Enter ↵',
    keyboardHint: 'Tip: usa las teclas 1–5',
    required: 'Elige una opción.',
    question: 'Pregunta',
    of: 'de',
    section: 'Sección',
    minutes: '≈ 4 minutos · 22 preguntas · reporte gratuito',
    resume: 'Tienes una evaluación en curso.',
    resumeYes: 'Continuar donde me quedé',
    resumeNo: 'Empezar de nuevo',
    language: 'Idioma',
    loading: 'Analizando tus respuestas…',
    errorGeneric: 'Algo salió mal. Inténtalo de nuevo.',
    retry: 'Reintentar',
  },

  intro: {
    eyebrow: 'Evaluación de Dependencia del Fundador',
    title: '¿Cuánto depende todavía tu empresa de ti?',
    body: 'Todo fundador llega tarde o temprano a la misma encrucijada: el involucramiento que construyó la empresa empieza a limitar cuánto más puede crecer. En unos minutos verás dónde vive esa dependencia en tu organización y por dónde empezar a reducirla.',
    bullets: [
      'Tu nivel de dependencia, en un índice de 0 a 100',
      'Un mapa de seis áreas donde la dependencia suele esconderse',
      'Primeros pasos concretos para tu resultado',
    ],
  },

  scale: [
    { value: 1, label: 'Nada cierto' },
    { value: 2, label: 'Rara vez cierto' },
    { value: 3, label: 'A veces cierto' },
    { value: 4, label: 'Casi siempre cierto' },
    { value: 5, label: 'Totalmente cierto' },
  ],
  scaleIntro: 'Indica qué tan bien describe cada afirmación a tu empresa hoy. Responde según cómo funcionan las cosas en realidad, no cómo deberían funcionar.',

  context: [
    {
      id: 'companySize',
      title: '¿Cuántas personas trabajan en tu empresa?',
      options: [
        { value: '1–10 employees', label: '1–10 empleados' },
        { value: '11–25 employees', label: '11–25 empleados' },
        { value: '26–50 employees', label: '26–50 empleados' },
        { value: '51–100 employees', label: '51–100 empleados' },
        { value: '101–250 employees', label: '101–250 empleados' },
        { value: '251–500 employees', label: '251–500 empleados' },
        { value: '500+ employees', label: 'Más de 500 empleados' },
      ],
    },
    {
      id: 'jobTitle',
      title: '¿Cuál es tu rol?',
      options: [
        { value: 'Founder', label: 'Fundador(a)' },
        { value: 'CEO', label: 'CEO' },
        { value: 'Co-Founder', label: 'Cofundador(a)' },
        { value: 'President', label: 'Presidente(a)' },
        { value: 'Managing Director', label: 'Director(a) General' },
        { value: 'Business Owner', label: 'Dueño(a) de negocio' },
        { value: 'Other', label: 'Otro' },
      ],
    },
  ],

  dimensions: [
    {
      key: 'decisions',
      name: 'Toma de decisiones',
      short: 'Decisiones',
      intro: 'Cómo se mueven las decisiones en tu empresa.',
      items: [
        'Las decisiones importantes **se detienen hasta que me involucro personalmente**.',
        'Mi equipo directivo **me pide aprobación** en decisiones que debería poder tomar por su cuenta.',
        'La gente prefiere **traerme los problemas directamente** en lugar de resolverlos con sus jefes.',
      ],
      reading: {
        low: 'Las decisiones avanzan sin ti. Tu equipo tiene la autoridad y la confianza para decidir.',
        mid: 'Algunas decisiones todavía te esperan. Aclarar quién decide qué aceleraría mucho las cosas.',
        high: 'Eres el canal principal de decisión. Cada decisión que te espera frena a toda la empresa.',
      },
    },
    {
      key: 'delegation',
      name: 'Delegación y responsabilidad',
      short: 'Delegación',
      intro: 'Si lo que delegas realmente se queda delegado.',
      items: [
        'Delego responsabilidades, pero **con frecuencia vuelvo a meterme** cuando no me gusta cómo se manejan.',
        'Cuando algo importante sale mal, no queda claro **quién es responsable** del resultado.',
        'Sigo **haciendo tareas operativas** que ya deberían ser de otro líder o área.',
      ],
      reading: {
        low: 'La delegación se sostiene. La responsabilidad está clara y la gente responde por los resultados.',
        mid: 'Las responsabilidades se delegan, pero tienden a regresar a ti.',
        high: 'Se delegan tareas, pero no la responsabilidad, así que los problemas vuelven a tu escritorio.',
      },
    },
    {
      key: 'structure',
      name: 'Estructura organizacional',
      short: 'Estructura',
      intro: 'Si los roles y las líneas de reporte coinciden con la realidad.',
      items: [
        'Los roles **crecieron de manera informal** con la empresa y quedaron traslapes o huecos.',
        'A veces los colaboradores reciben **instrucciones contradictorias** de mí y de su jefe directo.',
        'La forma en que realmente se toman las decisiones **no coincide con el organigrama**.',
      ],
      reading: {
        low: 'Tu estructura refleja cómo funciona la empresa en realidad.',
        mid: 'La estructura se quedó un paso atrás del crecimiento de la empresa.',
        high: 'La organización real gira alrededor de ti, no a través del organigrama.',
      },
    },
    {
      key: 'leadership',
      name: 'Capacidad del equipo directivo',
      short: 'Equipo directivo',
      intro: 'Si tus líderes lideran o te esperan.',
      items: [
        'Algunos de mis líderes son **excelentes ejecutores, pero siguen dependiendo de mí** para la dirección y las prioridades.',
        'Mis directivos son mejores **transmitiendo mis decisiones que cuestionándolas** o aportando otras perspectivas.',
        'Las relaciones, el conocimiento o la influencia clave de la empresa **están concentrados en mí**.',
      ],
      reading: {
        low: 'Tienes un equipo que lidera, no solo que ejecuta.',
        mid: 'Tus líderes ejecutan bien, pero todavía te buscan para saber hacia dónde ir.',
        high: 'Tu equipo transmite tus decisiones; el conocimiento de la empresa sigue viviendo en ti.',
      },
    },
    {
      key: 'focus',
      name: 'Enfoque estratégico',
      short: 'Enfoque',
      intro: 'Si las prioridades se sostienen una vez definidas.',
      items: [
        'Las nuevas oportunidades **desvían con frecuencia a la empresa** de las prioridades que ya acordamos.',
        '**Inicio más proyectos** de los que la organización puede ejecutar de forma realista.',
        'A mi equipo **le cuesta distinguir** entre mis ideas, mis sugerencias y mis decisiones finales.',
      ],
      reading: {
        low: 'Las prioridades se sostienen. Tus ideas se distinguen claramente de los compromisos.',
        mid: 'El enfoque a veces se diluye con nuevas iniciativas o señales poco claras.',
        high: 'Demasiadas iniciativas nacen de ti y el equipo no sabe cuáles van en serio.',
      },
    },
    {
      key: 'systems',
      name: 'Sistemas y ejecución',
      short: 'Sistemas',
      intro: 'Si el trabajo funciona con sistemas o con seguimiento personal.',
      items: [
        'Los procesos clave dependen más de **personas específicas y de su seguimiento** que de sistemas confiables.',
        'Lo que se decide en las juntas **no siempre se convierte** en responsables, fechas y seguimiento claros.',
        'Si me desconectara por completo durante 30 días, el desempeño, las decisiones o el enfoque **se deteriorarían de forma importante**.',
      ],
      reading: {
        low: 'La ejecución funciona con sistemas, estés o no en la sala.',
        mid: 'Algunos procesos todavía dependen de que alguien persiga las cosas a mano.',
        high: 'La ejecución depende de tu seguimiento. Si te alejas, las cosas se frenan.',
      },
    },
  ],

  closing: [
    {
      id: 'qInaction',
      title: 'Si nada cambia en los próximos 12 meses, ¿cuál es la consecuencia más probable?',
      options: [
        { value: 'I will remain the bottleneck.', label: 'Seguiré siendo el cuello de botella' },
        { value: 'Our growth will slow down.', label: 'Nuestro crecimiento se va a frenar' },
        { value: 'My leadership team will continue depending on me.', label: 'Mi equipo directivo seguirá dependiendo de mí' },
        { value: 'We will struggle to execute our strategy.', label: 'Nos costará ejecutar nuestra estrategia' },
        { value: 'I\'m not sure yet.', label: 'Todavía no estoy seguro(a)' },
      ],
    },
    {
      id: 'qTimeline',
      title: '¿Cuándo te gustaría atender esto?',
      options: [
        { value: 'Immediately', label: 'De inmediato' },
        { value: 'Within the next 3 months', label: 'En los próximos 3 meses' },
        { value: 'Within the next 12 months', label: 'En los próximos 12 meses' },
        { value: 'I\'m just exploring options', label: 'Solo estoy explorando' },
      ],
    },
  ],

  gate: {
    eyebrow: 'Tu reporte está listo',
    title: '¿A dónde te lo enviamos?',
    body: 'Ve tus resultados de inmediato y recibe el reporte completo en PDF por correo.',
    name: 'Nombre completo',
    namePh: 'Ana Pérez',
    email: 'Correo de trabajo',
    emailPh: 'ana@empresa.com',
    company: 'Empresa',
    companyPh: 'Nombre de la empresa',
    consent: 'Acepto el {privacy} y recibir mis resultados e información relacionada del Instituto Adizes.',
    privacy: 'Aviso de Privacidad',
    submit: 'Ver mis resultados',
    errName: 'Escribe tu nombre.',
    errEmail: 'Escribe un correo válido.',
    errCompany: 'Escribe tu empresa.',
    errConsent: 'Acepta para continuar.',
  },

  levels: {
    L1: {
      name: 'Escalable',
      tag: 'Dependencia baja',
      summary: 'Tu empresa puede operar con eficacia sin tu intervención constante.',
      body: [
        'Las decisiones, la responsabilidad y la ejecución diaria están repartidas en un equipo capaz y en sistemas que funcionan estés o no en la sala. Tu rol ya pasó de hacer el trabajo a diseñar cómo se hace.',
        'Desde la perspectiva de Adizes sobre cómo crecen las empresas, este es el mejor lugar para estar. Adizes lo llama **Plenitud** (Prime): el punto en que una empresa está bien organizada y todavía puede moverse rápido. Pocas organizaciones llegan ahí, y menos aún se quedan.',
      ],
      watch: 'El riesgo ahora no es la dependencia, sino retroceder. Cuando llega la presión, muchos fundadores vuelven a meterse y, sin darse cuenta, centralizan otra vez la empresa a su alrededor.',
    },
    L2: {
      name: 'En transición',
      tag: 'Dependencia moderada',
      summary: 'Algunas cosas ya funcionan sin ti, pero partes clave del negocio todavía pasan por ti.',
      body: [
        'Ya delegaste con éxito ciertas decisiones, funciones o sistemas, pero todavía te jalan al centro más seguido de lo que quisieras. Las cosas avanzan cuando estás y se frenan cuando no.',
        'Adizes describe una etapa llamada la **Trampa del Fundador**: la empresa se volvió demasiado compleja para que una sola persona la dirija, pero todavía depende de esa persona para avanzar. Tú ya empezaste a salir de ella. Las empresas no salen solas: salen de forma deliberada, trasladando decisiones, responsabilidad y conocimiento del fundador a la organización.',
      ],
      watch: 'Esta etapa es inestable. Los hábitos que construyas en los próximos meses decidirán si completas la transición o vuelves a ser el cuello de botella.',
    },
    L3: {
      name: 'Centrada en el fundador',
      tag: 'Dependencia alta',
      summary: 'La dependencia del fundador ya está limitando la responsabilidad, el crecimiento de tus directivos y la capacidad de escalar.',
      body: [
        'Tu equipo te trae de manera habitual decisiones que podría tomar solo, y su desarrollo se estanca porque sigues cargando responsabilidades que ya deberían ser suyas. El costo ya no es teórico: la ejecución se frena porque todo pasa por ti, y el negocio queda expuesto cada vez que no estás disponible.',
        'Esto es lo que Adizes llama la **Trampa del Fundador**. No es señal de fracaso: casi toda empresa exitosa pasa por aquí, impulsada por la energía y la visión de su fundador. Pero en esta etapa tu capacidad personal se convierte en el techo de hasta dónde puede llegar el negocio.',
      ],
      watch: 'Adizes hace una distinción clave: delegar **tareas** no es lo mismo que delegar **decisiones**. Salir de esta etapa requiere lo segundo.',
    },
    L4: {
      name: 'Dependiente del fundador',
      tag: 'Dependencia crítica',
      summary: 'Hoy tú eres el sistema operativo de la empresa.',
      body: [
        'La toma de decisiones y la coordinación pasan por ti personalmente, así que cuando no estás disponible la empresa prácticamente se detiene. Eso concentra muchísimo riesgo en una sola persona y le pone un techo duro al crecimiento: la empresa solo puede ser tan grande como lo que una persona puede manejar.',
        'En el marco de Adizes, esta es la forma más profunda de la **Trampa del Fundador**: la empresa todavía no puede funcionar sin su fundador, así que no puede pasar a su siguiente etapa de crecimiento. Es común y tiene solución, pero no se resuelve sola.',
      ],
      watch: 'No es motivo de alarma, pero sí de urgencia. La respuesta no es trabajar más, porque eso profundiza la dependencia. Es empezar a reconstruir la empresa para que funcione sin ti en el centro.',
    },
  },

  bands: {
    B1: { name: 'Fortaleza', range: '3–6', desc: 'Funciona en gran medida sin ti.' },
    B2: { name: 'Riesgo emergente', range: '7–9', desc: 'Funciona por ahora; ya hay grietas.' },
    B3: { name: 'Dependencia significativa', range: '10–12', desc: 'Se apoya en ti y frena a la empresa.' },
    B4: { name: 'Prioridad inmediata', range: '13–15', desc: 'Un cuello de botella principal.' },
  },

  recs: {
    L1: {
      lead: 'Construiste algo poco común. El trabajo ahora es proteger esa independencia y llevarla más lejos.',
      steps: [
        { t: 'Pon por escrito lo que ya funciona.', d: 'Los hábitos que permiten que tu empresa funcione sin ti suelen vivir en las rutinas de la gente, no en papel. Documenta cómo se toman las decisiones clave, quién es dueño de qué y cómo se sostienen los estándares. Adizes lo llama "institucionalizar": convertir el conocimiento individual en memoria de la organización.' },
        { t: 'Lleva la autonomía un nivel más abajo.', d: 'Ya delegaste decisiones a tus líderes; ahora ayúdalos a hacer lo mismo con sus equipos, para que la autoridad esté lo más cerca posible del trabajo.' },
        { t: 'Reinvierte el tiempo que liberaste.', d: 'Úsalo en estrategia, crecimiento y en desarrollar a tus sucesores, no en volver a la operación. Así una empresa se mantiene en Plenitud.' },
      ],
    },
    L2: {
      lead: 'Ya saliste en parte de la Trampa del Fundador. Ahora mismo, tres movimientos son los que más importan.',
      steps: [
        { t: 'Identifica tus tres cuellos de botella principales.', d: 'Haz una lista de cada decisión y tarea que todavía requiere de ti y elige las tres de mayor impacto. Delegar todo a la vez falla; delegar lo esencial funciona.' },
        { t: 'Dale a cada resultado crítico un solo dueño.', d: 'Cuando todos son responsables, nadie lo es, y termina en ti. Asigna una sola persona a cada resultado importante y hazla responsable del resultado, no solo de la actividad.' },
        { t: 'Instala un ritmo semanal de liderazgo.', d: 'Una junta recurrente donde tus líderes revisen avances y tomen decisiones, idealmente sin necesitarte en la sala. Así se construye un equipo que funciona por sí solo.' },
      ],
    },
    L3: {
      lead: 'El negocio pasa por ti, así que lo de mayor impacto es empezar a trasladar lo que está en tu cabeza a personas y sistemas.',
      steps: [
        { t: 'Empieza por las decisiones.', d: 'Escribe cinco decisiones que hoy solo tú puedes tomar. Para cada una, nombra a alguien que podría aprender a hacerse cargo y entrégale la autoridad para decidir, no solo la tarea.' },
        { t: 'Construye tu capa de liderazgo.', d: 'Dale a dos o tres personas clave responsabilidad real sobre resultados que hoy te escalan. Adizes describe a las empresas sanas como dirigidas por un equipo complementario, donde las fortalezas de unos cubren los puntos ciegos de otros.' },
        { t: 'Sistematiza un proceso clave de principio a fin.', d: 'Elige un proceso crítico (cómo vendes, entregas o contratas) y conviértelo en un sistema documentado y repetible que avance por sus propios pasos y no por tu seguimiento.' },
      ],
    },
    L4: {
      lead: 'No tienes que arreglarlo todo de una vez; tienes que empezar. En tu nivel, estos tres movimientos son los de mayor impacto.',
      steps: [
        { t: 'Empieza por las decisiones.', d: 'Escribe cinco decisiones que hoy solo tú puedes tomar. Para cada una, nombra a alguien que podría aprender a hacerse cargo y entrégale la autoridad para decidir, no solo la tarea. Es la forma más rápida de recuperar tu tiempo.' },
        { t: 'Construye tu capa de liderazgo.', d: 'Elige a dos o tres personas y dales responsabilidad real sobre resultados que hoy te escalan. Una empresa que descansa en una sola persona no puede crecer más allá de esa persona.' },
        { t: 'Sistematiza un proceso clave de principio a fin.', d: 'Elige un proceso crítico y conviértelo en un sistema documentado y repetible. Un proceso bien hecho se vuelve la plantilla para los demás.' },
      ],
    },
  },

  results: {
    eyebrow: 'Tu resultado de Dependencia del Fundador',
    indexLabel: 'Índice de dependencia',
    indexHelp: '0 = la empresa funciona sin ti · 100 = todo depende de ti',
    whatMeans: 'Qué significa',
    mapTitle: 'Dónde vive tu dependencia',
    mapBody: 'Cada área se califica de 3 a 15. Entre más alto el número, más depende esa área de ti. Dos fundadores pueden tener el mismo resultado general y cuellos de botella completamente distintos.',
    startHere: 'Empieza aquí',
    stepsTitle: 'Tus primeros pasos',
    pdfTitle: 'Tu reporte completo',
    pdfSent: 'También enviamos el PDF a {email}.',
    pdfSending: 'Enviando el PDF a {email}…',
    pdfError: 'No pudimos enviar el PDF por correo, pero puedes descargarlo aquí.',
    download: 'Descargar PDF',
    preparing: 'Preparando PDF…',
    sessionEyebrow: 'Gratis · 30 minutos',
    sessionTitle: 'Convierte este diagnóstico en un plan',
    sessionBody: 'Tus respuestas muestran dónde vive la dependencia del fundador, pero todavía no cómo eliminarla. En una Sesión de Implementación gratuita de 30 minutos, un Asociado Certificado de Adizes revisa tus resultados contigo, te explica la dinámica detrás de ellos y te ayuda a trazar tus primeros pasos prácticos. Abrimos un número limitado de sesiones cada mes.',
    sessionCta: 'Agendar mi sesión gratuita',
    retake: 'Volver a hacer la evaluación',
    paidEyebrow: 'Reporte completo',
    paidTitle: 'Obtén tu Plan de Transferencia del Fundador',
    paidBody: 'Un análisis profundo de tus 18 respuestas, qué significa tu combinación de resultados, un plan de 90 días centrado en tus dos áreas críticas y una hoja de trabajo para delegar decisiones.',
    paidCta: 'Desbloquear reporte completo',
  },

  pdf: {
    title: 'Dependencia',
    title2: 'del Fundador',
    preparedFor: 'Preparado para',
    date: 'Fecha',
    page: 'Página',
    yourResult: 'Tu resultado',
    lenses: 'Cómo leer este reporte',
    lensesBody: 'Este reporte lee tus respuestas a través de dos lentes: tu nivel general de dependencia (cuánto depende todavía la empresa de ti personalmente) y seis áreas que muestran exactamente dónde vive esa dependencia. Al final encontrarás primeros pasos concretos para tu resultado.',
    methodNote: 'Este diagnóstico se basa en la metodología Adizes Symbergetic™ Management, un marco sobre cómo crecen y maduran las organizaciones que empresas de todo el mundo usan desde hace más de 50 años. Cada vez que usamos una idea de Adizes, la explicamos en palabras sencillas.',
    table: { area: 'Área', score: 'Puntaje', result: 'Resultado' },
    nextStep: 'Este es el primer paso',
    nextBody: 'Ya sabes dónde vive la dependencia del fundador en tu organización y por dónde empezar. La parte difícil, reducirla de verdad, es un proceso, y ahí es donde trabajar con alguien que ha guiado a cientos de empresas marca la diferencia.',
    nextCta: 'Agenda tu sesión gratuita de 30 minutos',
    footer: 'adizes.com',
  },

  email: {
    subject: 'Tu reporte de Dependencia del Fundador',
  },
};
