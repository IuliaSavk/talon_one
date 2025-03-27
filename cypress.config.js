const { defineConfig } = require("cypress")

module.exports = defineConfig({
  e2e: {
    experimentalStudio: true,
    baseUrl: 'https://www.demoblaze.com',
    env: {
      validUsername: "TestUserTalonOne",
      validPassword: "123",
      invalidPassword: "1234",
      missingUserMessage: "User does not exist.",
      wrongPasswordMessage: "Wrong password.",
      emptyFieldsMessage: "Please fill out Username and Password.",
      singleLaptop: "Sony vaio i5",
      laptops: ["Sony vaio i5", "MacBook air"],
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
})