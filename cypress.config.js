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

try {
  const nodeCrypto = require("crypto");
  if (typeof global.crypto === "undefined") {
    global.crypto = nodeCrypto.webcrypto || nodeCrypto;
  }
  if (!global.crypto.randomUUID) {
    global.crypto.randomUUID = function fallbackRandomUuid() {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, char => {
        const random = (Math.random() * 16) | 0;
        const value = char === "x" ? random : (random & 0x3) | 0x8;
        return value.toString(16);
      });
    };
  }
} catch (error) {
  console.warn("[crypto-polyfill] Unable to initialize crypto:", error.message);
}

module.exports = defineConfig({
  video: false,
  screenshotsFolder: "cypress/screenshots",
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



