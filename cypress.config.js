const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://qamid.tmweb.ru",
    viewportWidth: 1280,
    viewportHeight: 800,
  },
});