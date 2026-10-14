// Browser tests (Playwright/Chromium), desktop + mobile, against the REAL Code.gs (simulated).
// node founder-dependency/test/e2e.test.mjs   → screenshots + PDFs in founder-dependency/test/out/
import { chromium } from 'playwright';
import { readFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';
import { loadGas } from './gas-mock.mjs';
import http from 'node:http';

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '..');
const out = join(here, 'out'); mkdirSync(out, { recursive: true });
const CDN = 'https://cdn.jsdelivr.net/gh/Adizes/assessments@v-test/founder-dependency/';
// Local servers: page origin and a fake "script.google.com" on another origin (cross-origin like production).
let currentGas = null; const pending = {}; let seq = 0; const netErrors = [];
let failNext = false;
const gasServer = http.createServer((req, res) => {
  res.setHeader('access-control-allow-origin', '*');
  if (req.method === 'OPTIONS') { netErrors.push('unexpected CORS preflight'); res.writeHead(405); return res.end(); }
  if (req.url.startsWith('/macros/s/TEST/exec') && req.method === 'POST') {
    const ct = req.headers['content-type'] || '';
    if (!ct.startsWith('text/plain')) netErrors.push('content-type should be text/plain: ' + ct);
    let body = ''; req.on('data', c => body += c); req.on('end', () => {
      if (failNext) { res.writeHead(500); return res.end('boom'); }
      const key = 'r' + (++seq); pending[key] = currentGas.post(JSON.parse(body));
      // Apps Script answers with a 302 to googleusercontent.com; fetch follows with GET
      res.writeHead(302, { location: 'http://127.0.0.1:' + gasServer.address().port + '/macros/echo?user_content_key=' + key }); res.end();
    });
    return;
  }
  if (req.url.startsWith('/macros/echo')) {
    const key = new URL(req.url, 'http://x').searchParams.get('user_content_key');
    res.writeHead(200, { 'content-type': 'application/json' }); return res.end(JSON.stringify(pending[key]));
  }
  res.writeHead(404); res.end();
});
let pageHtml = '';
const pageServer = http.createServer((req, res) => { res.writeHead(200, { 'content-type': 'text/html' }); res.end(pageHtml); });
await new Promise(r => gasServer.listen(0, '127.0.0.1', r));
await new Promise(r => pageServer.listen(0, '127.0.0.1', r));
const ENDPOINT = 'http://127.0.0.1:' + gasServer.address().port + '/macros/s/TEST/exec';
const SITE = 'http://127.0.0.1:' + pageServer.address().port + '/founder-dependency-test';

// Page that imitates Webflow's global CSS (normalize + webflow.css defaults that usually break embeds)
const page = (cfg) => `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Founder Dependency Test | Adizes</title>
<style>
  html{font-size:16px} body{margin:0;font-family:Arial,sans-serif;font-size:14px;line-height:20px;color:#333;background:#fff}
  *{box-sizing:border-box} h1{font-size:38px;line-height:44px;margin:20px 0 10px;font-weight:bold} h2{font-size:32px;line-height:36px;margin:20px 0 10px}
  h3{font-size:24px;margin:20px 0 10px} p{margin:0 0 10px} a{color:#3898ec;text-decoration:underline} ul,ol{margin:0 0 10px;padding-left:40px}
  li{margin-bottom:6px} button,input{font-family:inherit;font-size:100%;margin:0} button{background:#3898ec;color:#fff;border:0;padding:9px 15px;border-radius:0}
  input{display:block;width:100%;height:38px;padding:8px 12px;margin-bottom:10px;font-size:14px;line-height:1.4;color:#333;background:#fff;border:1px solid #ccc}
  img{max-width:100%;vertical-align:middle;display:inline-block} label{display:block;margin-bottom:5px;font-weight:bold}
  .nav{height:72px;background:#003663;color:#fff;display:flex;align-items:center;padding:0 24px;font-weight:bold}
  .footer{height:200px;background:#00223a}
</style></head><body>
<div class="nav">adizes.com (Webflow nav)</div>
<div id="fd-assessment"></div>
<div class="footer"></div>
<script>window.FD_CONFIG = ${JSON.stringify(cfg)};</script>
<script src="${CDN}dist/founder-dependency.min.js" defer></script>
</body></html>`;

