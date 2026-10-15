import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';
import { credentials, products } from './test-data/data';

test('user can add and remove a product from the cart', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);
  const cartPage = new CartPage(page);

  const productName = products.backpack.name;

  await loginPage.open();
  await loginPage.login(credentials.standardUser.username, credentials.standardUser.password);

  await expect(page).toHaveURL(productsPage.url);
  await productsPage.addProductToCart(productName);
  await expect(productsPage.shoppingCartBadge).toHaveText('1');
  await productsPage.openCart();

  await expect(cartPage.title).toBeVisible();
  await expect(cartPage.getProduct(productName)).toBeVisible();

  await page.goBack();

  await expect(productsPage.title).toBeVisible();
  await productsPage.removeProductFromCart(productName);
  await expect(productsPage.shoppingCartBadge).toBeHidden();

  await productsPage.openCart();

  await expect(cartPage.title).toBeVisible();
  await expect(cartPage.getProduct(productName)).toHaveCount(0);
});
