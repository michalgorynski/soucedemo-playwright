import { type Page, type Locator } from '@playwright/test';

export class CartPage {
  readonly page: Page;

  readonly url = /cart\.html/;

  readonly title: Locator;
  readonly checkoutButton: Locator;
  readonly cartItems: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.getByTestId('title');
    this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
    this.cartItems = page.getByTestId('inventory-item');
  }

  getProduct(productName: string): Locator {
    return this.cartItems.filter({
      has: this.page.getByText(productName, { exact: true }),
    });
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }
}
