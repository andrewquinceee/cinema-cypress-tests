Cypress.Commands.add("sel", (path) => {
  const [group, name] = path.split(".");
  return cy.fixture("selectors").then((selectors) => {
    return cy.get(selectors[group][name]);
  });
});