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
