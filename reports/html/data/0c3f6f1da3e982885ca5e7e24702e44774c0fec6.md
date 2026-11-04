# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: auth\login.spec.js >> Authentication: login, logout and access control >> TC-AUTH-006 | AUTH-V06 | Verify that locked user cannot access the dashboard (UI and API)
- Location: tests\auth\login.spec.js:69:5

# Error details

```
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /\/login/
Received string:  "http://34.100.179.13:8081/change-password"
Timeout: 10000ms

Call log:
  - Expect "toHaveURL" with timeout 10000ms
    23 × locator resolved to <html lang="en">…</html>
       - unexpected value "http://34.100.179.13:8081/change-password"

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
  - link "Locked Agent":
    - /url: http://34.100.179.13:8081/profile
  - button "Logout"
- main:
  - alert: Please change your password before continuing.
  - heading "Change Password" [level=1]
  - paragraph: Your password must be changed before you continue.
  - text: Please change your password before continuing. Current Password
  - textbox "Current Password"
  - text: New Password
  - textbox "New Password"
  - text: Minimum 12 characters with uppercase, lowercase, digit, and special character. Confirm New Password
  - textbox "Confirm New Password"
  - button "Change Password"
  - button "Sign out"
- contentinfo: TalentFarm QA Automation Lab Insurance Order Entry Demo
```

# Test source

```ts
  1  | "use strict";
  2  | Object.defineProperty(exports, "__esModule", { value: true });
  3  | exports.LoginPage = void 0;
  4  | const { expect } = require("@playwright/test");
  5  | const { BasePage } = require("./BasePage");
  6  | const { disableBrowserValidation } = require("../utils/testHelpers");
  7  | /** /login, plus session checks (protected routes redirect here). */
  8  | class LoginPage extends BasePage {
  9  |     form;
  10 |     email;
  11 |     password;
  12 |     submitButton;
  13 |     constructor(page) {
  14 |         super(page);
  15 |         this.form = page.getByTestId('login-form');
  16 |         this.email = page.getByTestId('login-email-input');
  17 |         this.password = page.getByTestId('login-password-input');
  18 |         this.submitButton = page.getByTestId('login-submit-button');
  19 |     }
  20 |     async goto() {
  21 |         await this.page.goto('/login');
  22 |         await expect(this.form).toBeVisible();
  23 |     }
  24 |     async fillCredentials(email, password) {
  25 |         await this.email.fill(email);
  26 |         await this.password.fill(password);
  27 |     }
  28 |     async submit() {
  29 |         await this.submitButton.click();
  30 |     }
  31 |     async login(email, password) {
  32 |         await this.fillCredentials(email, password);
  33 |         await this.submit();
  34 |     }
  35 |     /** Full happy-path login: navigates, signs in and waits until the dashboard is shown. */
  36 |     async loginAndWait(email, password) {
  37 |         await this.goto();
  38 |         await this.login(email, password);
  39 |         await expect(this.page).not.toHaveURL(/\/login/);
  40 |     }
  41 |     async submitIgnoringBrowserValidation() {
  42 |         await disableBrowserValidation(this.page, 'login-form');
  43 |         await this.submit();
  44 |     }
  45 |     async expectOnLogin() {
> 46 |         await expect(this.page).toHaveURL(/\/login/);
     |                                 ^ Error: expect(page).toHaveURL(expected) failed
  47 |         await expect(this.form).toBeVisible();
  48 |     }
  49 |     async expectSessionBlocked(path) {
  50 |         await this.page.goto(path);
  51 |         await this.expectOnLogin();
  52 |     }
  53 | }
  54 | exports.LoginPage = LoginPage;
  55 | 
```