// Backend tests: node founder-dependency/test/gas.test.mjs
import assert from 'node:assert/strict';
import { loadGas, rowObj } from './gas-mock.mjs';

const fakePdf = Buffer.concat([Buffer.from('%PDF-1.3\n'), Buffer.alloc(4000, 65)]).toString('base64');
const base = (over = {}) => ({
  action: 'submit', v: 'test', lang: 'es',
  answers: [5, 5, 4, 4, 3, 5, 2, 2, 3, 4, 4, 5, 3, 2, 2, 4, 5, 5],
  context: { companySize: '26–50 employees', jobTitle: 'Founder' },
  closing: { qInaction: 'Our growth will slow down.', qTimeline: 'Within the next 3 months' },
  contact: { name: 'María José  Pérez', email: 'MJ@Example.com', company: '=HYPERLINK("x")', consent: true },
  meta: { page: 'https://www.adizes.com/founder-dependency-test?utm_source=linkedin', utm_source: 'linkedin', utm_medium: '', utm_campaign: 'q4' },
  ...over,
});
let n = 0; const t = (name, fn) => { fn(); n++; console.log('  ✓ ' + name); };

console.log('Apps Script (real Code.gs, simulated Google services)');

t('doGet health check', () => {
  const { gas } = loadGas();
  assert.equal(JSON.parse(gas.doGet().getContent()).ok, true);
});

t('submit: saves row, scores on server, text stays literal', () => {
  const { post, sheet } = loadGas();
  const r = post(base());
  assert.equal(r.ok, true);
  assert.match(r.id, /^FD-\d{6}-[A-Z2-9]{6}$/);
  // raw = 67 → L3, index round(49/72*100)=68
  assert.equal(r.result.raw, 67); assert.equal(r.result.index, 68); assert.equal(r.result.level, 'L3');
  assert.deepEqual(r.result.dims, [14, 12, 7, 13, 7, 14]);
  const row = rowObj(sheet(), 2);
  assert.equal(row['Status'], 'Submitted');
  assert.equal(row['Email'], 'mj@example.com');
  assert.equal(row['First Name'], 'María'); assert.equal(row['Last Name'], 'José Pérez');
  assert.equal(row['Company'], '\'=HYPERLINK("x")');
  assert.equal(row['Company Size'], '26–50 employees');
  assert.equal(row['Section 1 (legacy)'], 'Founder-Centered'); assert.equal(row['Section 2 (legacy)'], 'High');
  assert.equal(row['Top Areas'], 'Decision-making | Systems & execution');
  assert.equal(row['Q18'], 5);
});

t('submit: rejects bad input', () => {
  const { post } = loadGas();
  assert.equal(post(base({ answers: [1, 2, 3] })).error, 'invalid_answers');
  assert.equal(post(base({ answers: Array(18).fill(6) })).error, 'invalid_answers');
  assert.equal(post(base({ contact: { name: 'Ana', email: 'nope', company: 'X', consent: true } })).error, 'invalid_email');
  assert.equal(post(base({ contact: { name: 'Ana', email: 'a@b.co', company: 'X', consent: false } })).error, 'consent_required');
  assert.equal(post({ action: 'zzz' }).error, 'unknown_action');
});

t('level boundaries 35/36, 53/54, 71/72', () => {
  const { post } = loadGas();
  const mk = (raw) => { const a = Array(18).fill(1); let left = raw - 18; for (let i = 0; i < 18 && left > 0; i++) { const add = Math.min(4, left); a[i] += add; left -= add; } return a; };
  const lv = (raw) => post(base({ answers: mk(raw) })).result;
  assert.equal(lv(18).level, 'L1'); assert.equal(lv(18).index, 0);
  assert.equal(lv(35).level, 'L1'); assert.equal(lv(36).level, 'L2');
  assert.equal(lv(53).level, 'L2'); assert.equal(lv(54).level, 'L3');
  assert.equal(lv(71).level, 'L3'); assert.equal(lv(72).level, 'L4');
  assert.equal(lv(90).index, 100);
});

