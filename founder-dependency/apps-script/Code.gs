/*************************************************************************************
 * ADIZES · FOUNDER DEPENDENCY ASSESSMENT — BACKEND (Google Apps Script web app)
 * -----------------------------------------------------------------------------------
 * The Webflow widget sends POST requests here (Content-Type text/plain, JSON body):
 *   submit  → validates, scores on the server, saves a row in the "FD Responses" tab
 *   deliver → receives the PDF (base64), saves it in Drive, emails it to the person,
 *             sends the lead to Zapier (→ HubSpot) and notifies it@adizes.com
 *   event   → small events (booking click, PDF download)
 * Backup: a time trigger (every 10 min) completes any row that never got its PDF
 * (person closed the tab): sends the email without PDF + Zapier + notification.
 *
 * Deploy: Deploy → New deployment → Web app → Execute as: Me · Who has access: Anyone.
 * After pasting a new version: Deploy → Manage deployments → ✏️ → Version: New version.
 *************************************************************************************/

const CONFIG = {
  SHEET_NAME: 'FD Responses',
  PDF_FOLDER_ID: '1XrliFQE8RyO-oikU-1E1cETiQzFhfFqE',   // Drive folder for the PDFs
  EMAIL: {
    FROM_ADDRESS: 'info@adizes.com',  // "Send mail as" alias of the account that runs the script
    FROM_NAME: 'Adizes Institute',
    NOTIFY_TO: 'it@adizes.com',       // internal notification (same domain → sent WITHOUT Reply-To)
  },
  ZAPIER: {
    ENABLED: true,
    WEBHOOK_URL: 'https://hooks.zapier.com/hooks/catch/6080013/4tzi9z9/',
    // Defaults used when the page URL has no utm_* parameters
    SOURCE: 'ads',
    SECOND_SOURCE: 'Meta',
    THIRD_SOURCE: 'lead_magnet_1',
    LIFECYCLE_STAGE: 'mql',
  },
  CALENDLY_URL: 'https://calendly.com/jaime-morales/30min',
  ASSETS_BASE: 'https://cdn.jsdelivr.net/gh/Adizes/assessments@v1.0.0/founder-dependency/assets/',
  BACKUP_AFTER_MIN: 15,      // rows without PDF older than this get the backup email
  MAX_PDF_BYTES: 6 * 1024 * 1024,
};

/* ----------------------------------------------------------------------------------
 * Labels used by the server (emails, Sheet, Zapier). To add a language, copy a block.
 * ---------------------------------------------------------------------------------- */
