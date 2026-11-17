const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "32riby",
  retries: {
    runMode: 2,
    openMode: 0,
  },
  e2e: {
    baseUrl: "http://qamid.tmweb.ru",
    viewportWidth: 1280,
    viewportHeight: 800,
  },
});
