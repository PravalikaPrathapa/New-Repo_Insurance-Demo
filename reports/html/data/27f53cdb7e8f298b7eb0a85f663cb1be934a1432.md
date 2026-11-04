# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: client-information\client.spec.js >> Client / insured information >> TC-CLI-006 | CLI-P01 | Verify that age boundaries 18 and 65 are accepted
- Location: tests\client-information\client.spec.js:84:5

# Error details

```
Error: calculated age on review page for DOB 2008-11-04 (exactly 18 today)

expect(received).toBe(expected) // Object.is equality

Expected: 18
Received: 19
```

# Page snapshot

```yaml
- generic [active] [ref=f5e1]:
  - navigation [ref=f5e2]:
    - generic [ref=f5e3]:
      - link "Insurance Order Entry Demo Platform QA Automation Training App" [ref=f5e4] [cursor=pointer]:
        - /url: http://34.100.179.13:8081/dashboard
        - generic [aria-hidden] [ref=f5e5]: IO
        - generic [ref=f5e6]:
          - generic [ref=f5e7]: Insurance Order Entry Demo Platform
          - generic [ref=f5e8]: QA Automation Training App
      - generic [ref=f5e9]:
        - list [ref=f5e10]:
          - listitem [ref=f5e11]:
            - link "Dashboard" [ref=f5e12] [cursor=pointer]:
              - /url: http://34.100.179.13:8081/dashboard
          - listitem [ref=f5e13]:
            - link "Applications" [ref=f5e14] [cursor=pointer]:
              - /url: http://34.100.179.13:8081/applications
          - listitem [ref=f5e15]:
            - link "Products" [ref=f5e16] [cursor=pointer]:
              - /url: http://34.100.179.13:8081/products
          - listitem [ref=f5e17]:
            - link "Support" [ref=f5e18] [cursor=pointer]:
              - /url: http://34.100.179.13:8081/support
        - generic [ref=f5e19]:
          - link "Learner Agent 001" [ref=f5e20] [cursor=pointer]:
            - /url: http://34.100.179.13:8081/profile
          - button "Logout" [ref=f5e22] [cursor=pointer]
  - main [ref=f5e23]:
    - alert [ref=f5e24]:
      - generic [ref=f5e25]: "Please review the following:"
      - list [ref=f5e26]:
        - listitem [ref=f5e27]: RESIDENTIAL address is required.
        - listitem [ref=f5e28]: MAILING address is required.
        - listitem [ref=f5e29]: Contact information is required.
        - listitem [ref=f5e30]: KYC details are required.
        - listitem [ref=f5e31]: Financial profile is required.
        - listitem [ref=f5e32]: Compliance declaration is required.
        - listitem [ref=f5e33]: Insurance product must be selected.
    - generic [ref=f5e35]:
      - link "← Back to Documents" [ref=f5e36] [cursor=pointer]:
        - /url: http://34.100.179.13:8081/applications/422/documents
      - link "Application Summary" [ref=f5e37] [cursor=pointer]:
        - /url: http://34.100.179.13:8081/applications/422
    - generic [ref=f5e38]:
      - generic [ref=f5e40]:
        - generic [ref=f5e41]: "Application #422"
        - heading "Review Application" [level=1] [ref=f5e42]
        - paragraph [ref=f5e43]: Review the application details and resolve any blocking validation errors before submission.
      - generic [ref=f5e44]:
        - generic [ref=f5e47]:
          - heading "Submission Validation" [level=2] [ref=f5e48]
          - generic [ref=f5e49]:
            - generic [ref=f5e50]: "Blocking validation errors found:"
            - list [ref=f5e51]:
              - listitem [ref=f5e52]: RESIDENTIAL address is required.
              - listitem [ref=f5e53]: MAILING address is required.
              - listitem [ref=f5e54]: Contact information is required.
              - listitem [ref=f5e55]: KYC details are required.
              - listitem [ref=f5e56]: Financial profile is required.
              - listitem [ref=f5e57]: Compliance declaration is required.
              - listitem [ref=f5e58]: Insurance product must be selected.
          - generic [ref=f5e59]:
            - link "Back to Documents" [ref=f5e60] [cursor=pointer]:
              - /url: http://34.100.179.13:8081/applications/422/documents
            - button "Run Validation" [ref=f5e61] [cursor=pointer]
          - generic [ref=f5e62]:
            - button "Submit Application" [disabled]
        - generic [ref=f5e65]:
          - heading "Application Snapshot" [level=2] [ref=f5e66]
          - generic [ref=f5e67]:
            - term [ref=f5e68]: Client
            - definition [ref=f5e69]: Qawinclc Plewndq
            - term [ref=f5e70]: Calculated Age
            - definition [ref=f5e71]: "19"
            - term [ref=f5e72]: Product
            - definition [ref=f5e73]: Not selected
            - term [ref=f5e74]: Sum Assured
            - definition [ref=f5e75]: Pending
            - term [ref=f5e76]: Premium Payment Frequency
            - definition [ref=f5e77]: MONTHLY
            - term [ref=f5e78]: Premium Payment Term
            - definition [ref=f5e79]: Pending
            - term [ref=f5e80]: Coverage Term
            - definition [ref=f5e81]: WHOLE_LIFE
            - term [ref=f5e82]: Base Policy Premium
            - definition [ref=f5e83]: $0.00
            - term [ref=f5e84]: Rider Premium
            - definition [ref=f5e85]: $0.00
            - term [ref=f5e86]: Total Modal Premium
            - definition [ref=f5e87]: $0.00
            - term [ref=f5e88]: Status
            - definition [ref=f5e89]: DRAFT
  - contentinfo [ref=f5e90]:
    - generic [ref=f5e91]:
      - generic [ref=f5e92]: TalentFarm QA Automation Lab
      - generic [ref=f5e93]: Insurance Order Entry Demo
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
  61  |         expect(where, `DOB ${dob} (age 66) must produce the age-range error (form or review page); app calculated age = ${shown}`).not.toBeNull();
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
> 96  |                 expect(await review.calculatedAge(), `calculated age on review page for DOB ${dob} (exactly ${age} today)`).toBe(age);
      |                                                                                                                             ^ Error: calculated age on review page for DOB 2008-11-04 (exactly 18 today)
  97  |                 expect(anyMatches(await review.errors(), MSG.ageRange), `no age error at ${age}`).toBe(false);
  98  |             });
  99  |         }
  100 |     });
  101 | });
  102 | 
```