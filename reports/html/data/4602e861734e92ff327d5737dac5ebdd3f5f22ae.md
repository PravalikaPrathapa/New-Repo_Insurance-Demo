# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: product-selection\product-selection.spec.js >> Product selection and policy configuration >> TC-PROD-001 | PROD-V01 | Verify that catalog displays the expected Whole Life products
- Location: tests\product-selection\product-selection.spec.js:32:5

# Error details

```
Error: seeded products missing from the catalog

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 3

- Array []
+ Array [
+   "WL_GUARANTEED_RETURN",
+ ]
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - navigation [ref=e2]:
    - generic [ref=e3]:
      - link "Insurance Order Entry Demo Platform QA Automation Training App" [ref=e4] [cursor=pointer]:
        - /url: http://34.100.179.13:8081/dashboard
        - generic [aria-hidden] [ref=e5]: IO
        - generic [ref=e6]:
          - generic [ref=e7]: Insurance Order Entry Demo Platform
          - generic [ref=e8]: QA Automation Training App
      - generic [ref=e9]:
        - list [ref=e10]:
          - listitem [ref=e11]:
            - link "Dashboard" [ref=e12] [cursor=pointer]:
              - /url: http://34.100.179.13:8081/dashboard
          - listitem [ref=e13]:
            - link "Applications" [ref=e14] [cursor=pointer]:
              - /url: http://34.100.179.13:8081/applications
          - listitem [ref=e15]:
            - link "Products" [ref=e16] [cursor=pointer]:
              - /url: http://34.100.179.13:8081/products
          - listitem [ref=e17]:
            - link "Support" [ref=e18] [cursor=pointer]:
              - /url: http://34.100.179.13:8081/support
        - generic [ref=e19]:
          - link "Learner Agent 001" [ref=e20] [cursor=pointer]:
            - /url: http://34.100.179.13:8081/profile
          - button "Logout" [ref=e22] [cursor=pointer]
  - main [ref=e23]:
    - generic [ref=e24]:
      - heading "Whole Life Product Catalog" [level=1] [ref=e25]
      - paragraph [ref=e26]: Use these products while configuring an insurance application.
    - generic [ref=e27]:
      - generic [ref=e30]:
        - generic [ref=e31]: WL_ELITE_LEGACY
        - heading "Elite Legacy Whole Life" [level=2] [ref=e32]
        - paragraph [ref=e33]: High-net-worth offering for estate planning and tax efficiency.
        - generic [ref=e34]:
          - term [ref=e35]: Age
          - definition [ref=e36]: 30 - 65
          - term [ref=e37]: Sum Assured
          - definition [ref=e38]: 500,000 - 5,000,000
          - term [ref=e39]: Rate / 1000
          - definition [ref=e40]: "6.1000"
        - link "View Details" [ref=e41] [cursor=pointer]:
          - /url: http://34.100.179.13:8081/products/3
      - generic [ref=e44]:
        - generic [ref=e45]: WL_FLEXI_PAY
        - heading "FlexiPay Whole Life" [level=2] [ref=e46]
        - paragraph [ref=e47]: Flexible premium payment options with adjustable premiums.
        - generic [ref=e48]:
          - term [ref=e49]: Age
          - definition [ref=e50]: 19 - 62
          - term [ref=e51]: Sum Assured
          - definition [ref=e52]: 100,000 - 1,200,000
          - term [ref=e53]: Rate / 1000
          - definition [ref=e54]: "5.1500"
        - link "View Details" [ref=e55] [cursor=pointer]:
          - /url: http://34.100.179.13:8081/products/4
      - generic [ref=e58]:
        - generic [ref=e59]: WL_SECURE_BASIC
        - heading "SecureLife Whole Life" [level=2] [ref=e60]
        - paragraph [ref=e61]: Basic lifelong coverage with fixed premium and guaranteed death benefit.
        - generic [ref=e62]:
          - term [ref=e63]: Age
          - definition [ref=e64]: 18 - 65
          - term [ref=e65]: Sum Assured
          - definition [ref=e66]: 100,000 - 1,000,000
          - term [ref=e67]: Rate / 1000
          - definition [ref=e68]: "4.7500"
        - link "View Details" [ref=e69] [cursor=pointer]:
          - /url: http://34.100.179.13:8081/products/1
      - generic [ref=e72]:
        - generic [ref=e73]: WL_WEALTH_BUILDER
        - heading "WealthBuilder Whole Life" [level=2] [ref=e74]
        - paragraph [ref=e75]: Growth and protection product with cash value accumulation.
        - generic [ref=e76]:
          - term [ref=e77]: Age
          - definition [ref=e78]: 21 - 60
          - term [ref=e79]: Sum Assured
          - definition [ref=e80]: 150,000 - 1,500,000
          - term [ref=e81]: Rate / 1000
          - definition [ref=e82]: "5.3500"
        - link "View Details" [ref=e83] [cursor=pointer]:
          - /url: http://34.100.179.13:8081/products/2
  - contentinfo [ref=e84]:
    - generic [ref=e85]:
      - generic [ref=e86]: TalentFarm QA Automation Lab
      - generic [ref=e87]: Insurance Order Entry Demo
```

