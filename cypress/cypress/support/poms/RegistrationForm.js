const validCredentials = require('../../fixtures/validCredentials.json');
export class RegistrationForm {
  selectors = {
    signUpButton: () => cy.contains('button', 'Sign up'),
    signUpName: () => cy.get('[id="signupName"]'),
    signUpLastName: () => cy.get('[id="signupLastName"]'),
    signUpEmail: () => cy.get('[id="signupEmail"]'),
    signUpPassword: () => cy.get('[id="signupPassword"]'),
    sigUpRepeatPassword: () => cy.get('[id="signupRepeatPassword"]'),
    registrationButton: () => cy.contains('.btn.btn-primary', 'Register'),
    logOutButton: () => cy.get('.icon.icon-logout').parent(),
    invalidFeedback: () => cy.get('.invalid-feedback'),
    registrationForm: () => cy.get('h4.modal-title'),
    closeRegistrationButton: () => cy.get('button[aria-label="Close"]')
  };

  checkAndClickSignUpButton() {
    this.selectors.signUpButton().should('be.visible').should('be.enabled').click();
  };

  checkAndClearField(inputField) {
    inputField.clear();
  };

  #inputValidTextAndCheck(inputField, text, compareText) {
    inputField.clear().type(text).should('have.value', compareText);
  };

  #inputValidPasswordAndCheck(inputField, text, compareText) {
    inputField.clear().type(text, { sensitive: true }).should('have.value', compareText);
  };

  checkAndClickRegistrationButton() {
    this.selectors.registrationButton().should('be.enabled').click();
  };

  registrationFormClick() {
    this.selectors.registrationForm().click();
  };

  inputValidSignUpName(text, compareText) {
    this.#inputValidTextAndCheck(this.selectors.signUpName(), text, compareText);
  };

  inputValidSignUpLastName(text, compareText) {
    this.#inputValidTextAndCheck(this.selectors.signUpLastName(), text, compareText);
  };

  inputValidSignUpEmail(text, compareText) {
    this.#inputValidTextAndCheck(this.selectors.signUpEmail(), text, compareText);
  };

  inputValidSignUpPassword(text, compareText) {
    this.#inputValidPasswordAndCheck(this.selectors.signUpPassword(), text, compareText);
  };

  inputValidSignUpRepeatPassword(text, compareText) {
    this.#inputValidPasswordAndCheck(this.selectors.sigUpRepeatPassword(), text, compareText);
  };

  logOut() {
    this.selectors.logOutButton().click();
  };

  checkError(inputField, borderColor, message) {
    inputField.should('have.css', 'border-color', borderColor);
    this.selectors.invalidFeedback().should('have.text', message);
    this.selectors.registrationButton().should('be.disabled');
  };

  #inputText(inputField, text) {
    inputField.clear().type(text);
  };

  #inputPassword(inputField, text) {
    inputField.clear().type(text, { sensitive: true });
  };

  inputInvalidSignUpName(text) {
    this.#inputText(this.selectors.signUpName(), text);
  };

  inputInvalidSignUpLastName(text) {
    this.#inputText(this.selectors.signUpLastName(), text);
  };

  inputInvalidSignUpEmail(text) {
    this.#inputText(this.selectors.signUpEmail(), text);
  };

  inputInvalidSignUpPassword(text) {
    this.#inputPassword(this.selectors.signUpPassword(), text);
  };

  inputInvalidSignUpRepeatPassword(text) {
    this.#inputPassword(this.selectors.sigUpRepeatPassword(), text);
  };

  generateEmail() {
    const randomValue = Math.floor(Math.random() * 100000);
    return randomValue + validCredentials.email;
  }
}