const LABELS = {
  en: {
    dims: ['Decision-making', 'Delegation & accountability', 'Organizational structure', 'Leadership-team capability', 'Strategic focus', 'Systems & execution'],
    levels: { L1: 'Scalable', L2: 'Transitioning', L3: 'Founder-Centered', L4: 'Founder-Dependent' },
    tags: { L1: 'Low dependency', L2: 'Moderate dependency', L3: 'High dependency', L4: 'Critical dependency' },
    bands: { B1: 'Strength', B2: 'Emerging risk', B3: 'Significant dependency', B4: 'Immediate priority' },
    email: {
      subject: 'Your Founder Dependency report',
      hi: 'Hi {first},',
      intro: 'Thank you for completing the Founder Dependency Assessment. Your full report is attached as a PDF.',
      introNoPdf: 'Thank you for completing the Founder Dependency Assessment. Here is a summary of your results.',
      result: 'Your result',
      index: 'Dependency index',
      areas: 'Where your dependency lives',
      startHere: 'Start here',
      sessionTitle: 'Turn this diagnosis into a plan',
      sessionBody: 'In a free 30-minute Implementation Session, a Certified Adizes Associate reviews your results with you and helps you map your first practical steps.',
      sessionCta: 'Book my free session',
      sign: 'The Adizes Institute team',
      footer: 'You received this email because you completed the Founder Dependency Assessment at adizes.com.',
    },
  },
  es: {
    dims: ['Toma de decisiones', 'Delegación y responsabilidad', 'Estructura organizacional', 'Capacidad del equipo directivo', 'Enfoque estratégico', 'Sistemas y ejecución'],
    levels: { L1: 'Escalable', L2: 'En transición', L3: 'Centrada en el fundador', L4: 'Dependiente del fundador' },
    tags: { L1: 'Dependencia baja', L2: 'Dependencia moderada', L3: 'Dependencia alta', L4: 'Dependencia crítica' },
    bands: { B1: 'Fortaleza', B2: 'Riesgo emergente', B3: 'Dependencia significativa', B4: 'Prioridad inmediata' },
    email: {
      subject: 'Tu reporte de Dependencia del Fundador',
      hi: 'Hola, {first}:',
      intro: 'Gracias por completar la Evaluación de Dependencia del Fundador. Adjuntamos tu reporte completo en PDF.',
      introNoPdf: 'Gracias por completar la Evaluación de Dependencia del Fundador. Aquí tienes un resumen de tus resultados.',
      result: 'Tu resultado',
      index: 'Índice de dependencia',
      areas: 'Dónde vive tu dependencia',
      startHere: 'Empieza aquí',
      sessionTitle: 'Convierte este diagnóstico en un plan',
      sessionBody: 'En una Sesión de Implementación gratuita de 30 minutos, un Asociado Certificado de Adizes revisa tus resultados contigo y te ayuda a trazar tus primeros pasos prácticos.',
      sessionCta: 'Agendar mi sesión gratuita',
      sign: 'El equipo del Instituto Adizes',
      footer: 'Recibiste este correo porque completaste la Evaluación de Dependencia del Fundador en adizes.com.',
    },
  },
};
function L_(lang) { return LABELS[lang] || LABELS.en; }

// Values sent to Zapier/HubSpot stay the same as the old Typeform flow.
const LEGACY = {
  L1: { s1: 'Scalable', s2: 'Low' },
  L2: { s1: 'Transitioning', s2: 'Moderate' },
  L3: { s1: 'Founder-Centered', s2: 'High' },
  L4: { s1: 'Founder-Centered', s2: 'Critical' },
};

/* ----------------------------------------------------------------------------------
 * Sheet columns (matched by HEADER NAME, so you can reorder/add columns freely)
 * ---------------------------------------------------------------------------------- */
const COLS = [
  'ID', 'Submitted At', 'Status', 'Language',
  'Full Name', 'First Name', 'Last Name', 'Email', 'Company', 'Company Size', 'Job Title',
  'Cost Of Inaction', 'Buying Timeline',
  'Dependency Index (0-100)', 'Raw Score (18-90)', 'Level', 'Section 1 (legacy)', 'Section 2 (legacy)',
  'D1 Decisions', 'D2 Delegation', 'D3 Structure', 'D4 Leadership Team', 'D5 Focus', 'D6 Systems', 'Top Areas',
  'Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6', 'Q7', 'Q8', 'Q9', 'Q10', 'Q11', 'Q12', 'Q13', 'Q14', 'Q15', 'Q16', 'Q17', 'Q18',
  'Report URL', 'Emailed At', 'Zapier', 'Notified', 'Session Click', 'PDF Downloads',
  'Consent', 'Page', 'Referrer', 'UTM Source', 'UTM Medium', 'UTM Campaign', 'UTM Content', 'UTM Term',
  'Started At', 'Time Zone', 'Widget Version', 'Error',
];
// Columns that hold free text typed by people → forced to plain text
const TEXT_COLS = ['ID', 'Full Name', 'First Name', 'Last Name', 'Email', 'Company', 'Company Size', 'Job Title',
  'Cost Of Inaction', 'Buying Timeline', 'Page', 'Referrer', 'UTM Source', 'UTM Medium', 'UTM Campaign', 'UTM Content', 'UTM Term', 'Error'];

const STATUS = { SUBMITTED: 'Submitted', DONE: 'Done', DONE_NO_PDF: 'Done (no PDF)', ERROR: 'Error' };

/* =================================================================================
 *  ENTRY POINTS
 * ================================================================================= */
