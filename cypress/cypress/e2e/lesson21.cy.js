import { GarageForm } from '../support/poms/GarageForm';
import { RegistrationForm } from '../support/poms/RegistrationForm';
const validCredentials = require('../fixtures/validCredentials.json');

const garageForm = new GarageForm();
const registrationForm = new RegistrationForm();
let date = new Date().toISOString().slice(0, 10);

describe('My new tests', () => {
  beforeEach(() => {
    cy.visit('', {
      auth: {
        username: 'guest',
        password: 'welcome2qauto'
      }
    })
  });

  it('log in, add new car and catch response', function () {
    cy.url().should('eq', Cypress.config('baseUrl'));
    cy.login(Cypress.env('defaultUserEmail'), Cypress.env('defaultUserPassword'));
    cy.url().should('eq', Cypress.config('baseUrl') + 'panel/garage');
    cy.intercept('POST', '/api/cars').as('createNewCarResponse');
    garageForm.checkAndClickAddCarButton();
    garageForm.selectCarBrand(validCredentials.brand);
    garageForm.selectCarModel(validCredentials.model);
    garageForm.inputMileage(validCredentials.mileage);
    garageForm.checksAndClickAddButton();
    cy.wait('@createNewCarResponse').then(response => {
      expect(response.response.body.status).to.equal('ok');
      expect(response.response.statusCode).to.equal(201);
      cy.wrap(response.response.body.data.id).as('createdCarId');
      cy.readFile("cypress/fixtures/example.json").then((data) => {
        data.carId = this.createdCarId;
        cy.writeFile("cypress/fixtures/example.json", JSON.stringify(data))
      })
    });
  });

  it('log in, get car list and check car by id', function () {
    cy.request({
      method: 'POST',
      url: '/api/auth/signin',
      body: {
        email: Cypress.env('defaultUserEmail'),
        password: Cypress.env('defaultUserPassword'),
        remember: false
      }
    }).then(response => {
      expect(response.body.status).to.equal('ok');
      expect(response.status).to.equal(200);
    });

    cy.wait(1000);

    cy.request({
      method: 'GET',
      url: 'api/cars'
    }).then(response => {
      expect(response.body.status).to.equal('ok');
      expect(response.status).to.equal(200);           
      cy.fixture('example.json').then((data) => {
        const car = response.body.data.find(item => item.id === data.carId)
        expect(car.brand).to.equal(validCredentials.brand);
        expect(car.model).to.equal(validCredentials.model);
        expect(car.mileage).to.equal(validCredentials.mileage);
      });
    });
  });

  it('log in and create expense', function () {
    cy.request({
      method: 'POST',
      url: '/api/auth/signin',
      body: {
        email: Cypress.env('defaultUserEmail'),
        password: Cypress.env('defaultUserPassword'),
        remember: false
      }
    }).then(response => {
      expect(response.body.status).to.equal('ok');
      expect(response.status).to.equal(200);
    });

    cy.wait(1000);

    cy.fixture('example.json').then((data) => {
      cy.postExpense(data.carId, validCredentials.newMileage, validCredentials.numberOfLiters, validCredentials.totalCost, date);
    });
  });

  it('check added expense, delete added car and log out', () => {
    cy.url().should('eq', Cypress.config('baseUrl'));
    cy.login(Cypress.env('defaultUserEmail'), Cypress.env('defaultUserPassword'));
    cy.url().should('eq', Cypress.config('baseUrl') + 'panel/garage');
    garageForm.checkAndClickGarageButton();
    garageForm.checkAddedCarAndMileage(date);
    garageForm.deleteCarInGarage();
    registrationForm.logOut();
  });
});