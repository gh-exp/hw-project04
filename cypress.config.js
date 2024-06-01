const { defineConfig } = require("cypress");

module.exports = defineConfig({
  env: {
    base_URL: process.env.base_URL,
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },

    "baseUrl": "https://techglobal-training.com/frontend/project-6",
  },



});