function doPost(e) {
  let body;
  try {
    body = JSON.parse((e && e.postData && e.postData.contents) || '{}');
  } catch (err) {
    return json_({ ok: false, error: 'bad_json' });
  }
  try {
    switch (body.action) {
      case 'submit':  return json_(handleSubmit_(body));
      case 'deliver': return json_(handleDeliver_(body));
      case 'event':   return json_(handleEvent_(body));
      default:        return json_({ ok: false, error: 'unknown_action' });
    }
  } catch (err) {
    console.error(body.action, err && err.stack || err);
    return json_({ ok: false, error: String(err && err.message || err) });
  }
}

function doGet() {
  return json_({ ok: true, service: 'founder-dependency', time: new Date().toISOString() });
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

/* =================================================================================
 *  SUBMIT
 * ================================================================================= */
function handleSubmit_(b) {
  const answers = (b.answers || []).map(Number);
  if (answers.length !== 18 || answers.some(v => !(v >= 1 && v <= 5 && Math.floor(v) === v)))
    throw new Error('invalid_answers');
  const c = b.contact || {};
  const name = clean_(c.name, 120), email = clean_(c.email, 160).toLowerCase(), company = clean_(c.company, 160);
  if (name.length < 2) throw new Error('invalid_name');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) throw new Error('invalid_email');
  if (!company) throw new Error('invalid_company');
  if (c.consent !== true) throw new Error('consent_required');
  const lang = LABELS[b.lang] ? b.lang : 'en';

  const s = score_(answers);
  const parts = name.split(/\s+/);
  const ctx = b.context || {}, cl = b.closing || {}, m = b.meta || {};
  const id = newId_();

  const row = {
    'ID': id,
    'Submitted At': new Date(),
    'Status': STATUS.SUBMITTED,
    'Language': lang,
    'Full Name': name, 'First Name': parts[0], 'Last Name': parts.slice(1).join(' '),
    'Email': email, 'Company': company,
    'Company Size': clean_(ctx.companySize, 60), 'Job Title': clean_(ctx.jobTitle, 60),
    'Cost Of Inaction': clean_(cl.qInaction, 120), 'Buying Timeline': clean_(cl.qTimeline, 120),
    'Dependency Index (0-100)': s.index, 'Raw Score (18-90)': s.raw,
    'Level': LABELS.en.levels[s.level], 'Section 1 (legacy)': LEGACY[s.level].s1, 'Section 2 (legacy)': LEGACY[s.level].s2,
    'D1 Decisions': s.dims[0], 'D2 Delegation': s.dims[1], 'D3 Structure': s.dims[2],
    'D4 Leadership Team': s.dims[3], 'D5 Focus': s.dims[4], 'D6 Systems': s.dims[5],
    'Top Areas': s.top.map(i => LABELS.en.dims[i]).join(' | '),
    'Consent': 'Yes',
    'Page': clean_(m.page, 500), 'Referrer': clean_(m.referrer, 500),
    'UTM Source': clean_(m.utm_source, 120), 'UTM Medium': clean_(m.utm_medium, 120), 'UTM Campaign': clean_(m.utm_campaign, 200),
    'UTM Content': clean_(m.utm_content, 200), 'UTM Term': clean_(m.utm_term, 200),
    'Started At': clean_(m.startedAt, 40), 'Time Zone': clean_(m.tz, 60), 'Widget Version': clean_(b.v, 20),
    'PDF Downloads': 0,
  };
  for (let i = 0; i < 18; i++) row['Q' + (i + 1)] = answers[i];

  withLock_(() => {
    const sh = sheet_();
    const map = headerMap_(sh);
    const out = new Array(sh.getLastColumn()).fill('');
    Object.keys(row).forEach(k => { if (map[k] != null) out[map[k]] = safe_(row[k]); });
    sh.appendRow(out);
  });
  return { ok: true, id: id, result: { index: s.index, raw: s.raw, level: s.level, dims: s.dims } };
}

/* =================================================================================
 *  DELIVER (PDF from the browser → Drive → email → Zapier → notify)
 * ================================================================================= */
