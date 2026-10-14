// Runs the REAL Code.gs inside Node with in-memory fakes of the Google services it uses.
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));

function colRange(sheet, r, c, nr = 1, nc = 1) {
  const api = {
    getValues: () => Array.from({ length: nr }, (_, i) => Array.from({ length: nc }, (_, j) => sheet.get(r + i, c + j))),
    getValue: () => sheet.get(r, c),
    setValues: (vals) => { vals.forEach((row, i) => row.forEach((v, j) => sheet.set(r + i, c + j, v))); return api; },
    setValue: (v) => { sheet.set(r, c, v); return api; },
    setNumberFormat: (f) => { for (let j = 0; j < nc; j++) sheet.formats[c + j] = f; return api; },
    setFontWeight: () => api, setBackground: () => api, setFontColor: () => api,
  };
  return api;
}

class FakeSheet {
  constructor(name) { this.name = name; this.rows = []; this.formats = {}; this.maxRows = 1000; }
  get(r, c) { return (this.rows[r - 1] || [])[c - 1] ?? ''; }
  set(r, c, v) {
    while (this.rows.length < r) this.rows.push([]);
    const row = this.rows[r - 1];
    while (row.length < c) row.push('');
    // emulate Sheets: plain-text columns keep text; otherwise "=..." would be a formula
    if (typeof v === 'string' && /^=/.test(v) && this.formats[c] !== '@') throw new Error('FORMULA INJECTION at col ' + c + ': ' + v);
    row[c - 1] = v;
  }
  getRange(r, c, nr, nc) { return colRange(this, r, c, nr, nc); }
  appendRow(vals) { this.rows.push([]); vals.forEach((v, j) => this.set(this.rows.length, j + 1, v)); }
  getLastRow() { return this.rows.length; }
  getLastColumn() { return Math.max(0, ...this.rows.map(r => r.length)); }
  getMaxRows() { return this.maxRows; }
  setFrozenRows() {}
}

export function loadGas(opts = {}) {
  const state = { sheets: {}, files: [], emails: [], fetches: [], triggers: [], zapierFail: !!opts.zapierFail, emailFail: !!opts.emailFail };
  const ss = {
    getSheetByName: (n) => state.sheets[n] || null,
    insertSheet: (n) => (state.sheets[n] = new FakeSheet(n)),
  };
  const lock = () => ({ waitLock() {}, tryLock() { return true; }, releaseLock() {}, hasLock() { return false; } });
  const ctx = {
    console: { log() {}, error: (...a) => state.lastError = a.join(' ') },
    Logger: { log() {} },
    SpreadsheetApp: { getActive: () => ss },
    LockService: { getScriptLock: lock },
    ContentService: {
      MimeType: { JSON: 'json' },
      createTextOutput: (s) => ({ _s: s, setMimeType() { return this; }, getContent() { return this._s; } }),
    },
    Utilities: {
      base64Decode: (b64) => Array.from(Buffer.from(b64, 'base64')).map(x => (x > 127 ? x - 256 : x)),
      newBlob: (bytes, type, name) => ({ bytes, type, name, setName(n) { this.name = n; return this; }, getName() { return this.name; } }),
      formatDate: (d, tz, f) => d.toISOString().slice(2, 10).replace(/-/g, ''),
    },
    DriveApp: {
      getFolderById: () => ({
        getName: () => 'PDFs',
        createFile: (blob) => { const id = 'file' + state.files.length; state.files.push({ id, blob }); return { getUrl: () => 'https://drive.google.com/file/d/' + id + '/view', getId: () => id }; },
      }),
    },
    GmailApp: {
      getAliases: () => ['info@adizes.com'],
      sendEmail: (to, subject, body, options) => { if (state.emailFail) throw new Error('mail down'); state.emails.push({ to, subject, body, options }); },
    },
    UrlFetchApp: {
      fetch: (url, o) => { state.fetches.push({ url, payload: JSON.parse(o.payload) }); return { getResponseCode: () => (state.zapierFail ? 500 : 200), getContentText: () => 'ok' }; },
    },
    ScriptApp: {
      getProjectTriggers: () => state.triggers,
      deleteTrigger: () => {},
      newTrigger: (fn) => ({ timeBased: () => ({ everyMinutes: (m) => ({ create: () => state.triggers.push({ fn, m, getHandlerFunction: () => fn }) }) }) }),
    },
    Session: { getActiveUser: () => ({ getEmail: () => 'me@adizes.com' }) },
    Date, Math, JSON, String, Number, Array, Object, Error, RegExp, encodeURIComponent, parseInt,
  };
  vm.createContext(ctx);
  const code = readFileSync(join(here, '..', 'apps-script', 'Code.gs'), 'utf8');
  // expose top-level const/let/functions on the context
  vm.runInContext(code + '\n;globalThis.__gas = { doPost, doGet, backupDeliver, setup, CONFIG, COLS, testEmailToMe };', ctx);
  const gas = ctx.__gas;
  const post = (obj) => JSON.parse(gas.doPost({ postData: { contents: JSON.stringify(obj) } }).getContent());
  return { gas, state, post, sheet: () => state.sheets[gas.CONFIG.SHEET_NAME] };
}

export function rowObj(sheet, rowNum) {
  const heads = sheet.rows[0];
  const o = {}; heads.forEach((h, i) => (o[h] = sheet.rows[rowNum - 1][i])); return o;
}
