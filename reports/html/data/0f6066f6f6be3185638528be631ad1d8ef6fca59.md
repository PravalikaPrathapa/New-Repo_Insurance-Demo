# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: product-selection\product-selection.spec.js >> Product selection and policy configuration >> TC-PROD-004 | PROD-V04 | Verify that coverage amount above the maximum is blocked
- Location: tests\product-selection\product-selection.spec.js:60:5

# Error details

```
Error: No option matching Guaranteed Return Whole Life. Options: Select product | Elite Legacy Whole Life | FlexiPay Whole Life | SecureLife Whole Life | WealthBuilder Whole Life
```

# Page snapshot

```yaml
- generic [active] [ref=f22e1]:
  - navigation [ref=f22e2]:
    - generic [ref=f22e3]:
      - link "Insurance Order Entry Demo Platform QA Automation Training App" [ref=f22e4] [cursor=pointer]:
        - /url: http://34.100.172.19:8081/dashboard
        - generic [aria-hidden] [ref=f22e5]: IO
        - generic [ref=f22e6]:
          - generic [ref=f22e7]: Insurance Order Entry Demo Platform
          - generic [ref=f22e8]: QA Automation Training App
      - generic [ref=f22e9]:
        - list [ref=f22e10]:
          - listitem [ref=f22e11]:
            - link "Dashboard" [ref=f22e12] [cursor=pointer]:
              - /url: http://34.100.172.19:8081/dashboard
          - listitem [ref=f22e13]:
            - link "Applications" [ref=f22e14] [cursor=pointer]:
              - /url: http://34.100.172.19:8081/applications
          - listitem [ref=f22e15]:
            - link "Products" [ref=f22e16] [cursor=pointer]:
              - /url: http://34.100.172.19:8081/products
          - listitem [ref=f22e17]:
            - link "Support" [ref=f22e18] [cursor=pointer]:
              - /url: http://34.100.172.19:8081/support
        - generic [ref=f22e19]:
          - link "Valid Agent" [ref=f22e20] [cursor=pointer]:
            - /url: http://34.100.172.19:8081/profile
          - button "Logout" [ref=f22e22] [cursor=pointer]
  - main [ref=f22e23]:
    - generic [ref=f22e25]:
      - link "← Back to KYC & Financial" [ref=f22e26] [cursor=pointer]:
        - /url: http://34.100.172.19:8081/applications/143/kyc-financial
      - link "Application Summary" [ref=f22e27] [cursor=pointer]:
        - /url: http://34.100.172.19:8081/applications/143
    - generic [ref=f22e28]:
      - generic [ref=f22e30]:
        - generic [ref=f22e31]: "Application #143"
        - heading "Product & Policy Configuration" [level=1] [ref=f22e32]
        - paragraph [ref=f22e33]: Select the product, sum assured, premium payment frequency, premium payment term, and coverage term.
      - generic [ref=f22e36]:
        - generic [ref=f22e37]:
          - generic [ref=f22e38]:
            - generic [ref=f22e39]: Product
            - combobox "Product" [ref=f22e40]:
              - option "Select product"
              - option "Elite Legacy Whole Life"
              - option "FlexiPay Whole Life" [selected]
              - option "SecureLife Whole Life"
              - option "WealthBuilder Whole Life"
            - generic [ref=f22e41]: "Allowed Sum Assured: $100,000.00 to $1,200,000.00"
          - generic [ref=f22e42]:
            - generic [ref=f22e43]: Sum Assured
            - spinbutton "Sum Assured" [ref=f22e44]: "1200000.00"
          - generic [ref=f22e45]:
            - generic [ref=f22e46]: Premium Payment Frequency
            - combobox "Premium Payment Frequency" [ref=f22e47]:
              - option "Monthly" [selected]
              - option "Quarterly"
              - option "Semi-Annual"
              - option "Annual"
          - generic [ref=f22e48]:
            - generic [ref=f22e49]: Premium Payment Term
            - combobox "Premium Payment Term" [ref=f22e50]:
              - option "Select term"
              - option "10 years"
              - option "15 years"
              - option "20 years" [selected]
              - option "25 years"
              - option "30 years"
          - generic [ref=f22e51]:
            - generic [ref=f22e52]: Coverage Term
            - combobox "Coverage Term" [ref=f22e53]:
              - option "Whole Life" [selected]
              - option "To Age 100"
        - generic [ref=f22e55]:
          - generic [ref=f22e56]: Estimated Total Modal Premium
          - generic [ref=f22e57]: $515.00
          - generic [ref=f22e58]: Estimated premium will be saved when you continue.
        - button "Save and Continue" [ref=f22e60] [cursor=pointer]
  - contentinfo [ref=f22e61]:
    - generic [ref=f22e62]:
      - generic [ref=f22e63]: TalentFarm QA Automation Lab
      - generic [ref=f22e64]: Insurance Order Entry Demo
```

