# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: client-information\client.spec.js >> Client / insured information >> TC-CLI-004 | CLI-V04 | Verify that dOB above 65 is blocked
- Location: tests\client-information\client.spec.js:51:5

# Error details

```
Error: DOB 1960-11-04 (age 66) must produce the age-range error (form or review page); app calculated age = 67

expect(received).not.toBeNull()

Received: null
```

# Page snapshot

```yaml
- generic [active] [ref=f6e1]:
  - navigation [ref=f6e2]:
    - generic [ref=f6e3]:
      - link "Insurance Order Entry Demo Platform QA Automation Training App" [ref=f6e4] [cursor=pointer]:
        - /url: http://34.100.179.13:8081/dashboard
        - generic [aria-hidden] [ref=f6e5]: IO
        - generic [ref=f6e6]:
          - generic [ref=f6e7]: Insurance Order Entry Demo Platform
          - generic [ref=f6e8]: QA Automation Training App
      - generic [ref=f6e9]:
        - list [ref=f6e10]:
          - listitem [ref=f6e11]:
            - link "Dashboard" [ref=f6e12] [cursor=pointer]:
              - /url: http://34.100.179.13:8081/dashboard
          - listitem [ref=f6e13]:
            - link "Applications" [ref=f6e14] [cursor=pointer]:
              - /url: http://34.100.179.13:8081/applications
          - listitem [ref=f6e15]:
            - link "Products" [ref=f6e16] [cursor=pointer]:
              - /url: http://34.100.179.13:8081/products
          - listitem [ref=f6e17]:
            - link "Support" [ref=f6e18] [cursor=pointer]:
              - /url: http://34.100.179.13:8081/support
        - generic [ref=f6e19]:
          - link "Learner Agent 001" [ref=f6e20] [cursor=pointer]:
            - /url: http://34.100.179.13:8081/profile
          - button "Logout" [ref=f6e22] [cursor=pointer]
  - main [ref=f6e23]:
    - alert [ref=f6e24]:
      - generic [ref=f6e25]: "Please review the following:"
      - list [ref=f6e26]:
        - listitem [ref=f6e27]: Client must not be older than 65 years.
        - listitem [ref=f6e28]: RESIDENTIAL address is required.
        - listitem [ref=f6e29]: MAILING address is required.
        - listitem [ref=f6e30]: Contact information is required.
        - listitem [ref=f6e31]: KYC details are required.
        - listitem [ref=f6e32]: Financial profile is required.
        - listitem [ref=f6e33]: Compliance declaration is required.
        - listitem [ref=f6e34]: Insurance product must be selected.
    - generic [ref=f6e36]:
      - link "← Back to Documents" [ref=f6e37] [cursor=pointer]:
        - /url: http://34.100.179.13:8081/applications/420/documents
      - link "Application Summary" [ref=f6e38] [cursor=pointer]:
        - /url: http://34.100.179.13:8081/applications/420
    - generic [ref=f6e39]:
      - generic [ref=f6e41]:
        - generic [ref=f6e42]: "Application #420"
        - heading "Review Application" [level=1] [ref=f6e43]
        - paragraph [ref=f6e44]: Review the application details and resolve any blocking validation errors before submission.
      - generic [ref=f6e45]:
        - generic [ref=f6e48]:
          - heading "Submission Validation" [level=2] [ref=f6e49]
          - generic [ref=f6e50]:
            - generic [ref=f6e51]: "Blocking validation errors found:"
            - list [ref=f6e52]:
              - listitem [ref=f6e53]: Client must not be older than 65 years.
              - listitem [ref=f6e54]: RESIDENTIAL address is required.
              - listitem [ref=f6e55]: MAILING address is required.
              - listitem [ref=f6e56]: Contact information is required.
              - listitem [ref=f6e57]: KYC details are required.
              - listitem [ref=f6e58]: Financial profile is required.
              - listitem [ref=f6e59]: Compliance declaration is required.
              - listitem [ref=f6e60]: Insurance product must be selected.
          - generic [ref=f6e61]:
            - link "Back to Documents" [ref=f6e62] [cursor=pointer]:
              - /url: http://34.100.179.13:8081/applications/420/documents
            - button "Run Validation" [ref=f6e63] [cursor=pointer]
          - generic [ref=f6e64]:
            - button "Submit Application" [disabled]
        - generic [ref=f6e67]:
          - heading "Application Snapshot" [level=2] [ref=f6e68]
          - generic [ref=f6e69]:
            - term [ref=f6e70]: Client
            - definition [ref=f6e71]: Qaozfbhr Oiedrjk
            - term [ref=f6e72]: Calculated Age
            - definition [ref=f6e73]: "67"
            - term [ref=f6e74]: Product
            - definition [ref=f6e75]: Not selected
            - term [ref=f6e76]: Sum Assured
            - definition [ref=f6e77]: Pending
            - term [ref=f6e78]: Premium Payment Frequency
            - definition [ref=f6e79]: MONTHLY
            - term [ref=f6e80]: Premium Payment Term
            - definition [ref=f6e81]: Pending
            - term [ref=f6e82]: Coverage Term
            - definition [ref=f6e83]: WHOLE_LIFE
            - term [ref=f6e84]: Base Policy Premium
            - definition [ref=f6e85]: $0.00
            - term [ref=f6e86]: Rider Premium
            - definition [ref=f6e87]: $0.00
            - term [ref=f6e88]: Total Modal Premium
            - definition [ref=f6e89]: $0.00
            - term [ref=f6e90]: Status
            - definition [ref=f6e91]: DRAFT
  - contentinfo [ref=f6e92]:
    - generic [ref=f6e93]:
      - generic [ref=f6e94]: TalentFarm QA Automation Lab
      - generic [ref=f6e95]: Insurance Order Entry Demo
```