function handleDeliver_(b) {
  const id = clean_(b.id, 40);
  const found = findRow_(id);
  if (!found) throw new Error('not_found');
  const { sh, rowNum, rec, map } = found;
  if (rec['Status'] === STATUS.DONE) return { ok: true, already: true };

  const bytes = Utilities.base64Decode(String(b.pdf || ''));
  if (bytes.length < 1000 || bytes.length > CONFIG.MAX_PDF_BYTES) throw new Error('bad_pdf_size');
  if (String.fromCharCode(bytes[0], bytes[1], bytes[2], bytes[3]) !== '%PDF') throw new Error('not_a_pdf');

  const fileName = (clean_(b.fileName, 120).replace(/[^\wÀ-ſ.\- ]+/g, '') || 'Founder-Dependency.pdf').replace(/(\.pdf)?$/i, '.pdf');
  const blob = Utilities.newBlob(bytes, 'application/pdf', fileName.replace(/\.pdf$/i, '') + ' - ' + id + '.pdf');
  const file = DriveApp.getFolderById(CONFIG.PDF_FOLDER_ID).createFile(blob);
  const url = file.getUrl();
  setCells_(sh, rowNum, map, { 'Report URL': url });
  rec['Report URL'] = url;

  try {
    sendUserEmail_(rec, blob.setName(fileName));
    setCells_(sh, rowNum, map, { 'Emailed At': new Date() });
  } catch (err) {
    setCells_(sh, rowNum, map, { 'Status': STATUS.ERROR, 'Error': 'email: ' + err });
    throw err;
  }
  finishRow_(sh, rowNum, map, rec, STATUS.DONE);
  return { ok: true };
}

// Zapier + internal notification + final status. Errors here never block the person.
function finishRow_(sh, rowNum, map, rec, status) {
  const upd = { 'Status': status };
  if (CONFIG.ZAPIER.ENABLED && !rec['Zapier']) {
    try { pushToZapier_(rec); upd['Zapier'] = new Date(); }
    catch (err) { upd['Zapier'] = 'ERROR ' + String(err).slice(0, 200); }
  }
  if (CONFIG.EMAIL.NOTIFY_TO && !rec['Notified']) {
    try { sendNotify_(rec); upd['Notified'] = new Date(); }
    catch (err) { upd['Notified'] = 'ERROR ' + String(err).slice(0, 200); }
  }
  setCells_(sh, rowNum, map, upd);
}

/* =================================================================================
 *  EVENTS
 * ================================================================================= */
function handleEvent_(b) {
  const found = findRow_(clean_(b.id, 40));
  if (!found) return { ok: true };
  const { sh, rowNum, rec, map } = found;
  if (b.type === 'book_click' && !rec['Session Click']) setCells_(sh, rowNum, map, { 'Session Click': new Date() });
  if (b.type === 'pdf_download') setCells_(sh, rowNum, map, { 'PDF Downloads': (Number(rec['PDF Downloads']) || 0) + 1 });
  return { ok: true };
}

/* =================================================================================
 *  BACKUP (time trigger): rows that never received their PDF
 * ================================================================================= */
function backupDeliver() {
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(5000)) return;
  LOCK_DEPTH_++;
  try {
    const sh = sheet_();
    const map = headerMap_(sh);
    const last = sh.getLastRow();
    if (last < 2) return;
    const data = sh.getRange(2, 1, last - 1, sh.getLastColumn()).getValues();
    const heads = Object.keys(map);
    const cutoff = Date.now() - CONFIG.BACKUP_AFTER_MIN * 60 * 1000;
    data.forEach((vals, i) => {
      const rec = {}; heads.forEach(h => rec[h] = vals[map[h]]);
      if (rec['Status'] !== STATUS.SUBMITTED) return;
      const at = rec['Submitted At'] instanceof Date ? rec['Submitted At'].getTime() : Date.parse(rec['Submitted At']);
      if (!(at < cutoff)) return;
      const rowNum = i + 2;
      try {
        sendUserEmail_(rec, null);
        setCells_(sh, rowNum, map, { 'Emailed At': new Date() });
        finishRow_(sh, rowNum, map, rec, STATUS.DONE_NO_PDF);
      } catch (err) {
        setCells_(sh, rowNum, map, { 'Status': STATUS.ERROR, 'Error': 'backup: ' + err });
      }
    });
  } finally {
    LOCK_DEPTH_--;
    lock.releaseLock();
  }
}

