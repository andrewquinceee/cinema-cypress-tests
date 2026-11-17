describe("Выбор места при бронировании", () => {
  beforeEach(() => {
    cy.fixture("users").then((users) => {
      cy.login(users.happy);
    });

    cy.getOpenHallName().then((hallName) => {
      cy.visit("/");
      cy.openSeanceForHall(hallName);
    });
  });

  it("повторный клик по выбранному месту снимает выбор", () => {
    cy.sel("booking.freeChair").first().click();
    cy.sel("booking.selectedChair").should("have.length", 1);
    cy.sel("booking.bookButton").should("be.enabled");

    cy.sel("booking.selectedChair").first().click();
    cy.sel("booking.selectedChair").should("have.length", 0);
    cy.sel("booking.bookButton").should("be.disabled");
  });

  it("можно выбрать несколько мест одновременно", () => {
    cy.sel("booking.freeChair").eq(0).click();
    cy.sel("booking.freeChair").eq(1).click();
    cy.sel("booking.selectedChair").should("have.length", 2);
    cy.sel("booking.bookButton").should("be.enabled");
  });
});
