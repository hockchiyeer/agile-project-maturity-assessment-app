import { Given } from "@badeball/cypress-cucumber-preprocessor";
import { getViewportConfig } from "./helpers";

Given("I open the Agile maturity app on a {string} viewport", viewportLabel => {
  const viewport = getViewportConfig(viewportLabel);
  cy.openAgileApp(viewport.name, viewport.width, viewport.height);
});

Given("I prepare the fixture {string} for the open JSON action", fixtureName => {
  cy.primeOpenJsonFixture(fixtureName);
});
