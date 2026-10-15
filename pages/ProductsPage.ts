import { type Page, type Locator } from '@playwright/test';

export class ProductsPage {
  readonly page: Page;

  readonly url = /inventory\.html/;

  readonly title: Locator;
  readonly cartLink: Locator;
  readonly productItems: Locator;
  readonly shoppingCartBadge: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.getByTestId('title');
    this.cartLink = page.getByTestId('shopping-cart-link');
    this.productItems = page.getByTestId('inventory-item');
    this.shoppingCartBadge = page.getByTestId('shopping-cart-badge');
  }

  private getProduct(productName: string): Locator {
    return this.productItems.filter({
      has: this.page.getByText(productName, { exact: true }),
    });
  }
  async addProductToCart(productName: string) {
    await this.getProduct(productName).getByRole('button', { name: 'Add to cart' }).click();
  }

  async removeProductFromCart(productName: string) {
    await this.getProduct(productName).getByRole('button', { name: 'Remove' }).click();
  }

  async openCart() {
    await this.cartLink.click();
  }
}
