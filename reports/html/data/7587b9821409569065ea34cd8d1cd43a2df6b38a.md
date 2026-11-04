# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: kyc-financial\kyc-financial.spec.js >> KYC, financial and compliance >> TC-KYC-004 | KYC-P01 | Verify that premium must be affordable against income (20%)
- Location: tests\kyc-financial\kyc-financial.spec.js:70:5

# Error details

```
Error: affordability error on review page

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false
```

# Page snapshot

```yaml
- generic [active] [ref=f7e1]:
  - navigation [ref=f7e2]:
    - generic [ref=f7e3]:
      - link "Insurance Order Entry Demo Platform QA Automation Training App" [ref=f7e4] [cursor=pointer]:
        - /url: http://34.100.179.13:8081/dashboard
        - generic [aria-hidden] [ref=f7e5]: IO
        - generic [ref=f7e6]:
          - generic [ref=f7e7]: Insurance Order Entry Demo Platform
          - generic [ref=f7e8]: QA Automation Training App
      - generic [ref=f7e9]:
        - list [ref=f7e10]:
          - listitem [ref=f7e11]:
            - link "Dashboard" [ref=f7e12] [cursor=pointer]:
              - /url: http://34.100.179.13:8081/dashboard
          - listitem [ref=f7e13]:
            - link "Applications" [ref=f7e14] [cursor=pointer]:
              - /url: http://34.100.179.13:8081/applications
          - listitem [ref=f7e15]:
            - link "Products" [ref=f7e16] [cursor=pointer]:
              - /url: http://34.100.179.13:8081/products
          - listitem [ref=f7e17]:
            - link "Support" [ref=f7e18] [cursor=pointer]:
              - /url: http://34.100.179.13:8081/support
        - generic [ref=f7e19]:
          - link "Learner Agent 001" [ref=f7e20] [cursor=pointer]:
            - /url: http://34.100.179.13:8081/profile
          - button "Logout" [ref=f7e22] [cursor=pointer]
  - main [ref=f7e23]:
    - generic [ref=f7e25]:
      - link "← Back to Documents" [ref=f7e26] [cursor=pointer]:
        - /url: http://34.100.179.13:8081/applications/430/documents
      - link "Application Summary" [ref=f7e27] [cursor=pointer]:
        - /url: http://34.100.179.13:8081/applications/430
    - generic [ref=f7e28]:
      - generic [ref=f7e30]:
        - generic [ref=f7e31]: "Application #430"
        - heading "Review Application" [level=1] [ref=f7e32]
        - paragraph [ref=f7e33]: Review the application details and resolve any blocking validation errors before submission.
      - generic [ref=f7e34]:
        - generic [ref=f7e37]:
          - heading "Submission Validation" [level=2] [ref=f7e38]
          - generic [ref=f7e39]: No blocking validation errors found.
          - generic [ref=f7e40]:
            - link "Back to Documents" [ref=f7e41] [cursor=pointer]:
              - /url: http://34.100.179.13:8081/applications/430/documents
            - button "Run Validation" [ref=f7e42] [cursor=pointer]
          - button "Submit Application" [ref=f7e44] [cursor=pointer]
        - generic [ref=f7e47]:
          - heading "Application Snapshot" [level=2] [ref=f7e48]
          - generic [ref=f7e49]:
            - term [ref=f7e50]: Client
            - definition [ref=f7e51]: Qatfvzao Qxciqnv
            - term [ref=f7e52]: Calculated Age
            - definition [ref=f7e53]: "41"
            - term [ref=f7e54]: Product
            - definition [ref=f7e55]: SecureLife Whole Life
            - term [ref=f7e56]: Sum Assured
            - definition [ref=f7e57]: $250,000.00
            - term [ref=f7e58]: Premium Payment Frequency
            - definition [ref=f7e59]: MONTHLY
            - term [ref=f7e60]: Premium Payment Term
            - definition [ref=f7e61]: 20 years
            - term [ref=f7e62]: Coverage Term
            - definition [ref=f7e63]: WHOLE_LIFE
            - term [ref=f7e64]: Base Policy Premium
            - definition [ref=f7e65]: $98.96
            - term [ref=f7e66]: Rider Premium
            - definition [ref=f7e67]: $0.00
            - term [ref=f7e68]: Total Modal Premium
            - definition [ref=f7e69]: $98.96
            - term [ref=f7e70]: Status
            - definition [ref=f7e71]: DRAFT
  - contentinfo [ref=f7e72]:
    - generic [ref=f7e73]:
      - generic [ref=f7e74]: TalentFarm QA Automation Lab
      - generic [ref=f7e75]: Insurance Order Entry Demo
```

