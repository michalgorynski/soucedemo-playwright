# SauceDemo Playwright Tests

An end-to-end test suite for [SauceDemo](https://www.saucedemo.com/) built with Playwright Test and TypeScript.

The project demonstrates UI-based testing of login, shopping cart, and checkout flows, including negative scenarios and order-total verification.

## Tech stack

- [Playwright Test](https://playwright.dev/docs/intro)
- TypeScript
- Node.js and npm
- Prettier

## Prerequisites

- Node.js 20 or newer
- npm

## Setup

Clone the repository and install dependencies:

```bash
git clone https://github.com/michalgorynski/soucedemo-playwright.git
cd soucedemo-playwright
npm install
```

The `postinstall` script installs the Chromium browser used by the Playwright configuration. You should not need to install it separately.

## Running tests

Run the full test suite:

```bash
npm test
```

Open Playwright UI mode:

```bash
npm run test:ui
```

Run tests with a visible browser:

```bash
npm run test:headed
```

Run tests in debug mode:

```bash
npm run test:debug
```

## Code quality

Check TypeScript types without generating output files:

```bash
npm run typecheck
```

Check code formatting:

```bash
npm run format:check
```

Format project files with Prettier:

```bash
npm run format
```

## Test coverage

The suite currently covers:

- Successful login with valid credentials
- Rejection of invalid login credentials
- Adding and removing a product from the cart
- Completing the checkout flow and verifying the confirmation message
- Checkout validation when required customer information is missing
- Verifying item subtotal, tax, and final order total

## Project structure

```text
soucedemo-playwright/
├── components/
│   └── ErrorMessage.ts
├── pages/
│   ├── CartPage.ts
│   ├── CheckoutPage.ts
│   ├── LoginPage.ts
│   └── ProductsPage.ts
├── tests/
│   ├── test-data/
│   │   └── data.ts
│   ├── cart.spec.ts
│   ├── checkout.spec.ts
│   └── login.spec.ts
├── utils/
│   └── pricing.ts
├── playwright.config.ts
├── tsconfig.json
├── package.json
├── package-lock.json
└── README.md
```

## Design decisions

- **Page Object Model (POM):** page-specific locators and user actions are grouped into page classes.
- **Reusable component:** the error message locator is encapsulated in `components/ErrorMessage.ts`.
- **Centralized test data:** credentials, customer information, and product data are stored in `tests/test-data/data.ts`.
- **Explicit assertions:** test expectations remain in test files, separate from page interactions.
- **Playwright test IDs:** `getByTestId()` uses the application's `data-test` attributes, configured in `playwright.config.ts`.
- **Order-total verification:** expected subtotal, tax, and total are calculated by a helper in `utils/pricing.ts`.

## Notes

- The tests use the public SauceDemo demo application and its standard test account.
- Test results and HTML reports are generated locally by Playwright and should not be committed.

## HTML report

After a test run, open the HTML report with:

```bash
npx playwright show-report
```
