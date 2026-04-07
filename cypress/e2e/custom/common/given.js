import { Given } from "@badeball/cypress-cucumber-preprocessor";

Given("I open the custom BDD suite in {string} viewport", viewportLabel => {
  cy.openAgileMaturityAppCustom(viewportLabel);
});

Given("I prepare the custom suite JSON fixture {string}", fixtureName => {
  cy.primeOpenJsonFixture(fixtureName);
});
