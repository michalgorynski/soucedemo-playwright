import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { ErrorMessage } from '../components/ErrorMessage';
import { credentials, customer, products } from './test-data/data';
import { calculateOrderTotals } from '../utils/pricing';

test('user can complete a purchase', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  const productName = products.backpack.name;

  await loginPage.open();
  await loginPage.login(credentials.standardUser.username, credentials.standardUser.password);

  await expect(productsPage.title).toBeVisible();
  await productsPage.addProductToCart(productName);
  await productsPage.openCart();

  await expect(cartPage.title).toBeVisible();
  await expect(cartPage.getProduct(productName)).toBeVisible();
  await cartPage.proceedToCheckout();

  await expect(page).toHaveURL(checkoutPage.informationUrl);
  await checkoutPage.fillCustomerInformation(
    customer.firstName,
    customer.lastName,
    customer.postalCode,
  );
  await checkoutPage.continueToOverview();
  await expect(page).toHaveURL(checkoutPage.overviewUrl);
  await expect(checkoutPage.getProduct(productName)).toBeVisible();
  await checkoutPage.finishOrder();
  await expect(page).toHaveURL(checkoutPage.completeUrl);
  await expect(checkoutPage.confirmationMessage).toBeVisible();
  await expect(checkoutPage.confirmationMessage).toHaveText('Thank you for your order!');
});

test('checkout requires customer information', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);
  const errorMessage = new ErrorMessage(page);

  const productName = products.bikeLight.name;

  await loginPage.open();
  await loginPage.login(credentials.standardUser.username, credentials.standardUser.password);

  await productsPage.addProductToCart(productName);
  await productsPage.openCart();
  await cartPage.proceedToCheckout();

  await checkoutPage.continueToOverview();

  await expect(errorMessage.message).toBeVisible();
  await expect(errorMessage.message).toContainText('First Name is required');
});

test('order summary displays correct prices and totals', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  await loginPage.open();
  await loginPage.login(credentials.standardUser.username, credentials.standardUser.password);

  await productsPage.addProductToCart(products.backpack.name);
  await productsPage.addProductToCart(products.bikeLight.name);
  await productsPage.openCart();

  await cartPage.proceedToCheckout();

  await checkoutPage.fillCustomerInformation(
    customer.firstName,
    customer.lastName,
    customer.postalCode,
  );
  await checkoutPage.continueToOverview();

  const { itemTotal, tax, total } = calculateOrderTotals(
    [products.backpack.price, products.bikeLight.price],
    0.08,
  );

  await expect(checkoutPage.itemTotal).toContainText(itemTotal.toFixed(2));
  await expect(checkoutPage.tax).toContainText(tax.toFixed(2));
  await expect(checkoutPage.total).toContainText(total.toFixed(2));
});
