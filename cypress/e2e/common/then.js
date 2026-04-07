import { Then } from "@badeball/cypress-cucumber-preprocessor";
import {
  expectQuestionDiscipline,
  expectQuestionFieldValue,
  getQuestionRow,
} from "./helpers";

Then("the seeded dashboard summary is rendered", () => {
  cy.getByTestId("app-title").should(
    "contain.text",
    "Agile Maturity Management"
  );
  cy.getByTestId("assessment-count").should("have.text", "1 / 12 dates");
  cy.getByTestId("save-status").should("contain.text", "JSON not linked");
  cy.getByTestId("active-maturity-card").should("contain.text", "2.0");
  cy.getByTestId("target-maturity-card").should("contain.text", "4.0");
  cy.get('[data-testid="discipline-scorecard"]').should("have.length", 8);
  cy.getByTestId("assessment-select").find("option").should("have.length", 1);
});

Then("the question table contains {int} seeded rows", rowCount => {
  cy.get('[data-testid="question-row"]').should("have.length", rowCount);
});

Then("the app renders charts for the dashboard", () => {
  cy.getByTestId("radar-chart")
    .should("be.visible")
    .and($canvas => {
      expect($canvas[0].width).to.be.greaterThan(0);
    });
  cy.getByTestId("comparison-overview-chart").should("be.visible");
  cy.getByTestId("comparison-discipline-chart").should("be.visible");
});

Then("the layout matches the {string} viewport", viewportLabel => {
  const normalizedLabel = String(viewportLabel).trim().toLowerCase();

  if (normalizedLabel === "mobile") {
    cy.getByTestId("table-head").should("not.be.visible");
    return;
  }

  cy.getByTestId("table-head").should("be.visible");
});

Then("the comparison chart mode is {string}", expectedMode => {
  cy.window()
    .its("__AGILE_MATURITY_APP__")
    .invoke("getComparisonChartMode")
    .should("eq", expectedMode);
});

Then("the app shows {int} saved dates", dateCount => {
  cy.get('[data-testid="assessment-chip"]').should("have.length", dateCount);
  cy.getByTestId("assessment-count").should("have.text", `${dateCount} / 12 dates`);
});

Then("the question {string} has score {string} and target {string}", (virtue, score, target) => {
  expectQuestionFieldValue(virtue, "current-input", score);
  expectQuestionFieldValue(virtue, "target-input", target);
});

Then("the question {string} principle is {string}", (virtue, principle) => {
  expectQuestionFieldValue(virtue, "principle-input", principle);
});

Then("the active assessment label is {string}", expectedLabel => {
  cy.window()
    .its("__AGILE_MATURITY_APP__")
    .invoke("getActiveAssessmentLabel")
    .should("eq", expectedLabel);
});

Then("the save status contains {string}", messageFragment => {
  cy.getByTestId("save-status").should("contain.text", messageFragment);
});

Then("the assessment controls show {int} saved dates", dateCount => {
  cy.get('[data-testid="assessment-chip"]').should("have.length", dateCount);
  cy.getByTestId("assessment-select").find("option").should("have.length", dateCount);
});

Then("the add date button is disabled", () => {
  cy.getByTestId("add-date-button").should("be.disabled");
});

Then("the discipline scorecards include {string}", discipline => {
  cy.findDisciplineCard(discipline).should("exist");
  cy.getByTestId("discipline-filter")
    .find("option")
    .then(options => {
      const values = Array.from(options, option => option.value);
      expect(values).to.include(discipline);
    });
});

Then("the question {string} appears under discipline {string}", (virtue, discipline) => {
  expectQuestionDiscipline(virtue, discipline);
});

Then("only questions for discipline {string} are visible", discipline => {
  cy.get('[data-testid="question-row"]').should($rows => {
    expect($rows.length).to.be.greaterThan(0);
  });
  cy.get('[data-testid="question-row"]').each($row => {
    expect($row.attr("data-discipline")).to.eq(discipline);
  });
});

Then("the question {string} is not listed", virtue => {
  cy.get('[data-testid="virtue-input"]').should($inputs => {
    const matchingValues = [...$inputs].filter(input => input.value === virtue);
    expect(matchingValues).to.have.length(0);
  });
});

Then("all question scores are reset to {string}", score => {
  cy.get('[data-testid="current-input"]').each($input => {
    expect($input.val()).to.eq(score);
  });
});

Then("all question targets are reset to {string}", target => {
  cy.get('[data-testid="target-input"]').each($input => {
    expect($input.val()).to.eq(target);
  });
});

Then(
  "the linked JSON write contains the question {string} with score {string}",
  (virtue, score) => {
    cy.readLastLinkedWriteJson(2).then(jsonState => {
      const question = jsonState.currentData.find(row => row.virtue === virtue);
      expect(question, `question ${virtue}`).to.exist;
      expect(String(question.scoreHistory[jsonState.activeAssessmentId])).to.eq(score);
    });
  }
);

Then("the linked JSON write contains an audit action {string}", auditAction => {
  cy.readLastLinkedWriteJson(2).then(jsonState => {
    expect(jsonState.auditLog.some(entry => entry.action === auditAction)).to.eq(true);
  });
});

Then(
  "the downloaded JSON contains the question {string} with score {string}",
  (virtue, score) => {
    cy.readLastDownloadedJson().then(jsonState => {
      const question = jsonState.currentData.find(row => row.virtue === virtue);
      expect(question, `question ${virtue}`).to.exist;
      expect(String(question.scoreHistory[jsonState.activeAssessmentId])).to.eq(score);
    });
  }
);

Then("the app loads the fixture named {string}", fixtureName => {
  cy.getByTestId("save-status").should("contain.text", `Loaded ${fixtureName}`);
  cy.getByTestId("assessment-count").should("have.text", "2 / 12 dates");
  cy.window()
    .its("__AGILE_MATURITY_APP__")
    .invoke("getActiveAssessmentLabel")
    .should("eq", "2026-02-01");
});

Then("the PDF export is saved as {string}", fileName => {
  cy.window()
    .its("__agileCypressHarness.pdfExports")
    .should(exports => {
      expect(exports.length).to.be.greaterThan(0);
      expect(exports.at(-1).fileName).to.eq(fileName);
    });
  cy.getByTestId("save-status").should("contain.text", "PDF exported successfully.");
});

Then("the PPT export is saved as {string}", fileName => {
  cy.window()
    .its("__agileCypressHarness.pptExports")
    .should(exports => {
      expect(exports.length).to.be.greaterThan(0);
      expect(exports.at(-1).fileName).to.eq(fileName);
    });
  cy.getByTestId("save-status").should("contain.text", "PPT exported successfully.");
});

