import { RegistrationForm } from '../support/poms/RegistrationForm.js'
const registrationForm = new RegistrationForm();
const validCredentials = require('../fixtures/validCredentials.json');
const invalidCredentials = require('../fixtures/invalidCredentials.json');

describe('My new tests', () => {
  beforeEach(() => {
    cy.visit('', {
      auth: {
        username: 'guest',
        password: 'welcome2qauto'
      }
    })
  });

  it('checks the base url', () => {
    cy.url().should('eq', 'https://qauto.forstudy.space/');
  });

  it('Registation and Log in with valid data', () => {
    registrationForm.checkAndClickSignUpButton();
    registrationForm.inputValidSignUpName(validCredentials.name, validCredentials.name);
    registrationForm.inputValidSignUpLastName(validCredentials.lastName, validCredentials.lastName);
    const email = registrationForm.generateEmail();
    registrationForm.inputValidSignUpEmail(email, email);
    registrationForm.inputValidSignUpPassword(validCredentials.password, validCredentials.password);
    registrationForm.inputValidSignUpRepeatPassword(validCredentials.password, validCredentials.password);
    registrationForm.checkAndClickRegistrationButton();
    cy.url().should('eq', 'https://qauto.forstudy.space/panel/garage');
    registrationForm.logOut();
    cy.url().should('eq', 'https://qauto.forstudy.space/');
    cy.login(email, validCredentials.password);
    registrationForm.logOut();
  });

  context('Registration with invalid data in the Name field', () => {
    it('Registation with empty the Name field', () => {
      registrationForm.checkAndClickSignUpButton();
      registrationForm.checkAndClearField(registrationForm.selectors.signUpName());
      registrationForm.registrationFormClick();
      registrationForm.checkError(registrationForm.selectors.signUpName(), 'rgb(220, 53, 69)', 'Name required');
    });

    it('Registation with digital characters in the Name field', () => {
      registrationForm.checkAndClickSignUpButton();
      registrationForm.inputInvalidSignUpName(invalidCredentials.digits);
      registrationForm.registrationFormClick();
      registrationForm.checkError(registrationForm.selectors.signUpName(), 'rgb(220, 53, 69)', 'Name is invalid');
    });

    it('Registation with one characters in the Name field', () => {
      registrationForm.checkAndClickSignUpButton();
      registrationForm.inputInvalidSignUpName(invalidCredentials.oneSymbol);
      registrationForm.registrationFormClick();
      registrationForm.checkError(registrationForm.selectors.signUpName(), 'rgb(220, 53, 69)', 'Name has to be from 2 to 20 characters long');
    });

    it('Registation with 30 characters in the Name field', () => {
      registrationForm.checkAndClickSignUpButton();
      registrationForm.inputInvalidSignUpName(invalidCredentials.manySymbols);
      registrationForm.registrationFormClick();
      registrationForm.checkError(registrationForm.selectors.signUpName(), 'rgb(220, 53, 69)', 'Name has to be from 2 to 20 characters long');
    });
  });

  context('Registration with invalid data in the Last name field', () => {
    it('Registation with empty the Last Name field', () => {
      registrationForm.checkAndClickSignUpButton();
      registrationForm.checkAndClearField(registrationForm.selectors.signUpLastName());
      registrationForm.registrationFormClick();
      registrationForm.checkError(registrationForm.selectors.signUpLastName(), 'rgb(220, 53, 69)', 'Last name required');
    });

    it('Registation with digital characters in the Last name field', () => {
      registrationForm.checkAndClickSignUpButton();
      registrationForm.inputValidSignUpName(validCredentials.name, validCredentials.name);
      registrationForm.inputInvalidSignUpLastName(invalidCredentials.digits);
      registrationForm.registrationFormClick();
      registrationForm.checkError(registrationForm.selectors.signUpLastName(), 'rgb(220, 53, 69)', 'Last name is invalid');
    });

    it('Registation with one characters in the Last name field', () => {
      registrationForm.checkAndClickSignUpButton();
      registrationForm.inputValidSignUpName(validCredentials.name, validCredentials.name);
      registrationForm.inputInvalidSignUpLastName(invalidCredentials.oneSymbol);
      registrationForm.registrationFormClick();
      registrationForm.checkError(registrationForm.selectors.signUpLastName(), 'rgb(220, 53, 69)', 'Last name has to be from 2 to 20 characters long');
    });

    it('Registation with 30 characters in the Last name field', () => {
      registrationForm.checkAndClickSignUpButton();
      registrationForm.inputValidSignUpName(validCredentials.name, validCredentials.name);
      registrationForm.inputInvalidSignUpLastName(invalidCredentials.manySymbols);
      registrationForm.registrationFormClick();
      registrationForm.checkError(registrationForm.selectors.signUpLastName(), 'rgb(220, 53, 69)', 'Last name has to be from 2 to 20 characters long');
    });
  });

  context('Registration with invalid data in the Email field', () => {
    it('Registation with empty the Email name field', () => {
      registrationForm.checkAndClickSignUpButton();
      registrationForm.inputValidSignUpName(validCredentials.name, validCredentials.name);
      registrationForm.inputValidSignUpLastName(validCredentials.lastName, validCredentials.lastName);
      registrationForm.checkAndClearField(registrationForm.selectors.signUpEmail());
      registrationForm.registrationFormClick();
      registrationForm.checkError(registrationForm.selectors.signUpEmail(), 'rgb(220, 53, 69)', 'Email required');
    });

    it('Registation with wrong data in the Email field', () => {
      registrationForm.checkAndClickSignUpButton();
      registrationForm.inputValidSignUpName(validCredentials.name, validCredentials.name);
      registrationForm.inputValidSignUpLastName(validCredentials.lastName, validCredentials.lastName);
      registrationForm.inputInvalidSignUpEmail(invalidCredentials.emailInvalid);
      registrationForm.registrationFormClick();
      registrationForm.checkError(registrationForm.selectors.signUpEmail(), 'rgb(220, 53, 69)', 'Email is incorrect');
    });
  });

  context('Registration with invalid the Password field', () => {
    it('Registation with one symbol in the Password field', () => {
      registrationForm.checkAndClickSignUpButton();
      registrationForm.inputValidSignUpName(validCredentials.name, validCredentials.name);
      registrationForm.inputValidSignUpLastName(validCredentials.lastName, validCredentials.lastName);
      const email = registrationForm.generateEmail();
      registrationForm.inputValidSignUpEmail(email, email);
      registrationForm.inputInvalidSignUpPassword(invalidCredentials.passwordOneSymbol);
      registrationForm.registrationFormClick();
      registrationForm.checkError(registrationForm.selectors.signUpPassword(), 'rgb(220, 53, 69)', 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
    });

    it('Registation with 16 symbols in the Password field', () => {
      registrationForm.checkAndClickSignUpButton();
      registrationForm.inputValidSignUpName(validCredentials.name, validCredentials.name);
      registrationForm.inputValidSignUpLastName(validCredentials.lastName, validCredentials.lastName);
      const email = registrationForm.generateEmail();
      registrationForm.inputValidSignUpEmail(email, email);
      registrationForm.inputInvalidSignUpPassword(invalidCredentials.passwordManySymbols);
      registrationForm.registrationFormClick();
      registrationForm.checkError(registrationForm.selectors.signUpPassword(), 'rgb(220, 53, 69)', 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
    });

    it('Registation with only capital symbols in the Password field', () => {
      registrationForm.checkAndClickSignUpButton();
      registrationForm.inputValidSignUpName(validCredentials.name, validCredentials.name);
      registrationForm.inputValidSignUpLastName(validCredentials.lastName, validCredentials.lastName);
      const email = registrationForm.generateEmail();
      registrationForm.inputValidSignUpEmail(email, email);
      registrationForm.inputInvalidSignUpPassword(invalidCredentials.passwordOnlyCapitalSymbols);
      registrationForm.registrationFormClick();
      registrationForm.checkError(registrationForm.selectors.signUpPassword(), 'rgb(220, 53, 69)', 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
    });

    it('Registation with only character symbols in the Password field', () => {
      registrationForm.checkAndClickSignUpButton();
      registrationForm.inputValidSignUpName(validCredentials.name, validCredentials.name);
      registrationForm.inputValidSignUpLastName(validCredentials.lastName, validCredentials.lastName);
      const email = registrationForm.generateEmail();
      registrationForm.inputValidSignUpEmail(email, email);
      registrationForm.inputInvalidSignUpPassword(invalidCredentials.passwordOnlyCharacters);
      registrationForm.registrationFormClick();
      registrationForm.checkError(registrationForm.selectors.signUpPassword(), 'rgb(220, 53, 69)', 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
    });

    it('Registation without capital characters in the Password field', () => {
      registrationForm.checkAndClickSignUpButton();
      registrationForm.inputValidSignUpName(validCredentials.name, validCredentials.name);
      registrationForm.inputValidSignUpLastName(validCredentials.lastName, validCredentials.lastName);
      const email = registrationForm.generateEmail();
      registrationForm.inputValidSignUpEmail(email, email);
      registrationForm.inputInvalidSignUpPassword(invalidCredentials.passwordWithoutCapitalSymbol);
      registrationForm.registrationFormClick();
      registrationForm.checkError(registrationForm.selectors.signUpPassword(), 'rgb(220, 53, 69)', 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
    });

    it('Registation with empty the Password field', () => {
      registrationForm.checkAndClickSignUpButton();
      registrationForm.inputValidSignUpName(validCredentials.name, validCredentials.name);
      registrationForm.inputValidSignUpLastName(validCredentials.lastName, validCredentials.lastName);
      const email = registrationForm.generateEmail();
      registrationForm.inputValidSignUpEmail(email, email);
      registrationForm.checkAndClearField(registrationForm.selectors.signUpPassword());
      registrationForm.registrationFormClick();
      registrationForm.checkError(registrationForm.selectors.signUpPassword(), 'rgb(220, 53, 69)', 'Password required');
    });
  });

  context('Registration with invalid data in the Re-enter password field', () => {
    it('Re-entered password does not match', () => {
      registrationForm.checkAndClickSignUpButton();
      registrationForm.inputValidSignUpName(validCredentials.name, validCredentials.name);
      registrationForm.inputValidSignUpLastName(validCredentials.lastName, validCredentials.lastName);
      const email = registrationForm.generateEmail();
      registrationForm.inputValidSignUpEmail(email, email);
      registrationForm.inputValidSignUpPassword(validCredentials.password, validCredentials.password);
      registrationForm.inputInvalidSignUpRepeatPassword(invalidCredentials.reenterpasswordInvalid);
      registrationForm.registrationFormClick();
      registrationForm.checkError(registrationForm.selectors.sigUpRepeatPassword(), 'rgb(220, 53, 69)', 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
    });

    it('Registration with empty the Re-entered password field', () => {
      registrationForm.checkAndClickSignUpButton();
      registrationForm.inputValidSignUpName(validCredentials.name, validCredentials.name);
      registrationForm.inputValidSignUpLastName(validCredentials.lastName, validCredentials.lastName);
      const email = registrationForm.generateEmail();
      registrationForm.inputValidSignUpEmail(email, email);
      registrationForm.inputValidSignUpPassword(validCredentials.password, validCredentials.password);
      registrationForm.checkAndClearField(registrationForm.selectors.sigUpRepeatPassword());
      registrationForm.registrationFormClick();
      registrationForm.checkError(registrationForm.selectors.sigUpRepeatPassword(), 'rgb(220, 53, 69)', 'Re-enter password required');
      registrationForm.selectors.closeRegistrationButton().click();
    });
  });
});
