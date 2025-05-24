const validCredentials = require('../../fixtures/validCredentials.json');

export class GarageForm {
  selectors = {
    addCarButton: () => cy.get('app-garage button[class="btn btn-primary"]'),
    carBrand: () => cy.get('select[id="addCarBrand"]'),
    carModel: () => cy.get('select[id="addCarModel"]'),
    carMileage: () => cy.get('input[id="addCarMileage"]'),
    popupAddButton: () => cy.get('app-add-car-modal button[class="btn btn-primary"]'),
    garageButton: () => cy.get('a[routerlink="garage"]'),
    carInGarage: () => cy.get('div[class="car jumbotron"]'),
    editCarButton: () => cy.get('button[class="car_edit btn btn-edit"]'),
    removeCarButton: () => cy.contains('button', 'Remove car'),
    removeButton: () => cy.get('button[class="btn btn-danger"]'),
    addedCarName: () => cy.get('app-car div p[class="car_name h2"]'),
    inputMileage: () => cy.get('input[class*="update-mileage-form_input"]'),
    updateMileage: () => cy.get('app-garage p[class="car_update-mileage"]')
  };

  checkAndClickAddCarButton() {
    this.selectors.addCarButton().should('be.visible').should('be.enabled').click();
  };

  selectCarBrand(brand) {
    this.selectors.carBrand().select(brand);
  };

  selectCarModel(model) {
    this.selectors.carModel().select(model);
  };

  inputMileage(mileage) {
    this.selectors.carMileage().type(mileage);
  };

  checksAndClickAddButton() {
    this.selectors.popupAddButton().should('be.enabled').should('be.visible').click();
  };

  deleteCarInGarage() {
    this.selectors.garageButton().should('be.visible').click();
    this.selectors.editCarButton().should('be.enabled').click();
    this.selectors.removeCarButton().should('be.enabled').click();
    this.selectors.removeButton().should('be.enabled').click();
  };

  checkAndClickGarageButton() {
    this.selectors.garageButton().should('be.visible').click();
  };
    
  checkAddedCarAndMileage(date){
    this.selectors.addedCarName().should('have.text',`${validCredentials.brand} ${validCredentials.model}`);
    this.selectors.inputMileage().should('have.value',`${validCredentials.newMileage}`);
    const dateArray = date.split("-");
    const newFormatDate = `${dateArray[2]}.${dateArray[1]}.${dateArray[0]}`;
    this.selectors.updateMileage().should('contain.text',newFormatDate);
  }
}