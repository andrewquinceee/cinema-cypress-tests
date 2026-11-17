describe("Бронирование билета", () => {
  beforeEach(() => {
    cy.fixture("users").as("users");
    cy.fixture("booking").as("booking");
  });

  it("бронирует место в зале, название которого взято из админки", function () {
    cy.login(this.users.happy);

    cy.getOpenHallName().then((hallName) => {
      cy.visit("/");
      cy.openSeanceForHall(hallName);

      cy.sel("booking.hall").should("contain", hallName);
      cy.sel("booking.bookButton").should("be.disabled");

      cy.sel("booking.title")
        .invoke("text")
        .then((text) => {
          const movieTitle = text.trim();

          cy.sel("booking.freeChair").first().click();
          cy.sel("booking.selectedChair").should("have.length", 1);
          cy.sel("booking.bookButton").should("be.enabled").click();

          cy.sel("ticket.checkTitle").should("contain", this.booking.ticketTitle);
          cy.sel("ticket.title").should("contain", movieTitle);
          cy.sel("ticket.hall").first().should("contain", hallName);
          cy.sel("ticket.chairs").invoke("text").should("match", /^\d+\/\d+$/);
          cy.sel("ticket.cost").invoke("text").should("match", /^\d+$/);

          cy.sel("ticket.getCodeButton").click();

          cy.sel("ticket.checkTitle").should("contain", this.booking.eticketTitle);
          cy.sel("ticket.title").should("contain", movieTitle);
          cy.sel("ticket.qr").should("be.visible");
        });
    });
  });
});
