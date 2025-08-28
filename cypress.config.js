// const { defineConfig } = require("cypress");

// module.exports = defineConfig({
//   e2e: {
//     setupNodeEvents(on, config) {
//       // implement node event listeners here
//     },
//   },
// });

const { defineConfig } = require('cypress')

module.exports = defineConfig({
  projectId: "r3ubnz",
  viewportHeight: 880,
  viewportWidth: 1280,
  e2e: {},
})
