import selectors from "../fixtures/selectors.json";

describe("Главная страница", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("показывает заголовок сайта", () => {
    cy.sel("main.header").should("be.visible");
    cy.sel("main.header").should("contain", "кино");
  });

  it("показывает навигацию на 7 дней", () => {
    cy.sel("main.days").should("have.length", 7);
  });

  it("подсвечивает сегодняшний день как выбранный", () => {
    cy.sel("main.dayToday").should("have.length", 1);
    cy.sel("main.dayChosen").should("have.length", 1);
    cy.sel("main.dayToday").should("match", selectors.main.dayChosen);
  });

  it("у каждого дня есть название и число", () => {
    cy.sel("main.dayWeekName").each(($el) => {
      expect($el.text().trim()).to.not.be.empty;
    });
    cy.sel("main.dayNumber").each(($el) => {
      expect($el.text().trim()).to.match(/^\d{1,2}$/);
    });
  });

  it("переключает выбранный день по клику", () => {
    cy.sel("main.days").eq(1).click();
    cy.sel("main.dayChosen").should("have.length", 1);
    cy.sel("main.days").eq(1).should("match", selectors.main.dayChosen);
    cy.sel("main.days").eq(0).should("not.match", selectors.main.dayChosen);
  });

  it("показывает список фильмов", () => {
    cy.sel("main.movie").should("have.length.greaterThan", 0);
  });

  it("у каждого фильма есть название, постер, описание и данные", () => {
    cy.sel("main.movie").each(($movie) => {
      cy.wrap($movie).find(selectors.main.movieTitle).invoke("text").should("not.be.empty");
      cy.wrap($movie).find(selectors.main.moviePoster).should("exist");
      cy.wrap($movie).find(selectors.main.movieSynopsis).should("exist");
      cy.wrap($movie).find(selectors.main.movieDuration).should("contain", "мин");
      cy.wrap($movie).find(selectors.main.movieOrigin).should("exist");
    });
  });

  it("у залов есть название и время сеансов в формате ЧЧ:ММ", () => {
    cy.sel("main.hallTitle").each(($el) => {
      expect($el.text().trim()).to.not.be.empty;
    });
    cy.sel("main.seance").each(($el) => {
      expect($el.text().trim()).to.match(/^\d{2}:\d{2}$/);
    });
  });
});