# Test source

```ts
  1   | "use strict";
  2   | Object.defineProperty(exports, "__esModule", { value: true });
  3   | const { test, asRole, expect } = require("../../fixtures/auth.fixture");
  4   | const { emailOf } = require("../../fixtures/users");
  5   | const { clientData } = require("../../fixtures/applicationData");
  6   | const { DashboardPage } = require("../../pages/DashboardPage");
  7   | const { ClientInformationPage } = require("../../pages/ClientInformationPage");
  8   | const { ReviewPage } = require("../../pages/ReviewPage");
  9   | const { buildApplication } = require("../../utils/applicationBuilder");
  10  | const { ageErrorSurface } = require("../../utils/flows");
  11  | const { MSG } = require("../../utils/messages");
  12  | const { dobForAge, futureDate, toIso } = require("../../utils/dataGenerator");
  13  | const { anyMatches } = require("../../utils/assertions");
  14  | test.use(asRole('learner'));
  15  | /** Fast set-up: an empty draft created through the API; the UI is then used for the behaviour under test. */
  16  | async function emptyDraft(page) {
  17  |     return (await buildApplication(page, { agentEmail: emailOf('learner'), upTo: 'draft' })).id;
  18  | }
  19  | /** Calculated age the app shows on the review page. Diagnostic only: it makes an age-rule failure self-explanatory. */
  20  | async function shownAge(page, applicationId) {
  21  |     const review = new ReviewPage(page);
  22  |     await review.goto(applicationId);
  23  |     return review.calculatedAge().catch(() => 'n/a');
  24  | }
  25  | test.describe('Client / insured information', () => {
  26  |     test("TC-CLI-001 | CLI-V01 | Verify that an agent is able to provide valid insured information", { "tag": ["@regression", "@smoke", "@client", "@P1"], "annotation": [{ "type": "validation-id", "description": "CLI-V01" }, { "type": "risk", "description": "R-CLI-03, R-CLI-05" }, { "type": "priority", "description": "P1" }] }, async ({ page, api }) => {
  27  |         const dashboard = new DashboardPage(page);
  28  |         await dashboard.goto();
  29  |         const id = await dashboard.startNewApplication(); // full UI flow: dashboard -> start -> create draft
  30  |         const client = new ClientInformationPage(page);
  31  |         const data = clientData();
  32  |         await client.fillAndSave(data);
  33  |         await client.expectNoErrors();
  34  |         await test.step('saved values equal the entered values (API read-back)', async () => {
  35  |             await client.goto(id);
  36  |             expect(await client.values()).toMatchObject({ firstName: data.firstName, lastName: data.lastName, dob: data.dob });
  37  |         });
  38  |     });
  39  |     test("TC-CLI-003 | CLI-V03 | Verify that dOB below 18 is blocked", { "tag": ["@regression", "@client", "@P1"], "annotation": [{ "type": "validation-id", "description": "CLI-V03" }, { "type": "risk", "description": "R-CLI-01" }, { "type": "priority", "description": "P1" }] }, async ({ page, api }, testInfo) => {
  40  |         const id = await emptyDraft(page);
  41  |         const client = new ClientInformationPage(page);
  42  |         await client.goto(id);
  43  |         const dob = dobForAge(18, 1); // 17 years 364 days
  44  |         await client.fill(clientData({ dob }));
  45  |         await client.save();
  46  |         const where = await ageErrorSurface(page, id);
  47  |         testInfo.annotations.push({ type: 'observation', description: `Age error shown on: ${where ?? 'NOWHERE'}` });
  48  |         const shown = where === null ? await shownAge(page, id) : 'n/a';
  49  |         expect(where, `DOB ${dob} (17y364d) must produce the age-range error (form or review page); app calculated age = ${shown}`).not.toBeNull();
  50  |     });
  51  |     test("TC-CLI-004 | CLI-V04 | Verify that dOB above 65 is blocked", { "tag": ["@regression", "@client",  "@P1"], "annotation": [{ "type": "validation-id", "description": "CLI-V04" }, { "type": "risk", "description": "R-CLI-01" }, { "type": "priority", "description": "P1" }] }, async ({ page, api }, testInfo) => {
  52  |         const id = await emptyDraft(page);
  53  |         const client = new ClientInformationPage(page);
  54  |         await client.goto(id);
  55  |         const dob = dobForAge(66);
  56  |         await client.fill(clientData({ dob }));
  57  |         await client.save();
  58  |         const where = await ageErrorSurface(page, id);
  59  |         testInfo.annotations.push({ type: 'observation', description: `Age error shown on: ${where ?? 'NOWHERE'}` });
  60  |         const shown = where === null ? await shownAge(page, id) : 'n/a';
> 61  |         expect(where, `DOB ${dob} (age 66) must produce the age-range error (form or review page); app calculated age = ${shown}`).not.toBeNull();
      |                                                                                                                                        ^ Error: DOB 1960-11-04 (age 66) must produce the age-range error (form or review page); app calculated age = 67
  62  |     });
  63  |     test("TC-CLI-005 | CLI-V05 | Verify that future DOB is blocked", { "tag": ["@regression", "@client", "@P2"], "annotation": [{ "type": "validation-id", "description": "CLI-V05" }, { "type": "risk", "description": "R-CLI-02" }, { "type": "priority", "description": "P2" }] }, async ({ page, api }) => {
  64  |         const id = await emptyDraft(page);
  65  |         const client = new ClientInformationPage(page);
  66  |         for (const dob of [futureDate(1), futureDate(3650)]) {
  67  |             await test.step(`DOB ${dob}`, async () => {
  68  |                 await client.goto(id);
  69  |                 await client.fill(clientData({ dob }));
  70  |                 await client.save();
  71  |                 await expect(page).toHaveURL(/\/client/);
  72  |                 await client.expectErrorMatching(MSG.futureDob);
  73  |             });
  74  |         }
  75  |         await test.step('nothing in the future was stored', async () => {
  76  |             if (!api.available)
  77  |                 return; // the REST API is not reachable on this environment: the UI checks above already ran
  78  |             const res = await api.getClient(id, emailOf('learner'));
  79  |             const stored = res.body?.data?.date_of_birth;
  80  |             if (stored)
  81  |                 expect(String(stored).slice(0, 10) <= toIso(new Date())).toBe(true);
  82  |         });
  83  |     });
  84  |     test("TC-CLI-006 | CLI-P01 | Verify that age boundaries 18 and 65 are accepted", { "tag": ["@regression", "@client", "@P1"], "annotation": [{ "type": "validation-id", "description": "CLI-P01" }, { "type": "risk", "description": "R-CLI-01" }, { "type": "priority", "description": "P1" }] }, async ({ page, api }) => {
  85  |         const id = await emptyDraft(page);
  86  |         const client = new ClientInformationPage(page);
  87  |         const review = new ReviewPage(page);
  88  |         for (const age of [18, 65]) {
  89  |             await test.step(`age exactly ${age}`, async () => {
  90  |                 await client.goto(id);
  91  |                 const dob = dobForAge(age);
  92  |                 await client.fill(clientData({ dob }));
  93  |                 await client.save();
  94  |                 await expect(page, `age ${age} is accepted and the flow moves on`).toHaveURL(/address-contact/);
  95  |                 await review.goto(id);
  96  |                 expect(await review.calculatedAge(), `calculated age on review page for DOB ${dob} (exactly ${age} today)`).toBe(age);
  97  |                 expect(anyMatches(await review.errors(), MSG.ageRange), `no age error at ${age}`).toBe(false);
  98  |             });
  99  |         }
  100 |     });
  101 | });
  102 | 
```