# Test source

```ts
  1   | "use strict";
  2   | Object.defineProperty(exports, "__esModule", { value: true });
  3   | const { test, asRole, expect } = require("../../fixtures/auth.fixture");
  4   | const { emailOf } = require("../../fixtures/users");
  5   | const { productData } = require("../../fixtures/applicationData");
  6   | const { PRODUCTS, product, FREQUENCIES, RIDERS } = require("../../fixtures/referenceData");
  7   | const { ProductCatalogPage } = require("../../pages/ProductCatalogPage");
  8   | const { ProductConfigurationPage } = require("../../pages/ProductConfigurationPage");
  9   | const { ReviewPage } = require("../../pages/ReviewPage");
  10  | const { buildApplication } = require("../../utils/applicationBuilder");
  11  | const { expectApiSuccess, expectApiError } = require("../../utils/assertions");
  12  | const { MSG } = require("../../utils/messages");
  13  | const { periodPremium, totalPremium } = require("../../utils/premium");
  14  | const { parseMoney } = require("../../utils/testHelpers");
  15  | test.use(asRole('learner'));
  16  | const agent = () => emailOf('learner');
  17  | const sorted = (a) => [...a].sort();
  18  | /**
  19  |  * Reference products that the Product dropdown actually offers. The min/max face-value rules are tested for every offered
  20  |  * product; a product that is not offered is recorded as an observation instead of crashing the data-driven loop here
  21  |  * (its absence is reported once, by TC-PROD-001).
  22  |  */
  23  | async function offeredProducts(config) {
  24  |     const codes = await config.offeredProductCodes();
  25  |     expect(codes.length, 'the Product dropdown offers at least one known product').toBeGreaterThan(0);
  26  |     const missing = PRODUCTS.filter((p) => !codes.includes(p.code)).map((p) => p.code);
  27  |     if (missing.length)
  28  |         test.info().annotations.push({ type: 'observation', description: `Not offered on this environment, skipped here: ${missing.join(', ')} (reported by TC-PROD-001)` });
  29  |     return PRODUCTS.filter((p) => codes.includes(p.code));
  30  | }
  31  | test.describe('Product selection and policy configuration', () => {
  32  |     test("TC-PROD-001 | PROD-V01 | Verify that catalog displays the expected Whole Life products", { "tag": ["@regression", "@smoke", "@api", "@product", "@P1"], "annotation": [{ "type": "validation-id", "description": "PROD-V01" }, { "type": "risk", "description": "R-PROD-05" }, { "type": "priority", "description": "P1" }] }, async ({ page, api }) => {
  33  |         const catalog = new ProductCatalogPage(page);
  34  |         await catalog.goto();
  35  |         const uiCodes = await catalog.productCodes();
  36  |         if (api.available) {
  37  |             const res = await api.products();
  38  |             expectApiSuccess(res);
  39  |             const activeApi = res.body.data.filter((p) => !!p.is_active).map((p) => p.product_code);
  40  |             expect(sorted(uiCodes), 'UI cards equal active products in the API').toEqual(sorted(activeApi));
  41  |         }
  42  |         const expectedCodes = PRODUCTS.map((p) => p.code);
> 43  |         expect(expectedCodes.filter((c) => !uiCodes.includes(c)), 'seeded products missing from the catalog').toEqual([]);
      |                                                                                                               ^ Error: seeded products missing from the catalog
  44  |         expect(uiCodes.filter((c) => !expectedCodes.includes(c)), 'unexpected extra products in the catalog').toEqual([]);
  45  |         for (const code of uiCodes)
  46  |             await expect(catalog.card(code)).toBeVisible();
  47  |     });
  48  |     test("TC-PROD-003 | PROD-V03 | Verify that coverage amount below the minimum is blocked", { "tag": ["@regression", "@api", "@product", "@P2"], "annotation": [{ "type": "validation-id", "description": "PROD-V03" }, { "type": "risk", "description": "R-PROD-02" }, { "type": "priority", "description": "P2" }] }, async ({ page, api }) => {
  49  |         const app = await buildApplication(page, { agentEmail: agent(), upTo: 'kyc' }); // client age 40 is eligible for every product
  50  |         const config = new ProductConfigurationPage(page);
  51  |         await config.goto(app.id);
  52  |         const offered = await offeredProducts(config);
  53  |         for (const p of offered) {
  54  |             await test.step(`${p.name}: ${p.faceMin - 1} rejected, ${p.faceMin} accepted`, async () => {
  55  |                 await config.goto(app.id);
  56  |                 await config.fill(productData({ productCode: p.code, faceValue: p.faceMin - 1 }));
  57  |                 await config.save();
  58  |                 await expect(page).toHaveURL(/\/product/);
  59  |                 await config.expectErrorMatching(MSG.faceBelowMin);
  60  |                 await config.goto(app.id);
  61  |                 await config.fill(productData({ productCode: p.code, faceValue: p.faceMin }));
  62  |                 await config.save();
  63  |                 await expect(page, 'minimum is accepted').toHaveURL(/\/riders/);
  64  |             });
  65  |         }
  66  |         await test.step('API rejects below-minimum too', async () => {
  67  |             if (!api.available)
  68  |                 return;
  69  |             const p = product('WL_SECURE_BASIC');
  70  |             const res = await api.saveProduct(app.id, agent(), {
  71  |                 insurance_product_id: await api.productId(p.code), face_value: p.faceMin - 1,
  72  |                 premium_frequency: 'MONTHLY', payment_term_years: 20, policy_term: 'WHOLE_LIFE',
  73  |             });
  74  |             expectApiError(res, 422, MSG.faceBelowMin);
  75  |         });
  76  |     });
  77  |     test("TC-PROD-004 | PROD-V04 | Verify that coverage amount above the maximum is blocked", { "tag": ["@regression", "@api", "@product", "@P2"], "annotation": [{ "type": "validation-id", "description": "PROD-V04" }, { "type": "risk", "description": "R-PROD-02" }, { "type": "priority", "description": "P2" }] }, async ({ page, api }) => {
  78  |         const app = await buildApplication(page, { agentEmail: agent(), upTo: 'kyc' });
  79  |         const config = new ProductConfigurationPage(page);
  80  |         await config.goto(app.id);
  81  |         const offered = await offeredProducts(config);
  82  |         for (const p of offered) {
  83  |             await test.step(`${p.name}: ${p.faceMax + 1} rejected, ${p.faceMax} accepted`, async () => {
  84  |                 await config.goto(app.id);
  85  |                 await config.fill(productData({ productCode: p.code, faceValue: p.faceMax + 1 }));
  86  |                 await config.save();
  87  |                 await expect(page).toHaveURL(/\/product/);
  88  |                 await config.expectErrorMatching(MSG.faceAboveMax);
  89  |                 await config.goto(app.id);
  90  |                 await config.fill(productData({ productCode: p.code, faceValue: p.faceMax }));
  91  |                 await config.save();
  92  |                 await expect(page, 'maximum is accepted').toHaveURL(/\/riders/);
  93  |             });
  94  |         }
  95  |         await test.step('API rejects above-maximum too', async () => {
  96  |             if (!api.available)
  97  |                 return;
  98  |             const p = product('WL_SECURE_BASIC');
  99  |             const res = await api.saveProduct(app.id, agent(), {
  100 |                 insurance_product_id: await api.productId(p.code), face_value: p.faceMax + 1,
  101 |                 premium_frequency: 'MONTHLY', payment_term_years: 20, policy_term: 'WHOLE_LIFE',
  102 |             });
  103 |             expectApiError(res, 422, MSG.faceAboveMax);
  104 |         });
  105 |     });
  106 |     test("TC-PROD-005 | PROD-V05 | Verify that premium recomputes when frequency or coverage amount changes", { "tag": ["@regression", "@api", "@product", "@P1"], "annotation": [{ "type": "validation-id", "description": "PROD-V05" }, { "type": "risk", "description": "R-PROD-03" }, { "type": "priority", "description": "P1" }] }, async ({ page, api }) => {
  107 |         const app = await buildApplication(page, { agentEmail: agent(), upTo: 'kyc' });
  108 |         const p = product('WL_SECURE_BASIC');
  109 |         const config = new ProductConfigurationPage(page);
  110 |         await config.goto(app.id);
  111 |         await config.selectProduct(p.code);
  112 |         await config.setFaceValue(250000);
  113 |         await config.paymentTerm.selectOption('20');
  114 |         await config.setPolicyTerm('WHOLE_LIFE');
  115 |         const seen = [];
  116 |         for (const f of FREQUENCIES) {
  117 |             await test.step(`frequency ${f}`, async () => {
  118 |                 await config.setFrequency(f);
  119 |                 const expected = periodPremium(250000, p.ratePer1000, f);
  120 |                 await expect.poll(() => config.premiumShown(), { message: `live premium for ${f}` }).toBe(expected);
  121 |                 seen.push(expected);
  122 |             });
  123 |         }
  124 |         expect(new Set(seen).size, 'each frequency gives a different premium').toBe(FREQUENCIES.length);
  125 |         await test.step('changing the face value changes the premium', async () => {
  126 |             await config.setFrequency('MONTHLY');
  127 |             await config.setFaceValue(300000);
  128 |             await expect.poll(() => config.premiumShown()).toBe(periodPremium(300000, p.ratePer1000, 'MONTHLY'));
  129 |         });
  130 |         await test.step('saved premium equals the preview and the API', async () => {
  131 |             await config.setFrequency('QUARTERLY');
  132 |             await config.save();
  133 |             await expect(page).toHaveURL(/\/riders/);
  134 |             const expected = periodPremium(300000, p.ratePer1000, 'QUARTERLY');
  135 |             await config.goto(app.id);
  136 |             expect(await config.premiumShown(), 'stored premium after reload').toBe(expected);
  137 |             if (api.available) {
  138 |                 const res = await api.getApplication(app.id, agent());
  139 |                 expect(Number(res.body?.data?.total_premium), 'API total premium').toBe(expected);
  140 |             }
  141 |         });
  142 |     });
  143 |     test("TC-PROD-006 | PROD-V06 | Verify that premium agrees with on configuration, summary, review and API", { "tag": ["@regression", "@api", "@product", "@P2"], "annotation": [{ "type": "validation-id", "description": "PROD-V06" }, { "type": "risk", "description": "R-PROD-04" }, { "type": "priority", "description": "P2" }] }, async ({ page, api }) => {
```