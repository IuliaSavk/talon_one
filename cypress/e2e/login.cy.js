import LoginPage from '../pages/LoginPage';
import { faker } from "@faker-js/faker";

describe('Login Functionality', function() {
    beforeEach(function () {
        LoginPage.visit();
        LoginPage.openLoginForm();
    });

    context("Positive scenarios", function () {
        it("User can log in successfully with valid credentials", function () {
            cy.login(Cypress.env('validUsername'), Cypress.env('validPassword'));
            LoginPage.verifyLoginWasSuccessful(Cypress.env('validUsername'));
        });


        it('Logout functionality works after successful login', () => {
            cy.login(Cypress.env('validUsername'), Cypress.env('validPassword'));
            LoginPage.verifyLoginWasSuccessful(Cypress.env('validUsername'));

            LoginPage.clickLogOut();
            LoginPage.verifyLogoutWasSuccessful();
        });

        it('Login form closes correctly when clicking the close button', () => {
            LoginPage.closeLoginForm();
            LoginPage.verifyLoginFormDisappeared();
        });
    });

    context('Negative scenarios', () => {
        it('User sees an error when entering an incorrect password', () => {
            cy.login(Cypress.env('validUsername'), Cypress.env('invalidPassword'));

            cy.on('window:alert', (alertMessage) => {
                expect(alertMessage).to.equal(Cypress.env('wrongPasswordMessage'));
            });
        });

        it('User sees an error when trying to login with a non-existing username', () => {
            const uniqueRandomUsername = faker.internet.username({firstName: "talonOne20250325-"})
            cy.login(uniqueRandomUsername, Cypress.env('validPassword'));

            cy.on('window:alert', (alertMessage) => {
                expect(alertMessage).to.equal(Cypress.env('missingUserMessage'));
            });
        });
    });
});