# Test source

```ts
  1  | "use strict";
  2  | Object.defineProperty(exports, "__esModule", { value: true });
  3  | exports.range = exports.withDialogs = exports.optionValues = exports.selectByText = exports.isNativelyInvalid = exports.disableBrowserValidation = exports.applicationIdFromUrl = exports.firstInt = exports.parseMoney = void 0;
  4  | /** "$1,234.56" -> 1234.56 */
  5  | function parseMoney(text) {
  6  |     const cleaned = (text ?? '').replace(/[^0-9.\-]/g, '');
  7  |     const n = Number(cleaned);
  8  |     if (Number.isNaN(n))
  9  |         throw new Error(`Cannot parse money from "${text}"`);
  10 |     return n;
  11 | }
  12 | exports.parseMoney = parseMoney;
  13 | /** First integer in a text such as "Draft 3" -> 3 */
  14 | function firstInt(text) {
  15 |     const m = (text ?? '').match(/\d+/);
  16 |     if (!m)
  17 |         throw new Error(`No number in "${text}"`);
  18 |     return Number(m[0]);
  19 | }
  20 | exports.firstInt = firstInt;
  21 | function applicationIdFromUrl(url) {
  22 |     const m = url.match(/\/applications\/(\d+)/);
  23 |     if (!m)
  24 |         throw new Error(`No application id in URL ${url}`);
  25 |     return Number(m[1]);
  26 | }
  27 | exports.applicationIdFromUrl = applicationIdFromUrl;
  28 | /**
  29 |  * The forms use HTML "required" attributes, so the browser blocks blank submissions before the server sees them.
  30 |  * This switches browser validation off so server-side validation messages can be tested.
  31 |  */
  32 | async function disableBrowserValidation(page, formTestId) {
  33 |     await page.getByTestId(formTestId).evaluate((form) => {
  34 |         form.noValidate = true;
  35 |     });
  36 | }
  37 | exports.disableBrowserValidation = disableBrowserValidation;
  38 | /** True if the browser itself reports the field as invalid (e.g. required but empty). */
  39 | async function isNativelyInvalid(field) {
  40 |     return field.evaluate((el) => !el.checkValidity());
  41 | }
  42 | exports.isNativelyInvalid = isNativelyInvalid;
  43 | /** Selects the first <option> whose text matches (the Product dropdown shows names, values are ids). */
  44 | async function selectByText(select, pattern) {
  45 |     const options = await select.locator('option').evaluateAll((els) => els.map((e) => ({ value: e.value, text: (e.textContent ?? '').trim() })));
  46 |     const match = options.find((o) => (typeof pattern === 'string' ? o.text.includes(pattern) : pattern.test(o.text)));
  47 |     if (!match)
> 48 |         throw new Error(`No option matching ${pattern}. Options: ${options.map((o) => o.text).join(' | ')}`);
     |               ^ Error: No option matching Guaranteed Return Whole Life. Options: Select product | Elite Legacy Whole Life | FlexiPay Whole Life | SecureLife Whole Life | WealthBuilder Whole Life
  49 |     await select.selectOption(match.value);
  50 |     return match.text;
  51 | }
  52 | exports.selectByText = selectByText;
  53 | async function optionValues(select) {
  54 |     return select.locator('option').evaluateAll((els) => els.map((e) => e.value));
  55 | }
  56 | exports.optionValues = optionValues;
  57 | /** Runs `action` while answering any browser alert()/confirm() dialogs; returns the dialog messages. */
  58 | async function withDialogs(page, action, decision = 'accept') {
  59 |     const messages = [];
  60 |     const handler = async (d) => {
  61 |         messages.push(d.message());
  62 |         if (decision === 'accept')
  63 |             await d.accept();
  64 |         else
  65 |             await d.dismiss();
  66 |     };
  67 |     page.on('dialog', handler);
  68 |     try {
  69 |         await action();
  70 |     }
  71 |     finally {
  72 |         page.off('dialog', handler);
  73 |     }
  74 |     return messages;
  75 | }
  76 | exports.withDialogs = withDialogs;
  77 | function range(n) {
  78 |     return Array.from({ length: n }, (_, i) => i);
  79 | }
  80 | exports.range = range;
  81 | 
```