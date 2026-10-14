/* Founder Dependency Assessment — widget
 * Embed:
 *   <div id="fd-assessment"></div>
 *   <script>window.FD_CONFIG = { endpoint: 'https://script.google.com/macros/s/XXX/exec' };</script>
 *   <script src="https://cdn.jsdelivr.net/gh/Adizes/assessments@vX/founder-dependency/dist/founder-dependency.min.js" defer></script>
 */
(function () {
  'use strict';

  var VERSION = '__VERSION__';
  var CSS = __CSS__;
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
