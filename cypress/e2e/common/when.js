import { When } from "@badeball/cypress-cucumber-preprocessor";
import { getQuestionRow, setQuestionField } from "./helpers";

function addAssessmentDatesUntilLimit() {
  return cy.getByTestId("add-date-button").then($button => {
    if ($button.prop("disabled")) {
      return;
    }

    return cy.wrap($button).click().then(() => addAssessmentDatesUntilLimit());
  });
}

When("I remember the active assessment label as {string}", aliasName => {
  cy.window()
    .its("__AGILE_MATURITY_APP__")
    .invoke("getActiveAssessmentLabel")
    .then(label => {
      cy.wrap(String(label), { log: false }).as(aliasName);
    });
});

When("I change the comparison chart type to {string}", chartType => {
  const normalizedType = String(chartType).trim().toLowerCase();
  cy.getByTestId("comparison-chart-type").select(
    normalizedType === "line" ? "line" : "bar"
  );
});

When("I add a new assessment date", () => {
  cy.getByTestId("add-date-button").click();
});

When("I switch to the remembered assessment chip {string}", aliasName => {
  cy.get(`@${aliasName}`).then(label => {
    cy.get('[data-testid="assessment-chip"]')
      .filter((index, chip) => chip.getAttribute("data-assessment-label") === String(label))
      .should("have.length", 1)
      .then($chips => {
        $chips[0].click();
      });

    cy.window()
      .its("__AGILE_MATURITY_APP__")
      .invoke("getActiveAssessmentLabel")
      .should("eq", String(label));
  });
});

When("I switch to the remembered assessment from the select {string}", aliasName => {
  cy.get(`@${aliasName}`).then(label => {
    cy.getByTestId("assessment-select")
      .find("option")
      .then($options => {
        const option = [...$options].find(candidate => candidate.text === String(label));
        expect(option, `assessment option for ${label}`).to.exist;
        cy.getByTestId("assessment-select").select(option.value);
      });

    cy.window()
      .its("__AGILE_MATURITY_APP__")
      .invoke("getActiveAssessmentLabel")
      .should("eq", String(label));
  });
});

When("I change the active assessment date to {string}", nextDate => {
  cy.getByTestId("assessment-date-input").setDateValue(nextDate);
  cy.getByTestId("update-date-button").click();
});

When(
  "I change the active assessment date to the remembered label {string}",
  aliasName => {
    cy.get(`@${aliasName}`).then(label => {
      cy.getByTestId("assessment-date-input").setDateValue(String(label));
      cy.getByTestId("update-date-button").click();
    });
  }
);

When("I add assessment dates until the maximum is reached", () => {
  addAssessmentDatesUntilLimit();
});

When("I remove the active assessment date", () => {
  cy.getByTestId("remove-date-button").click();
});

When("I set the score for question {string} to {string}", (virtue, score) => {
  setQuestionField(virtue, "current-input", score);
});

When("I change the question {string} virtue to {string}", (virtue, nextVirtue) => {
  setQuestionField(virtue, "virtue-input", nextVirtue);
});

When(
  "I change the question {string} principle to {string}",
  (virtue, nextPrinciple) => {
    setQuestionField(virtue, "principle-input", nextPrinciple);
  }
);

When("I change the question {string} score to {string}", (virtue, score) => {
  setQuestionField(virtue, "current-input", score);
});

When("I change the question {string} target to {string}", (virtue, target) => {
  setQuestionField(virtue, "target-input", target);
});

When("I create the discipline {string}", discipline => {
  cy.getByTestId("open-add-discipline").click();
  cy.getByTestId("discipline-name-input").replaceInputValue(discipline);
  cy.getByTestId("confirm-add-discipline").click();
});

When(
  "I add a question with discipline {string} virtue {string} principle {string} score {string} and target {string}",
  (discipline, virtue, principle, score, target) => {
    cy.getByTestId("open-add-question").click();
    cy.getByTestId("question-discipline-select").select(discipline);
    cy.getByTestId("question-virtue-input").replaceInputValue(virtue);
    cy.getByTestId("question-principle-input").replaceInputValue(principle);
    cy.getByTestId("question-current-input").replaceInputValue(score);
    cy.getByTestId("question-target-input").replaceInputValue(target);
    cy.getByTestId("confirm-add-question").click();
  }
);

When("I rename the discipline {string} to {string}", (currentName, nextName) => {
  cy.findDisciplineCard(currentName).should("exist").within(() => {
    cy.get('[data-testid="discipline-card-input"]')
      .first()
      .replaceInputValue(nextName);
  });
});

When("I filter the table to the discipline {string}", discipline => {
  cy.getByTestId("discipline-filter").select(discipline);
});

When("I clear the discipline filter", () => {
  cy.getByTestId("discipline-filter").select("All");
});

When("I delete the question {string}", virtue => {
  getQuestionRow(virtue).within(() => {
    cy.getByTestId("delete-question").click();
  });
});

When("I reset the dashboard defaults", () => {
  cy.getByTestId("reset-button").click();
});

When("I link a JSON save file", () => {
  cy.getByTestId("link-json-button").click();
});

When("I download the current JSON snapshot", () => {
  cy.getByTestId("download-json-button").click();
});

When("I open the prepared JSON snapshot", () => {
  cy.getByTestId("open-json-button").click();
});

When("I export the PDF report", () => {
  cy.getByTestId("export-pdf-button").click();
});

When("I export the PPT report", () => {
  cy.getByTestId("export-ppt-button").click();
});




