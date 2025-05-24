const validCredentials = require('../../fixtures/validCredentials.json');
export class ExpensesForm {
  selectors = {
    addFuelExpense: () => cy.contains('button', 'Add fuel expense'),
    addFuelExpensePopup: () => cy.get('app-add-expense-modal'),
    inputMileageField: () => cy.get('input[id="addExpenseMileage"]'),
    numberOfLiters: () => cy.get('input[id="addExpenseLiters"]'),
    totalCost: () => cy.get('input[id="addExpenseTotalCost"]'),
    fuelExpensesTable: () => cy.get('table[class="table expenses_table"]'),
    carSelectDropdown: () => cy.get('button[id="carSelectDropdown"]'),
    addExpenseButton: () => cy.get('app-add-expense-modal button[class="btn btn-primary"]'),
    tableBody: () => cy.get('table[class="table expenses_table"] tbody tr')
  };

  checkAddFuelExpenseButtonAndClick() {
    this.selectors.addFuelExpense().should('be.visible').should('be.enabled').click();
  };

  checkAddFuelExpensePopup() {
    this.selectors.addFuelExpensePopup().should('be.visible');
  };

  inputNewMileage(newMileage) {
    this.selectors.inputMileageField().clear().type(newMileage).should('have.value', newMileage);
  };

  inputNumberOfLiters(numberOfLiters) {
    this.selectors.numberOfLiters().clear().type(numberOfLiters).should('have.value', numberOfLiters);
  };

  inputTotalCost(totalCost) {
    this.selectors.totalCost().clear().type(totalCost).should('have.value', totalCost);
  };

  checkAndClickAddExpenseButton() {
    this.selectors.addExpenseButton().should('be.visible').should('be.enabled').click();
  };

  checkFuelExpensesTable() {
    this.selectors.fuelExpensesTable().should('be.visible');
  };

  checkCarSelectDropdown() {
    this.selectors.carSelectDropdown().should('have.text', `${validCredentials.brand} ${validCredentials.model}`);
  };
  checkExpenseTableData() {
    this.selectors.tableBody().eq(0).find('td').eq(2).should('have.text', `${validCredentials.numberOfLiters}L`);
  }


}