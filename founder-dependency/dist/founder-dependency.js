/*! Adizes · Founder Dependency Assessment v1.0.0 · github.com/Adizes/assessments */
(function(){
var FD_I18N = {};
/* Founder Dependency Assessment — English
 * To add a language: copy this file (e.g. pt.js), translate every string, keep the keys,
 * set `code`, and add the file to build.mjs. Option `value`s must stay the same in every
 * language (they are what goes to the Sheet / HubSpot).
 */
FD_I18N.en = {
  code: 'en',
  langName: 'English',
  locale: 'en-US',

  ui: {
    start: 'Start the assessment',
    continue: 'Continue',
    back: 'Back',
    next: 'Next',
    ok: 'OK',
    pressEnter: 'press Enter ↵',
    keyboardHint: 'Tip: use keys 1–5',
    required: 'Please choose an option.',
    question: 'Question',
    of: 'of',
    section: 'Section',
    minutes: '≈ 4 minutes · 22 questions · free report',
    resume: 'You have an assessment in progress.',
    resumeYes: 'Continue where I left off',
    resumeNo: 'Start over',
    language: 'Language',
    loading: 'Analyzing your answers…',
    errorGeneric: 'Something went wrong. Please try again.',
    retry: 'Try again',
  },

  intro: {
    eyebrow: 'Founder Dependency Assessment',
    title: 'How much does your company still depend on you?',
    body: 'Every founder eventually reaches the same crossroads: the involvement that built the company starts to limit how far it can grow. In a few minutes, see where that dependency lives in your organization — and where to start reducing it.',
    bullets: [
      'Your dependency level, on a 0–100 index',
      'A map of six areas where dependency usually hides',
      'Concrete first steps for your result',
    ],
  },

  scale: [
    { value: 1, label: 'Not at all true' },
    { value: 2, label: 'Rarely true' },
    { value: 3, label: 'Sometimes true' },
    { value: 4, label: 'Usually true' },
    { value: 5, label: 'Completely true' },
  ],
  scaleIntro: 'Rate how accurately each statement describes your company today. Answer for how things actually work — not how they are supposed to.',

  context: [
    {
      id: 'companySize',
      title: 'How many people work at your company?',
      options: [
        { value: '1–10 employees', label: '1–10 employees' },
        { value: '11–25 employees', label: '11–25 employees' },
        { value: '26–50 employees', label: '26–50 employees' },
        { value: '51–100 employees', label: '51–100 employees' },
        { value: '101–250 employees', label: '101–250 employees' },
        { value: '251–500 employees', label: '251–500 employees' },
        { value: '500+ employees', label: '500+ employees' },
      ],
    },
    {
      id: 'jobTitle',
      title: 'What is your role?',
      options: [
        { value: 'Founder', label: 'Founder' },
        { value: 'CEO', label: 'CEO' },
        { value: 'Co-Founder', label: 'Co-Founder' },
        { value: 'President', label: 'President' },
        { value: 'Managing Director', label: 'Managing Director' },
        { value: 'Business Owner', label: 'Business Owner' },
        { value: 'Other', label: 'Other' },
      ],
    },
  ],

  dimensions: [
    {
      key: 'decisions',
      name: 'Decision-making',
      short: 'Decisions',
      intro: 'How decisions move through your company.',
      items: [
        'Important decisions **stall until I get personally involved**.',
        'My leadership team **asks for my approval** on decisions they should be able to make on their own.',
        'People prefer to **bring problems straight to me** rather than solve them through their managers.',
      ],
      reading: {
        low: 'Decisions move without you. Your team has both the authority and the confidence to decide.',
        mid: 'Some decisions still wait for you. Clarifying who decides what would speed things up noticeably.',
        high: 'You are the main decision channel. Every choice that waits for you slows the whole company.',
      },
    },
    {
      key: 'delegation',
      name: 'Delegation & accountability',
      short: 'Delegation',
      intro: 'Whether what you hand off actually stays handed off.',
      items: [
        'I delegate responsibilities, but **often step back in** when I don\'t like how they are being handled.',
        'When something important goes wrong, it isn\'t clear **who is accountable** for the result.',
        'I still **perform operational tasks** that should belong to another leader or function.',
      ],
      reading: {
        low: 'Delegation sticks. Ownership is clear and people answer for results.',
        mid: 'Responsibilities get handed off, but they tend to come back to you.',
        high: 'Tasks are delegated but accountability isn\'t — so problems return to your desk.',
      },
    },
    {
      key: 'structure',
      name: 'Organizational structure',
      short: 'Structure',
      intro: 'Whether roles and reporting lines match reality.',
      items: [
        'Roles have **grown informally** as the company grew, leaving overlaps or gaps.',
        'Employees sometimes get **conflicting instructions** from me and from their direct manager.',
        'How decisions are really made **differs from what the org chart suggests**.',
      ],
      reading: {
        low: 'Your structure reflects how the company really works.',
        mid: 'The structure has fallen a step behind the company\'s growth.',
        high: 'The real organization runs around you, not through the org chart.',
      },
    },
    {
      key: 'leadership',
      name: 'Leadership-team capability',
      short: 'Leadership team',
      intro: 'Whether your leaders lead — or wait for you.',
      items: [
        'Some of my leaders are **excellent executors but still depend on me** for direction and priorities.',
        'My managers are better at **relaying my decisions than challenging them** or bringing different perspectives.',
        'The company\'s key relationships, knowledge or influence are **concentrated in me**.',
      ],
      reading: {
        low: 'You have a team that leads, not just executes.',
        mid: 'Your leaders execute well but still look to you for direction.',
        high: 'Your team relays your decisions; the company\'s know-how still lives in you.',
      },
    },
    {
      key: 'focus',
      name: 'Strategic focus',
      short: 'Focus',
      intro: 'Whether priorities hold once they are set.',
      items: [
        'New opportunities **often pull the company away** from priorities we already agreed on.',
        'I **start more initiatives** than the organization can realistically execute.',
        'My team **struggles to tell apart** my ideas, my suggestions and my final decisions.',
      ],
      reading: {
        low: 'Priorities hold. Your ideas are clearly separated from commitments.',
        mid: 'Focus is sometimes diluted by new initiatives or unclear signals.',
        high: 'Too many initiatives start with you, and the team can\'t tell which ones are real.',
      },
    },
    {
      key: 'systems',
      name: 'Systems & execution',
      short: 'Systems',
      intro: 'Whether work runs on systems or on follow-up.',
      items: [
        'Key processes depend more on **specific people and personal follow-up** than on reliable systems.',
        'Decisions made in meetings **don\'t consistently turn into** clear owners, deadlines and follow-up.',
        'If I disconnected completely for 30 days, performance, decisions or focus **would suffer significantly**.',
      ],
      reading: {
        low: 'Execution runs on systems that work whether or not you are in the room.',
        mid: 'Some processes still rely on people chasing things manually.',
        high: 'Execution runs on your follow-up. Step away and things slow down.',
      },
    },
  ],

  closing: [
    {
      id: 'qInaction',
      title: 'If nothing changes in the next 12 months, what is the most likely consequence?',
      options: [
        { value: 'I will remain the bottleneck.', label: 'I will remain the bottleneck' },
        { value: 'Our growth will slow down.', label: 'Our growth will slow down' },
        { value: 'My leadership team will continue depending on me.', label: 'My leadership team will keep depending on me' },
        { value: 'We will struggle to execute our strategy.', label: 'We will struggle to execute our strategy' },
        { value: 'I\'m not sure yet.', label: 'I\'m not sure yet' },
      ],
    },
    {
      id: 'qTimeline',
      title: 'When would you like to address this?',
      options: [
        { value: 'Immediately', label: 'Immediately' },
        { value: 'Within the next 3 months', label: 'Within the next 3 months' },
        { value: 'Within the next 12 months', label: 'Within the next 12 months' },
        { value: 'I\'m just exploring options', label: 'I\'m just exploring' },
      ],
    },
  ],

  gate: {
    eyebrow: 'Your report is ready',
    title: 'Where should we send it?',
    body: 'See your results right away and get the full PDF report by email.',
    name: 'Full name',
    namePh: 'Jane Smith',
    email: 'Work email',
    emailPh: 'jane@company.com',
    company: 'Company',
    companyPh: 'Company name',
    consent: 'I agree to the {privacy} and to receive my results and related information from the Adizes Institute.',
    privacy: 'Privacy Policy',
    submit: 'See my results',
    errName: 'Please enter your name.',
    errEmail: 'Please enter a valid email.',
    errCompany: 'Please enter your company.',
    errConsent: 'Please accept to continue.',
  },

  levels: {
    L1: {
      name: 'Scalable',
      tag: 'Low dependency',
      summary: 'Your company can operate effectively without your constant involvement.',
      body: [
        'Decisions, accountability and day-to-day execution are spread across a capable team and systems that keep working whether or not you are in the room. Your role has shifted from doing the work to designing how the work gets done.',
        'In the Adizes view of how companies grow, this is the healthiest place to be. Adizes calls it **Prime**: the point where a company is both well organized and still able to move fast. Few organizations reach it — and even fewer stay there.',
      ],
      watch: 'The risk now isn\'t dependency — it\'s drifting back. When pressure hits, founders often step in and quietly re-centralize the company around themselves.',
    },
    L2: {
      name: 'Transitioning',
      tag: 'Moderate dependency',
      summary: 'Some things already run without you, but key parts of the business still route through you.',
      body: [
        'Certain decisions, functions or systems have been handed off successfully — but you are still pulled into the center more often than you\'d like. Things tend to move when you\'re present and slow down when you\'re not.',
        'Adizes describes a stage called the **Founder\'s Trap**: the company has grown too complex for one person to run, yet still depends on that person to keep going. You have started to climb out of it. Companies don\'t escape it automatically — they do it deliberately, by moving decisions, accountability and know-how from the founder into the organization.',
      ],
      watch: 'This stage is unstable. The habits you build over the next few months decide whether you complete the transition or slide back into being the bottleneck.',
    },
    L3: {
      name: 'Founder-Centered',
      tag: 'High dependency',
      summary: 'Founder dependency is now actively limiting accountability, your managers\' growth and the company\'s ability to scale.',
      body: [
        'Your team routinely brings you decisions they could make themselves, and their development stalls because you are still holding responsibilities that should have moved to them. The cost is no longer theoretical: execution slows because everything funnels through you, and the business is exposed whenever you are unavailable.',
        'This is what Adizes calls the **Founder\'s Trap**. It is not a sign of failure — nearly every successful company passes through it, powered by a founder\'s energy and vision. But at this stage your personal capacity becomes the ceiling on how far the business can go.',
      ],
      watch: 'Adizes draws a key distinction: delegating **tasks** is not the same as delegating **decisions**. Escaping this stage requires the second.',
    },
    L4: {
      name: 'Founder-Dependent',
      tag: 'Critical dependency',
      summary: 'Right now, you are the company\'s operating system.',
      body: [
        'Decision-making and coordination run through you personally, so when you are unavailable the company effectively pauses. That concentrates an enormous amount of risk in one person and puts a hard ceiling on growth: the company can only be as big as one person can personally manage.',
        'In the Adizes framework this is the deepest form of the **Founder\'s Trap**: the company can\'t yet function without its founder, so it can\'t move on to its next stage of growth. It is common, and it is fixable — but it doesn\'t fix itself.',
      ],
      watch: 'This is not a reason for alarm, but it is a reason for urgency. The answer is not to work harder — that deepens the dependency. It\'s to start rebuilding the company so it can function without you at the center.',
    },
  },

  bands: {
    B1: { name: 'Strength', range: '3–6', desc: 'Runs largely without you.' },
    B2: { name: 'Emerging risk', range: '7–9', desc: 'Works for now; early cracks.' },
    B3: { name: 'Significant dependency', range: '10–12', desc: 'Leans on you and holds the company back.' },
    B4: { name: 'Immediate priority', range: '13–15', desc: 'A primary bottleneck.' },
  },

  recs: {
    L1: {
      lead: 'You\'ve built something rare. The work now is to protect that independence and push it further.',
      steps: [
        { t: 'Write down what already works.', d: 'The habits that let your company run without you often live in people\'s routines, not on paper. Document how key decisions get made, who owns what and how standards are held — Adizes calls this "institutionalizing": turning individual know-how into organizational memory.' },
        { t: 'Push autonomy one level deeper.', d: 'You\'ve handed decisions to your leaders; now help them do the same with their teams, so authority sits as close as possible to the work.' },
        { t: 'Reinvest the time you\'ve freed.', d: 'Spend it on strategy, growth and developing successors — not on drifting back into operations. That is how a company stays in Prime.' },
      ],
    },
    L2: {
      lead: 'You\'re partway out of the Founder\'s Trap. Three moves matter most right now.',
      steps: [
        { t: 'Name your top three bottlenecks.', d: 'List every decision and task that still requires you, then pick the three with the biggest impact. Handing off everything at once fails; handing off the vital few works.' },
        { t: 'Give every critical outcome one owner.', d: 'When everyone is responsible, no one is — so it lands on you. Assign a single person to each important outcome and hold them to the result, not just the activity.' },
        { t: 'Install a weekly leadership rhythm.', d: 'A recurring meeting where your leaders review progress and make decisions — ideally without needing you in the room. That builds a team that runs itself.' },
      ],
    },
    L3: {
      lead: 'The business runs through you, so the highest-leverage move is to start transferring what\'s in your head into people and systems.',
      steps: [
        { t: 'Start with decisions.', d: 'Write down five decisions only you can make today. For each, name someone who could learn to own it, and hand over the authority to decide — not just the task.' },
        { t: 'Build your leadership layer.', d: 'Give two or three key people real accountability for outcomes they now escalate to you. Adizes describes healthy companies as run by a complementary team, where different strengths cover each other\'s blind spots.' },
        { t: 'Systematize one core process end-to-end.', d: 'Pick one critical process — how you sell, deliver or hire — and turn it into a documented, repeatable system that runs on its own steps rather than your follow-up.' },
      ],
    },
    L4: {
      lead: 'You don\'t have to fix everything at once — you have to start. These three moves have the most leverage at your level.',
      steps: [
        { t: 'Start with decisions.', d: 'Write down five decisions only you can make today. For each, name someone who could learn to own it, and hand over the authority to decide — not just the task. This is the fastest way to buy back your time.' },
        { t: 'Build your leadership layer.', d: 'Choose two or three people and give them real accountability for outcomes they now escalate to you. A company that rests on one person can\'t grow beyond that person.' },
        { t: 'Systematize one core process end-to-end.', d: 'Pick one critical process and turn it into a documented, repeatable system. One process done well becomes the template for the rest.' },
      ],
    },
  },

  results: {
    eyebrow: 'Your Founder Dependency result',
    indexLabel: 'Dependency index',
    indexHelp: '0 = the company runs fully without you · 100 = everything depends on you',
    whatMeans: 'What this means',
    mapTitle: 'Where your dependency lives',
    mapBody: 'Each area is scored from 3 to 15. The higher the number, the more that area still depends on you. Two founders can share the same overall result but have completely different bottlenecks.',
    startHere: 'Start here',
    stepsTitle: 'Your first steps',
    pdfTitle: 'Your full report',
    pdfSent: 'We\'ve also sent the PDF to {email}.',
    pdfSending: 'Sending the PDF to {email}…',
    pdfError: 'We couldn\'t email the PDF, but you can download it here.',
    download: 'Download PDF',
    preparing: 'Preparing PDF…',
    sessionEyebrow: 'Free · 30 minutes',
    sessionTitle: 'Turn this diagnosis into a plan',
    sessionBody: 'Your answers show where founder dependency lives — not yet how to remove it. In a free 30-minute Implementation Session, a Certified Adizes Associate reviews your results with you, explains the dynamics behind them and helps you map your first practical steps. We open only a limited number of these sessions each month.',
    sessionCta: 'Book my free session',
    retake: 'Retake the assessment',
    paidEyebrow: 'Full report',
    paidTitle: 'Get your complete Founder Transfer Plan',
    paidBody: 'A deeper analysis of your 18 answers, what your combination of results means, a 90-day plan built around your two critical areas, and a decision-delegation worksheet.',
    paidCta: 'Unlock full report',
  },

  pdf: {
    title: 'Founder Dependency',
    title2: 'Assessment',
    preparedFor: 'Prepared for',
    date: 'Date',
    page: 'Page',
    yourResult: 'Your result',
    lenses: 'How to read this report',
    lensesBody: 'This report reads your answers through two lenses: your overall dependency level — how much the company still relies on you personally — and six areas that show exactly where that dependency lives. At the end, you\'ll find concrete first steps for your result.',
    methodNote: 'This diagnosis is built on the Adizes Symbergetic™ Management methodology, a framework for how organizations grow and mature, used by companies worldwide for over 50 years. Wherever we use an Adizes idea, we explain it in plain terms.',
    table: { area: 'Area', score: 'Score', result: 'Result' },
    nextStep: 'This is step one',
    nextBody: 'You now know where founder dependency lives in your organization and where to begin. The harder part — actually reducing it — is a process, and that is where working with someone who has guided hundreds of companies through it makes the difference.',
    nextCta: 'Book your free 30-minute session',
    footer: 'adizes.com',
  },

  email: {
    subject: 'Your Founder Dependency report',
  },
};

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

/* Founder Dependency Assessment — widget
 * Embed:
 *   <div id="fd-assessment"></div>
 *   <script>window.FD_CONFIG = { endpoint: 'https://script.google.com/macros/s/XXX/exec' };</script>
 *   <script src="https://cdn.jsdelivr.net/gh/Adizes/assessments@vX/founder-dependency/dist/founder-dependency.min.js" defer></script>
 */
(function () {
  'use strict';

  var VERSION = "1.0.0";
  var CSS = "__ROOT__ {\n--navy: #003663;\n--navy-deep: #00223a;\n--blue: #0a5ea8;\n--coral: #f25f5c;\n--coral-strong: #e8463f;\n--red: #d7141a;\n--ink: #0e1b2a;\n--muted: #5b6878;\n--line: #e3e8ef;\n--paper: #f5f7fa;\n--white: #ffffff;\n--L1: #127a2c; --L2: #f2b33d; --L3: #e5703b; --L4: #d7141a;\ndisplay: block;\nwidth: 100%;\nfont-family: 'Montserrat', system-ui, -apple-system, 'Segoe UI', Roboto, Arial, sans-serif;\ncolor: var(--white);\nline-height: 1.5;\n-webkit-font-smoothing: antialiased;\ntext-align: left;\n}\n__ROOT__ *, __ROOT__ *::before, __ROOT__ *::after {\nbox-sizing: border-box; margin: 0; padding: 0; border: 0;\nfont: inherit; color: inherit; letter-spacing: normal; text-transform: none;\nbackground: none; box-shadow: none; text-decoration: none; list-style: none;\n}\n__ROOT__ strong, __ROOT__ b { font-weight: 700; }\n__ROOT__ button { cursor: pointer; -webkit-appearance: none; appearance: none; line-height: 1.3; }\n__ROOT__ button:focus-visible, __ROOT__ a:focus-visible, __ROOT__ input:focus-visible {\noutline: 3px solid rgba(242,95,92,.6); outline-offset: 2px;\n}\n__ROOT__ a { color: inherit; }\n__ROOT__ .fda-stage {\nposition: relative; overflow: hidden;\nmin-height: min(760px, 100svh);\nbackground: radial-gradient(120% 90% at 100% 0%, #0a63b3 0%, #034a86 30%, #013561 60%, #01243c 100%);\ndisplay: flex; flex-direction: column;\nborder-radius: 0;\n}\n__ROOT__ .fda-stage::after {\ncontent: ''; position: absolute; inset: 0; pointer-events: none;\nbackground: radial-gradient(60% 50% at 0% 100%, rgba(242,95,92,.10), transparent 70%);\n}\n__ROOT__ .fda-top {\nposition: relative; z-index: 2;\ndisplay: flex; align-items: center; justify-content: space-between; gap: 12px;\npadding: 18px 28px 0;\n}\n__ROOT__ .fda-logo { height: 38px; width: auto; display: block; opacity: .95; }\n__ROOT__ .fda-lang { display: flex; gap: 4px; background: rgba(255,255,255,.08); border-radius: 999px; padding: 3px; }\n__ROOT__ .fda-lang button {\nfont-size: 12px; font-weight: 600; padding: 6px 12px; border-radius: 999px; color: rgba(255,255,255,.75);\n}\n__ROOT__ .fda-lang button[aria-pressed=\"true\"] { background: var(--white); color: var(--navy); }\n__ROOT__ .fda-progress { position: relative; z-index: 2; display: flex; gap: 4px; padding: 16px 28px 0; }\n__ROOT__ .fda-progress span { flex: 1; height: 4px; border-radius: 2px; background: rgba(255,255,255,.16); overflow: hidden; position: relative; }\n__ROOT__ .fda-progress span i { position: absolute; inset: 0 auto 0 0; width: 0; background: var(--coral); border-radius: 2px; transition: width .35s ease; }\n__ROOT__ .fda-body {\nposition: relative; z-index: 2; flex: 1;\ndisplay: flex; align-items: center; justify-content: center;\npadding: 28px 28px 40px;\n}\n__ROOT__ .fda-screen { width: 100%; max-width: 760px; animation: fda-in .38s cubic-bezier(.2,.7,.2,1) both; }\n__ROOT__ .fda-screen.is-back { animation-name: fda-in-back; }\n@keyframes fda-in { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: none; } }\n@keyframes fda-in-back { from { opacity: 0; transform: translateY(-18px); } to { opacity: 1; transform: none; } }\n@media (prefers-reduced-motion: reduce) { __ROOT__ .fda-screen { animation: none; } }\n__ROOT__ .fda-eyebrow {\ndisplay: inline-flex; align-items: center; gap: 8px;\nfont-size: 13px; font-weight: 600; letter-spacing: .08em; text-transform: uppercase; color: var(--coral);\n}\n__ROOT__ .fda-eyebrow .fda-chip {\nfont-size: 11px; letter-spacing: .04em; background: var(--coral); color: var(--white);\npadding: 2px 8px; border-radius: 4px;\n}\n__ROOT__ .fda-h1 { font-size: clamp(30px, 4.6vw, 48px); font-weight: 700; line-height: 1.12; margin-top: 14px; }\n__ROOT__ .fda-lead { font-size: clamp(16px, 1.8vw, 18px); color: rgba(255,255,255,.82); margin-top: 18px; max-width: 640px; }\n__ROOT__ .fda-list { margin-top: 22px; display: grid; gap: 10px; }\n__ROOT__ .fda-list li { display: flex; gap: 12px; align-items: flex-start; font-size: 16px; color: rgba(255,255,255,.9); }\n__ROOT__ .fda-list li::before {\ncontent: ''; flex: 0 0 18px; height: 18px; margin-top: 2px; border-radius: 50%;\nbackground: var(--coral) url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath d='M4 8.5l2.5 2.5L12 5.5' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\") center/12px no-repeat;\n}\n__ROOT__ .fda-meta { margin-top: 26px; font-size: 13px; color: rgba(255,255,255,.6); }\n__ROOT__ .fda-actions { display: flex; align-items: center; gap: 14px; margin-top: 30px; flex-wrap: wrap; }\n__ROOT__ .fda-btn {\ndisplay: inline-flex; align-items: center; justify-content: center; gap: 10px;\nfont-size: 16px; font-weight: 700; padding: 14px 26px; border-radius: 999px;\nbackground: var(--coral); color: var(--white); transition: transform .15s ease, background .15s ease;\n}\n__ROOT__ .fda-btn:hover { background: var(--coral-strong); transform: translateY(-1px); }\n__ROOT__ .fda-btn[disabled] { opacity: .5; cursor: default; transform: none; }\n__ROOT__ .fda-btn--ghost { background: rgba(255,255,255,.1); color: var(--white); }\n__ROOT__ .fda-btn--ghost:hover { background: rgba(255,255,255,.18); }\n__ROOT__ .fda-hint { font-size: 12px; color: rgba(255,255,255,.55); }\n__ROOT__ .fda-link-btn { font-size: 14px; font-weight: 600; color: rgba(255,255,255,.7); padding: 6px 2px; }\n__ROOT__ .fda-link-btn:hover { color: var(--white); }\n__ROOT__ .fda-qhead { display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap; }\n__ROOT__ .fda-count { font-size: 13px; font-weight: 600; color: rgba(255,255,255,.55); }\n__ROOT__ .fda-q { font-size: clamp(22px, 3.2vw, 32px); font-weight: 500; line-height: 1.3; margin-top: 16px; }\n__ROOT__ .fda-q strong { color: var(--coral); font-weight: 700; }\n__ROOT__ .fda-sub { font-size: 15px; color: rgba(255,255,255,.7); margin-top: 10px; }\n__ROOT__ .fda-scale { display: grid; grid-template-columns: repeat(5, 1fr); gap: 10px; margin-top: 30px; }\n__ROOT__ .fda-opt {\nposition: relative; display: flex; flex-direction: column; align-items: center; justify-content: flex-start; gap: 10px;\npadding: 16px 8px 14px; border-radius: 14px; text-align: center;\nbackground: rgba(255,255,255,.06); border: 1px solid rgba(255,255,255,.14);\nfont-size: 13px; font-weight: 500; color: rgba(255,255,255,.88);\ntransition: background .15s ease, border-color .15s ease, transform .15s ease;\n}\n__ROOT__ .fda-opt:hover { background: rgba(255,255,255,.12); border-color: rgba(255,255,255,.3); }\n__ROOT__ .fda-opt .fda-num {\nwidth: 34px; height: 34px; border-radius: 50%; display: flex; align-items: center; justify-content: center;\nfont-size: 15px; font-weight: 700; border: 1.5px solid rgba(242,95,92,.7); color: var(--coral);\n}\n__ROOT__ .fda-opt[aria-checked=\"true\"] { background: rgba(242,95,92,.18); border-color: var(--coral); }\n__ROOT__ .fda-opt[aria-checked=\"true\"] .fda-num { background: var(--coral); color: var(--white); border-color: var(--coral); }\n__ROOT__ .fda-opt.is-pop { animation: fda-pop .28s ease; }\n@keyframes fda-pop { 50% { transform: scale(1.05); } }\n__ROOT__ .fda-choices { display: grid; gap: 10px; margin-top: 26px; max-width: 560px; }\n__ROOT__ .fda-choices--grid { grid-template-columns: 1fr 1fr; max-width: 640px; }\n__ROOT__ .fda-choice {\ndisplay: flex; align-items: center; gap: 14px; padding: 13px 16px; border-radius: 12px; text-align: left;\nbackground: rgba(255,255,255,.06); border: 1px solid rgba(255,255,255,.14);\nfont-size: 16px; font-weight: 500; transition: background .15s ease, border-color .15s ease;\n}\n__ROOT__ .fda-choice:hover { background: rgba(255,255,255,.12); border-color: rgba(255,255,255,.3); }\n__ROOT__ .fda-choice .fda-key {\nflex: 0 0 26px; height: 26px; border-radius: 6px; display: flex; align-items: center; justify-content: center;\nfont-size: 12px; font-weight: 700; border: 1px solid rgba(242,95,92,.7); color: var(--coral);\n}\n__ROOT__ .fda-choice[aria-checked=\"true\"] { background: rgba(242,95,92,.18); border-color: var(--coral); }\n__ROOT__ .fda-choice[aria-checked=\"true\"] .fda-key { background: var(--coral); color: var(--white); }\n__ROOT__ .fda-nav { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-top: 28px; }\n__ROOT__ .fda-back {\ndisplay: inline-flex; align-items: center; gap: 6px; font-size: 14px; font-weight: 600; color: rgba(255,255,255,.7);\npadding: 8px 2px; white-space: nowrap;\n}\n__ROOT__ .fda-back:hover { color: var(--white); }\n__ROOT__ .fda-back[hidden] { display: none; }\n__ROOT__ .fda-form { display: grid; gap: 16px; margin-top: 26px; max-width: 520px; }\n__ROOT__ .fda-field label { display: block; font-size: 13px; font-weight: 600; color: rgba(255,255,255,.8); margin-bottom: 6px; }\n__ROOT__ .fda-field input[type=\"text\"], __ROOT__ .fda-field input[type=\"email\"] {\nwidth: 100%; font-size: 17px; padding: 12px 14px; border-radius: 10px;\nbackground: rgba(255,255,255,.08); border: 1px solid rgba(255,255,255,.22); color: var(--white);\n}\n__ROOT__ .fda-field input::placeholder { color: rgba(255,255,255,.38); }\n__ROOT__ .fda-field input:focus { border-color: var(--coral); outline: none; background: rgba(255,255,255,.12); }\n__ROOT__ .fda-field.has-error input { border-color: #ff8a80; }\n__ROOT__ .fda-err { display: none; font-size: 13px; color: #ffb3ad; margin-top: 6px; }\n__ROOT__ .fda-field.has-error .fda-err { display: block; }\n__ROOT__ .fda-field .fda-consent { margin: 0; font-weight: 400; display: flex; gap: 12px; align-items: flex-start; font-size: 13px; color: rgba(255,255,255,.75); cursor: pointer; }\n__ROOT__ .fda-consent input { -webkit-appearance: none; appearance: none; flex: 0 0 20px; width: 20px; height: 20px; margin-top: 1px; border-radius: 5px; border: 1.5px solid rgba(255,255,255,.5); cursor: pointer; display: grid; place-content: center; }\n__ROOT__ .fda-consent input:checked { background: var(--coral); border-color: var(--coral); }\n__ROOT__ .fda-consent input:checked::after { content: ''; width: 10px; height: 6px; border-left: 2px solid #fff; border-bottom: 2px solid #fff; transform: rotate(-45deg) translate(1px,-1px); }\n__ROOT__ .fda-consent a { text-decoration: underline; }\n__ROOT__ .fda-loading { display: flex; flex-direction: column; align-items: center; gap: 22px; text-align: center; }\n__ROOT__ .fda-spinner { width: 54px; height: 54px; border-radius: 50%; border: 4px solid rgba(255,255,255,.15); border-top-color: var(--coral); animation: fda-spin .9s linear infinite; }\n@keyframes fda-spin { to { transform: rotate(360deg); } }\n__ROOT__ .fda-error-box { margin-top: 18px; padding: 12px 14px; border-radius: 10px; background: rgba(255,90,80,.15); border: 1px solid rgba(255,138,128,.5); font-size: 14px; }\n__ROOT__ .fda-results { background: var(--paper); color: var(--ink); }\n__ROOT__ .fda-hero {\nposition: relative; overflow: hidden; color: var(--white);\nbackground: radial-gradient(120% 120% at 100% 0%, #0a63b3 0%, #013561 55%, #01243c 100%);\npadding: 22px 28px 56px;\n}\n__ROOT__ .fda-hero-in { max-width: 1040px; margin: 0 auto; }\n__ROOT__ .fda-hero-top { display: flex; justify-content: space-between; align-items: center; gap: 12px; }\n__ROOT__ .fda-hero-grid { display: grid; grid-template-columns: 1fr 260px; gap: 40px; align-items: center; margin-top: 40px; }\n__ROOT__ .fda-level-name { font-size: clamp(34px, 5vw, 54px); font-weight: 800; line-height: 1.05; margin-top: 12px; }\n__ROOT__ .fda-level-tag { display: inline-block; margin-top: 14px; font-size: 13px; font-weight: 700; padding: 5px 12px; border-radius: 999px; color: var(--white); }\n__ROOT__ .fda-level-sum { font-size: 18px; color: rgba(255,255,255,.88); margin-top: 16px; max-width: 560px; }\n__ROOT__ .fda-ring { position: relative; width: 240px; height: 240px; margin: 0 auto; }\n__ROOT__ .fda-ring svg { width: 100%; height: 100%; transform: rotate(-90deg); }\n__ROOT__ .fda-ring-val { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; }\n__ROOT__ .fda-ring-num { font-size: 64px; font-weight: 800; line-height: 1; }\n__ROOT__ .fda-ring-lbl { font-size: 12px; font-weight: 600; letter-spacing: .06em; text-transform: uppercase; color: rgba(255,255,255,.7); margin-top: 8px; max-width: 140px; }\n__ROOT__ .fda-wrap { max-width: 1040px; margin: -28px auto 0; padding: 0 20px 48px; position: relative; z-index: 2; display: grid; gap: 20px; }\n__ROOT__ .fda-card { background: var(--white); border-radius: 18px; padding: 30px; box-shadow: 0 1px 2px rgba(10,30,60,.05), 0 8px 28px rgba(10,30,60,.07); }\n__ROOT__ .fda-card h2 { font-size: 24px; font-weight: 700; color: var(--navy); line-height: 1.25; }\n__ROOT__ .fda-card h3 { font-size: 17px; font-weight: 700; color: var(--navy); }\n__ROOT__ .fda-card p { font-size: 16px; color: #2a3646; margin-top: 12px; }\n__ROOT__ .fda-card p strong { color: var(--navy); }\n__ROOT__ .fda-kicker { font-size: 12px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: var(--red); }\n__ROOT__ .fda-gauge { margin-top: 22px; }\n__ROOT__ .fda-gauge-bar { position: relative; display: grid; grid-template-columns: repeat(4,1fr); gap: 4px; height: 14px; }\n__ROOT__ .fda-gauge-bar span { border-radius: 4px; opacity: .3; }\n__ROOT__ .fda-gauge-bar span.is-on { opacity: 1; }\n__ROOT__ .fda-gauge-mark { position: absolute; top: -8px; width: 4px; height: 30px; margin-left: -2px; border-radius: 2px; background: var(--ink); box-shadow: 0 0 0 3px var(--white); transition: left .8s cubic-bezier(.2,.7,.2,1); }\n__ROOT__ .fda-gauge-lbls { display: grid; grid-template-columns: repeat(4,1fr); gap: 4px; margin-top: 10px; font-size: 12px; font-weight: 600; color: var(--muted); }\n__ROOT__ .fda-gauge-lbls span.is-on { color: var(--ink); }\n__ROOT__ .fda-gauge-help { font-size: 13px; color: var(--muted); margin-top: 12px; }\n__ROOT__ .fda-watch { margin-top: 18px; padding: 16px 18px; border-left: 4px solid var(--red); background: #fdf1f1; border-radius: 0 10px 10px 0; font-size: 15px; color: #5a1a1c; }\n__ROOT__ .fda-watch strong { color: #8c0f13; }\n__ROOT__ .fda-dims { display: grid; gap: 14px; margin-top: 22px; }\n__ROOT__ .fda-dim { display: grid; grid-template-columns: 220px 1fr 160px; gap: 16px; align-items: center; padding: 14px 16px; border-radius: 12px; border: 1px solid var(--line); }\n__ROOT__ .fda-dim.is-top { border-color: var(--navy); background: #f2f6fb; }\n__ROOT__ .fda-dim-name { font-size: 15px; font-weight: 700; color: var(--navy); }\n__ROOT__ .fda-dim-flag { display: inline-block; margin-top: 4px; font-size: 11px; font-weight: 700; letter-spacing: .05em; text-transform: uppercase; color: var(--white); background: var(--navy); padding: 2px 8px; border-radius: 4px; }\n__ROOT__ .fda-dim-track { position: relative; height: 12px; background: #edf0f4; border-radius: 6px; overflow: hidden; }\n__ROOT__ .fda-dim-fill { position: absolute; inset: 0 auto 0 0; width: 0; border-radius: 6px; transition: width .9s cubic-bezier(.2,.7,.2,1); }\n__ROOT__ .fda-dim-score { font-size: 13px; font-weight: 600; color: var(--muted); text-align: right; }\n__ROOT__ .fda-dim-score b { font-size: 18px; color: var(--ink); }\n__ROOT__ .fda-dim-band { display: block; font-size: 12px; font-weight: 700; }\n__ROOT__ .fda-dim-read { grid-column: 1 / -1; font-size: 14px; color: #3c4858; margin-top: -4px; }\n__ROOT__ .fda-legend { display: grid; grid-template-columns: repeat(4,1fr); gap: 10px; margin-top: 18px; }\n__ROOT__ .fda-legend div { font-size: 12px; color: var(--muted); }\n__ROOT__ .fda-legend b { display: flex; align-items: center; gap: 6px; font-size: 12px; color: var(--ink); }\n__ROOT__ .fda-legend i { width: 10px; height: 10px; border-radius: 3px; display: inline-block; }\n__ROOT__ .fda-steps { display: grid; gap: 14px; margin-top: 20px; counter-reset: fstep; }\n__ROOT__ .fda-steps li { display: grid; grid-template-columns: 40px 1fr; gap: 14px; }\n__ROOT__ .fda-steps li::before { counter-increment: fstep; content: counter(fstep); width: 36px; height: 36px; border-radius: 50%; background: var(--navy); color: var(--white); font-weight: 700; display: flex; align-items: center; justify-content: center; }\n__ROOT__ .fda-steps h3 { margin-top: 6px; }\n__ROOT__ .fda-steps p { margin-top: 4px; font-size: 15px; }\n__ROOT__ .fda-split { display: grid; grid-template-columns: 1.4fr 1fr; gap: 20px; }\n__ROOT__ .fda-session { background: var(--navy); color: var(--white); position: relative; overflow: hidden; }\n__ROOT__ .fda-session h2 { color: var(--white); margin-top: 8px; }\n__ROOT__ .fda-session p { color: rgba(255,255,255,.85); }\n__ROOT__ .fda-session .fda-kicker { color: var(--coral); }\n__ROOT__ .fda-session .fda-arrow { position: absolute; right: -10px; bottom: -14px; width: 140px; opacity: .14; }\n__ROOT__ .fda-pdf .fda-status { font-size: 14px; color: var(--muted); margin-top: 10px; }\n__ROOT__ .fda-btn--navy { background: var(--navy); }\n__ROOT__ .fda-btn--navy:hover { background: #00284a; }\n__ROOT__ .fda-btn--line { background: transparent; color: var(--navy); border: 1.5px solid var(--navy); }\n__ROOT__ .fda-btn--line:hover { background: #eef3f9; }\n__ROOT__ .fda-paid { border: 2px dashed #c9d3df; }\n__ROOT__ .fda-foot { text-align: center; padding: 6px 0 4px; }\n__ROOT__ .fda-foot button { font-size: 14px; font-weight: 600; color: var(--muted); text-decoration: underline; }\n@media (max-width: 820px) {\n__ROOT__ .fda-hero-grid { grid-template-columns: 1fr; gap: 26px; margin-top: 26px; }\n__ROOT__ .fda-ring { width: 200px; height: 200px; }\n__ROOT__ .fda-ring-num { font-size: 54px; }\n__ROOT__ .fda-split { grid-template-columns: 1fr; }\n__ROOT__ .fda-dim { grid-template-columns: 1fr auto; gap: 10px 14px; }\n__ROOT__ .fda-dim-track { grid-column: 1 / -1; grid-row: 2; }\n__ROOT__ .fda-dim-read { grid-row: 3; margin-top: 0; }\n}\n@media (max-width: 640px) {\n__ROOT__ .fda-top { padding: 14px 16px 0; }\n__ROOT__ .fda-logo { height: 24px; }\n__ROOT__ .fda-progress { padding: 12px 16px 0; }\n__ROOT__ .fda-body { padding: 22px 16px 28px; align-items: flex-start; }\n__ROOT__ .fda-scale { grid-template-columns: 1fr; gap: 8px; margin-top: 22px; }\n__ROOT__ .fda-opt { flex-direction: row; justify-content: flex-start; padding: 11px 14px; font-size: 15px; text-align: left; gap: 14px; }\n__ROOT__ .fda-opt .fda-num { width: 30px; height: 30px; flex: 0 0 30px; font-size: 14px; }\n__ROOT__ .fda-choices--grid { grid-template-columns: 1fr; }\n__ROOT__ .fda-choice { font-size: 15px; padding: 11px 14px; }\n__ROOT__ .fda-hint { display: none; }\n__ROOT__ .fda-hero { padding: 16px 16px 48px; }\n__ROOT__ .fda-wrap { padding: 0 12px 36px; gap: 14px; }\n__ROOT__ .fda-card { padding: 22px 18px; border-radius: 14px; }\n__ROOT__ .fda-card h2 { font-size: 21px; }\n__ROOT__ .fda-legend { grid-template-columns: 1fr 1fr; }\n__ROOT__ .fda-btn { width: 100%; }\n__ROOT__ .fda-actions .fda-btn { width: auto; }\n}";
  var I18N = FD_I18N;

  var DEFAULTS = {
    mount: '#fd-assessment',
    endpoint: '',                         // Apps Script web app URL ('' = demo mode, nothing is saved)
    lang: 'auto',                         // 'auto' | 'en' | 'es' ...
    languages: Object.keys(I18N),         // languages offered in the switcher
    calendlyUrl: 'https://calendly.com/jaime-morales/30min',
    privacyUrl: { en: 'https://www.adizes.com/privacy-policy', es: 'https://www.adizes.com/privacy-policy' },
    assetsBase: '',                       // auto-detected from the script URL
    paidEnabled: false,                   // stage 2
    storageKey: 'fda:v1',
    loadFont: true,
  };

  /* ------------------------------------------------------------------ scoring */
  var LEVELS = [
    { key: 'L1', min: 18, max: 35, color: '#127a2c' },
    { key: 'L2', min: 36, max: 53, color: '#f2b33d' },
    { key: 'L3', min: 54, max: 71, color: '#e5703b' },
    { key: 'L4', min: 72, max: 90, color: '#d7141a' },
  ];
  var BANDS = [
    { key: 'B1', min: 3, max: 6, color: '#127a2c', reading: 'low' },
    { key: 'B2', min: 7, max: 9, color: '#f2b33d', reading: 'mid' },
    { key: 'B3', min: 10, max: 12, color: '#e5703b', reading: 'high' },
    { key: 'B4', min: 13, max: 15, color: '#d7141a', reading: 'high' },
  ];
  function pick(list, v) { for (var i = 0; i < list.length; i++) if (v >= list[i].min && v <= list[i].max) return list[i]; return null; }

  function score(answers) {
    var raw = 0, dims = [];
    for (var i = 0; i < 18; i++) raw += answers[i];
    for (var d = 0; d < 6; d++) {
      var s = answers[d * 3] + answers[d * 3 + 1] + answers[d * 3 + 2];
      dims.push({ i: d, score: s, band: pick(BANDS, s).key });
    }
    var order = dims.slice().sort(function (a, b) { return b.score - a.score || a.i - b.i; });
    var top = order.filter(function (x) { return x.score >= 7; }).slice(0, 2).map(function (x) { return x.i; });
    return {
      raw: raw,
      index: Math.round((raw - 18) / 72 * 100),
      level: pick(LEVELS, raw).key,
      dims: dims,
      top: top,
    };
  }

  /* ------------------------------------------------------------------ utils */
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function md(s) { return esc(s).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>'); }
  function fill(s, map) { return String(s).replace(/\{(\w+)\}/g, function (m, k) { return map[k] != null ? map[k] : m; }); }
  function store(key, val) { try { if (val === null) localStorage.removeItem(key); else localStorage.setItem(key, JSON.stringify(val)); } catch (e) {} }
  function load(key) { try { var v = localStorage.getItem(key); return v ? JSON.parse(v) : null; } catch (e) { return null; } }
  function qs(name) { try { return new URLSearchParams(location.search).get(name); } catch (e) { return null; } }
  function levelOf(k) { for (var i = 0; i < LEVELS.length; i++) if (LEVELS[i].key === k) return LEVELS[i]; }
  function bandOf(k) { for (var i = 0; i < BANDS.length; i++) if (BANDS[i].key === k) return BANDS[i]; }

  var scriptSrc = (document.currentScript && document.currentScript.src) || '';
  function detectAssets() {
    if (!scriptSrc) return '';
    return scriptSrc.replace(/\/dist\/[^\/]*$/, '/assets/');
  }

  function loadScript(src) {
    return new Promise(function (res, rej) {
      var s = document.createElement('script');
      s.src = src; s.async = true; s.onload = res; s.onerror = function () { rej(new Error('load ' + src)); };
      document.head.appendChild(s);
    });
  }
  function fetchB64(url) {
    return fetch(url).then(function (r) { if (!r.ok) throw new Error(url + ' ' + r.status); return r.arrayBuffer(); }).then(function (buf) {
      var bytes = new Uint8Array(buf), bin = '', chunk = 0x8000;
      for (var i = 0; i < bytes.length; i += chunk) bin += String.fromCharCode.apply(null, bytes.subarray(i, i + chunk));
      return btoa(bin);
    });
  }

  function api(cfg, payload, timeoutMs) {
    if (!cfg.endpoint) return Promise.resolve({ ok: true, demo: true, id: 'DEMO-' + Date.now().toString(36).toUpperCase() });
    var ctrl = typeof AbortController !== 'undefined' ? new AbortController() : null;
    var t = ctrl ? setTimeout(function () { ctrl.abort(); }, timeoutMs || 30000) : null;
    return fetch(cfg.endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(payload),
      redirect: 'follow',
      signal: ctrl ? ctrl.signal : undefined,
    }).then(function (r) { return r.json(); }).then(function (j) {
      if (t) clearTimeout(t);
      if (!j || !j.ok) throw new Error((j && j.error) || 'server');
      return j;
    }, function (e) { if (t) clearTimeout(t); throw e; });
  }

  /* ------------------------------------------------------------------ app */
  function App(el, cfg) {
    this.el = el;
    this.cfg = cfg;
    this.lang = this.pickLang();
    this.steps = this.buildSteps();
    this.state = { step: 0, answers: [], ctx: {}, closing: {}, contact: {} };
    this.dir = 1;
    this.busy = false;
    this.root = document.createElement('div');
    this.root.className = 'fda';
    el.innerHTML = '';
    el.appendChild(this.root);
    var saved = load(cfg.storageKey);
    if (saved && saved.result) { this.state = saved; this.renderResults(true); }
    else if (saved && saved.step > 0) { this.saved = saved; this.renderResume(); }
    else this.renderIntro();
    var self = this;
    this.onKey = function (e) { self.key(e); };
    document.addEventListener('keydown', this.onKey);
  }

  App.prototype.t = function () { return I18N[this.lang] || I18N.en; };

  App.prototype.pickLang = function () {
    var avail = this.cfg.languages.filter(function (l) { return I18N[l]; });
    var want = qs('lang') || (this.cfg.lang !== 'auto' ? this.cfg.lang : '') ||
      ((load(this.cfg.storageKey) || {}).lang) ||
      ((navigator.language || 'en').slice(0, 2).toLowerCase());
    return avail.indexOf(want) >= 0 ? want : (avail.indexOf('en') >= 0 ? 'en' : avail[0]);
  };

  App.prototype.buildSteps = function () {
    var t = I18N.en, steps = [];
    t.context.forEach(function (c, i) { steps.push({ type: 'ctx', i: i, id: c.id }); });
    for (var d = 0; d < 6; d++) for (var k = 0; k < 3; k++) steps.push({ type: 'item', dim: d, k: k, n: d * 3 + k });
    t.closing.forEach(function (c, i) { steps.push({ type: 'closing', i: i, id: c.id }); });
    steps.push({ type: 'gate' });
    return steps;
  };

  App.prototype.save = function () {
    var s = this.state; s.lang = this.lang;
    store(this.cfg.storageKey, s);
  };

  /* ---------- chrome ---------- */
  App.prototype.logo = function (variant) {
    var base = this.cfg.assetsBase;
    if (!base) return '<span style="font-weight:800;letter-spacing:.04em">ADIZES</span>';
    return '<img class="fda-logo" alt="Adizes Institute" src="' + esc(base + 'adizes-logo-' + (variant || 'white') + '.png') + '">';
  };
  App.prototype.langSwitch = function () {
    var self = this;
    if (this.cfg.languages.length < 2) return '';
    return '<div class="fda-lang" role="group" aria-label="' + esc(this.t().ui.language) + '">' +
      this.cfg.languages.filter(function (l) { return I18N[l]; }).map(function (l) {
        return '<button type="button" data-lang="' + l + '" aria-pressed="' + (l === self.lang) + '">' + l.toUpperCase() + '</button>';
      }).join('') + '</div>';
  };
  App.prototype.progress = function () {
    var p = this.state.step, total = this.steps.length - 1; // gate not counted
    // 4 segments: profile, 6 dims merged as 6, closing
    var segs = [[0, 2]];
    for (var d = 0; d < 6; d++) segs.push([2 + d * 3, 2 + d * 3 + 3]);
    segs.push([20, 22]);
    return '<div class="fda-progress" aria-hidden="true">' + segs.map(function (s) {
      var f = Math.max(0, Math.min(1, (p - s[0]) / (s[1] - s[0])));
      return '<span><i style="width:' + (f * 100) + '%"></i></span>';
    }).join('') + '</div>';
  };
  App.prototype.stage = function (inner, opts) {
    opts = opts || {};
    this.root.innerHTML =
      '<div class="fda-stage">' +
        '<div class="fda-top">' + this.logo('white') + (opts.lang ? this.langSwitch() : '') + '</div>' +
        (opts.progress ? this.progress() : '') +
        '<div class="fda-body"><div class="fda-screen' + (this.dir < 0 ? ' is-back' : '') + '">' + inner + '</div></div>' +
      '</div>';
    this.bindLang();
    this.scrollTop();
  };
  App.prototype.scrollTop = function () {
    if (!this.mounted) { this.mounted = true; return; }
    var r = this.el.getBoundingClientRect();
    if (r.top < 0 || r.top > window.innerHeight * 0.4) {
      try { window.scrollTo({ top: window.pageYOffset + r.top - 10, behavior: 'smooth' }); } catch (e) { window.scrollTo(0, window.pageYOffset + r.top - 10); }
    }
  };
  App.prototype.bindLang = function () {
    var self = this;
    this.root.querySelectorAll('[data-lang]').forEach(function (b) {
      b.addEventListener('click', function () {
        self.lang = b.getAttribute('data-lang');
        self.save();
        self.dir = 1; self.mounted = false;
        if (self.state.result) self.renderResults(true); else if (self.view === 'intro') self.renderIntro(); else self.renderStep();
      });
    });
  };

  /* ---------- screens ---------- */
  App.prototype.renderIntro = function () {
    var t = this.t(), self = this;
    this.view = 'intro';
    this.stage(
      '<div class="fda-eyebrow">' + esc(t.intro.eyebrow) + '</div>' +
      '<h1 class="fda-h1">' + esc(t.intro.title) + '</h1>' +
      '<p class="fda-lead">' + esc(t.intro.body) + '</p>' +
      '<ul class="fda-list">' + t.intro.bullets.map(function (b) { return '<li>' + esc(b) + '</li>'; }).join('') + '</ul>' +
      '<div class="fda-actions"><button type="button" class="fda-btn" data-act="start">' + esc(t.ui.start) + ' →</button>' +
      '<span class="fda-hint">' + esc(t.ui.pressEnter) + '</span></div>' +
      '<p class="fda-meta">' + esc(t.ui.minutes) + '</p>', { lang: true });
    this.root.querySelector('[data-act="start"]').addEventListener('click', function () { self.start(); });
  };
  App.prototype.start = function () {
    this.state = { step: 0, answers: [], ctx: {}, closing: {}, contact: {}, startedAt: new Date().toISOString() };
    this.dir = 1; this.renderStep();
  };

  App.prototype.renderResume = function () {
    var t = this.t(), self = this;
    this.view = 'resume';
    this.stage(
      '<div class="fda-eyebrow">' + esc(t.intro.eyebrow) + '</div>' +
      '<h1 class="fda-h1">' + esc(t.ui.resume) + '</h1>' +
      '<div class="fda-actions"><button type="button" class="fda-btn" data-act="yes">' + esc(t.ui.resumeYes) + ' →</button>' +
      '<button type="button" class="fda-btn fda-btn--ghost" data-act="no">' + esc(t.ui.resumeNo) + '</button></div>', { lang: true });
    this.root.querySelector('[data-act="yes"]').addEventListener('click', function () { self.state = self.saved; self.renderStep(); });
    this.root.querySelector('[data-act="no"]').addEventListener('click', function () { store(self.cfg.storageKey, null); self.renderIntro(); });
  };

  App.prototype.renderStep = function () {
    var st = this.steps[this.state.step];
    this.view = 'step';
    if (st.type === 'gate') return this.renderGate();
    var t = this.t(), html = '', self = this;
    var num = this.state.step + 1, total = this.steps.length - 1;
    var count = '<span class="fda-count">' + esc(t.ui.question) + ' ' + num + ' ' + esc(t.ui.of) + ' ' + total + '</span>';

    if (st.type === 'item') {
      var dim = t.dimensions[st.dim];
      var cur = this.state.answers[st.n];
      var newSection = st.k === 0;
      html += '<div class="fda-qhead"><div class="fda-eyebrow">' +
        (newSection ? '<span class="fda-chip">' + esc(t.ui.section) + ' ' + (st.dim + 1) + '/6</span>' : '<span>' + esc(t.ui.section) + ' ' + (st.dim + 1) + '/6</span>') +
        '<span>' + esc(dim.name) + '</span></div>' + count + '</div>';
      if (st.n === 0) html += '<p class="fda-sub">' + esc(t.scaleIntro) + '</p>';
      html += '<h2 class="fda-q">' + md(dim.items[st.k]) + '</h2>';
      html += '<div class="fda-scale" role="radiogroup">' + t.scale.map(function (o) {
        return '<button type="button" role="radio" class="fda-opt" data-v="' + o.value + '" aria-checked="' + (cur === o.value) + '">' +
          '<span class="fda-num">' + o.value + '</span><span>' + esc(o.label) + '</span></button>';
      }).join('') + '</div>';
      html += this.navHtml(t.ui.keyboardHint);
    } else {
      var q = st.type === 'ctx' ? t.context[st.i] : t.closing[st.i];
      var bag = st.type === 'ctx' ? this.state.ctx : this.state.closing;
      var curv = bag[q.id];
      html += '<div class="fda-qhead"><span></span>' + count + '</div>';
      html += '<h2 class="fda-q">' + md(q.title) + '</h2>';
      html += '<div class="fda-choices' + (q.options.length > 5 ? ' fda-choices--grid' : '') + '" role="radiogroup">' + q.options.map(function (o, i) {
        return '<button type="button" role="radio" class="fda-choice" data-v="' + esc(o.value) + '" aria-checked="' + (curv === o.value) + '">' +
          '<span class="fda-key">' + String.fromCharCode(65 + i) + '</span><span>' + esc(o.label) + '</span></button>';
      }).join('') + '</div>';
      html += this.navHtml('');
    }
    this.stage(html, { progress: true, lang: this.state.step === 0 });
    this.root.querySelectorAll('[data-v]').forEach(function (b) {
      b.addEventListener('click', function () { self.choose(b.getAttribute('data-v'), b); });
    });
    var back = this.root.querySelector('[data-act="back"]');
    if (back) back.addEventListener('click', function () { self.back(); });
    var nxt = this.root.querySelector('[data-act="next"]');
    if (nxt) nxt.addEventListener('click', function () { self.next(); });
  };
  App.prototype.navHtml = function (hint) {
    var t = this.t();
    var answered = this.currentAnswered();
    return '<div class="fda-nav">' +
      '<button type="button" class="fda-back" data-act="back"' + (this.state.step === 0 ? ' hidden' : '') + '>← ' + esc(t.ui.back) + '</button>' +
      '<div class="fda-actions" style="margin-top:0">' + (hint ? '<span class="fda-hint">' + esc(hint) + '</span>' : '') +
      (answered ? '<button type="button" class="fda-btn fda-btn--ghost" data-act="next">' + esc(t.ui.next) + ' →</button>' : '') + '</div></div>';
  };
  App.prototype.currentAnswered = function () {
    var st = this.steps[this.state.step];
    if (!st) return false;
    if (st.type === 'item') return !!this.state.answers[st.n];
    if (st.type === 'ctx') return !!this.state.ctx[st.id];
    if (st.type === 'closing') return !!this.state.closing[st.id];
    return false;
  };

  App.prototype.choose = function (v, btn) {
    if (this.busy) return;
    var st = this.steps[this.state.step];
    if (st.type === 'item') this.state.answers[st.n] = Number(v);
    else if (st.type === 'ctx') this.state.ctx[st.id] = v;
    else this.state.closing[st.id] = v;
    this.root.querySelectorAll('[data-v]').forEach(function (b) { b.setAttribute('aria-checked', b === btn ? 'true' : 'false'); });
    if (btn) { btn.classList.remove('is-pop'); void btn.offsetWidth; btn.classList.add('is-pop'); }
    this.save();
    var self = this;
    this.busy = true;
    setTimeout(function () { self.busy = false; self.next(); }, 320);
  };
  App.prototype.next = function () {
    if (!this.currentAnswered()) return;
    this.state.step = Math.min(this.state.step + 1, this.steps.length - 1);
    this.dir = 1; this.save(); this.renderStep();
  };
  App.prototype.back = function () {
    if (this.state.step === 0) return;
    this.state.step--; this.dir = -1; this.save(); this.renderStep();
  };

  App.prototype.key = function (e) {
    if (!this.root.isConnected) { document.removeEventListener('keydown', this.onKey); return; }
    var tag = (e.target && e.target.tagName) || '';
    if (tag === 'INPUT' || tag === 'TEXTAREA' || e.metaKey || e.ctrlKey || e.altKey) return;
    if (this.view === 'intro' && e.key === 'Enter') { var r = this.el.getBoundingClientRect(); if (r.top < window.innerHeight && r.bottom > 0) { e.preventDefault(); this.start(); } return; }
    if (this.view !== 'step') return;
    var st = this.steps[this.state.step];
    if (!st || st.type === 'gate') return;
    var btns = this.root.querySelectorAll('[data-v]');
    var idx = -1;
    if (st.type === 'item' && /^[1-5]$/.test(e.key)) idx = Number(e.key) - 1;
    if (st.type !== 'item' && /^[a-zA-Z]$/.test(e.key)) idx = e.key.toUpperCase().charCodeAt(0) - 65;
    if (idx >= 0 && btns[idx]) { e.preventDefault(); this.choose(btns[idx].getAttribute('data-v'), btns[idx]); return; }
    if (e.key === 'Enter') { e.preventDefault(); this.next(); }
  };

  /* ---------- gate ---------- */
  App.prototype.renderGate = function () {
    var t = this.t(), g = t.gate, c = this.state.contact || {}, self = this;
    var privacy = (this.cfg.privacyUrl && (this.cfg.privacyUrl[this.lang] || this.cfg.privacyUrl.en)) || '#';
    var consent = esc(g.consent).replace('{privacy}', '<a href="' + esc(privacy) + '" target="_blank" rel="noopener">' + esc(g.privacy) + '</a>');
    this.view = 'gate';
    this.stage(
      '<div class="fda-eyebrow">' + esc(g.eyebrow) + '</div>' +
      '<h1 class="fda-h1" style="font-size:clamp(28px,4vw,40px)">' + esc(g.title) + '</h1>' +
      '<p class="fda-lead">' + esc(g.body) + '</p>' +
      '<form class="fda-form" novalidate>' +
        field('name', 'text', g.name, g.namePh, c.name, g.errName, 'name') +
        field('email', 'email', g.email, g.emailPh, c.email, g.errEmail, 'email') +
        field('company', 'text', g.company, g.companyPh, c.company, g.errCompany, 'organization') +
        '<div class="fda-field" data-f="consent"><label class="fda-consent"><input type="checkbox" name="consent"' + (c.consent ? ' checked' : '') + '><span>' + consent + '</span></label><div class="fda-err">' + esc(g.errConsent) + '</div></div>' +
        '<div class="fda-nav" style="margin-top:6px"><button type="button" class="fda-back" data-act="back">← ' + esc(t.ui.back) + '</button>' +
        '<button type="submit" class="fda-btn">' + esc(g.submit) + ' →</button></div>' +
      '</form>', { progress: true });
    function field(n, type, label, ph, val, err, ac) {
      return '<div class="fda-field" data-f="' + n + '"><label for="fda-' + n + '">' + esc(label) + '</label>' +
        '<input id="fda-' + n + '" name="' + n + '" type="' + type + '" placeholder="' + esc(ph) + '" value="' + esc(val || '') + '" autocomplete="' + ac + '"' + (n === 'email' ? ' inputmode="email"' : '') + '>' +
        '<div class="fda-err">' + esc(err) + '</div></div>';
    }
    var form = this.root.querySelector('form');
    this.root.querySelector('[data-act="back"]').addEventListener('click', function () { self.back(); });
    form.addEventListener('input', function (e) {
      var f = e.target.closest('.fda-field'); if (f) f.classList.remove('has-error');
    });
    form.addEventListener('submit', function (e) { e.preventDefault(); self.submit(form); });
  };

  App.prototype.submit = function (form) {
    var v = {
      name: form.name.value.trim().replace(/\s+/g, ' '),
      email: form.email.value.trim(),
      company: form.company.value.trim(),
      consent: form.consent.checked,
    };
    var bad = [];
    if (v.name.length < 2) bad.push('name');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email)) bad.push('email');
    if (!v.company) bad.push('company');
    if (!v.consent) bad.push('consent');
    form.querySelectorAll('.fda-field').forEach(function (f) { f.classList.toggle('has-error', bad.indexOf(f.getAttribute('data-f')) >= 0); });
    if (bad.length) { var el = form.querySelector('[name="' + bad[0] + '"]'); if (el) el.focus(); return; }
    this.state.contact = v;
    this.save();
    this.send();
  };

  App.prototype.send = function () {
    var t = this.t(), self = this, s = this.state;
    this.view = 'loading';
    this.stage('<div class="fda-loading"><div class="fda-spinner"></div><p class="fda-lead" style="margin:0">' + esc(t.ui.loading) + '</p></div>');
    var result = score(s.answers);
    var payload = {
      action: 'submit', v: VERSION, lang: this.lang,
      answers: s.answers, context: s.ctx, closing: s.closing, contact: s.contact,
      meta: {
        page: location.href.split('#')[0], referrer: document.referrer || '',
        utm_source: qs('utm_source') || '', utm_medium: qs('utm_medium') || '', utm_campaign: qs('utm_campaign') || '',
        utm_content: qs('utm_content') || '', utm_term: qs('utm_term') || '',
        startedAt: s.startedAt || '', tz: (Intl.DateTimeFormat().resolvedOptions().timeZone || ''),
      },
    };
    var started = Date.now();
    api(this.cfg, payload, 30000).then(function (res) {
      var wait = Math.max(0, 1400 - (Date.now() - started)); // let the "analyzing" moment breathe
      setTimeout(function () {
        s.id = res.id; s.result = result; s.submittedAt = new Date().toISOString(); s.pdf = 'pending';
        self.save();
        self.renderResults(false);
      }, wait);
    }).catch(function () {
      self.stage('<div class="fda-loading"><p class="fda-lead" style="margin:0">' + esc(t.ui.errorGeneric) + '</p>' +
        '<button type="button" class="fda-btn" data-act="retry">' + esc(t.ui.retry) + '</button></div>');
      self.root.querySelector('[data-act="retry"]').addEventListener('click', function () { self.send(); });
    });
  };

  /* ---------- results ---------- */
  App.prototype.renderResults = function (restored) {
    var t = this.t(), s = this.state, r = s.result, self = this;
    var lv = t.levels[r.level], lvc = levelOf(r.level).color;
    var R = t.results;
    this.view = 'results';
    var circ = 2 * Math.PI * 104;
    var levelIdx = ['L1', 'L2', 'L3', 'L4'].indexOf(r.level);
    var gaugePos = Math.max(1, Math.min(99, r.index));
    var tagText = r.level === 'L2' ? '#3d2a00' : '#fff';

    var dimsHtml = r.dims.map(function (d) {
      var dt = t.dimensions[d.i], b = bandOf(d.band), isTop = r.top.indexOf(d.i) >= 0;
      return '<div class="fda-dim' + (isTop ? ' is-top' : '') + '">' +
        '<div><div class="fda-dim-name">' + esc(dt.name) + '</div>' + (isTop ? '<span class="fda-dim-flag">' + esc(R.startHere) + '</span>' : '') + '</div>' +
        '<div class="fda-dim-track"><div class="fda-dim-fill" data-w="' + ((d.score - 3) / 12 * 100 || 2) + '" style="background:' + b.color + '"></div></div>' +
        '<div class="fda-dim-score"><b>' + d.score + '</b> / 15<span class="fda-dim-band" style="color:' + (d.band === 'B2' ? '#a87308' : b.color) + '">' + esc(t.bands[d.band].name) + '</span></div>' +
        '<p class="fda-dim-read">' + esc(dt.reading[b.reading]) + '</p>' +
      '</div>';
    }).join('');

    var legend = BANDS.map(function (b) {
      var bt = t.bands[b.key];
      return '<div><b><i style="background:' + b.color + '"></i>' + esc(bt.range) + ' · ' + esc(bt.name) + '</b>' + esc(bt.desc) + '</div>';
    }).join('');

    var rec = t.recs[r.level];
    var steps = rec.steps.map(function (st) { return '<li><div><h3>' + esc(st.t) + '</h3><p>' + esc(st.d) + '</p></div></li>'; }).join('');

    var email = esc(s.contact && s.contact.email || '');
    var pdfStatus = s.pdf === 'sent' ? fill(esc(R.pdfSent), { email: '<b>' + email + '</b>' })
      : s.pdf === 'error' ? esc(R.pdfError)
      : fill(esc(R.pdfSending), { email: '<b>' + email + '</b>' });

    this.root.innerHTML =
      '<div class="fda-results">' +
        '<header class="fda-hero"><div class="fda-hero-in">' +
          '<div class="fda-hero-top">' + this.logo('white') + this.langSwitch() + '</div>' +
          '<div class="fda-hero-grid"><div>' +
            '<div class="fda-eyebrow">' + esc(R.eyebrow) + '</div>' +
            '<div class="fda-level-name">' + esc(lv.name) + '</div>' +
            '<span class="fda-level-tag" style="background:' + lvc + ';color:' + tagText + '">' + esc(lv.tag) + '</span>' +
            '<p class="fda-level-sum">' + esc(lv.summary) + '</p>' +
          '</div>' +
          '<div class="fda-ring"><svg viewBox="0 0 240 240"><circle cx="120" cy="120" r="104" fill="none" stroke="rgba(255,255,255,.14)" stroke-width="16"/>' +
            '<circle class="fda-ring-arc" cx="120" cy="120" r="104" fill="none" stroke="' + lvc + '" stroke-width="16" stroke-linecap="round" stroke-dasharray="' + circ + '" stroke-dashoffset="' + circ + '" style="transition:stroke-dashoffset 1.2s cubic-bezier(.2,.7,.2,1)" data-off="' + (circ * (1 - Math.max(r.index, 1) / 100)) + '"/></svg>' +
            '<div class="fda-ring-val"><div class="fda-ring-num" data-n="' + r.index + '">0</div><div class="fda-ring-lbl">' + esc(R.indexLabel) + '</div></div></div>' +
          '</div>' +
        '</div></header>' +
        '<div class="fda-wrap">' +
          '<section class="fda-card">' +
            '<div class="fda-kicker">' + esc(R.whatMeans) + '</div>' +
            '<div class="fda-gauge"><div class="fda-gauge-bar">' + LEVELS.map(function (l, i) { return '<span class="' + (i === levelIdx ? 'is-on' : '') + '" style="background:' + l.color + '"></span>'; }).join('') +
              '<div class="fda-gauge-mark" style="left:0" data-left="' + gaugePos + '%"></div></div>' +
              '<div class="fda-gauge-lbls">' + LEVELS.map(function (l, i) { return '<span class="' + (i === levelIdx ? 'is-on' : '') + '">' + esc(t.levels[l.key].name) + '</span>'; }).join('') + '</div>' +
              '<p class="fda-gauge-help">' + esc(R.indexHelp) + '</p></div>' +
            lv.body.map(function (p) { return '<p>' + md(p) + '</p>'; }).join('') +
            '<div class="fda-watch">' + md(lv.watch) + '</div>' +
          '</section>' +
          '<section class="fda-card">' +
            '<h2>' + esc(R.mapTitle) + '</h2><p>' + esc(R.mapBody) + '</p>' +
            '<div class="fda-dims">' + dimsHtml + '</div>' +
            '<div class="fda-legend">' + legend + '</div>' +
          '</section>' +
          '<section class="fda-card">' +
            '<h2>' + esc(R.stepsTitle) + '</h2><p>' + esc(rec.lead) + '</p>' +
            '<ol class="fda-steps">' + steps + '</ol>' +
          '</section>' +
          '<div class="fda-split">' +
            '<section class="fda-card fda-session">' +
              (this.cfg.assetsBase ? '<img class="fda-arrow" alt="" src="' + esc(this.cfg.assetsBase + 'arrow-white.png') + '">' : '') +
              '<div class="fda-kicker">' + esc(R.sessionEyebrow) + '</div>' +
              '<h2>' + esc(R.sessionTitle) + '</h2><p>' + esc(R.sessionBody) + '</p>' +
              '<div class="fda-actions"><a class="fda-btn" data-act="book" href="' + esc(this.calendlyLink()) + '" target="_blank" rel="noopener">' + esc(R.sessionCta) + ' →</a></div>' +
            '</section>' +
            '<section class="fda-card fda-pdf">' +
              '<h2>' + esc(R.pdfTitle) + '</h2>' +
              '<p class="fda-status" data-pdf-status>' + pdfStatus + '</p>' +
              '<div class="fda-actions"><button type="button" class="fda-btn fda-btn--line" data-act="download">' + esc(R.download) + '</button></div>' +
            '</section>' +
          '</div>' +
          (this.cfg.paidEnabled ? '<section class="fda-card fda-paid"><div class="fda-kicker">' + esc(R.paidEyebrow) + '</div><h2>' + esc(R.paidTitle) + '</h2><p>' + esc(R.paidBody) + '</p>' +
            '<div class="fda-actions"><button type="button" class="fda-btn fda-btn--navy" data-act="unlock">' + esc(R.paidCta) + '</button></div></section>' : '') +
          '<div class="fda-foot"><button type="button" data-act="retake">' + esc(R.retake) + '</button></div>' +
        '</div>' +
      '</div>';

    this.bindLang();
    this.scrollTop();
    // animate
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        self.root.querySelectorAll('[data-w]').forEach(function (e) { e.style.width = e.getAttribute('data-w') + '%'; });
        var arc = self.root.querySelector('.fda-ring-arc'); if (arc) arc.style.strokeDashoffset = arc.getAttribute('data-off');
        var mk = self.root.querySelector('.fda-gauge-mark'); if (mk) mk.style.left = mk.getAttribute('data-left');
        var num = self.root.querySelector('[data-n]'), target = r.index, t0 = performance.now();
        (function tick(now) { var p = Math.min(1, (now - t0) / 1100); num.textContent = Math.round(target * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(tick); })(t0);
      });
    });

    this.root.querySelector('[data-act="book"]').addEventListener('click', function () { self.event('book_click'); });
    this.root.querySelector('[data-act="download"]').addEventListener('click', function (e) { self.download(e.currentTarget); });
    this.root.querySelector('[data-act="retake"]').addEventListener('click', function () { store(self.cfg.storageKey, null); self.dir = 1; self.renderIntro(); });
    var un = this.root.querySelector('[data-act="unlock"]');
    if (un) un.addEventListener('click', function () { self.event('unlock_click'); });

    if (s.pdf === 'pending' && !this.delivering) this.deliver();
  };

  App.prototype.calendlyLink = function () {
    var c = this.state.contact || {}, u = this.cfg.calendlyUrl;
    var sep = u.indexOf('?') >= 0 ? '&' : '?';
    return u + sep + 'name=' + encodeURIComponent(c.name || '') + '&email=' + encodeURIComponent(c.email || '') +
      '&utm_source=founder-dependency&utm_content=' + encodeURIComponent(this.state.id || '');
  };

  App.prototype.event = function (type) {
    if (!this.state.id) return;
    api(this.cfg, { action: 'event', id: this.state.id, type: type }, 15000).catch(function () {});
  };

  App.prototype.setPdfStatus = function (kind) {
    var R = this.t().results, el = this.root.querySelector('[data-pdf-status]');
    var email = '<b>' + esc(this.state.contact.email) + '</b>';
    if (el) el.innerHTML = kind === 'sent' ? fill(esc(R.pdfSent), { email: email }) : kind === 'error' ? esc(R.pdfError) : fill(esc(R.pdfSending), { email: email });
  };

  App.prototype.deliver = function () {
    var self = this, s = this.state;
    this.delivering = true;
    var lang = this.lang;
    this.buildPdf(lang).then(function (doc) {
      var b64 = doc.output('datauristring').split(',')[1];
      return api(self.cfg, { action: 'deliver', id: s.id, lang: lang, fileName: self.fileName(), pdf: b64 }, 60000);
    }).then(function () {
      s.pdf = 'sent'; self.save(); self.setPdfStatus('sent');
    }).catch(function (e) {
      if (window.console) console.warn('[FDA] deliver', e);
      s.pdf = 'error'; self.save(); self.setPdfStatus('error');
    }).then(function () { self.delivering = false; });
  };

  App.prototype.fileName = function () {
    var n = (this.state.contact.name || '').replace(/[^\wÀ-ſ ]+/g, '').trim().replace(/\s+/g, '-');
    return (this.lang === 'es' ? 'Dependencia-del-Fundador' : 'Founder-Dependency') + (n ? '-' + n : '') + '.pdf';
  };

  App.prototype.download = function (btn) {
    var self = this, R = this.t().results, label = btn.textContent;
    btn.disabled = true; btn.textContent = R.preparing;
    this.buildPdf(this.lang).then(function (doc) {
      doc.save(self.fileName());
      self.event('pdf_download');
    }).catch(function (e) { if (window.console) console.error(e); alert(self.t().ui.errorGeneric); })
      .then(function () { btn.disabled = false; btn.textContent = label; });
  };

  /* ------------------------------------------------------------------ PDF */
  var JSPDF_URL = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
  var pdfAssets = null;
  function getPdfAssets(base) {
    if (pdfAssets) return pdfAssets;
    var jsp = (window.jspdf && window.jspdf.jsPDF) ? Promise.resolve() : loadScript(JSPDF_URL);
    var f = function (n) { return fetchB64(base + 'fonts/Montserrat-' + n + '.ttf'); };
    var img = function (n) { return fetchB64(base + n).then(function (b) { return 'data:image/png;base64,' + b; }).catch(function () { return null; }); };
    pdfAssets = Promise.all([jsp, f('Light'), f('Regular'), f('SemiBold'), f('Bold'), img('adizes-logo-white.png'), img('arrow-red.png'), img('arrow-white.png')])
      .then(function (a) { return { fonts: { Light: a[1], Regular: a[2], SemiBold: a[3], Bold: a[4] }, logo: a[5], arrowRed: a[6], arrowWhite: a[7] }; });
    pdfAssets.catch(function () { pdfAssets = null; });
    return pdfAssets;
  }
  function rgb(hex) { var n = parseInt(hex.slice(1), 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; }

  App.prototype.buildPdf = function (lang) {
    var self = this;
    return getPdfAssets(this.cfg.assetsBase).then(function (A) { return renderPdf(self, lang, A); });
  };

  function renderPdf(app, lang, A) {
    var t = I18N[lang] || I18N.en, s = app.state, r = s.result;
    var doc = new window.jspdf.jsPDF({ unit: 'pt', format: 'letter', compress: true });
    ['Light', 'Regular', 'SemiBold', 'Bold'].forEach(function (w) {
      doc.addFileToVFS('M-' + w + '.ttf', A.fonts[w]);
      doc.addFont('M-' + w + '.ttf', 'M', w.toLowerCase());
    });
    var W = 612, H = 792, M = 54, CW = W - 2 * M;
    var NAVY = '#003663', INK = '#1d2633', MUTED = '#5b6878', RED = '#d7141a', LINE = '#e3e8ef';
    var lvl = t.levels[r.level], lvc = levelOf(r.level).color;
    var dateStr; try { dateStr = new Date(s.submittedAt || Date.now()).toLocaleDateString(t.locale, { year: 'numeric', month: 'long', day: 'numeric' }); } catch (e) { dateStr = (s.submittedAt || '').slice(0, 10); }

    function font(w, size, color) { doc.setFont('M', w); doc.setFontSize(size); doc.setTextColor.apply(doc, rgb(color || INK)); }
    function fillc(c) { doc.setFillColor.apply(doc, rgb(c)); }
    function strokec(c) { doc.setDrawColor.apply(doc, rgb(c)); }
    // rich text with **bold** wrapping. returns new y
    function rich(text, x, y, width, size, opts) {
      opts = opts || {};
      var lh = size * (opts.lh || 1.5), color = opts.color || INK, bcolor = opts.bold || color;
      var reg = opts.weight || 'regular', bw = opts.boldWeight || 'bold';
      var tokens = [];
      String(text).split(/(\*\*.+?\*\*)/).forEach(function (part) {
        if (!part) return;
        var b = /^\*\*.+\*\*$/.test(part); if (b) part = part.slice(2, -2);
        part.split(/(\s+)/).forEach(function (w) { if (w) tokens.push({ w: w, b: b }); });
      });
      var lines = [[]], lw = 0;
      tokens.forEach(function (tk) {
        doc.setFont('M', tk.b ? bw : reg); doc.setFontSize(size);
        var tw = doc.getTextWidth(tk.w);
        var space = /^\s+$/.test(tk.w);
        if (!space && lw + tw > width && lines[lines.length - 1].length) { lines.push([]); lw = 0; }
        if (space && !lines[lines.length - 1].length) return;
        lines[lines.length - 1].push({ w: tk.w, b: tk.b, tw: tw }); lw += tw;
      });
      lines.forEach(function (ln) {
        while (ln.length && /^\s+$/.test(ln[ln.length - 1].w)) ln.pop();
        var cx = x;
        if (opts.align === 'center') { var tot = ln.reduce(function (a, b) { return a + b.tw; }, 0); cx = x + (width - tot) / 2; }
        ln.forEach(function (tk) {
          font(tk.b ? bw : reg, size, tk.b ? bcolor : color);
          if (!/^\s+$/.test(tk.w)) doc.text(tk.w, cx, y);
          cx += tk.tw;
        });
        y += lh;
      });
      return y;
    }
    function footer(n, dark) {
      font('regular', 8, dark ? '#9fb3c8' : MUTED);
      doc.text(t.pdf.footer, M, H - 30);
      doc.text(t.pdf.page + ' ' + n, W - M, H - 30, { align: 'right' });
      if (!dark && A.arrowRed) doc.addImage(A.arrowRed, 'PNG', W / 2 - 13, H - 44, 26, 18.5);
    }
    function arc(cx, cy, rad, from, to, color, width) {
      // polyline arc, angles in degrees (0 = top, clockwise)
      strokec(color); doc.setLineWidth(width); doc.setLineCap('round');
      var steps = Math.max(2, Math.ceil(Math.abs(to - from) / 3)), pts = [];
      for (var i = 0; i <= steps; i++) {
        var a = (from + (to - from) * i / steps - 90) * Math.PI / 180;
        pts.push([cx + rad * Math.cos(a), cy + rad * Math.sin(a)]);
      }
      for (var j = 1; j < pts.length; j++) doc.line(pts[j - 1][0], pts[j - 1][1], pts[j][0], pts[j][1]);
    }

    /* ---- Page 1: cover ---- */
    fillc('#01243c'); doc.rect(0, 0, W, H, 'F');
    fillc(NAVY); doc.triangle(W, 0, W, H * 0.62, W * 0.25, 0, 'F');
    fillc('#0a4f8f'); doc.triangle(W, 0, W, H * 0.36, W * 0.62, 0, 'F');
    if (A.logo) doc.addImage(A.logo, 'PNG', M, 56, 150, 50);
    font('light', 40, '#ffffff'); doc.text(t.pdf.title, M, 250);
    font('bold', 40, '#ffffff'); doc.text(t.pdf.title2, M, 296);
    fillc(RED); doc.rect(M, 318, 60, 4, 'F');
    font('semibold', 10, '#f25f5c'); doc.text(t.pdf.preparedFor.toUpperCase(), M, 380);
    font('bold', 20, '#ffffff'); doc.text(doc.splitTextToSize(s.contact.name || '', CW)[0] || '', M, 406);
    font('regular', 13, '#c9d6e3'); doc.text(doc.splitTextToSize(s.contact.company || '', CW)[0] || '', M, 428);
    font('regular', 10, '#9fb3c8'); doc.text(dateStr, M, 452);
    // result teaser box
    var by = 520;
    fillc('#ffffff'); doc.roundedRect(M, by, CW, 150, 10, 10, 'F');
    arc(M + 80, by + 75, 46, 0, 360, '#e9edf2', 9);
    arc(M + 80, by + 75, 46, 0, Math.max(4, r.index * 3.6), lvc, 9);
    font('bold', 28, INK); doc.text(String(r.index), M + 80, by + 84, { align: 'center' });
    font('semibold', 9, RED); doc.text(t.pdf.yourResult.toUpperCase(), M + 150, by + 46);
    font('bold', 24, NAVY); doc.text(lvl.name, M + 150, by + 74);
    font('semibold', 10, MUTED); doc.text(lvl.tag + ' · ' + t.results.indexLabel + ' ' + r.index + '/100', M + 150, by + 94);
    rich(lvl.summary, M + 150, by + 114, CW - 170, 9.5, { color: INK, lh: 1.4 });
    footer(1, true);

    /* ---- Page 2: result ---- */
    doc.addPage();
    fillc(lvc); doc.rect(0, 0, W, 150, 'F');
    var onLv = r.level === 'L2' ? '#3d2a00' : '#ffffff';
    if (A.arrowWhite && r.level !== 'L2') doc.addImage(A.arrowWhite, 'PNG', W - M - 60, 40, 60, 42.6);
    font('light', 26, onLv); doc.text(t.pdf.yourResult, M, 72);
    font('bold', 30, onLv); doc.text(lvl.name.toUpperCase(), M, 112);
    font('semibold', 11, onLv); doc.text(lvl.tag, M, 132);
    var y = 196;
    // gauge
    var gw = CW, seg = (gw - 12) / 4;
    LEVELS.forEach(function (l, i) {
      fillc(l.color); doc.setGState && doc.setGState(new doc.GState({ opacity: l.key === r.level ? 1 : 0.28 }));
      doc.roundedRect(M + i * (seg + 4), y, seg, 12, 3, 3, 'F');
      doc.setGState && doc.setGState(new doc.GState({ opacity: 1 }));
      font(l.key === r.level ? 'bold' : 'regular', 8.5, l.key === r.level ? INK : MUTED);
      doc.text(t.levels[l.key].name, M + i * (seg + 4) + seg / 2, y + 28, { align: 'center' });
    });
    var mx = M + gw * Math.max(1, Math.min(99, r.index)) / 100;
    fillc('#ffffff'); doc.rect(mx - 3.5, y - 9, 7, 30, 'F');
    fillc(INK); doc.roundedRect(mx - 2, y - 7, 4, 26, 1.5, 1.5, 'F');
    font('regular', 8.5, MUTED); doc.text(t.results.indexLabel + ': ' + r.index + '/100  ·  ' + t.results.indexHelp, M, y + 50);
    y += 86;
    font('semibold', 14, NAVY); y = rich(lvl.summary, M, y, CW, 14, { color: NAVY, weight: 'semibold', lh: 1.35 }) + 8;
    lvl.body.forEach(function (p) { y = rich(p, M, y, CW, 11, { color: INK, bold: NAVY, lh: 1.6 }) + 10; });
    // watch box
    var wl = doc.splitTextToSize(lvl.watch.replace(/\*\*/g, ''), CW - 36).length;
    var wh = wl * 11 * 1.55 + 26;
    fillc('#fdf1f1'); doc.rect(M, y, CW, wh, 'F'); fillc(RED); doc.rect(M, y, 4, wh, 'F');
    rich(lvl.watch, M + 20, y + 21, CW - 36, 11, { color: '#8c0f13', bold: '#8c0f13', lh: 1.55 });
    y += wh + 26;
    // lenses
    if (y < H - 200) {
      font('bold', 11, NAVY); doc.text(t.pdf.lenses, M, y); y += 18;
      y = rich(t.pdf.lensesBody, M, y, CW, 9.5, { color: MUTED, lh: 1.55 }) + 6;
      y = rich(t.pdf.methodNote, M, y, CW, 9.5, { color: MUTED, lh: 1.55 });
    }
    footer(2);

    /* ---- Page 3: dimensions ---- */
    doc.addPage();
    if (A.arrowRed) doc.addImage(A.arrowRed, 'PNG', W - M - 52, 50, 52, 37);
    font('light', 28, INK); doc.text(t.results.mapTitle.split(' ').slice(0, Math.ceil(t.results.mapTitle.split(' ').length / 2)).join(' '), M, 78);
    font('bold', 28, INK); doc.text(t.results.mapTitle.split(' ').slice(Math.ceil(t.results.mapTitle.split(' ').length / 2)).join(' '), M, 112);
    y = 146;
    y = rich(t.results.mapBody, M, y, CW, 10.5, { color: INK, lh: 1.55 }) + 12;
    // legend (compact, above the list)
    var lw = (CW - 18) / 4, ly = y;
    BANDS.forEach(function (b, i) {
      var bx = M + i * (lw + 6), bt = t.bands[b.key];
      fillc('#f4f6f9'); doc.roundedRect(bx, ly, lw, 58, 5, 5, 'F');
      fillc(b.color); doc.roundedRect(bx + 8, ly + 8, 34, 13, 3, 3, 'F');
      font('bold', 7.5, b.key === 'B2' ? '#3d2a00' : '#ffffff'); doc.text(bt.range, bx + 25, ly + 17.2, { align: 'center' });
      font('bold', 7.5, INK); doc.text(doc.splitTextToSize(bt.name, lw - 16)[0], bx + 8, ly + 33);
      font('regular', 7, MUTED); doc.text(doc.splitTextToSize(bt.desc, lw - 16).slice(0, 2), bx + 8, ly + 43);
    });
    y = ly + 70;
    r.dims.forEach(function (d) {
      var dt = t.dimensions[d.i], b = bandOf(d.band), isTop = r.top.indexOf(d.i) >= 0;
      var bh = 60;
      if (isTop) { fillc('#f2f6fb'); strokec(NAVY); doc.setLineWidth(1); doc.roundedRect(M, y, CW, bh, 8, 8, 'FD'); }
      else { strokec(LINE); doc.setLineWidth(1); doc.roundedRect(M, y, CW, bh, 8, 8, 'S'); }
      font('bold', 11, NAVY); doc.text(dt.name, M + 16, y + 21);
      if (isTop) {
        var tw = doc.getTextWidth(dt.name);
        font('bold', 7, '#ffffff'); var fl = t.results.startHere.toUpperCase(), fw = doc.getTextWidth(fl) + 12;
        fillc(NAVY); doc.roundedRect(M + 24 + tw, y + 11.5, fw, 13, 3, 3, 'F'); doc.text(fl, M + 30 + tw, y + 20.7);
      }
      font('bold', 8.5, d.band === 'B2' ? '#a87308' : b.color); doc.text(t.bands[d.band].name.toUpperCase(), W - M - 16, y + 21, { align: 'right' });
      var tx = M + 16, tw2 = CW - 32 - 54;
      fillc('#edf0f4'); doc.roundedRect(tx, y + 30, tw2, 7, 3.5, 3.5, 'F');
      fillc(b.color); doc.roundedRect(tx, y + 30, Math.max(7, tw2 * (d.score - 3) / 12), 7, 3.5, 3.5, 'F');
      font('bold', 13, INK); doc.text(String(d.score), W - M - 34, y + 38, { align: 'right' });
      font('regular', 8.5, MUTED); doc.text('/15', W - M - 32, y + 38);
      font('regular', 9, '#3c4858'); doc.text(doc.splitTextToSize(dt.reading[b.reading], CW - 32)[0], tx, y + 53);
      y += bh + 8;
    });
    footer(3);

    /* ---- Page 4: next steps + CTA ---- */
    doc.addPage();
    var rec = t.recs[r.level];
    font('light', 28, INK); doc.text(t.results.stepsTitle, M, 78);
    fillc(lvc); doc.rect(M, 92, 60, 4, 'F');
    y = 126;
    y = rich(rec.lead, M, y, CW, 12, { color: NAVY, weight: 'semibold', lh: 1.45 }) + 12;
    rec.steps.forEach(function (st, i) {
      fillc(NAVY); doc.circle(M + 13, y + 1, 13, 'F');
      font('bold', 12, '#ffffff'); doc.text(String(i + 1), M + 13, y + 5.5, { align: 'center' });
      font('bold', 12, NAVY); doc.text(st.t, M + 40, y + 5);
      y = rich(st.d, M + 40, y + 24, CW - 40, 10.5, { color: INK, lh: 1.55 }) + 14;
    });
    // CTA block
    var cy = Math.min(Math.max(y + 24, 440), 470), ch = H - 56 - cy;
    fillc(NAVY); doc.rect(0, cy, W, H - cy, 'F');
    if (A.arrowWhite) { doc.setGState && doc.setGState(new doc.GState({ opacity: 0.12 })); doc.addImage(A.arrowWhite, 'PNG', W - 210, cy + ch - 150, 210, 149); doc.setGState && doc.setGState(new doc.GState({ opacity: 1 })); }
    var yy = cy + 44;
    font('semibold', 10, '#f25f5c'); doc.text(t.results.sessionEyebrow.toUpperCase(), M, yy); yy += 30;
    font('bold', 24, '#ffffff'); doc.text(t.pdf.nextStep, M, yy); yy += 26;
    yy = rich(t.pdf.nextBody, M, yy, CW, 10.5, { color: '#d7e2ee', lh: 1.55 }) + 6;
    yy = rich(t.results.sessionBody, M, yy, CW, 10.5, { color: '#d7e2ee', lh: 1.55 }) + 14;
    var cta = t.pdf.nextCta + '  →';
    font('bold', 12, NAVY); var bw = doc.getTextWidth(cta) + 44;
    fillc('#ffffff'); doc.roundedRect(M, yy, bw, 38, 19, 19, 'F');
    font('bold', 12, NAVY); doc.text(cta, M + 22, yy + 24);
    doc.link(M, yy, bw, 38, { url: app.calendlyLink() });
    footer(4, true);

    doc.setProperties({ title: t.pdf.title + ' ' + t.pdf.title2 + ' — ' + (s.contact.name || ''), author: 'Adizes Institute', creator: 'Adizes Institute' });
    return doc;
  }

  /* ------------------------------------------------------------------ boot */
  function boot() {
    var cfg = {}, user = window.FD_CONFIG || {};
    for (var k in DEFAULTS) cfg[k] = DEFAULTS[k];
    for (var k2 in user) cfg[k2] = user[k2];
    if (!cfg.assetsBase) cfg.assetsBase = detectAssets();
    var el = typeof cfg.mount === 'string' ? document.querySelector(cfg.mount) : cfg.mount;
    if (!el) { if (window.console) console.error('[FDA] mount element not found: ' + cfg.mount); return; }
    if (!el.id) el.id = 'fd-assessment';
    if (!document.getElementById('fda-style-' + el.id)) {
      var st = document.createElement('style');
      st.id = 'fda-style-' + el.id;
      st.textContent = CSS.split('__ROOT__').join('#' + el.id);
      document.head.appendChild(st);
    }
    if (cfg.loadFont && !document.querySelector('link[data-fda-font]')) {
      var l = document.createElement('link');
      l.rel = 'stylesheet'; l.setAttribute('data-fda-font', '1');
      l.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800&display=swap';
      document.head.appendChild(l);
    }
    window.FDA = { app: new App(el, cfg), version: VERSION, score: score };
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();

})();
