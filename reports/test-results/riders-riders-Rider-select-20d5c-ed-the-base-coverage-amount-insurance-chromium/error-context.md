# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: riders\riders.spec.js >> Rider selection >> TC-RID-002 | RIDER-V02 | Verify that rider coverage cannot exceed the base coverage amount
- Location: tests\riders\riders.spec.js:52:5

# Error details

```
Error: validation alert

expect(locator).toBeVisible() failed

Locator: getByTestId('validation-error-alert')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - validation alert getByTestId('validation-error-alert') with timeout 10000ms
  - waiting for getByTestId('validation-error-alert')

```

```yaml
- navigation:
  - link "Insurance Order Entry Demo Platform QA Automation Training App":
    - /url: http://34.100.179.13:8081/dashboard
  - list:
    - listitem:
      - link "Dashboard":
        - /url: http://34.100.179.13:8081/dashboard
    - listitem:
      - link "Applications":
        - /url: http://34.100.179.13:8081/applications
    - listitem:
      - link "Products":
        - /url: http://34.100.179.13:8081/products
    - listitem:
      - link "Support":
        - /url: http://34.100.179.13:8081/support
  - link "Learner Agent 001":
    - /url: http://34.100.179.13:8081/profile
  - button "Logout"
- main:
  - link "← Back to Product Configuration":
    - /url: http://34.100.179.13:8081/applications/437/product
  - link "Application Summary":
    - /url: http://34.100.179.13:8081/applications/437
  - text: "Application #437"
  - heading "Riders" [level=1]
  - paragraph: Select optional rider benefits for the policy.
  - text: "Current rider premium: $0.00"
  - table:
    - rowgroup:
      - row "Select Rider Description Benefit Amount":
        - columnheader "Select"
        - columnheader "Rider"
        - columnheader "Description"
        - columnheader "Benefit Amount"
    - rowgroup:
      - row "Accidental Death Benefit Rider Pays additional benefit if death is due to accident.":
        - cell:
          - checkbox [checked]
        - cell "Accidental Death Benefit Rider"
        - cell "Pays additional benefit if death is due to accident."
        - cell:
          - spinbutton "$50,000": "250001"
      - row "Permanent Disability Rider Provides lump sum or income on total permanent disability.":
        - cell:
          - checkbox
        - cell "Permanent Disability Rider"
        - cell "Provides lump sum or income on total permanent disability."
        - cell:
          - spinbutton "$50,000"
      - row "Term Rider Add-on Additional term coverage layered on top of the Whole Life base product.":
        - cell:
          - checkbox
        - cell "Term Rider Add-on"
        - cell "Additional term coverage layered on top of the Whole Life base product."
        - cell:
          - spinbutton "$50,000"
      - row "Critical Illness Rider Pays lump sum on diagnosis of covered critical illness.":
        - cell:
          - checkbox
        - cell "Critical Illness Rider"
        - cell "Pays lump sum on diagnosis of covered critical illness."
        - cell:
          - spinbutton "$50,000"
      - row "Hospital Cash Rider Pays daily cash benefit during hospitalization.":
        - cell:
          - checkbox
        - cell "Hospital Cash Rider"
        - cell "Pays daily cash benefit during hospitalization."
        - cell:
          - spinbutton "$50,000"
      - row "Waiver of Premium - Disability Waives future premiums if insured becomes totally disabled.":
        - cell:
          - checkbox
        - cell "Waiver of Premium - Disability"
        - cell "Waives future premiums if insured becomes totally disabled."
        - cell:
          - spinbutton "$50,000"
      - row "Waiver of Premium - Critical Illness Waives future premiums upon diagnosis of covered critical illness.":
        - cell:
          - checkbox
        - cell "Waiver of Premium - Critical Illness"
        - cell "Waives future premiums upon diagnosis of covered critical illness."
        - cell:
          - spinbutton "$50,000"
      - row "Family Income Benefit Rider Provides monthly income to family for a defined period after insured death.":
        - cell:
          - checkbox
        - cell "Family Income Benefit Rider"
        - cell "Provides monthly income to family for a defined period after insured death."
        - cell:
          - spinbutton "$50,000"
      - row "Guaranteed Income Rider Provides guaranteed periodic income for a set duration.":
        - cell:
          - checkbox
        - cell "Guaranteed Income Rider"
        - cell "Provides guaranteed periodic income for a set duration."
        - cell:
          - spinbutton "$50,000"
  - button "Save and Continue"
- contentinfo: TalentFarm QA Automation Lab Insurance Order Entry Demo
```

# Test source

```ts
  1  | "use strict";
  2  | Object.defineProperty(exports, "__esModule", { value: true });
  3  | exports.BasePage = void 0;
  4  | const { expect } = require("@playwright/test");
  5  | /** Shared behaviour: alerts, navigation and the helpers used by every page object. */
  6  | class BasePage {
  7  |     page;
  8  |     constructor(page) {
  9  |         this.page = page;
  10 |     }
  11 |     get validationAlert() {
  12 |         return this.page.getByTestId('validation-error-alert');
  13 |     }
  14 |     get statusAlert() {
  15 |         return this.page.getByTestId('status-alert');
  16 |     }
  17 |     /** Messages in the red "Please review the following" alert (empty list when there is none). */
  18 |     async errorMessages() {
  19 |         if ((await this.validationAlert.count()) === 0)
  20 |             return [];
  21 |         return (await this.validationAlert.locator('li').allInnerTexts()).map((t) => t.trim()).filter(Boolean);
  22 |     }
  23 |     async expectErrorMatching(pattern) {
> 24 |         await expect(this.validationAlert, 'validation alert').toBeVisible();
     |                                                                ^ Error: validation alert
  25 |         await expect(this.validationAlert).toContainText(pattern);
  26 |     }
  27 |     async expectNoErrors() {
  28 |         await expect(this.validationAlert).toHaveCount(0);
  29 |     }
  30 |     async logout() {
  31 |         await this.page.getByTestId('nav-logout-button').click();
  32 |     }
  33 |     async expectPath(pattern) {
  34 |         await expect(this.page).toHaveURL(pattern);
  35 |     }
  36 | }
  37 | exports.BasePage = BasePage;
  38 | 
```