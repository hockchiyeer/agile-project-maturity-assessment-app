const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const { NodeGlobalsPolyfillPlugin } = require("@esbuild-plugins/node-globals-polyfill");
const { NodeModulesPolyfillPlugin } = require("@esbuild-plugins/node-modules-polyfill");
const {
  addCucumberPreprocessorPlugin,
} = require("@badeball/cypress-cucumber-preprocessor");
const {
  createEsbuildPlugin,
} = require("@badeball/cypress-cucumber-preprocessor/esbuild");
const { startStaticServer } = require("./cypress/server/static-server");

module.exports = defineConfig({
  video: false,
  chromeWebSecurity: false,
  defaultCommandTimeout: 10000,
  requestTimeout: 10000,
  env: {
    stepDefinitions: [
      "cypress/e2e/[filepath]/**/*.{js,mjs,ts,tsx}",
      "cypress/e2e/[filepath].{js,mjs,ts,tsx}",
      "cypress/e2e/common/**/*.{js,mjs,ts,tsx}",
      "cypress/e2e/custom/common/**/*.{js,mjs,ts,tsx}",
      "cypress/support/step_definitions/**/*.{js,mjs,ts,tsx}",
    ],
  },
  e2e: {
    baseUrl: "http://127.0.0.1:4173",
    specPattern: [
      "cypress/e2e/**/*.feature",
      "cypress/e2e/**/*.spec.js"
    ],
    async setupNodeEvents(on, config) {
      await startStaticServer(4173);
      await addCucumberPreprocessorPlugin(on, config);

      on(
        "file:preprocessor",
        createBundler({
          plugins: [
            NodeGlobalsPolyfillPlugin({ process: true, buffer: true }),
            NodeModulesPolyfillPlugin(),
            createEsbuildPlugin(config),
          ],
          define: { global: "globalThis" },
        })
      );

      return config;
    },
  },
});