const fontCss = ['Light:300', 'Regular:400', 'SemiBold:600', 'Bold:700', 'Bold:800', 'SemiBold:500'].map(x => {
  const [n, w] = x.split(':');
  return `@font-face{font-family:'Montserrat';font-weight:${w};src:url(${CDN}assets/fonts/Montserrat-${n}.ttf) format('truetype')}`;
}).join('\n');

async function setup(browser, device, cfg, gasOpts) {
  const ctx = await browser.newContext(device);
  const gas = loadGas(gasOpts);
  currentGas = gas; pageHtml = page(cfg); netErrors.length = 0;
  const errors = netErrors;
  await ctx.route('**/*', async (route) => {
    const req = route.request(); const url = req.url();
    if (url.startsWith('http://127.0.0.1')) return route.fallback();
    if (url.startsWith(CDN)) {
      const rel = url.slice(CDN.length).split('?')[0];
      const type = rel.endsWith('.js') ? 'application/javascript' : rel.endsWith('.png') ? 'image/png' : 'font/ttf';
      return route.fulfill({ contentType: type, body: readFileSync(join(root, rel)), headers: { 'access-control-allow-origin': '*' } });
    }
    if (url.includes('cdnjs.cloudflare.com/ajax/libs/jspdf/')) return route.fulfill({ contentType: 'application/javascript', body: readFileSync(join(root, '..', 'node_modules/jspdf/dist/jspdf.umd.min.js')) });
    if (url.startsWith('https://fonts.googleapis.com/')) return route.fulfill({ contentType: 'text/css', body: fontCss });
    return route.abort();
  });
  const p = await ctx.newPage();
  p.on('pageerror', e => errors.push('pageerror: ' + e.message));
  p.on('console', m => { if (m.type() === 'error') errors.push('console: ' + m.text()); });
  return { ctx, p, gas, errors };
}

const step = (p) => p.evaluate(() => window.FDA.app.state.step);
async function waitStep(p, n) { await p.waitForFunction((n) => window.FDA && window.FDA.app.state.step === n && !window.FDA.app.busy, n); await p.waitForTimeout(60); }