/* =================================================================================
 *  EMAILS
 * ================================================================================= */
function sendUserEmail_(rec, pdfBlob) {
  const lang = LABELS[rec['Language']] ? rec['Language'] : 'en';
  const T = L_(lang), E = T.email;
  const s = recScores_(rec);
  const first = esc_(rec['First Name'] || '');
  const navy = '#003663', coral = '#f25f5c';
  const levelColor = { L1: '#127a2c', L2: '#f2b33d', L3: '#e5703b', L4: '#d7141a' }[s.level];
  const bandColor = { B1: '#127a2c', B2: '#c48a12', B3: '#e5703b', B4: '#d7141a' };
  const cal = CONFIG.CALENDLY_URL + '?name=' + encodeURIComponent(rec['Full Name'] || '') + '&email=' + encodeURIComponent(rec['Email'] || '') + '&utm_source=founder-dependency-email&utm_content=' + encodeURIComponent(rec['ID']);

  const rows = s.dims.map((v, i) => {
    const b = band_(v), top = s.top.indexOf(i) >= 0;
    return '<tr><td style="padding:10px 0;border-bottom:1px solid #e3e8ef;font:600 14px Arial,sans-serif;color:' + navy + '">' + esc_(T.dims[i]) +
      (top ? ' <span style="display:inline-block;margin-left:6px;padding:1px 6px;border-radius:3px;background:' + navy + ';color:#fff;font:700 10px Arial,sans-serif;text-transform:uppercase">' + esc_(E.startHere) + '</span>' : '') +
      '</td><td style="padding:10px 0;border-bottom:1px solid #e3e8ef;font:700 14px Arial,sans-serif;color:#1d2633;text-align:right;white-space:nowrap">' + v + '/15</td>' +
      '<td style="padding:10px 0 10px 14px;border-bottom:1px solid #e3e8ef;font:600 12px Arial,sans-serif;color:' + bandColor[b] + ';text-align:right">' + esc_(T.bands[b]) + '</td></tr>';
  }).join('');

  const html =
    '<div style="background:#f5f7fa;padding:24px 12px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden">' +
    '<tr><td style="background:' + navy + ';padding:26px 32px"><img src="' + CONFIG.ASSETS_BASE + 'adizes-logo-white.png" alt="Adizes Institute" width="140" style="display:block;width:140px;height:auto"></td></tr>' +
    '<tr><td style="padding:32px 32px 8px;font:15px/1.6 Arial,sans-serif;color:#1d2633">' +
      '<p style="margin:0 0 14px">' + fill_(E.hi, { first: first }) + '</p>' +
      '<p style="margin:0 0 24px">' + esc_(pdfBlob ? E.intro : E.introNoPdf) + '</p>' +
      '<div style="border-radius:10px;border:1px solid #e3e8ef;padding:20px 22px">' +
        '<div style="font:700 11px Arial,sans-serif;letter-spacing:.08em;text-transform:uppercase;color:#d7141a">' + esc_(E.result) + '</div>' +
        '<div style="font:800 26px Arial,sans-serif;color:' + navy + ';margin-top:6px">' + esc_(T.levels[s.level]) + '</div>' +
        '<div style="margin-top:8px"><span style="display:inline-block;padding:3px 10px;border-radius:12px;background:' + levelColor + ';color:' + (s.level === 'L2' ? '#3d2a00' : '#fff') + ';font:700 12px Arial,sans-serif">' + esc_(T.tags[s.level]) + '</span>' +
        ' <span style="font:600 13px Arial,sans-serif;color:#5b6878;margin-left:6px">' + esc_(E.index) + ': <b style="color:#1d2633">' + s.index + '/100</b></span></div>' +
      '</div>' +
      '<div style="font:700 16px Arial,sans-serif;color:' + navy + ';margin:26px 0 4px">' + esc_(E.areas) + '</div>' +
      '<table role="presentation" width="100%" cellpadding="0" cellspacing="0">' + rows + '</table>' +
    '</td></tr>' +
    '<tr><td style="padding:24px 32px 32px"><div style="background:' + navy + ';border-radius:10px;padding:24px">' +
      '<div style="font:700 18px Arial,sans-serif;color:#ffffff">' + esc_(E.sessionTitle) + '</div>' +
      '<p style="font:14px/1.6 Arial,sans-serif;color:#d7e2ee;margin:8px 0 18px">' + esc_(E.sessionBody) + '</p>' +
      '<a href="' + esc_(cal) + '" style="display:inline-block;background:' + coral + ';color:#ffffff;font:700 15px Arial,sans-serif;text-decoration:none;padding:12px 22px;border-radius:24px">' + esc_(E.sessionCta) + ' &rarr;</a>' +
    '</div>' +
    '<p style="font:15px/1.6 Arial,sans-serif;color:#1d2633;margin:24px 0 0">' + esc_(E.sign) + '</p></td></tr>' +
    '<tr><td style="padding:16px 32px;background:#f5f7fa;font:12px/1.5 Arial,sans-serif;color:#8592a3">' + esc_(E.footer) + '</td></tr>' +
    '</table></div>';

  const options = { name: CONFIG.EMAIL.FROM_NAME, htmlBody: html };
  if (CONFIG.EMAIL.FROM_ADDRESS) options.from = CONFIG.EMAIL.FROM_ADDRESS;
  if (pdfBlob) options.attachments = [pdfBlob];
  GmailApp.sendEmail(String(rec['Email']), E.subject, plain_(E, T, s, first, cal), options);
}

