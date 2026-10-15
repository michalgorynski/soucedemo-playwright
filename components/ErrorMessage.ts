import { type Page, type Locator } from '@playwright/test';

export class ErrorMessage {
  readonly message: Locator;

  constructor(page: Page) {
    this.message = page.getByTestId('error');
  }
}
