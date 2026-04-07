import { Then } from "@badeball/cypress-cucumber-preprocessor";

Then("I verify {string} should be visible on {string}", (locatorName, pageName) => {
  cy.verifyElementIsVisible(locatorName, pageName);
});

Then("I verify {string} should contain {string} on {string}", (locatorName, text, pageName) => {
  cy.verifyElementContainsText(locatorName, text, pageName);
});

Then("I verify {string} should have value {string} on {string}", (locatorName, value, pageName) => {
  cy.verifyElementHasValue(locatorName, value, pageName);
});

Then("I verify count of {string} should be {int} on {string}", (locatorName, count, pageName) => {
  cy.verifyElementCount(locatorName, count, pageName);
});

Then(
  "I verify question {string} should have score {string} and target {string} in the custom suite",
  (virtue, score, target) => {
    cy.verifyQuestionValuesCustom(virtue, score, target);
  }
);

Then("I verify question {string} should belong to discipline {string} in the custom suite", (virtue, discipline) => {
  cy.verifyQuestionDisciplineCustom(virtue, discipline);
});

Then("I verify the active assessment label should be {string} in the custom suite", expectedLabel => {
  cy.window().its("__AGILE_MATURITY_APP__").invoke("getActiveAssessmentLabel").should("eq", expectedLabel);
});

Then("I verify only discipline {string} questions are visible in the custom suite", discipline => {
  cy.get('[data-testid="question-row"]').should($rows => {
    expect($rows.length).to.be.greaterThan(0);
  });
  cy.get('[data-testid="question-row"]').each($row => {
    expect($row.attr("data-discipline")).to.eq(discipline);
  });
});

Then("I verify question {string} should not exist in the custom suite", virtue => {
  cy.get('[data-testid="virtue-input"]').should($inputs => {
    const matchingValues = [...$inputs].filter(input => input.value === virtue);
    expect(matchingValues).to.have.length(0);
  });
});

Then(
  "I verify linked JSON latest write contains question {string} with score {string} in the custom suite",
  (virtue, score) => {
    cy.readLastLinkedWriteJson(2).then(jsonState => {
      const question = jsonState.currentData.find(row => row.virtue === virtue);
      expect(question, `question ${virtue}`).to.exist;
      expect(String(question.scoreHistory[jsonState.activeAssessmentId])).to.eq(score);
    });
  }
);

Then(
  "I verify downloaded JSON contains question {string} with score {string} in the custom suite",
  (virtue, score) => {
    cy.readLastDownloadedJson().then(jsonState => {
      const question = jsonState.currentData.find(row => row.virtue === virtue);
      expect(question, `question ${virtue}`).to.exist;
      expect(String(question.scoreHistory[jsonState.activeAssessmentId])).to.eq(score);
    });
  }
);

Then("I verify PDF export file name {string} in the custom suite", fileName => {
  cy.window().its("__agileCypressHarness.pdfExports").should(exports => {
    expect(exports.length).to.be.greaterThan(0);
    expect(exports.at(-1).fileName).to.eq(fileName);
  });
});

Then("I verify PPT export file name {string} in the custom suite", fileName => {
  cy.window().its("__agileCypressHarness.pptExports").should(exports => {
    expect(exports.length).to.be.greaterThan(0);
    expect(exports.at(-1).fileName).to.eq(fileName);
  });
});