function plain_(E, T, s, first, cal) {
  return fill_(E.hi, { first: first }) + '\n\n' + E.intro + '\n\n' + E.result + ': ' + T.levels[s.level] + ' (' + E.index + ' ' + s.index + '/100)\n\n' +
    s.dims.map((v, i) => T.dims[i] + ': ' + v + '/15').join('\n') + '\n\n' + E.sessionTitle + ': ' + cal + '\n\n' + E.sign;
}

function sendNotify_(rec) {
  const s = recScores_(rec);
  const lines = [
    ['ID', rec['ID']], ['Name', rec['Full Name']], ['Email', rec['Email']], ['Company', rec['Company']],
    ['Company size', rec['Company Size']], ['Job title', rec['Job Title']], ['Language', rec['Language']],
    ['Result', LABELS.en.levels[s.level] + ' · index ' + s.index + '/100 (raw ' + s.raw + '/90)'],
    ['Areas', s.dims.map((v, i) => LABELS.en.dims[i] + ' ' + v).join(' · ')],
    ['Cost of inaction', rec['Cost Of Inaction']], ['Timeline', rec['Buying Timeline']],
    ['Report', rec['Report URL'] || '(no PDF — sent by backup)'],
    ['Source', [rec['UTM Source'], rec['UTM Medium'], rec['UTM Campaign']].filter(String).join(' / ') || '(none)'],
  ];
  const html = '<table style="font:14px Arial,sans-serif;border-collapse:collapse">' + lines.map(l =>
    '<tr><td style="padding:4px 14px 4px 0;color:#5b6878;vertical-align:top">' + esc_(l[0]) + '</td><td style="padding:4px 0;color:#1d2633">' + esc_(l[1]) + '</td></tr>').join('') + '</table>';
  const subject = '[Founder Dependency] ' + rec['Full Name'] + ' · ' + rec['Company'] + ' · ' + LABELS.en.levels[s.level];
  // Same-domain recipient → no Reply-To (Gmail bounces it).
  const options = { name: CONFIG.EMAIL.FROM_NAME, htmlBody: html };
  if (CONFIG.EMAIL.FROM_ADDRESS) options.from = CONFIG.EMAIL.FROM_ADDRESS;
  GmailApp.sendEmail(CONFIG.EMAIL.NOTIFY_TO, subject, lines.map(l => l[0] + ': ' + l[1]).join('\n'), options);
}

/* =================================================================================
 *  ZAPIER (→ HubSpot). Field names kept identical to the previous Typeform flow.
 * ================================================================================= */
