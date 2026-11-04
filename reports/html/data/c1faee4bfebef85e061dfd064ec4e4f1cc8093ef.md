# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: documents\documents.spec.js >> Validation summary and submit control >> TC-DOC-007 | VAL-V03 | Verify that submit remains disabled until critical errors are resolved
- Location: tests\documents\documents.spec.js:83:5

# Error details

```
Error: expect(received).toBeGreaterThan(expected)

Expected: > 0
Received:   0
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
        - /url: http://34.100.179.13:8081/applications/427/documents
      - link "Application Summary" [ref=f10e27] [cursor=pointer]:
        - /url: http://34.100.179.13:8081/applications/427
    - generic [ref=f10e28]:
      - generic [ref=f10e30]:
        - generic [ref=f10e31]: "Application #427"
        - heading "Review Application" [level=1] [ref=f10e32]
        - paragraph [ref=f10e33]: Review the application details and resolve any blocking validation errors before submission.
      - generic [ref=f10e34]:
        - generic [ref=f10e37]:
          - heading "Submission Validation" [level=2] [ref=f10e38]
          - generic [ref=f10e39]: No blocking validation errors found.
          - generic [ref=f10e40]:
            - link "Back to Documents" [ref=f10e41] [cursor=pointer]:
              - /url: http://34.100.179.13:8081/applications/427/documents
            - button "Run Validation" [ref=f10e42] [cursor=pointer]
          - button "Submit Application" [ref=f10e44] [cursor=pointer]
        - generic [ref=f10e47]:
          - heading "Application Snapshot" [level=2] [ref=f10e48]
          - generic [ref=f10e49]:
            - term [ref=f10e50]: Client
            - definition [ref=f10e51]: Qathzamm Lrhbqjj
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
            - definition [ref=f10e67]: $0.00
            - term [ref=f10e68]: Total Modal Premium
            - definition [ref=f10e69]: $98.96
            - term [ref=f10e70]: Status
            - definition [ref=f10e71]: DRAFT
  - contentinfo [ref=f10e72]:
    - generic [ref=f10e73]:
      - generic [ref=f10e74]: TalentFarm QA Automation Lab
      - generic [ref=f10e75]: Insurance Order Entry Demo
```

# Test source

