describe("Логин в админку", () => {
  beforeEach(() => {
    cy.fixture("users").as("users");
  });

  it("показывает форму авторизации", () => {
    cy.visit("/admin");
    cy.sel("login.title").should("contain", "Авторизация");
    cy.sel("login.email").should("be.visible");
    cy.sel("login.password").should("be.visible");
    cy.sel("login.submit").should("be.visible");
  });

  it("happy path: вход с верными данными", function () {
    cy.login(this.users.happy);
    cy.sel("login.form").should("not.exist");
    cy.sel("admin.hallControlTitle").should("contain", "Управление залами");
    cy.sel("admin.hallsList").should("have.length.greaterThan", 0);
  });

  ["sadWrongPassword", "sadWrongEmail"].forEach((key) => {
    it(`sad path: ${key}`, function () {
      const user = this.users[key];
      cy.login(user);
      cy.url().should("include", user.expectedUrl);
      cy.sel("login.errorMessage").should("contain", user.expectedError);
      cy.sel("admin.hallControlTitle").should("not.exist");
    });
  });

  it("sad path: пустые поля (форма не отправляется)", function () {
    cy.login(this.users.sadEmpty);
    cy.sel("login.form").should("exist");
    cy.sel("admin.hallControlTitle").should("not.exist");
  });

  it("в админке можно получить название зала с открытыми продажами", function () {
    cy.login(this.users.happy);
    cy.getOpenHallName().should("not.be.empty");
  });
});