function pushToZapier_(rec) {
  const s = recScores_(rec);
  const Z = CONFIG.ZAPIER;
  const utm = !!rec['UTM Source'];
  const payload = {
    'First Name': rec['First Name'] || '',
    'Last Name': rec['Last Name'] || '',
    'Full Name': rec['Full Name'] || '',
    'Company': rec['Company'] || '',
    'Company Size': rec['Company Size'] || '',
    'Email': String(rec['Email'] || ''),
    'Phone': '',
    'Lifecycle Stage': Z.LIFECYCLE_STAGE,
    // With utm_* in the link we use them; without them, the same defaults as before.
    'Source': utm ? rec['UTM Source'] : Z.SOURCE,
    'Second Source': utm ? (rec['UTM Medium'] || '') : Z.SECOND_SOURCE,
    'Third source': utm ? (rec['UTM Campaign'] || Z.THIRD_SOURCE) : Z.THIRD_SOURCE,
    'Job Title': rec['Job Title'] || '',
    'Language': rec['Language'] === 'es' ? 'Spanish' : 'English',
    'Message': 'Section 1: ' + LEGACY[s.level].s1 + ' | Section 2: ' + LEGACY[s.level].s2 + ' | Index: ' + s.index + '/100',
    'Score Total': s.raw,
    'Dependency Index': s.index,
    'Section 1': LEGACY[s.level].s1,
    'Section 2': LEGACY[s.level].s2,
    'Consultation Interest': '',
    'Cost Of Inaction': rec['Cost Of Inaction'] || '',
    'Buying Timeline': rec['Buying Timeline'] || '',
    'Report URL': rec['Report URL'] || '',
    'Response ID': rec['ID'],
  };
  const resp = UrlFetchApp.fetch(Z.WEBHOOK_URL, {
    method: 'post', contentType: 'application/json', payload: JSON.stringify(payload), muteHttpExceptions: true,
  });
  if (resp.getResponseCode() >= 300) throw new Error('Zapier ' + resp.getResponseCode() + ': ' + resp.getContentText().slice(0, 200));
}

/* =================================================================================
 *  SCORING (same rules as the widget; the server is the source of truth)
 * ================================================================================= */
function score_(a) {
  let raw = 0; const dims = [];
  for (let i = 0; i < 18; i++) raw += a[i];
  for (let d = 0; d < 6; d++) dims.push(a[d * 3] + a[d * 3 + 1] + a[d * 3 + 2]);
  const level = raw <= 35 ? 'L1' : raw <= 53 ? 'L2' : raw <= 71 ? 'L3' : 'L4';
  const top = dims.map((v, i) => ({ v, i })).sort((x, y) => y.v - x.v || x.i - y.i).filter(x => x.v >= 7).slice(0, 2).map(x => x.i);
  return { raw, index: Math.round((raw - 18) / 72 * 100), level, dims, top };
}
function band_(v) { return v <= 6 ? 'B1' : v <= 9 ? 'B2' : v <= 12 ? 'B3' : 'B4'; }
function recScores_(rec) {
  const a = []; for (let i = 1; i <= 18; i++) a.push(Number(rec['Q' + i]));
  return score_(a);
}

/* =================================================================================
 *  SHEET HELPERS
 * ================================================================================= */
