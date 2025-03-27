class LoginPage {
    elements = {
        loginLink: () => cy.get('#login2'),
        loginModal: () => cy.get('#logInModal'),
        usernameInput: () => cy.get('#loginusername'),
        passwordInput: () => cy.get('#loginpassword'),
        submitLogInButton: () => cy.contains('button', 'Log in'),
        nameOfUserText: () => cy.get('#nameofuser'),
        logOutLink: () => cy.get('#logout2'),
        closeLoginModalButton: () => cy.get('#logInModal .modal-footer .btn-secondary'),
  };
    visit() {
        cy.visit('/');
    }

    openLoginForm() {
        this.elements.loginLink().click();
        this.elements.loginModal().should('be.visible');
        cy.wait(1000);
    }

    enterUsername(username) {
        this.elements.usernameInput().type(username);
    }

    enterPassword(password) {
        this.elements.passwordInput().type(password);
    }

    submitLogin() {
        this.elements.submitLogInButton().click();
    }

    verifyLoginWasSuccessful(username) {
        this.elements.nameOfUserText()
            .should('be.visible')
            .and('have.text', `Welcome ${username}`);
        this.elements.loginLink().should('not.be.visible')
    }

    clickLogOut() {
        this.elements.logOutLink().click()
    }
    verifyLogoutWasSuccessful() {
        cy.wait(5000);
        this.elements.nameOfUserText().should('not.be.visible');
        this.elements.loginLink().should('be.visible');
    }

    closeLoginForm() {
        this.elements.closeLoginModalButton()
            .should('be.visible')
            .click();
    }

    verifyLoginFormDisappeared() {
        this.elements.loginModal().should('not.be.visible');
    }
}

export default new LoginPage();
