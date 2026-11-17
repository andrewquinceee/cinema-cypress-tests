import selectors from "../../fixtures/selectors.json";

describe("Навигация по расписанию", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("клик по сеансу открывает страницу выбора мест", () => {
    cy.sel("main.days").eq(6).click();
    cy.sel("main.seanceActive").first().click();

    cy.sel("booking.title").invoke("text").should("not.be.empty");
    cy.sel("booking.start").invoke("text").should("match", /\d{2}:\d{2}/);
    cy.sel("booking.hall").should("be.visible");
    cy.sel("booking.bookButton").should("be.disabled");
  });

  it("можно переключиться на каждый из 7 дней", () => {
    cy.sel("main.days").each(($day, index) => {
      cy.sel("main.days").eq(index).click();
      cy.sel("main.days").eq(index).should("match", selectors.main.dayChosen);
      cy.sel("main.dayChosen").should("have.length", 1);
    });
  });
});
