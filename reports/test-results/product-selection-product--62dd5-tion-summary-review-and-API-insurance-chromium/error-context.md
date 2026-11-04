# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: product-selection\product-selection.spec.js >> Product selection and policy configuration >> TC-PROD-006 | PROD-V06 | Verify that premium agrees with on configuration, summary, review and API
- Location: tests\product-selection\product-selection.spec.js:143:5

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
        - /url: http://34.100.179.13:8081/dashboard
        - generic [aria-hidden] [ref=f10e5]: IO
        - generic [ref=f10e6]:
          - generic [ref=f10e7]: Insurance Order Entry Demo Platform
          - generic [ref=f10e8]: QA Automation Training App
      - generic [ref=f10e9]:
        - list [ref=f10e10]:
          - listitem [ref=f10e11]:
            - link "Dashboard" [ref=f10e12] [cursor=pointer]:
              - /url: http://34.100.179.13:8081/dashboard
          - listitem [ref=f10e13]:
            - link "Applications" [ref=f10e14] [cursor=pointer]:
              - /url: http://34.100.179.13:8081/applications
          - listitem [ref=f10e15]:
            - link "Products" [ref=f10e16] [cursor=pointer]:
              - /url: http://34.100.179.13:8081/products
          - listitem [ref=f10e17]:
            - link "Support" [ref=f10e18] [cursor=pointer]:
              - /url: http://34.100.179.13:8081/support
        - generic [ref=f10e19]:
          - link "Learner Agent 001" [ref=f10e20] [cursor=pointer]:
            - /url: http://34.100.179.13:8081/profile
          - button "Logout" [ref=f10e22] [cursor=pointer]
  - main [ref=f10e23]:
    - generic [ref=f10e25]:
      - link "← Back to Documents" [ref=f10e26] [cursor=pointer]:
        - /url: http://34.100.179.13:8081/applications/435/documents
      - link "Application Summary" [ref=f10e27] [cursor=pointer]:
        - /url: http://34.100.179.13:8081/applications/435
    - generic [ref=f10e28]:
      - generic [ref=f10e30]:
        - generic [ref=f10e31]: "Application #435"
        - heading "Review Application" [level=1] [ref=f10e32]
        - paragraph [ref=f10e33]: Review the application details and resolve any blocking validation errors before submission.
      - generic [ref=f10e34]:
        - generic [ref=f10e37]:
          - heading "Submission Validation" [level=2] [ref=f10e38]
          - generic [ref=f10e39]: No blocking validation errors found.
          - generic [ref=f10e40]:
            - link "Back to Documents" [ref=f10e41] [cursor=pointer]:
              - /url: http://34.100.179.13:8081/applications/435/documents
            - button "Run Validation" [ref=f10e42] [cursor=pointer]
          - button "Submit Application" [ref=f10e44] [cursor=pointer]
        - generic [ref=f10e47]:
          - heading "Application Snapshot" [level=2] [ref=f10e48]
          - generic [ref=f10e49]:
            - term [ref=f10e50]: Client
            - definition [ref=f10e51]: Qacgyfcl Bqwwcoo
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
  144 |         const face = 250000;
  145 |         const app = await buildApplication(page, {
  146 |             agentEmail: agent(), upTo: 'riders', product: { faceValue: face, frequency: 'MONTHLY' }, riders: [{ key: 'ADB', coverage: face }],
  147 |         });
  148 |         const p = product('WL_SECURE_BASIC');
  149 |         const config = new ProductConfigurationPage(page);
  150 |         const review = new ReviewPage(page);
  151 |         const readAll = async () => {
  152 |             await config.goto(app.id);
  153 |             const configPremium = await config.premiumShown();
  154 |             await page.goto(`/applications/${app.id}`);
  155 |             const summary = parseMoney(await page.getByTestId('application-total-premium').innerText());
  156 |             await review.goto(app.id);
  157 |             const reviewPremium = await review.totalPremium();
  158 |             const apiPremium = api.available ? Number((await api.getApplication(app.id, agent())).body?.data?.total_premium) : reviewPremium;
  159 |             return { configPremium, summary, reviewPremium, apiPremium };
  160 |         };
  161 |         await test.step('as configured (250,000 + ADB, monthly)', async () => {
  162 |             const expected = totalPremium({ face, rate: p.ratePer1000 }, [{ coverage: face, rate: RIDERS.ADB.ratePer1000 }], 'MONTHLY');
  163 |             const v = await readAll();
> 164 |             expect(v, 'all four places show the same premium').toEqual({ configPremium: expected, summary: expected, reviewPremium: expected, apiPremium: expected });
      |                                                                ^ Error: all four places show the same premium
  165 |         });
  166 |         await test.step('after changing the face value to 300,000', async () => {
  167 |             await config.goto(app.id);
  168 |             await config.setFaceValue(300000);
  169 |             await config.save();
  170 |             const v = await readAll();
  171 |             const values = Object.values(v);
  172 |             expect(new Set(values).size, `premium differs between screens/API: ${JSON.stringify(v)}`).toBe(1);
  173 |         });
  174 |     });
  175 | });
  176 | 
```