# cinema-cypress-tests

UI-тесты на Cypress для приложения бронирования билетов в кино
(http://qamid.tmweb.ru, админка: http://qamid.tmweb.ru/admin).

## Что проверяется

Тесты разложены по двум папкам (каждая папка — отдельный поток при параллельном запуске).

`cypress/e2e/folder1` — админка и бронирование:

- `admin-login.cy.js` — логин в админку (happy path и sad path, данные в `users.json`)
- `booking.cy.js` — бронирование билета в зале, название которого берётся из админки
- `booking-seat-selection.cy.js` — выбор мест: снятие выбора повторным кликом, выбор нескольких мест

`cypress/e2e/folder2` — публичная часть сайта:

- `main-page.cy.js` — корректное отображение главной страницы
- `seance-navigation.cy.js` — переход к выбору мест по сеансу, переключение всех 7 дней

Все селекторы хранятся в `cypress/fixtures/selectors.json`.

## Установка

    npm install

Для запуска во всех браузерах нужны установленные Chrome и Firefox.
Electron встроен в Cypress.

## Скрипты запуска

| Команда | Что делает |
|---|---|
| `npm test` | все тесты в браузере по умолчанию |
| `npm run test:chrome` | все тесты в Chrome |
| `npm run test:firefox` | все тесты в Firefox |
| `npm run test:electron` | все тесты в Electron |
| `npm run test:browsers:parallel` | два потока одновременно: Chrome и Firefox |
| `npm run test:folder1` | только тесты из `folder1` (Chrome) |
| `npm run test:folder2` | только тесты из `folder2` (Chrome) |
| `npm run test:folders:parallel` | два потока одновременно: `folder1` и `folder2` |
| `npm run test:record:parallel` | запуск с записью в Cypress Cloud (см. ниже) |

Интерактивный режим:

    npx cypress open

В режиме `cypress run` включены повторные попытки (`retries: 2`),
так как учебный сайт иногда отдаёт нестабильные ответы.

## Запуск в Jenkins

В репозитории есть `Jenkinsfile` с параметром `RUN_MODE`. Значения совпадают
с названиями скриптов: `test:chrome`, `test:firefox`, `test:electron`,
`test:browsers:parallel`, `test:folders:parallel`.

Локальная установка (macOS):

    brew install jenkins-lts
    brew services start jenkins-lts

Дальше в Jenkins создаётся Pipeline-задача из репозитория (Pipeline script from SCM,
ветка `main`, путь `Jenkinsfile`). Запуск: «Собрать с параметрами» и выбор режима.

## Известные ограничения

- Приложение общее и учебное: данные (фильмы, сеансы, залы) могут меняться.
- Каждый прогон теста бронирования занимает одно место в зале.
- Доступность сеансов зависит от текущего времени.
- При параллельном запуске возможны случайные ошибки самого сайта; их закрывают повторные попытки.

## Dashboard

Результаты прогонов в Cypress Cloud: https://cloud.cypress.io/projects/32riby

Ключ записи хранится только у владельца проекта и передаётся через переменную окружения:

    export CYPRESS_RECORD_KEY=<RECORD_KEY>
    npx cypress run --browser chrome --record

Параллельный запуск: несколько процессов с одинаковым `--ci-build-id`
распределяют spec-файлы между собой:

    BUILD_ID="cinema-$(date +%s)"
    npm run test:record:parallel -- --ci-build-id $BUILD_ID &
    npm run test:record:parallel -- --ci-build-id $BUILD_ID &
    wait
