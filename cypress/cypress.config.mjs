import { defineConfig } from "cypress";
import * as path from 'path';
import * as fs from 'fs';
//import mochawesome from 'cypress-mochawesome-reporter/plugin.js';


//const { defineConfig } = require("cypress");
const getConfigFile = (env) => {
  const configFilePath = path.join('cypress', 'fixtures', 'configFiles', `cypress.env.${env || 'dev'}.json`);
  return (fs.readFileSync(configFilePath)).toString()
}

export default defineConfig({
  watchForFileChanges: false,
  reporter: "mochawesome",
  reporterOption: {
    reportDir: 'cypress/results',
    reportFilename: "[status]_[datetime]-[name]-report",
    overwrite: false,
    html: false,
    json: true
  },
  e2e: {
    specPattern: '**/*.cy.{js,jsx,ts,tsx}',
    baseUrl: 'https://qauto.forstudy.space',
    env: {
      TEST_ENVIRONMENT: "prod"
    },
    setupNodeEvents(on, config) {
      const configOverrides = getConfigFile(config.env.TEST_ENVIRONMENT)
      config = { ...config, ...JSON.parse(configOverrides) }
      return config;
    },
  },

});
