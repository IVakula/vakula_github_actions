Cypress.Commands.add('login', (email, password) => {
  cy.contains('button', 'Sign In').click();
  cy.get('form input[name="email"]').type(email);
  cy.get('form input[name="password"]').type(password, { sensitive: true });
  cy.contains('button', 'Login').click()
});

Cypress.Commands.overwrite('type', (originalFn, element, text, options) => {
  if (options && options.sensitive) {
    // turn off original log
    options.log = false
    // create our own log with masked message
    Cypress.log({
      $el: element,
      name: 'type',
      message: '*'.repeat(text.length),
    })
  };
  return originalFn(element, text, options);
});

Cypress.Commands.add('postExpense', (carId, mileage, numberOfLiters, totalCost, date) => {
  //let today = new Date().toISOString().slice(0, 10);
  cy.request({
    method: 'POST',
    url: 'api/expenses',
    body: {
      "carId": carId,
      "reportedAt": date,
      "mileage": mileage,
      "liters": numberOfLiters,
      "totalCost": totalCost,
      "forceMileage": false
    }
  }).then(response => {
    expect(response.body.status).to.equal('ok');
    expect(response.status).to.equal(200);
    expect(response.body.data.carId).to.exist;
    expect(response.body.data.carId).to.equal(carId);
    expect(response.body.data.mileage).to.exist;
    expect(response.body.data.mileage).to.equal(mileage);
    expect(response.body.data.liters).to.exist;
    expect(response.body.data.liters).to.equal(numberOfLiters);
    expect(response.body.data.reportedAt).to.exist;
    expect(response.body.data.reportedAt).to.equal(date);
    expect(response.body.data.totalCost).to.exist;
    expect(response.body.data.totalCost).to.equal(totalCost);
  });
});
