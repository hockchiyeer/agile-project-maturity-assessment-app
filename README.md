# Agile Project Maturity Assessment App

A lightweight browser app for assessing agile project maturity across multiple disciplines and dated review snapshots.

The application itself is a static single-page app rendered from [`index.html`](./index.html). There is no build pipeline required to use the app in a browser. The Node/Cypress setup in this repository exists to support end-to-end test automation.

## What The App Does

- Scores agile maturity on a `1-5` scale.
- Tracks up to `12` dated assessment snapshots.
- Calculates overall and per-discipline maturity averages.
- Visualizes results with a radar chart and assessment comparison charts.
- Supports adding custom disciplines and custom questions.
- Filters the assessment table by discipline.
- Opens, downloads, and links JSON files for persistence.
- Exports reports to `PDF` and `PPTX`.
- Records an audit trail in the saved JSON payload.

## Seeded Assessment Model

The default dataset contains `58` assessment questions across `8` disciplines:

- `A-Agility`
- `B-Overall Process`
- `C-Requirements`
- `D-Architecture`
- `E-Implementation`
- `F-Test`
- `G-Operations`
- `H-Buildmanagement`

By default, seeded questions start with a current score of `2` and a target score of `4`.

## Running The App Locally

You can either:

1. Open [`index.html`](./index.html) directly in a browser.
2. Serve the repository as static files for a more browser-friendly setup.

```powershell
cd e:\Repositories\fdcp\agile-project-maturity-assessment-app
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Cypress BDD Coverage

This repository now contains **two Cypress BDD suites** so readers can compare two different approaches side by side.

### 1. Conventional App-Specific BDD Suite

This suite is optimized for this app directly.

- Features live in `cypress/e2e/features`
- Shared step definitions live in `cypress/e2e/common`
- Commands and browser harness utilities live in `cypress/support`
- Coverage includes dashboard rendering, assessment timeline management, editing/customization, persistence, JSON workflows, and export flows
- Every feature is exercised for both desktop and mobile viewports

### 2. Source-Style Custom BDD Suite

This suite mirrors the more generic/page-object-driven structure from the source Cypress framework that inspired the migration.

- Features live in `cypress/e2e/custom/features`
- Shared step dictionary lives in `cypress/e2e/custom/common`
- Page objects live in `cypress/e2e/pageObjects`
- The local step dictionary overview is documented in [`cypress/e2e/custom/common/README.md`](./cypress/e2e/custom/common/README.md)
- Every feature is also exercised for both desktop and mobile viewports

## Installing Test Dependencies

The app itself does not need a package install to run, but Cypress does.

```powershell
npm install
```

## Running Cypress

The Cypress scripts use [`scripts/run-cypress.js`](./scripts/run-cypress.js), which clears `ELECTRON_RUN_AS_NODE` before launching Cypress. That is important in environments where this variable is already set, because it can prevent the Cypress binary from starting correctly.

```powershell
npm run test:e2e:conventional
npm run test:e2e:custom
npm run test:e2e:all
npm run cy:open
```

## Current Validation Status

The two BDD suites were verified locally with:

```powershell
npm run test:e2e:conventional
npm run test:e2e:custom
```

Both suites pass across desktop and mobile scenarios.

## Repository Test Assets

- `cypress/fixtures/saved-assessment.json`: reusable persistence fixture
- `cypress/support/vendor-stubs.js`: local script stubs for external browser libraries used by the app
- `cypress/server/static-server.js`: static host used by Cypress during runs
- `scripts/run-cypress.js`: Cypress launcher wrapper for this environment