async function runFlow(browser, { name, device, lang, answers, shots = true }) {
  const { ctx, p, gas, errors } = await setup(browser, device, { endpoint: ENDPOINT });
  await p.goto(SITE+'?utm_source=linkedin&utm_campaign=q4');
  await p.waitForSelector('.fda-stage');
  await p.evaluate(() => document.fonts.ready);
  // language switch
  await p.click(`.fda-lang [data-lang="${lang}"]`);
  await p.waitForTimeout(450);
  if (shots) await p.screenshot({ path: join(out, `${name}-1-intro.png`) });
  await p.click('[data-act="start"]');
  await waitStep(p, 0); await p.waitForTimeout(400);
  if (shots) await p.screenshot({ path: join(out, `${name}-2-context.png`) });
  // context: choose by click
  await p.click('.fda-choice >> nth=2'); await waitStep(p, 1);
  await p.click('.fda-choice >> nth=0'); await waitStep(p, 2);
  await p.waitForTimeout(400);
  if (shots) await p.screenshot({ path: join(out, `${name}-3-item-first.png`) });
  // items: mix of clicks and keyboard
  for (let i = 0; i < 18; i++) {
    if (i % 2) await p.keyboard.press(String(answers[i]));
    else await p.click(`.fda-opt[data-v="${answers[i]}"]`);
    await waitStep(p, 3 + i);
    if (i === 6 && shots) { await p.waitForTimeout(400); await p.screenshot({ path: join(out, `${name}-4-item-section3.png`) }); }
  }
  // back button works and keeps answer
  await p.click('[data-act="back"]'); await waitStep(p, 19);
  assert.equal(await p.getAttribute('.fda-opt[aria-checked="true"]', 'data-v'), String(answers[17]));
  await p.click('[data-act="next"]'); await waitStep(p, 20);
  await p.waitForTimeout(400);
  if (shots) await p.screenshot({ path: join(out, `${name}-5-closing.png`) });
  await p.keyboard.press('b'); await waitStep(p, 21);
  await p.keyboard.press('a'); await waitStep(p, 22);
  await p.waitForSelector('form.fda-form');
  // validation
  await p.click('form.fda-form button[type="submit"]');
  assert.equal(await p.locator('.fda-field.has-error').count(), 4);
  await p.waitForTimeout(400);
  if (shots) await p.screenshot({ path: join(out, `${name}-6-gate-errors.png`) });
  await p.fill('#fda-name', lang === 'es' ? 'María José Pérez' : 'John Carter');
  await p.fill('#fda-email', lang === 'es' ? 'maria@empresa.mx' : 'john@acme.com');
  await p.fill('#fda-company', lang === 'es' ? 'Grupo Ñandú' : 'Acme Corp');
  await p.check('input[name="consent"]');
  await p.click('form.fda-form button[type="submit"]');
  await p.waitForSelector('.fda-spinner');
  await p.waitForSelector('.fda-results', { timeout: 15000 });
  await p.waitForFunction(() => window.FDA.app.state.pdf === 'sent' || window.FDA.app.state.pdf === 'error', null, { timeout: 30000 });
  await p.waitForTimeout(1500);
  if (shots) await p.screenshot({ path: join(out, `${name}-7-results.png`), fullPage: true });
  const st = await p.evaluate(() => window.FDA.app.state);
  assert.equal(st.pdf, 'sent');
  // booking link prefilled + event
  const href = await p.getAttribute('[data-act="book"]', 'href');
  assert.match(href, /^https:\/\/calendly\.com\/jaime-morales\/30min\?name=/);
  await p.evaluate(() => document.querySelector('[data-act="book"]').removeAttribute('target'));
  await p.$eval('[data-act="book"]', a => a.addEventListener('click', e => e.preventDefault()));
  await p.click('[data-act="book"]');
  // download
  const [dl] = await Promise.all([p.waitForEvent('download'), p.click('[data-act="download"]')]);
  writeFileSync(join(out, `${name}-downloaded.pdf`), readFileSync(await dl.path()));
  await p.waitForTimeout(600);
  // reload shows results again (persisted)
  await p.reload(); await p.waitForSelector('.fda-results');
  assert.equal(errors.filter(e => !/favicon/.test(e)).length, 0, errors.join('\n'));
  await ctx.close();
  return { gas, st };
}

const browser = await chromium.launch();
const desktop = { viewport: { width: 1280, height: 820 }, acceptDownloads: true };
const mobile = { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true, acceptDownloads: true };

console.log('Browser flows (Chromium, Webflow-like CSS)');
const A = [5, 5, 4, 4, 3, 5, 2, 2, 3, 4, 4, 5, 3, 2, 2, 4, 5, 5]; // raw 67 → L3
const B = [2, 1, 2, 2, 1, 1, 3, 2, 2, 1, 2, 2, 2, 3, 2, 1, 1, 2]; // raw 32 → L1

