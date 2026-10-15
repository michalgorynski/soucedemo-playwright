import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { ErrorMessage } from '../components/ErrorMessage';
import { credentials } from './test-data/data';

test('user can log in successfully', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);

  await loginPage.open();
  await loginPage.login(credentials.standardUser.username, credentials.standardUser.password);
  await expect(page).toHaveURL(productsPage.url);
  await expect(productsPage.title).toBeVisible();
});

test('login fails with invalid credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const errorMessage = new ErrorMessage(page);

  await loginPage.open();
  await loginPage.login(credentials.invalidUser.username, credentials.invalidUser.password);
  await expect(errorMessage.message).toBeVisible();
  await expect(errorMessage.message).toContainText('Username and password do not match');
});
