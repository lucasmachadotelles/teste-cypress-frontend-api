Cypress.Commands.add("getByTestId", (testid) => {
	  cy.get(`[data-testid='${testid}']` )
});