```ts
  1   | "use strict";
  2   | Object.defineProperty(exports, "__esModule", { value: true });
  3   | const { test, asRole, expect } = require("../../fixtures/auth.fixture");
  4   | const { emailOf } = require("../../fixtures/users");
  5   | const { DocumentUploadPage } = require("../../pages/DocumentUploadPage");
  6   | const { ReviewPage } = require("../../pages/ReviewPage");
  7   | const { buildApplication } = require("../../utils/applicationBuilder");
  8   | const { anyMatches, expectApiError } = require("../../utils/assertions");
  9   | const { makeFile } = require("../../utils/fileUploadHelper");
  10  | const { MSG } = require("../../utils/messages");
  11  | test.use(asRole('learner'));
  12  | const agent = () => emailOf('learner');
  13  | test.describe('Document upload', () => {
  14  |     test("TC-DOC-001 | DOC-V01 | Verify that supported documents (PDF, JPG, PNG) can be uploaded", { "tag": ["@regression", "@smoke", "@api", "@documents", "@P1"], "annotation": [{ "type": "validation-id", "description": "DOC-V01" }, { "type": "risk", "description": "R-DOC-02" }, { "type": "priority", "description": "P1" }] }, async ({ page, api }) => {
  15  |         const app = await buildApplication(page, { agentEmail: agent(), upTo: 'draft' });
  16  |         const docs = new DocumentUploadPage(page);
  17  |         await docs.goto(app.id);
  18  |         const uploads = [
  19  |             { type: 'KYC_ID', file: makeFile('pdf', `kyc-${app.id}.pdf`) },
  20  |             { type: 'ADDRESS_PROOF', file: makeFile('jpg', `address-${app.id}.jpg`) },
  21  |             { type: 'INCOME_PROOF', file: makeFile('png', `income-${app.id}.png`) },
  22  |         ];
  23  |         for (const [i, u] of uploads.entries()) {
  24  |             await test.step(`upload ${u.type} (${u.file.name})`, async () => {
  25  |                 await docs.upload(u.type, u.file);
  26  |                 await docs.expectNoErrors();
  27  |                 await expect(docs.rows()).toHaveCount(i + 1);
  28  |                 expect((await docs.rowTexts()).join(' | ')).toContain(u.file.name);
  29  |             });
  30  |         }
  31  |         await test.step('documents persist after reload and are stored by the API', async () => {
  32  |             await docs.goto(app.id);
  33  |             await expect(docs.rows()).toHaveCount(3);
  34  |             if (api.available) {
  35  |                 const res = await api.getApplication(app.id, agent());
  36  |                 expect(res.body?.data?.documents ?? []).toHaveLength(3);
  37  |             }
  38  |         });
  39  |     });
  40  |     test("TC-DOC-002 | DOC-V02 | Verify that unsupported file types are blocked", { "tag": ["@regression", "@api", "@documents", "@P3"], "annotation": [{ "type": "validation-id", "description": "DOC-V02" }, { "type": "risk", "description": "R-DOC-01" }, { "type": "priority", "description": "P3" }] }, async ({ page, api }, testInfo) => {
  41  |         const app = await buildApplication(page, { agentEmail: agent(), upTo: 'draft' });
  42  |         const docs = new DocumentUploadPage(page);
  43  |         // KYC_ID rejection is covered by TC-KYC-002; other document types are used here.
  44  |         const cases = [
  45  |             { type: 'ADDRESS_PROOF', file: makeFile('exe'), hard: true },
  46  |             { type: 'INCOME_PROOF', file: makeFile('txt'), hard: true },
  47  |             { type: 'OTHER', file: makeFile('fake-pdf'), hard: false }, // text content renamed .pdf
  48  |         ];
  49  |         for (const c of cases) {
  50  |             await test.step(`${c.type}: ${c.file.name}`, async () => {
  51  |                 await docs.goto(app.id);
  52  |                 await docs.upload(c.type, c.file);
  53  |                 const rejected = (await docs.rows().count()) === 0;
  54  |                 if (c.hard) {
  55  |                     await docs.expectErrorMatching(MSG.docFormat);
  56  |                     expect(rejected, 'nothing stored').toBe(true);
  57  |                 }
  58  |                 else {
  59  |                     testInfo.annotations.push({ type: 'observation', description: `Text file renamed .pdf rejected: ${rejected}` });
  60  |                     expect.soft(rejected, 'content-based check: a renamed text file should be rejected').toBe(true);
  61  |                 }
  62  |             });
  63  |         }
  64  |     });
  65  |     test("TC-DOC-004 | DOC-V04 | Verify that missing KYC_ID document prevents submission", { "tag": ["@regression", "@api", "@documents", "@P1"], "annotation": [{ "type": "validation-id", "description": "DOC-V04" }, { "type": "risk", "description": "R-KYC-02" }, { "type": "priority", "description": "P1" }] }, async ({ page, api }) => {
  66  |         const app = await buildApplication(page, { agentEmail: agent(), upTo: 'beneficiaries' }); // everything except documents
  67  |         const review = new ReviewPage(page);
  68  |         await review.goto(app.id);
  69  |         expect(anyMatches(await review.errors(), MSG.docRequired), 'missing KYC_ID listed').toBe(true);
  70  |         await expect(review.submitButton).toBeDisabled();
  71  |         await test.step('API submit is rejected and the application stays a draft', async () => {
  72  |             if (!api.available)
  73  |                 return;
  74  |             const res = await api.submit(app.id, agent());
  75  |             expectApiError(res, 422, MSG.docRequired);
  76  |             const status = await api.status(app.id, agent());
  77  |             expect(status.body?.data?.application_status).toBe('DRAFT');
  78  |             expect(status.body?.data?.application_reference_number ?? '').not.toMatch(/^WL\d+/);
  79  |         });
  80  |     });
  81  | });
  82  | test.describe('Validation summary and submit control', () => {
  83  |     test("TC-DOC-007 | VAL-V03 | Verify that submit remains disabled until critical errors are resolved", { "tag": ["@regression", "@api", "@documents", "@P1"], "annotation": [{ "type": "validation-id", "description": "VAL-V03" }, { "type": "risk", "description": "R-WF-02" }, { "type": "priority", "description": "P1" }] }, async ({ page, api }) => {
  84  |         const app = await buildApplication(page, { agentEmail: agent(), upTo: 'beneficiaries' }); // only the KYC_ID document is missing
  85  |         const review = new ReviewPage(page);
  86  |         const docs = new DocumentUploadPage(page);
  87  |         await test.step('one blocking error: Submit is disabled', async () => {
  88  |             await review.goto(app.id);
> 89  |             expect((await review.errors()).length).toBeGreaterThan(0);
      |                                                    ^ Error: expect(received).toBeGreaterThan(expected)
  90  |             await expect(review.submitButton).toBeDisabled();
  91  |         });
  92  |         await test.step('resolving it enables Submit', async () => {
  93  |             await docs.goto(app.id);
  94  |             await docs.upload('KYC_ID', makeFile('pdf', `kyc-${app.id}.pdf`));
  95  |             await docs.expectNoErrors();
  96  |             await review.goto(app.id);
  97  |             await review.runValidation();
  98  |             await expect(review.passedBox).toBeVisible();
  99  |             await expect(review.submitButton).toBeEnabled();
  100 |         });
  101 |         await test.step('API refuses to submit an application that still has errors', async () => {
  102 |             if (!api.available)
  103 |                 return;
  104 |             const incomplete = await buildApplication(page, { agentEmail: agent(), upTo: 'client' });
  105 |             expectApiError(await api.submit(incomplete.id, agent()), 422, MSG.validationFailed);
  106 |             expect((await api.status(incomplete.id, agent())).body?.data?.application_status).toBe('DRAFT');
  107 |         });
  108 |     });
  109 | });
  110 | 
```