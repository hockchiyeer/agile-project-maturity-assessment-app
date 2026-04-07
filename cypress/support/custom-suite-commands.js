import { objects } from "../e2e/pageObjects";

const customViewports = {
  desktop: { width: 1440, height: 900 },
  mobile: { width: 390, height: 844 },
};

function getLocatorKey(locatorName) {
  return String(locatorName || "")
    .trim()
    .replace(/\s+/g, "_")
    .replace(/-/g, "_");
}

function getPageKey(pageName) {
  return String(pageName || "").trim().replace(/\s+/g, "");
}

function resolveSelector(locatorName, pageName) {
  const pageKey = getPageKey(pageName);
  const locatorKey = getLocatorKey(locatorName);
  const selector = objects[pageKey]?.[locatorKey];

  if (!selector) {
    throw new Error(`Unable to resolve locator "${locatorName}" on page "${pageName}"`);
  }

  return selector;
}

function getQuestionFieldTestId(fieldName) {
  const normalizedField = String(fieldName || "").trim().toLowerCase();
  const mapping = {
    current: "current-input",
    principle: "principle-input",
    score: "current-input",
    target: "target-input",
    virtue: "virtue-input",
  };

  const fieldTestId = mapping[normalizedField];

  if (!fieldTestId) {
    throw new Error(`Unsupported question field: ${fieldName}`);
  }

  return fieldTestId;
}

Cypress.Commands.add("openAgileMaturityAppCustom", viewportLabel => {
  const viewport = customViewports[String(viewportLabel || "").trim().toLowerCase()];

  if (!viewport) {
    throw new Error(`Unsupported viewport: ${viewportLabel}`);
  }

  cy.openAgileApp(viewportLabel, viewport.width, viewport.height);
});

Cypress.Commands.add("getCustomElement", (locatorName, pageName) => {
  return cy.get(resolveSelector(locatorName, pageName));
});

Cypress.Commands.add("clickOnTheElement", (locatorName, pageName) => {
  cy.getCustomElement(locatorName, pageName).first().click({ force: true });
});

Cypress.Commands.add("enterTheValue", (value, locatorName, pageName) => {
  cy.getCustomElement(locatorName, pageName).first().replaceInputValue(value);
});

Cypress.Commands.add("selectTheValue", (value, locatorName, pageName) => {
  cy.getCustomElement(locatorName, pageName).first().select(value);
});

Cypress.Commands.add("setDateInElement", (value, locatorName, pageName) => {
  cy.getCustomElement(locatorName, pageName).first().setDateValue(value);
});

Cypress.Commands.add("verifyElementIsVisible", (locatorName, pageName) => {
  cy.getCustomElement(locatorName, pageName).should("be.visible");
});

Cypress.Commands.add("verifyElementContainsText", (locatorName, text, pageName) => {
  cy.getCustomElement(locatorName, pageName).should("contain.text", text);
});

Cypress.Commands.add("verifyElementHasValue", (locatorName, value, pageName) => {
  cy.getCustomElement(locatorName, pageName).should("have.value", String(value));
});

Cypress.Commands.add("verifyElementCount", (locatorName, count, pageName) => {
  cy.getCustomElement(locatorName, pageName).should("have.length", count);
});

Cypress.Commands.add("rememberActiveAssessmentLabelCustom", aliasName => {
  cy.window()
    .its("__AGILE_MATURITY_APP__")
    .invoke("getActiveAssessmentLabel")
    .then(label => {
      cy.wrap(String(label), { log: false }).as(aliasName);
    });
});

Cypress.Commands.add("clickAssessmentChipByAliasCustom", aliasName => {
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

Cypress.Commands.add("selectAssessmentByAliasCustom", aliasName => {
  cy.get(`@${aliasName}`).then(label => {
    cy.get('[data-testid="assessment-select"]')
      .find("option")
      .then($options => {
        const option = [...$options].find(candidate => candidate.text === String(label));
        expect(option, `assessment option for ${label}`).to.exist;
        cy.get('[data-testid="assessment-select"]').select(option.value);
      });

    cy.window()
      .its("__AGILE_MATURITY_APP__")
      .invoke("getActiveAssessmentLabel")
      .should("eq", String(label));
  });
});

Cypress.Commands.add("setQuestionFieldCustom", (virtue, fieldName, value) => {
  const fieldTestId = getQuestionFieldTestId(fieldName);
  cy.findQuestionRowByVirtue(virtue).should("exist").within(() => {
    cy.get(`[data-testid="${fieldTestId}"]`).first().replaceInputValue(value);
  });
});

Cypress.Commands.add("verifyQuestionValuesCustom", (virtue, score, target) => {
  cy.findQuestionRowByVirtue(virtue).should("exist").within(() => {
    cy.get('[data-testid="current-input"]').first().should("have.value", String(score));
    cy.get('[data-testid="target-input"]').first().should("have.value", String(target));
  });
});

Cypress.Commands.add("verifyQuestionDisciplineCustom", (virtue, discipline) => {
  cy.findQuestionRowByVirtue(virtue).should("exist").within(() => {
    cy.get('[data-testid="discipline-cell"]').should("have.text", discipline);
  });
});

Cypress.Commands.add("deleteQuestionCustom", virtue => {
  cy.findQuestionRowByVirtue(virtue).should("exist").within(() => {
    cy.get('[data-testid="delete-question"]').click();
  });
});

Cypress.Commands.add("renameDisciplineCustom", (currentName, nextName) => {
  cy.findDisciplineCard(currentName).should("exist").within(() => {
    cy.get('[data-testid="discipline-card-input"]').first().replaceInputValue(nextName);
  });
});



