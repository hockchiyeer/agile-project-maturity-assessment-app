import { When } from "@badeball/cypress-cucumber-preprocessor";

When("I click on the {string} on {string}", (locatorName, pageName) => {
  cy.clickOnTheElement(locatorName, pageName);
});

When("I enter {string} in {string} on {string}", (value, locatorName, pageName) => {
  cy.enterTheValue(value, locatorName, pageName);
});

When("I select {string} from {string} on {string}", (value, locatorName, pageName) => {
  cy.selectTheValue(value, locatorName, pageName);
});

When("I enter date {string} in {string} on {string}", (value, locatorName, pageName) => {
  cy.setDateInElement(value, locatorName, pageName);
});

When("I remember the active assessment label as {string} in the custom suite", aliasName => {
  cy.rememberActiveAssessmentLabelCustom(aliasName);
});

When("I switch to the assessment chip stored as {string} in the custom suite", aliasName => {
  cy.clickAssessmentChipByAliasCustom(aliasName);
});

When("I switch to the assessment select entry stored as {string} in the custom suite", aliasName => {
  cy.selectAssessmentByAliasCustom(aliasName);
});

When("I set question {string} field {string} to {string} in the custom suite", (virtue, fieldName, value) => {
  cy.setQuestionFieldCustom(virtue, fieldName, value);
});

When(
  "I add a custom question with discipline {string} virtue {string} principle {string} score {string} and target {string} in the custom suite",
  (discipline, virtue, principle, score, target) => {
    cy.clickOnTheElement("open add question button", "Agile_Maturity_App");
    cy.selectTheValue(discipline, "question discipline select", "Agile_Maturity_App");
    cy.enterTheValue(virtue, "question virtue input", "Agile_Maturity_App");
    cy.enterTheValue(principle, "question principle input", "Agile_Maturity_App");
    cy.enterTheValue(score, "question current input", "Agile_Maturity_App");
    cy.enterTheValue(target, "question target input", "Agile_Maturity_App");
    cy.clickOnTheElement("confirm add question", "Agile_Maturity_App");
  }
);

When("I rename discipline {string} to {string} in the custom suite", (currentName, nextName) => {
  cy.renameDisciplineCustom(currentName, nextName);
});

When("I delete question {string} in the custom suite", virtue => {
  cy.deleteQuestionCustom(virtue);
});
