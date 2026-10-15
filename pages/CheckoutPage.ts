import { type Page, type Locator } from '@playwright/test';

export class CheckoutPage {
  readonly page: Page;

  readonly informationUrl = /checkout-step-one\.html/;
  readonly overviewUrl = /checkout-step-two\.html/;
  readonly completeUrl = /checkout-complete\.html/;

  // Checkout - Your Information (Step 1)
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;

  // Checkout - Overview (Step 2)
  readonly itemTotal: Locator;
  readonly tax: Locator;
  readonly total: Locator;
  readonly finishButton: Locator;

  // Checkout - Complete (Step 3)
  readonly confirmationMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    // Checkout - Your Information (Step 1)
    this.firstNameInput = page.getByTestId('firstName');
    this.lastNameInput = page.getByTestId('lastName');
    this.postalCodeInput = page.getByTestId('postalCode');
    this.continueButton = page.getByRole('button', { name: 'Continue' });

    // Checkout - Overview (Step 2)
    this.itemTotal = page.getByTestId('subtotal-label');
    this.tax = page.getByTestId('tax-label');
    this.total = page.getByTestId('total-label');
    this.finishButton = page.getByRole('button', { name: 'Finish' });

    // Checkout - Complete (Step 3)
    this.confirmationMessage = page.getByTestId('complete-header');
  }

  // Checkout - Your Information (Step 1)
  async fillCustomerInformation(firstName: string, lastName: string, postalCode: string) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  async continueToOverview() {
    await this.continueButton.click();
  }

  // Checkout - Overview (Step 2)
  async finishOrder() {
    await this.finishButton.click();
  }
}
