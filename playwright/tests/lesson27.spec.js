import { expect, test } from '../fixtures/userGaragePage.fixure.js';
import { validAddingCar } from '../credentials/validCredentials.js';


test.describe('FIXTURE_BASED: Garage page tests', {
  tag: ['@garage-setup'],
},
() => {
  test('Can add new car',
    {
      tag: '@garage-setup',
    }, async({ garagePage }) => {
      await test.step('Add new car', async() => {
        await garagePage.checkButtonAddCarAndClick();
        await garagePage.selectBrand(validAddingCar.brand);
        await garagePage.selectModel(validAddingCar.model);
        await garagePage.checkAndInputMileage(validAddingCar.mileage);
        await garagePage.checkAndClickPopupAddCarButton();
        await garagePage.checkAddedCar();
        await garagePage.checkAddedCarName(`${validAddingCar.brand} ${validAddingCar.model}`);

        expect(true).toBeTruthy();
      });

    });
});