# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api\api.spec.js >> API >> TC-API-004 | API-V04 | Verify that validate API reports beneficiary allocation errors
- Location: tests\api\api.spec.js:110:5

# Error details

```
TypeError: page.getByTestId is not a function
```

# Test source

```ts
  1  | "use strict";
  2  | Object.defineProperty(exports, "__esModule", { value: true });
  3  | exports.DashboardPage = void 0;
  4  | const { expect } = require("@playwright/test");
  5  | const { BasePage } = require("./BasePage");
  6  | const { firstInt, applicationIdFromUrl } = require("../utils/testHelpers");
  7  | /** /dashboard (latest 10 applications and status counters) and the start-new-application flow. */
  8  | class DashboardPage extends BasePage {
  9  |     root;
  10 |     newApplicationButton;
  11 |     table;
  12 |     emptyState;
  13 |     constructor(page) {
  14 |         super(page);
> 15 |         this.root = page.getByTestId('dashboard-page');
     |                          ^ TypeError: page.getByTestId is not a function
  16 |         this.newApplicationButton = page.getByTestId('dashboard-new-application-button');
  17 |         this.table = page.getByTestId('dashboard-applications-table');
  18 |         this.emptyState = page.getByTestId('dashboard-empty-state');
  19 |     }
  20 |     async goto() {
  21 |         await this.page.goto('/dashboard');
  22 |         await expect(this.root).toBeVisible();
  23 |     }
  24 |     summaryCard(key) {
  25 |         return this.page.getByTestId(`dashboard-summary-${key}`);
  26 |     }
  27 |     async summaryCount(key) {
  28 |         return firstInt(await this.summaryCard(key).innerText());
  29 |     }
  30 |     /** Application ids of the rows currently listed (the dashboard shows the latest 10). */
  31 |     async applicationIds() {
  32 |         const ids = await this.page
  33 |             .locator('[data-testid^="application-open-"]')
  34 |             .evaluateAll((els) => els.map((e) => e.getAttribute('data-testid') ?? ''));
  35 |         return ids.map((t) => Number(t.replace('application-open-', ''))).filter((n) => !Number.isNaN(n));
  36 |     }
  37 |     async statusOf(id) {
  38 |         return (await this.page.getByTestId(`application-status-${id}`).innerText()).trim();
  39 |     }
  40 |     async openApplication(id) {
  41 |         await this.page.getByTestId(`application-open-${id}`).click();
  42 |         await expect(this.page).toHaveURL(new RegExp(`/applications/${id}(\\b|/)`));
  43 |     }
  44 |     /** Dashboard -> Start New Application -> Create Draft. Returns the new application id. */
  45 |     async startNewApplication() {
  46 |         await this.newApplicationButton.click();
  47 |         await expect(this.page.getByTestId('application-start-page')).toBeVisible();
  48 |         await this.page.getByTestId('application-create-draft-button').click();
  49 |         await this.page.waitForURL(/\/applications\/\d+\/client/);
  50 |         return applicationIdFromUrl(this.page.url());
  51 |     }
  52 | }
  53 | exports.DashboardPage = DashboardPage;
  54 | 
```