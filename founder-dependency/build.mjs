// Build: node build.mjs  →  dist/founder-dependency.js + dist/founder-dependency.min.js
// Bundles the language files, the CSS and the app into ONE self-contained file.
import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'node:fs';
import { minify } from 'terser';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const pkg = JSON.parse(readFileSync(join(here, '..', 'package.json'), 'utf8'));
const VERSION = process.env.FD_VERSION || pkg.version;

// Languages: every file in src/i18n is included. English first (fallback).
const langs = readdirSync(join(here, 'src/i18n')).filter(f => f.endsWith('.js')).sort((a, b) => (a === 'en.js' ? -1 : b === 'en.js' ? 1 : a.localeCompare(b)));
const i18n = langs.map(f => readFileSync(join(here, 'src/i18n', f), 'utf8')).join('\n');
const css = readFileSync(join(here, 'src/styles.css'), 'utf8')
  .replace(/\/\*[\s\S]*?\*\//g, '').replace(/\s*\n\s*/g, '\n').trim();
const app = readFileSync(join(here, 'src/app.js'), 'utf8')
  .replace('__CSS__', JSON.stringify(css))
  .replace("'__VERSION__'", JSON.stringify(VERSION));

const banner = `/*! Adizes · Founder Dependency Assessment v${VERSION} · github.com/Adizes/assessments */\n`;
const out = banner + `(function(){\nvar FD_I18N = {};\n${i18n}\n${app}\n})();\n`;

mkdirSync(join(here, 'dist'), { recursive: true });
writeFileSync(join(here, 'dist/founder-dependency.js'), out);
const min = await minify(out, { compress: true, mangle: true, format: { comments: /^!/ } });
writeFileSync(join(here, 'dist/founder-dependency.min.js'), min.code);
console.log(`built v${VERSION}: ${langs.join(', ')} · ${(out.length / 1024).toFixed(1)} KB → ${(min.code.length / 1024).toFixed(1)} KB min`);