for (const f of [
  { name: 'desktop-es', device: desktop, lang: 'es', answers: A },
  { name: 'mobile-en', device: mobile, lang: 'en', answers: A },
  { name: 'desktop-en-low', device: desktop, lang: 'en', answers: B },
  { name: 'mobile-es-low', device: mobile, lang: 'es', answers: B, shots: true },
]) {
  const { gas, st } = await runFlow(browser, f);
  const sh = gas.sheet(); const heads = sh.rows[0]; const row = sh.rows[1];
  const get = (h) => row[heads.indexOf(h)];
  assert.equal(get('Status'), 'Done');
  assert.equal(get('Language'), f.lang);
  assert.equal(get('UTM Source'), 'linkedin');
  assert.ok(get('Session Click') instanceof Date);
  assert.equal(get('PDF Downloads'), 1);
  assert.equal(gas.state.emails.length, 2);
  const pdf = gas.state.files[0].blob.bytes.map(b => (b < 0 ? b + 256 : b));
  writeFileSync(join(out, `${f.name}-emailed.pdf`), Buffer.from(pdf));
  console.log(`  ✓ ${f.name}: ${st.result.level} index ${st.result.index}, row Done, emailed PDF ${(pdf.length / 1024).toFixed(0)} KB`);
}

// resume in-progress assessment after reload
{
  const { ctx, p, errors } = await setup(browser, desktop, { endpoint: ENDPOINT });
  await p.goto(SITE+'');
  await p.click('[data-act="start"]'); await waitStep(p, 0);
  await p.keyboard.press('a'); await waitStep(p, 1);
  await p.keyboard.press('b'); await waitStep(p, 2);
  await p.keyboard.press('3'); await waitStep(p, 3);
  await p.reload(); await p.waitForSelector('[data-act="yes"]');
  await p.screenshot({ path: join(out, 'desktop-resume.png') });
  await p.click('[data-act="yes"]'); await waitStep(p, 3);
  assert.deepEqual(await p.evaluate(() => window.FDA.app.state.answers), [3]);
  assert.equal(errors.length, 0, errors.join('\n'));
  await ctx.close();
  console.log('  ✓ resume after reload');
}

// server down → retry screen, then works
{
  const { ctx, p } = await setup(browser, desktop, { endpoint: ENDPOINT });
  await p.goto(SITE+'?lang=en');
  await p.evaluate(() => { const s = { step: 22, answers: Array(18).fill(3), ctx: { companySize: '1–10 employees', jobTitle: 'CEO' }, closing: { qInaction: 'x', qTimeline: 'y' }, contact: { name: 'Test User', email: 't@t.co', company: 'T', consent: true }, lang: 'en' }; localStorage.setItem('fda:v1', JSON.stringify(s)); });
  failNext = true;
  await p.reload(); await p.click('[data-act="yes"]');
  await p.click('form.fda-form button[type="submit"]');
  await p.waitForSelector('[data-act="retry"]');
  failNext = false;
  await p.click('[data-act="retry"]');
  await p.waitForSelector('.fda-results', { timeout: 15000 });
  await ctx.close();
  console.log('  ✓ server error → retry → results');
}

// demo mode (no endpoint) still works end to end, PDF download only
{
  const { ctx, p, errors } = await setup(browser, mobile, {});
  await p.goto(SITE+'?lang=es');
  await p.evaluate(() => { const s = { step: 22, answers: Array(18).fill(5), ctx: {}, closing: {}, contact: { name: 'Demo', email: 'd@d.co', company: 'D', consent: true }, lang: 'es' }; localStorage.setItem('fda:v1', JSON.stringify(s)); });
  await p.reload(); await p.click('[data-act="yes"]'); await p.click('form.fda-form button[type="submit"]');
  await p.waitForSelector('.fda-results', { timeout: 15000 });
  await p.waitForFunction(() => window.FDA.app.state.pdf === 'sent');
  await p.waitForTimeout(1500);
  await p.screenshot({ path: join(out, 'mobile-es-critical-hero.png') });
  assert.equal(errors.length, 0, errors.join('\n'));
  await ctx.close();
  console.log('  ✓ demo mode (no backend), critical level');
}

await browser.close();
gasServer.close(); pageServer.close();
console.log('\nAll browser tests passed. Screenshots and PDFs in founder-dependency/test/out/');
