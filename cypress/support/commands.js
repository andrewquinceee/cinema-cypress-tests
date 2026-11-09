import selectors from "../fixtures/selectors.json";

const selectorOf = (path) => path.split(".").reduce((obj, key) => obj[key], selectors);

Cypress.Commands.add("sel", (path, options) => {
  return cy.get(selectorOf(path), options);
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
      const nameSelector = selectorOf("admin.salesHallNameTemplate").replace("{id}", hallId);
      return cy
        .get(nameSelector)
        .invoke("text")
        .then((text) => text.trim());
    });
});

Cypress.Commands.add("openSeanceForHall", (hallName) => {
  cy.sel("main.hall")
    .filter((index, hall) => {
      const title = Cypress.$(hall).find(selectorOf("main.hallTitle")).text().trim();
      return title === hallName;
    })
    .find(selectorOf("main.seanceActive"))
    .first()
    .click();
});
