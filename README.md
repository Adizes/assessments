# Adizes · Interactive assessments

Interactive assessments for adizes.com (Webflow). Each one is **a single JavaScript file**
served by jsDelivr from this repo, plus a Google Apps Script backend that saves responses
to Google Sheets, emails the PDF report and sends the lead to Zapier → HubSpot.

| Assessment | Folder | Status |
|---|---|---|
| Founder Dependency Assessment | `founder-dependency/` | v1.0.0 — free report |

## Structure

```
founder-dependency/
  src/i18n/en.js, es.js   ← all texts (questions, results, PDF). One file per language.
  src/app.js              ← logic: test, results, PDF (jsPDF)
  src/styles.css          ← styles, scoped to the container (Webflow can't break them)
  assets/                 ← logo, arrows, Montserrat (embedded in the PDF)
  dist/                   ← built file that Webflow loads (don't edit by hand)
  apps-script/Code.gs     ← backend to paste into Apps Script
  test/                   ← automated tests (backend + browser)
  EMBED.html              ← code to paste into Webflow
```

## Developing

```bash
npm install
npm run build     # generates dist/founder-dependency.min.js
npm test          # backend tests + Playwright desktop/mobile tests (screenshots in test/out)
```

### Add a language
1. Copy `founder-dependency/src/i18n/en.js` to e.g. `pt.js`, change `FD_I18N.en` to `FD_I18N.pt`
   and translate the texts. **Don't** translate the option `value`s (they go to HubSpot).
2. In `apps-script/Code.gs`, copy the `en` block inside `LABELS` as `pt` and translate it (emails).
3. `npm run build`, create a new release, and update the version in the Webflow embed.

### Publish a new version
1. Change `version` in `package.json`, run `npm run build` and `npm test`, then commit.
2. Create a release/tag on GitHub (e.g. `v1.0.1`).
3. In Webflow, change the version in the script URL (`@v1.0.1`) and publish.
4. If `Code.gs` changed: paste it into Apps Script → Deploy → Manage deployments → ✏️ → New version.
