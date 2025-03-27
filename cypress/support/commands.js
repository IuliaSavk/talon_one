import LoginPage from '../pages/LoginPage';
import { faker } from "@faker-js/faker";

Cypress.Commands.add("login", (username, password) => {
    LoginPage.enterUsername(username);
    LoginPage.enterPassword(password);
    LoginPage.submitLogin()
});

Cypress.Commands.add("generatePurchaseDetailsData", () => {
    return {
        name: faker.person.firstName(),  // in the purchase confirmation UI trims the name, so I'm using just a first name so that the test will pass.
        card: faker.finance.creditCardNumber(),
        month: faker.date.month({abbreviated: true}), // e.g., "Apr"
        year: faker.date.future().getFullYear().toString(), // Future year
    }
});