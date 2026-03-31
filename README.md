# Agile Project Maturity Assessment App

A lightweight, browser-based assessment dashboard for tracking agile project maturity across multiple disciplines and dated review snapshots.

👉 You can explore the live application rendered from this repository’s source code at: https://gemini.google.com/share/934a5126ecdb

The app is currently implemented as a single static file, [`index.html`](./index.html) supported by multiple helper JS files, so there is no build pipeline or package installation step required to get started.

## What It Does

- Scores agile maturity on a `1-5` scale.
- Tracks up to `12` dated assessment snapshots and lets you switch the dashboard between them.
- Calculates overall and per-discipline maturity averages.
- Visualizes results with a radar chart and date comparison charts.
- Supports adding custom disciplines and custom questions.
- Filters the assessment table by discipline.
- Exports the current report to `PDF` and `PPTX`.
- Opens, downloads, and links a JSON file for persistence and autosave.
- Stores an audit trail in the saved JSON payload.

## Seeded Assessment Model

The default dataset includes `60` assessment questions across `8` disciplines:

- `A-Agility`
- `B-Overall Process`
- `C-Requirements`
- `D-Architecture`
- `E-Implementation`
- `F-Test`
- `G-Operations`
- `H-Buildmanagement`

By default, seeded questions start with a current score of `2` and a target score of `4`.

## Running Locally

Because this is a static app, you can run it in either of these ways:

1. Open [`index.html`](./index.html) directly in a browser.
2. Serve the folder locally if you want a more browser-friendly setup for file-based features:

```powershell
cd f:\Repositories\fdcp\agile-project-maturity-assessment-app
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Recommended Browser

A current Chromium-based browser is the safest choice for full functionality because the app uses:

- `Chart.js` for charts
- `jsPDF` and `jspdf-autotable` for PDF export
- `PptxGenJS` for PowerPoint export
- the browser File System Access APIs for `Open JSON` and `Link JSON Save`

If the browser does not support `showOpenFilePicker` or `showSaveFilePicker`, the app still works, but linked JSON open/autosave features will be unavailable. `Download JSON` remains the fallback.

## Typical Workflow

1. Open the app.
2. Review or edit the seeded maturity questions.
3. Select an assessment date, or add a new one.
4. Update scores for the active date.
5. Compare progress using the dashboard cards and charts.
6. Add custom disciplines or questions if needed.
7. Save your state with `Link JSON Save` or `Download JSON`.
8. Export stakeholder-ready summaries with `Export PDF` or `Export PPT`.

## Saved Data

When you save or download JSON, the exported state includes:

- assessment history
- the active assessment id
- original and current question data
- custom disciplines
- audit log entries
- basic metadata such as schema version and timestamps

This makes the JSON file portable and suitable for reopening later in the app.