function sheet_() {
  const ss = SpreadsheetApp.getActive();
  let sh = ss.getSheetByName(CONFIG.SHEET_NAME);
  if (!sh) {
    sh = ss.insertSheet(CONFIG.SHEET_NAME);
    sh.getRange(1, 1, 1, COLS.length).setValues([COLS]).setFontWeight('bold').setBackground('#003663').setFontColor('#ffffff');
    sh.setFrozenRows(1);
    TEXT_COLS.forEach(h => sh.getRange(2, COLS.indexOf(h) + 1, sh.getMaxRows() - 1, 1).setNumberFormat('@'));
  }
  return sh;
}
function headerMap_(sh) {
  const heads = sh.getRange(1, 1, 1, sh.getLastColumn()).getValues()[0];
  const map = {};
  heads.forEach((h, i) => { if (h !== '') map[String(h).trim()] = i; });
  // add any missing column at the end (lets us add fields in new versions)
  const missing = COLS.filter(c => map[c] == null);
  if (missing.length) {
    const start = heads.length + 1;
    sh.getRange(1, start, 1, missing.length).setValues([missing]).setFontWeight('bold').setBackground('#003663').setFontColor('#ffffff');
    missing.forEach((c, k) => { map[c] = start - 1 + k; if (TEXT_COLS.indexOf(c) >= 0) sh.getRange(2, start + k, sh.getMaxRows() - 1, 1).setNumberFormat('@'); });
  }
  return map;
}
function findRow_(id) {
  if (!id) return null;
  const sh = sheet_();
  const map = headerMap_(sh);
  const last = sh.getLastRow();
  if (last < 2) return null;
  const ids = sh.getRange(2, map['ID'] + 1, last - 1, 1).getValues();
  for (let i = ids.length - 1; i >= 0; i--) {
    if (String(ids[i][0]) === id) {
      const rowNum = i + 2;
      const vals = sh.getRange(rowNum, 1, 1, sh.getLastColumn()).getValues()[0];
      const rec = {}; Object.keys(map).forEach(h => rec[h] = vals[map[h]]);
      return { sh, rowNum, rec, map };
    }
  }
  return null;
}
function setCells_(sh, rowNum, map, obj) {
  withLock_(() => Object.keys(obj).forEach(k => {
    if (map[k] != null) sh.getRange(rowNum, map[k] + 1).setValue(safe_(obj[k]));
  }));
}
let LOCK_DEPTH_ = 0; // re-entrant: nested calls reuse the lock already held
function withLock_(fn) {
  if (LOCK_DEPTH_ > 0) return fn();
  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  LOCK_DEPTH_++;
  try { return fn(); } finally { LOCK_DEPTH_--; lock.releaseLock(); }
}

/* =================================================================================
 *  SMALL UTILITIES
 * ================================================================================= */
// Text that starts like a formula is written as literal text (apostrophe prefix).
function safe_(v) {
  if (typeof v !== 'string') return v;
  return /^[=+\-@]/.test(v) ? "'" + v : v;
}
function clean_(v, max) { return String(v == null ? '' : v).replace(/[\u0000-\u001f\u007f]/g, ' ').trim().slice(0, max || 200); }
function esc_(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }
function fill_(tpl, map) { return String(tpl).replace(/\{(\w+)\}/g, (m, k) => map[k] != null ? map[k] : m); }
function newId_() {
  const d = Utilities.formatDate(new Date(), 'UTC', 'yyMMdd');
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let r = ''; for (let i = 0; i < 6; i++) r += chars[Math.floor(Math.random() * chars.length)];
  return 'FD-' + d + '-' + r;
}

/* =================================================================================
 *  SETUP — run once from the editor: select "setup" and press ▶ Run
 * ================================================================================= */
function setup() {
  sheet_();
  ScriptApp.getProjectTriggers().forEach(t => { if (t.getHandlerFunction() === 'backupDeliver') ScriptApp.deleteTrigger(t); });
  ScriptApp.newTrigger('backupDeliver').timeBased().everyMinutes(10).create();
  // Touch the services once so Google asks for all permissions now.
  DriveApp.getFolderById(CONFIG.PDF_FOLDER_ID).getName();
  GmailApp.getAliases();
  Logger.log('Ready. Tab "' + CONFIG.SHEET_NAME + '" exists and the 10-minute backup trigger is installed.');
}

// Optional: run from the editor to send yourself a full test (email + PDF-less backup format).
function testEmailToMe() {
  const me = Session.getActiveUser().getEmail();
  const rec = { 'ID': 'FD-TEST', 'Language': 'es', 'First Name': 'Prueba', 'Full Name': 'Prueba Adizes', 'Email': me, 'Company': 'Adizes' };
  [4, 4, 5, 3, 4, 2, 3, 3, 4, 4, 3, 5, 2, 3, 2, 4, 4, 5].forEach((v, i) => rec['Q' + (i + 1)] = v);
  sendUserEmail_(rec, null);
  Logger.log('Sent to ' + me);
}