# Test source

```ts
  1   | "use strict";
  2   | Object.defineProperty(exports, "__esModule", { value: true });
  3   | const { test, asRole, expect } = require("../../fixtures/auth.fixture");
  4   | const { emailOf } = require("../../fixtures/users");
  5   | const { kycData, FAKE_SSN } = require("../../fixtures/applicationData");
  6   | const { KycFinancialPage } = require("../../pages/KycFinancialPage");
  7   | const { ReviewPage } = require("../../pages/ReviewPage");
  8   | const { buildApplication } = require("../../utils/applicationBuilder");
  9   | const { anyMatches, errorTexts } = require("../../utils/assertions");
  10  | const { errorSurface } = require("../../utils/flows");
  11  | const { MSG } = require("../../utils/messages");
  12  | test.use(asRole('learner'));
  13  | const agent = () => emailOf('learner');
  14  | test.describe('KYC, financial and compliance', () => {
  15  |     test("TC-KYC-001 | CLI-V08 | Verify that sSN is masked on every screen and response", { "tag": ["@regression", "@smoke", "@api", "@kyc",  "@P1"], "annotation": [{ "type": "validation-id", "description": "CLI-V08" }, { "type": "risk", "description": "R-KYC-01" }, { "type": "priority", "description": "P1" }] }, async ({ page, api }) => {
  16  |         const app = await buildApplication(page, { agentEmail: agent(), upTo: 'address' });
  17  |         const kyc = new KycFinancialPage(page);
  18  |         await kyc.goto(app.id);
  19  |         await kyc.fillAndSave(kycData({ idType: 'SSN', idNumber: FAKE_SSN }));
  20  |         const digitsOnly = FAKE_SSN.replace(/-/g, '');
  21  |         const expectMasked = async (label) => {
  22  |             const html = await page.content();
  23  |             expect(html, `${label}: full SSN must not appear`).not.toContain(FAKE_SSN);
  24  |             expect(html, `${label}: unformatted SSN must not appear`).not.toContain(digitsOnly);
  25  |         };
  26  |         await test.step('KYC page after reload', async () => {
  27  |             await kyc.goto(app.id);
  28  |             await expectMasked('kyc page');
  29  |             const shown = await kyc.idNumber.inputValue();
  30  |             if (shown)
  31  |                 expect(shown, 'field shows only the last four digits').toMatch(/\*+.*6789$|^6789$/);
  32  |         });
  33  |         await test.step('review page', async () => {
  34  |             const review = new ReviewPage(page);
  35  |             await review.goto(app.id);
  36  |             await expectMasked('review page');
  37  |         });
  38  |         await test.step('API response for the application', async () => {
  39  |             if (!api.available)
  40  |                 return;
  41  |             const res = await api.getApplication(app.id, agent());
  42  |             expect(res.text).not.toContain(FAKE_SSN);
  43  |             expect(res.text).not.toContain(digitsOnly);
  44  |             expect(res.text, 'masked value is present').toContain('6789');
  45  |         });
  46  |     });
  47  |     test("TC-KYC-003 | CLI-V10 | Verify that pEP = Yes requires details", { "tag": ["@regression", "@kyc", "@P2"], "annotation": [{ "type": "validation-id", "description": "CLI-V10" }, { "type": "risk", "description": "R-KYC-05" }, { "type": "priority", "description": "P2" }] }, async ({ page, api }, testInfo) => {
  48  |         const app = await buildApplication(page, { agentEmail: agent(), upTo: 'address' });
  49  |         const kyc = new KycFinancialPage(page);
  50  |         await test.step('PEP Yes without details is flagged', async () => {
  51  |             await kyc.goto(app.id);
  52  |             await kyc.fill(kycData({ isPep: true, pepDetails: '' }));
  53  |             await kyc.save({ ignoreBrowserValidation: true });
  54  |             const where = await errorSurface(page, app.id, MSG.pepDetails);
  55  |             testInfo.annotations.push({ type: 'observation', description: `PEP-details error shown on: ${where ?? 'NOWHERE'}` });
  56  |             expect(where, 'PEP Yes with blank details must raise an error').not.toBeNull();
  57  |         });
  58  |         await test.step('PEP Yes with details is accepted and no PEP error remains', async () => {
  59  |             await kyc.goto(app.id);
  60  |             await kyc.fillAndSave(kycData({ isPep: true, pepDetails: 'Former city council member (QA test data)' }));
  61  |             const review = new ReviewPage(page);
  62  |             await review.goto(app.id);
  63  |             expect(anyMatches(await review.errors(), MSG.pepDetails)).toBe(false);
  64  |         });
  65  |         await test.step('PEP No does not need details', async () => {
  66  |             await kyc.goto(app.id);
  67  |             await kyc.fillAndSave(kycData({ isPep: false }));
  68  |         });
  69  |     });
  70  |     test("TC-KYC-004 | KYC-P01 | Verify that premium must be affordable against income (20%)", { "tag": ["@regression", "@api", "@kyc", "@P1"], "annotation": [{ "type": "validation-id", "description": "KYC-P01" }, { "type": "risk", "description": "R-KYC-03" }, { "type": "priority", "description": "P1" }] }, async ({ page, api }) => {
  71  |         // SecureLife, face 250,000, monthly => annual premium 1,187.50. 20% limit: income 5,000 -> 1,000 (fails), 50,000 -> 10,000 (passes).
  72  |         const app = await buildApplication(page, {
  73  |             agentEmail: agent(), upTo: 'product', kyc: { annualIncome: 5000 },
  74  |         });
  75  |         const review = new ReviewPage(page);
  76  |         const kyc = new KycFinancialPage(page);
  77  |         await test.step('income 5,000 is flagged on the review page and by the validate API', async () => {
  78  |             await review.goto(app.id);
> 79  |             expect(anyMatches(await review.errors(), MSG.affordability), 'affordability error on review page').toBe(true);
      |                                                                                                                ^ Error: affordability error on review page
  80  |             if (!api.available)
  81  |                 return; // the REST API is not reachable on this environment: the UI check above already ran
  82  |             const res = await api.validate(app.id, agent());
  83  |             expect(errorTexts(res).join(' | ')).toMatch(MSG.affordability);
  84  |         });
  85  |         await test.step('raising income to 50,000 clears the affordability error', async () => {
  86  |             await kyc.goto(app.id);
  87  |             await kyc.fillAndSave(kycData({ annualIncome: 50000 }));
  88  |             await review.goto(app.id);
  89  |             expect(anyMatches(await review.errors(), MSG.affordability)).toBe(false);
  90  |         });
  91  |     });
  92  |     test("TC-KYC-006 | KYC-P03 | Verify that incomplete compliance declaration prevents progress", { "tag": ["@regression", "@api", "@kyc", "@P2"], "annotation": [{ "type": "validation-id", "description": "KYC-P03" }, { "type": "risk", "description": "R-KYC-05" }, { "type": "priority", "description": "P2" }] }, async ({ page, api }, testInfo) => {
  93  |         const app = await buildApplication(page, { agentEmail: agent(), upTo: 'address' });
  94  |         const kyc = new KycFinancialPage(page);
  95  |         await test.step('UI: declaration not ticked', async () => {
  96  |             await kyc.goto(app.id);
  97  |             await kyc.fill(kycData({ declaration: false }));
  98  |             await kyc.save({ ignoreBrowserValidation: true });
  99  |             const where = await errorSurface(page, app.id, MSG.declaration);
  100 |             testInfo.annotations.push({ type: 'observation', description: `Declaration error shown on: ${where ?? 'NOWHERE'}` });
  101 |             expect(where, 'unticked declaration must raise an error').not.toBeNull();
  102 |         });
  103 |         await test.step('API validate reports the missing declaration', async () => {
  104 |             if (!api.available)
  105 |                 return;
  106 |             const incomplete = await buildApplication(page, { agentEmail: agent(), upTo: 'product', kyc: { declaration: false } });
  107 |             const res = await api.validate(incomplete.id, agent());
  108 |             expect(errorTexts(res).join(' | ')).toMatch(MSG.declaration);
  109 |         });
  110 |     });
  111 | });
  112 | 
```