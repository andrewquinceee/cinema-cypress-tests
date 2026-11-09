# cinema-cypress-tests

UI-тесты на Cypress для приложения бронирования билетов в кино
(http://qamid.tmweb.ru, админка: http://qamid.tmweb.ru/admin).

## Что проверяется

- `main-page.cy.js` — корректное отображение главной страницы
- `admin-login.cy.js` — логин в админку (happy path и sad path, данные в `users.json`)
- `booking.cy.js` — бронирование билета в зале, название которого берётся из админки

Все селекторы хранятся в `cypress/fixtures/selectors.json`.
