# Custom Suite Step Dictionary

This folder mirrors the reusable, generic BDD style from the source Cypress framework, but the implementations are adapted to this repository's single-page app.

## Supported Given steps
- `I open the custom BDD suite in {string} viewport`
- `I prepare the custom suite JSON fixture {string}`

## Supported When steps
- `I click on the {string} on {string}`
- `I enter {string} in {string} on {string}`
- `I select {string} from {string} on {string}`
- `I enter date {string} in {string} on {string}`
- `I remember the active assessment label as {string} in the custom suite`
- `I switch to the assessment chip stored as {string} in the custom suite`
- `I switch to the assessment select entry stored as {string} in the custom suite`
- `I set question {string} field {string} to {string} in the custom suite`
- `I add a custom question with discipline {string} virtue {string} principle {string} score {string} and target {string} in the custom suite`
- `I rename discipline {string} to {string} in the custom suite`
- `I delete question {string} in the custom suite`

## Supported Then steps
- `I verify {string} should be visible on {string}`
- `I verify {string} should contain {string} on {string}`
- `I verify {string} should have value {string} on {string}`
- `I verify count of {string} should be {int} on {string}`
- `I verify question {string} should have score {string} and target {string} in the custom suite`
- `I verify question {string} should belong to discipline {string} in the custom suite`
- `I verify the active assessment label should be {string} in the custom suite`
- `I verify only discipline {string} questions are visible in the custom suite`
- `I verify question {string} should not exist in the custom suite`
- `I verify linked JSON latest write contains question {string} with score {string} in the custom suite`
- `I verify downloaded JSON contains question {string} with score {string} in the custom suite`
- `I verify PDF export file name {string} in the custom suite`
- `I verify PPT export file name {string} in the custom suite`

## Page Object Naming
- Page object keys follow the source repo style, for example `Agile_Maturity_App`.
- Locator names in Gherkin use spaces and are normalized to underscore keys in the page object map.
- The page object backing this suite is [`cypress/e2e/pageObjects/agileMaturityApp.js`](../../pageObjects/agileMaturityApp.js).
