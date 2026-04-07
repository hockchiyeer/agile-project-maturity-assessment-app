export const viewportCatalog = {
  desktop: { height: 900, width: 1440 },
  mobile: { height: 844, width: 390 },
};

export function getViewportConfig(label) {
  const normalizedLabel = String(label || "").trim().toLowerCase();
  const viewport = viewportCatalog[normalizedLabel];

  if (!viewport) {
    throw new Error(`Unsupported viewport: ${label}`);
  }

  return {
    ...viewport,
    name: normalizedLabel,
  };
}

export function getQuestionRow(virtue) {
  return cy.findQuestionRowByVirtue(virtue).should("exist");
}

export function setQuestionField(virtue, fieldTestId, value) {
  return getQuestionRow(virtue).within(() => {
    cy.get(`[data-testid="${fieldTestId}"]`).first().replaceInputValue(value);
  });
}

export function expectQuestionFieldValue(virtue, fieldTestId, expectedValue) {
  return getQuestionRow(virtue).within(() => {
    cy.get(`[data-testid="${fieldTestId}"]`)
      .first()
      .should("have.value", String(expectedValue));
  });
}

export function expectQuestionDiscipline(virtue, discipline) {
  return getQuestionRow(virtue).within(() => {
    cy.getByTestId("discipline-cell").should("have.text", discipline);
  });
}
