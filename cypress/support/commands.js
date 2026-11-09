Cypress.Commands.add("selectorOf", (path) => {
  const [group, name] = path.split(".");
  return cy.fixture("selectors").then((selectors) => selectors[group][name]);
});

Cypress.Commands.add("sel", (path) => {
  return cy.selectorOf(path).then((selector) => cy.get(selector));
});

Cypress.Commands.add("login", (user) => {
  cy.visit("/admin");

  if (user.email) {
    cy.sel("login.email").type(user.email);
  }
  if (user.password) {
    cy.sel("login.password").type(user.password);
  }

  cy.sel("login.submit").click();
});

Cypress.Commands.add("getOpenHallName", () => {
  return cy
    .sel("admin.openSalesButton")
    .invoke("attr", "data-hall-id")
    .then((hallId) => {
      return cy.selectorOf("admin.salesHallNameTemplate").then((template) => {
        return cy
          .get(template.replace("{id}", hallId))
          .invoke("text")
          .then((text) => text.trim());
      });
    });
});
