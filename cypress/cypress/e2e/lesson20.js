import { GarageForm } from '../support/poms/GarageForm';
import { RegistrationForm } from '../support/poms/RegistrationForm';
import { ExpensesForm } from '../support/poms/ExpensesForm';
const validCredentials = require('../fixtures/validCredentials.json');

const garageForm = new GarageForm();
const registrationForm = new RegistrationForm();
const expenseForm = new ExpensesForm();
describe('My new tests', () => {
  beforeEach(() => {
    cy.visit('', {
      auth: {
        username: 'guest',
        password: 'welcome2qauto'
      }
    })
  });


  it('checks adding a new car ', () => {
    cy.url().should('eq', Cypress.config('baseUrl'));
    cy.login(Cypress.env('defaultUserEmail'), Cypress.env('defaultUserPassword'));
    cy.url().should('eq', Cypress.config('baseUrl') + 'panel/garage');
    garageForm.checkAndClickAddCarButton();
    garageForm.selectCarBrand(validCredentials.brand);
    garageForm.selectCarModel(validCredentials.model);
    garageForm.inputMileage(validCredentials.mileage);
    garageForm.checksAndClickAddButton();
    registrationForm.logOut();
  });

  it('checks adding expenses', () => {
    cy.url().should('eq', Cypress.config('baseUrl'));
    cy.login(Cypress.env('defaultUserEmail'), Cypress.env('defaultUserPassword'));
    cy.url().should('eq', Cypress.config('baseUrl') + 'panel/garage');
    expenseForm.checkAddFuelExpenseButtonAndClick();
    expenseForm.checkAddFuelExpensePopup();
    expenseForm.inputNewMileage(validCredentials.newMileage);
    expenseForm.inputNumberOfLiters(validCredentials.numberOfLiters);
    expenseForm.inputTotalCost(validCredentials.totalCost);
    expenseForm.checkAndClickAddExpenseButton();
    expenseForm.checkFuelExpensesTable();
    expenseForm.checkCarSelectDropdown();
    expenseForm.checkExpenseTableData();
    garageForm.deleteCarInGarage();
    registrationForm.logOut();
  });


});