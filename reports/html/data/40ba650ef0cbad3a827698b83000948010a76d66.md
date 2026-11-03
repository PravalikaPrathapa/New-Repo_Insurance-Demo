# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: product-selection\product-selection.spec.js >> Product selection and policy configuration >> TC-PROD-006 | PROD-V06 | Verify that premium agrees with on configuration, summary, review and API
- Location: tests\product-selection\product-selection.spec.js:124:5

# Error details

```
Error: all four places show the same premium

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 1

  Object {
    "apiPremium": 116.67,
-   "configPremium": 116.67,
+   "configPremium": 98.96,
    "reviewPremium": 116.67,
    "summary": 116.67,
  }
```

# Page snapshot

```yaml
- generic [active] [ref=f10e1]:
  - navigation [ref=f10e2]:
    - generic [ref=f10e3]:
      - link "Insurance Order Entry Demo Platform QA Automation Training App" [ref=f10e4] [cursor=pointer]:
        - /url: http://34.100.172.19:8081/dashboard
        - generic [aria-hidden] [ref=f10e5]: IO
        - generic [ref=f10e6]:
          - generic [ref=f10e7]: Insurance Order Entry Demo Platform
          - generic [ref=f10e8]: QA Automation Training App
      - generic [ref=f10e9]:
        - list [ref=f10e10]:
          - listitem [ref=f10e11]:
            - link "Dashboard" [ref=f10e12] [cursor=pointer]:
              - /url: http://34.100.172.19:8081/dashboard
          - listitem [ref=f10e13]:
            - link "Applications" [ref=f10e14] [cursor=pointer]:
              - /url: http://34.100.172.19:8081/applications
          - listitem [ref=f10e15]:
            - link "Products" [ref=f10e16] [cursor=pointer]:
              - /url: http://34.100.172.19:8081/products
          - listitem [ref=f10e17]:
            - link "Support" [ref=f10e18] [cursor=pointer]:
              - /url: http://34.100.172.19:8081/support
        - generic [ref=f10e19]:
          - link "Valid Agent" [ref=f10e20] [cursor=pointer]:
            - /url: http://34.100.172.19:8081/profile
          - button "Logout" [ref=f10e22] [cursor=pointer]
  - main [ref=f10e23]:
    - generic [ref=f10e25]:
      - link "← Back to Documents" [ref=f10e26] [cursor=pointer]:
        - /url: http://34.100.172.19:8081/applications/145/documents
      - link "Application Summary" [ref=f10e27] [cursor=pointer]:
        - /url: http://34.100.172.19:8081/applications/145
    - generic [ref=f10e28]:
      - generic [ref=f10e30]:
        - generic [ref=f10e31]: "Application #145"
        - heading "Review Application" [level=1] [ref=f10e32]
        - paragraph [ref=f10e33]: Review the application details and resolve any blocking validation errors before submission.
      - generic [ref=f10e34]:
        - generic [ref=f10e37]:
          - heading "Submission Validation" [level=2] [ref=f10e38]
          - generic [ref=f10e39]: No blocking validation errors found.
          - generic [ref=f10e40]:
            - link "Back to Documents" [ref=f10e41] [cursor=pointer]:
              - /url: http://34.100.172.19:8081/applications/145/documents
            - button "Run Validation" [ref=f10e42] [cursor=pointer]
          - button "Submit Application" [ref=f10e44] [cursor=pointer]
        - generic [ref=f10e47]:
          - heading "Application Snapshot" [level=2] [ref=f10e48]
          - generic [ref=f10e49]:
            - term [ref=f10e50]: Client
            - definition [ref=f10e51]: Qakeksjh Lccfgqq
            - term [ref=f10e52]: Calculated Age
            - definition [ref=f10e53]: "41"
            - term [ref=f10e54]: Product
            - definition [ref=f10e55]: SecureLife Whole Life
            - term [ref=f10e56]: Sum Assured
            - definition [ref=f10e57]: $250,000.00
            - term [ref=f10e58]: Premium Payment Frequency
            - definition [ref=f10e59]: MONTHLY
            - term [ref=f10e60]: Premium Payment Term
            - definition [ref=f10e61]: 20 years
            - term [ref=f10e62]: Coverage Term
            - definition [ref=f10e63]: WHOLE_LIFE
            - term [ref=f10e64]: Base Policy Premium
            - definition [ref=f10e65]: $98.96
            - term [ref=f10e66]: Rider Premium
            - definition [ref=f10e67]: $17.71
            - term [ref=f10e68]: Total Modal Premium
            - definition [ref=f10e69]: $116.67
            - term [ref=f10e70]: Status
            - definition [ref=f10e71]: DRAFT
  - contentinfo [ref=f10e72]:
    - generic [ref=f10e73]:
      - generic [ref=f10e74]: TalentFarm QA Automation Lab
      - generic [ref=f10e75]: Insurance Order Entry Demo
```