t('deliver: saves PDF, emails person from info@ with attachment, Zapier, notifies it@', () => {
  const { post, sheet, state } = loadGas();
  const { id } = post(base());
  const r = post({ action: 'deliver', id, lang: 'es', fileName: 'Dependencia-del-Fundador-Maria.pdf', pdf: fakePdf });
  assert.equal(r.ok, true);
  assert.equal(state.files.length, 1);
  const [user, notify] = state.emails;
  assert.equal(user.to, 'mj@example.com');
  assert.equal(user.subject, 'Tu reporte de Dependencia del Fundador');
  assert.equal(user.options.from, 'info@adizes.com');
  assert.equal(user.options.attachments[0].name, 'Dependencia-del-Fundador-Maria.pdf');
  assert.ok(!('replyTo' in user.options));
  assert.match(user.options.htmlBody, /Centrada en el fundador/);
  assert.match(user.options.htmlBody, /calendly\.com\/jaime-morales\/30min\?name=Mar/);
  assert.equal(notify.to, 'it@adizes.com');
  assert.ok(!('replyTo' in notify.options), 'no Reply-To for same-domain');
  const z = state.fetches[0].payload;
  assert.equal(z['Email'], 'mj@example.com'); assert.equal(z['Section 1'], 'Founder-Centered'); assert.equal(z['Section 2'], 'High');
  assert.equal(z['Score Total'], 67); assert.equal(z['Source'], 'linkedin'); assert.equal(z['Second Source'], '');
  assert.equal(z['Third source'], 'q4'); assert.equal(z['Language'], 'Spanish'); assert.equal(z['Job Title'], 'Founder');
  assert.match(z['Report URL'], /drive\.google\.com/);
  const row = rowObj(sheet(), 2);
  assert.equal(row['Status'], 'Done'); assert.ok(row['Emailed At'] instanceof Date); assert.ok(row['Zapier'] instanceof Date);
  // idempotent
  assert.equal(post({ action: 'deliver', id, pdf: fakePdf }).already, true);
  assert.equal(state.emails.length, 2);
});

t('deliver: rejects non-PDF and unknown id', () => {
  const { post } = loadGas();
  const { id } = post(base());
  assert.equal(post({ action: 'deliver', id, pdf: Buffer.alloc(5000, 66).toString('base64') }).error, 'not_a_pdf');
  assert.equal(post({ action: 'deliver', id: 'FD-NOPE', pdf: fakePdf }).error, 'not_found');
});

t('deliver: Zapier failure does not block the person', () => {
  const { post, sheet, state } = loadGas({ zapierFail: true });
  const { id } = post(base());
  assert.equal(post({ action: 'deliver', id, pdf: fakePdf }).ok, true);
  const row = rowObj(sheet(), 2);
  assert.equal(row['Status'], 'Done'); assert.match(row['Zapier'], /^ERROR Error: Zapier 500/);
  assert.equal(state.emails.length, 2);
});

t('deliver: email failure → error returned, row marked Error', () => {
  const { post, sheet } = loadGas({ emailFail: true });
  const { id } = post(base());
  assert.equal(post({ action: 'deliver', id, pdf: fakePdf }).ok, false);
  assert.equal(rowObj(sheet(), 2)['Status'], 'Error');
});

t('events: booking click + downloads', () => {
  const { post, sheet } = loadGas();
  const { id } = post(base());
  post({ action: 'event', id, type: 'book_click' });
  post({ action: 'event', id, type: 'pdf_download' });
  post({ action: 'event', id, type: 'pdf_download' });
  const row = rowObj(sheet(), 2);
  assert.ok(row['Session Click'] instanceof Date); assert.equal(row['PDF Downloads'], 2);
});

t('backup: old rows without PDF get the summary email + Zapier; recent ones wait', () => {
  const { post, sheet, state, gas } = loadGas();
  post(base({ lang: 'en' })); post(base());
  const sh = sheet(); const c = sh.rows[0].indexOf('Submitted At') + 1;
  sh.set(2, c, new Date(Date.now() - 20 * 60 * 1000)); // 20 min ago
  gas.backupDeliver();
  assert.equal(rowObj(sh, 2)['Status'], 'Done (no PDF)');
  assert.equal(rowObj(sh, 3)['Status'], 'Submitted');
  assert.equal(state.emails[0].subject, 'Your Founder Dependency report');
  assert.ok(!state.emails[0].options.attachments);
  assert.match(state.emails[0].options.htmlBody, /Here is a summary/);
  assert.equal(state.fetches.length, 1);
  assert.equal(state.fetches[0].payload['Source'], 'linkedin');
});

t('Zapier without UTMs keeps the old defaults (ads / Meta / lead_magnet_1)', () => {
  const { post, state } = loadGas();
  const { id } = post(base({ meta: {} }));
  post({ action: 'deliver', id, pdf: fakePdf });
  const z = state.fetches[0].payload;
  assert.equal(z['Source'], 'ads'); assert.equal(z['Second Source'], 'Meta'); assert.equal(z['Third source'], 'lead_magnet_1');
});

t('setup installs one 10-minute trigger', () => {
  const { gas, state } = loadGas();
  gas.setup();
  assert.equal(state.triggers.length, 1); assert.equal(state.triggers[0].m, 10);
});

console.log(`\n${n} backend tests passed`);