# Test source

```ts
  45  |                 await config.save();
  46  |                 await expect(page, 'minimum is accepted').toHaveURL(/\/riders/);
  47  |             });
  48  |         }
  49  |         await test.step('API rejects below-minimum too', async () => {
  50  |             if (!api.available)
  51  |                 return;
  52  |             const p = product('WL_SECURE_BASIC');
  53  |             const res = await api.saveProduct(app.id, agent(), {
  54  |                 insurance_product_id: await api.productId(p.code), face_value: p.faceMin - 1,
  55  |                 premium_frequency: 'MONTHLY', payment_term_years: 20, policy_term: 'WHOLE_LIFE',
  56  |             });
  57  |             expectApiError(res, 422, MSG.faceBelowMin);
  58  |         });
  59  |     });
  60  |     test("TC-PROD-004 | PROD-V04 | Verify that coverage amount above the maximum is blocked", { "tag": ["@regression", "@api", "@product", "@P2"], "annotation": [{ "type": "validation-id", "description": "PROD-V04" }, { "type": "risk", "description": "R-PROD-02" }, { "type": "priority", "description": "P2" }] }, async ({ page, api }) => {
  61  |         const app = await buildApplication(page, { agentEmail: agent(), upTo: 'kyc' });
  62  |         const config = new ProductConfigurationPage(page);
  63  |         for (const p of PRODUCTS) {
  64  |             await test.step(`${p.name}: ${p.faceMax + 1} rejected, ${p.faceMax} accepted`, async () => {
  65  |                 await config.goto(app.id);
  66  |                 await config.fill(productData({ productCode: p.code, faceValue: p.faceMax + 1 }));
  67  |                 await config.save();
  68  |                 await expect(page).toHaveURL(/\/product/);
  69  |                 await config.expectErrorMatching(MSG.faceAboveMax);
  70  |                 await config.goto(app.id);
  71  |                 await config.fill(productData({ productCode: p.code, faceValue: p.faceMax }));
  72  |                 await config.save();
  73  |                 await expect(page, 'maximum is accepted').toHaveURL(/\/riders/);
  74  |             });
  75  |         }
  76  |         await test.step('API rejects above-maximum too', async () => {
  77  |             if (!api.available)
  78  |                 return;
  79  |             const p = product('WL_SECURE_BASIC');
  80  |             const res = await api.saveProduct(app.id, agent(), {
  81  |                 insurance_product_id: await api.productId(p.code), face_value: p.faceMax + 1,
  82  |                 premium_frequency: 'MONTHLY', payment_term_years: 20, policy_term: 'WHOLE_LIFE',
  83  |             });
  84  |             expectApiError(res, 422, MSG.faceAboveMax);
  85  |         });
  86  |     });
  87  |     test("TC-PROD-005 | PROD-V05 | Verify that premium recomputes when frequency or coverage amount changes", { "tag": ["@regression", "@api", "@product", "@SDC-12", "@P1"], "annotation": [{ "type": "validation-id", "description": "PROD-V05" }, { "type": "risk", "description": "R-PROD-03" }, { "type": "priority", "description": "P1" }, { "type": "seeded-defect-candidate", "description": "SDC-12" }] }, async ({ page, api }) => {
  88  |         const app = await buildApplication(page, { agentEmail: agent(), upTo: 'kyc' });
  89  |         const p = product('WL_SECURE_BASIC');
  90  |         const config = new ProductConfigurationPage(page);
  91  |         await config.goto(app.id);
  92  |         await config.selectProduct(p.code);
  93  |         await config.setFaceValue(250000);
  94  |         await config.paymentTerm.selectOption('20');
  95  |         await config.setPolicyTerm('WHOLE_LIFE');
  96  |         const seen = [];
  97  |         for (const f of FREQUENCIES) {
  98  |             await test.step(`frequency ${f}`, async () => {
  99  |                 await config.setFrequency(f);
  100 |                 const expected = periodPremium(250000, p.ratePer1000, f);
  101 |                 await expect.poll(() => config.premiumShown(), { message: `live premium for ${f}` }).toBe(expected);
  102 |                 seen.push(expected);
  103 |             });
  104 |         }
  105 |         expect(new Set(seen).size, 'each frequency gives a different premium').toBe(FREQUENCIES.length);
  106 |         await test.step('changing the face value changes the premium', async () => {
  107 |             await config.setFrequency('MONTHLY');
  108 |             await config.setFaceValue(300000);
  109 |             await expect.poll(() => config.premiumShown()).toBe(periodPremium(300000, p.ratePer1000, 'MONTHLY'));
  110 |         });
  111 |         await test.step('saved premium equals the preview and the API', async () => {
  112 |             await config.setFrequency('QUARTERLY');
  113 |             await config.save();
  114 |             await expect(page).toHaveURL(/\/riders/);
  115 |             const expected = periodPremium(300000, p.ratePer1000, 'QUARTERLY');
  116 |             await config.goto(app.id);
  117 |             expect(await config.premiumShown(), 'stored premium after reload').toBe(expected);
  118 |             if (api.available) {
  119 |                 const res = await api.getApplication(app.id, agent());
  120 |                 expect(Number(res.body?.data?.total_premium), 'API total premium').toBe(expected);
  121 |             }
  122 |         });
  123 |     });
  124 |     test("TC-PROD-006 | PROD-V06 | Verify that premium agrees with on configuration, summary, review and API", { "tag": ["@regression", "@api", "@product", "@SDC-12", "@P2"], "annotation": [{ "type": "validation-id", "description": "PROD-V06" }, { "type": "risk", "description": "R-PROD-04" }, { "type": "priority", "description": "P2" }, { "type": "seeded-defect-candidate", "description": "SDC-12" }] }, async ({ page, api }) => {
  125 |         const face = 250000;
  126 |         const app = await buildApplication(page, {
  127 |             agentEmail: agent(), upTo: 'riders', product: { faceValue: face, frequency: 'MONTHLY' }, riders: [{ key: 'ADB', coverage: face }],
  128 |         });
  129 |         const p = product('WL_SECURE_BASIC');
  130 |         const config = new ProductConfigurationPage(page);
  131 |         const review = new ReviewPage(page);
  132 |         const readAll = async () => {
  133 |             await config.goto(app.id);
  134 |             const configPremium = await config.premiumShown();
  135 |             await page.goto(`/applications/${app.id}`);
  136 |             const summary = parseMoney(await page.getByTestId('application-total-premium').innerText());
  137 |             await review.goto(app.id);
  138 |             const reviewPremium = await review.totalPremium();
  139 |             const apiPremium = api.available ? Number((await api.getApplication(app.id, agent())).body?.data?.total_premium) : reviewPremium;
  140 |             return { configPremium, summary, reviewPremium, apiPremium };
  141 |         };
  142 |         await test.step('as configured (250,000 + ADB, monthly)', async () => {
  143 |             const expected = totalPremium({ face, rate: p.ratePer1000 }, [{ coverage: face, rate: RIDERS.ADB.ratePer1000 }], 'MONTHLY');
  144 |             const v = await readAll();
> 145 |             expect(v, 'all four places show the same premium').toEqual({ configPremium: expected, summary: expected, reviewPremium: expected, apiPremium: expected });
      |                                                                ^ Error: all four places show the same premium
  146 |         });
  147 |         await test.step('after changing the face value to 300,000', async () => {
  148 |             await config.goto(app.id);
  149 |             await config.setFaceValue(300000);
  150 |             await config.save();
  151 |             const v = await readAll();
  152 |             const values = Object.values(v);
  153 |             expect(new Set(values).size, `premium differs between screens/API: ${JSON.stringify(v)}`).toBe(1);
  154 |         });
  155 |     });
  156 | });
  157 | 
```