# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: beneficiaries\beneficiaries.spec.js >> Beneficiary management >> TC-BEN-002 | BEN-V02 | Verify that primary allocation below 100% is flagged and prevents submission
- Location: tests\beneficiaries\beneficiaries.spec.js:50:5

# Error details

```
Error: 90% must raise "must total exactly 100%"

expect(received).not.toBeNull()

Received: null
```

# Page snapshot

```yaml
- generic [active] [ref=f11e1]:
  - navigation [ref=f11e2]:
    - generic [ref=f11e3]:
      - link "Insurance Order Entry Demo Platform QA Automation Training App" [ref=f11e4] [cursor=pointer]:
        - /url: http://34.100.179.13:8081/dashboard
        - generic [aria-hidden] [ref=f11e5]: IO
        - generic [ref=f11e6]:
          - generic [ref=f11e7]: Insurance Order Entry Demo Platform
          - generic [ref=f11e8]: QA Automation Training App
      - generic [ref=f11e9]:
        - list [ref=f11e10]:
          - listitem [ref=f11e11]:
            - link "Dashboard" [ref=f11e12] [cursor=pointer]:
              - /url: http://34.100.179.13:8081/dashboard
          - listitem [ref=f11e13]:
            - link "Applications" [ref=f11e14] [cursor=pointer]:
              - /url: http://34.100.179.13:8081/applications
          - listitem [ref=f11e15]:
            - link "Products" [ref=f11e16] [cursor=pointer]:
              - /url: http://34.100.179.13:8081/products
          - listitem [ref=f11e17]:
            - link "Support" [ref=f11e18] [cursor=pointer]:
              - /url: http://34.100.179.13:8081/support
        - generic [ref=f11e19]:
          - link "Learner Agent 001" [ref=f11e20] [cursor=pointer]:
            - /url: http://34.100.179.13:8081/profile
          - button "Logout" [ref=f11e22] [cursor=pointer]
  - main [ref=f11e23]:
    - generic [ref=f11e25]:
      - link "← Back to Documents" [ref=f11e26] [cursor=pointer]:
        - /url: http://34.100.179.13:8081/applications/413/documents
      - link "Application Summary" [ref=f11e27] [cursor=pointer]:
        - /url: http://34.100.179.13:8081/applications/413
    - generic [ref=f11e28]:
      - generic [ref=f11e30]:
        - generic [ref=f11e31]: "Application #413"
        - heading "Review Application" [level=1] [ref=f11e32]
        - paragraph [ref=f11e33]: Review the application details and resolve any blocking validation errors before submission.
      - generic [ref=f11e34]:
        - generic [ref=f11e37]:
          - heading "Submission Validation" [level=2] [ref=f11e38]
          - generic [ref=f11e39]: No blocking validation errors found.
          - generic [ref=f11e40]:
            - link "Back to Documents" [ref=f11e41] [cursor=pointer]:
              - /url: http://34.100.179.13:8081/applications/413/documents
            - button "Run Validation" [ref=f11e42] [cursor=pointer]
          - button "Submit Application" [ref=f11e44] [cursor=pointer]
        - generic [ref=f11e47]:
          - heading "Application Snapshot" [level=2] [ref=f11e48]
          - generic [ref=f11e49]:
            - term [ref=f11e50]: Client
            - definition [ref=f11e51]: Qansgwea Kuaxeee
            - term [ref=f11e52]: Calculated Age
            - definition [ref=f11e53]: "41"
            - term [ref=f11e54]: Product
            - definition [ref=f11e55]: SecureLife Whole Life
            - term [ref=f11e56]: Sum Assured
            - definition [ref=f11e57]: $250,000.00
            - term [ref=f11e58]: Premium Payment Frequency
            - definition [ref=f11e59]: MONTHLY
            - term [ref=f11e60]: Premium Payment Term
            - definition [ref=f11e61]: 20 years
            - term [ref=f11e62]: Coverage Term
            - definition [ref=f11e63]: WHOLE_LIFE
            - term [ref=f11e64]: Base Policy Premium
            - definition [ref=f11e65]: $98.96
            - term [ref=f11e66]: Rider Premium
            - definition [ref=f11e67]: $0.00
            - term [ref=f11e68]: Total Modal Premium
            - definition [ref=f11e69]: $98.96
            - term [ref=f11e70]: Status
            - definition [ref=f11e71]: DRAFT
  - contentinfo [ref=f11e72]:
    - generic [ref=f11e73]:
      - generic [ref=f11e74]: TalentFarm QA Automation Lab
      - generic [ref=f11e75]: Insurance Order Entry Demo
```

# Test source

```ts
  1   | "use strict";
  2   | Object.defineProperty(exports, "__esModule", { value: true });
  3   | const { test, asRole, expect } = require("../../fixtures/auth.fixture");
  4   | const { emailOf } = require("../../fixtures/users");
  5   | const { beneficiary, GUARDIAN } = require("../../fixtures/applicationData");
  6   | const { BeneficiaryPage } = require("../../pages/BeneficiaryPage");
  7   | const { ReviewPage } = require("../../pages/ReviewPage");
  8   | const { buildApplication } = require("../../utils/applicationBuilder");
  9   | const { anyMatches } = require("../../utils/assertions");
  10  | const { MSG } = require("../../utils/messages");
  11  | const { dobForAge } = require("../../utils/dataGenerator");
  12  | test.use(asRole('learner'));
  13  | const agent = () => emailOf('learner');
  14  | /** Application positioned at the beneficiaries step (client..riders done through the API, no beneficiaries yet). */
  15  | async function atBeneficiaries(page) {
  16  |     return (await buildApplication(page, { agentEmail: agent(), upTo: 'riders' })).id;
  17  | }
  18  | /** Does the allocation error show on the beneficiaries page, or only on the review page? */
  19  | async function totalErrorSurface(page, ben, id, pattern) {
  20  |     if (pattern.test(await ben.errorsText()))
  21  |         return 'page';
  22  |     const review = new ReviewPage(page);
  23  |     await review.goto(id);
  24  |     return anyMatches(await review.errors(), pattern) ? 'review' : null;
  25  | }
  26  | test.describe('Beneficiary management', () => {
  27  |     test("TC-BEN-001 | BEN-V01 | Verify that add a eligible primary beneficiary (and irrevocable confirmation)", { "tag": ["@regression", "@smoke", "@beneficiary", "@P1"], "annotation": [{ "type": "validation-id", "description": "BEN-V01" }, { "type": "risk", "description": "R-BEN-04, R-BEN-06" }, { "type": "priority", "description": "P1" }] }, async ({ page, api }) => {
  28  |         const id = await atBeneficiaries(page);
  29  |         const ben = new BeneficiaryPage(page);
  30  |         await ben.goto(id);
  31  |         const primary = beneficiary({ allocation: 100 });
  32  |         await ben.addAndExpectRow(primary, 1);
  33  |         await expect(page.getByText(primary.lastName).first()).toBeVisible();
  34  |         expect(await ben.primaryTotal()).toBe(100);
  35  |         await expect(ben.errorSummary).toHaveCount(0);
  36  |         await test.step('extension: irrevocable designation asks for confirmation (browser confirm dialog)', async () => {
  37  |             const secondary = beneficiary({ level: 'SECONDARY', allocation: 50, relationship: 'CHILD', irrevocable: true });
  38  |             const before = await ben.rowIds();
  39  |             const declined = await ben.add(secondary, 'dismiss');
  40  |             expect(declined.dialogs.join(' ')).toMatch(MSG.irrevocableDialog);
  41  |             await ben.goto(id);
  42  |             await expect(ben.rows(), 'declining the confirmation does not save').toHaveCount(1);
  43  |             const accepted = await ben.add(secondary, 'accept');
  44  |             expect(accepted.dialogs.join(' ')).toMatch(MSG.irrevocableDialog);
  45  |             await expect(ben.rows()).toHaveCount(2);
  46  |             const newId = (await ben.rowIds()).find((x) => !before.includes(x));
  47  |             await expect(page.getByTestId(`beneficiary-irrevocable-badge-${newId}`)).toBeVisible();
  48  |         });
  49  |     });
  50  |     test("TC-BEN-002 | BEN-V02 | Verify that primary allocation below 100% is flagged and prevents submission", { "tag": ["@regression", "@beneficiary", "@P1"], "annotation": [{ "type": "validation-id", "description": "BEN-V02" }, { "type": "risk", "description": "R-BEN-01" }, { "type": "priority", "description": "P1" }] }, async ({ page, api }, testInfo) => {
  51  |         const id = await atBeneficiaries(page);
  52  |         const ben = new BeneficiaryPage(page);
  53  |         await ben.goto(id);
  54  |         await ben.addAndExpectRow(beneficiary({ allocation: 60 }), 1);
  55  |         await ben.addAndExpectRow(beneficiary({ allocation: 30, relationship: 'CHILD' }), 2);
  56  |         expect(await ben.primaryTotal()).toBe(90);
  57  |         const where = await totalErrorSurface(page, ben, id, MSG.primaryTotal);
  58  |         testInfo.annotations.push({ type: 'observation', description: `Primary-total error shown on: ${where ?? 'NOWHERE'}` });
> 59  |         expect(where, '90% must raise "must total exactly 100%"').not.toBeNull();
      |                                                                       ^ Error: 90% must raise "must total exactly 100%"
  60  |         await test.step('review page keeps Submit disabled', async () => {
  61  |             const review = new ReviewPage(page);
  62  |             await review.goto(id);
  63  |             await expect(review.submitButton).toBeDisabled();
  64  |         });
  65  |         await test.step('adding 10% fixes the total and clears the error', async () => {
  66  |             await ben.goto(id);
  67  |             await ben.addAndExpectRow(beneficiary({ allocation: 10, relationship: 'SIBLING' }), 3);
  68  |             expect(await ben.primaryTotal()).toBe(100);
  69  |             const review = new ReviewPage(page);
  70  |             await review.goto(id);
  71  |             expect(anyMatches(await review.errors(), MSG.primaryTotal)).toBe(false);
  72  |         });
  73  |     });
  74  |     test("TC-BEN-003 | BEN-V03 | Verify that primary allocation above 100% is blocked", { "tag": ["@regression", "@beneficiary",  "@P1"], "annotation": [{ "type": "validation-id", "description": "BEN-V03" }, { "type": "risk", "description": "R-BEN-01" }, { "type": "priority", "description": "P1" }] }, async ({ page, api }) => {
  75  |         const id = await atBeneficiaries(page);
  76  |         const ben = new BeneficiaryPage(page);
  77  |         await ben.goto(id);
  78  |         await ben.addAndExpectRow(beneficiary({ allocation: 60 }), 1);
  79  |         // The page raises a browser alert() when the new total would exceed 100%.
  80  |         const result = await ben.add(beneficiary({ allocation: 50, relationship: 'CHILD' }));
  81  |         expect(result.dialogs.join(' '), 'over-allocation alert').toMatch(MSG.overAllocationDialog);
  82  |         await ben.goto(id);
  83  |         await expect(ben.rows(), 'second beneficiary was not saved').toHaveCount(1);
  84  |         expect(await ben.primaryTotal()).toBe(60);
  85  |     });
  86  |     test("TC-BEN-004 | BEN-V04 | Verify that secondary allocation is validated separately", { "tag": ["@regression", "@beneficiary", "@P1"], "annotation": [{ "type": "validation-id", "description": "BEN-V04" }, { "type": "risk", "description": "R-BEN-01" }, { "type": "priority", "description": "P1" }] }, async ({ page, api }, testInfo) => {
  87  |         const id = await atBeneficiaries(page);
  88  |         const ben = new BeneficiaryPage(page);
  89  |         await ben.goto(id);
  90  |         await ben.addAndExpectRow(beneficiary({ allocation: 100 }), 1);
  91  |         await ben.addAndExpectRow(beneficiary({ level: 'SECONDARY', allocation: 50, relationship: 'CHILD' }), 2);
  92  |         await ben.addAndExpectRow(beneficiary({ level: 'SECONDARY', allocation: 30, relationship: 'SIBLING' }), 3);
  93  |         expect(await ben.primaryTotal(), 'primary group is complete').toBe(100);
  94  |         expect(await ben.secondaryTotal(), 'secondary group has its own running total').toBe(80);
  95  |         const review = new ReviewPage(page);
  96  |         await review.goto(id);
  97  |         const errors = await review.errors();
  98  |         testInfo.annotations.push({
  99  |             type: 'observation',
  100 |             description: `Review errors with secondary at 80%: ${errors.filter((e) => /benef|alloc|secondary/i.test(e)).join(' | ') || 'none about beneficiaries'}`,
  101 |         });
  102 |         expect(anyMatches(errors, MSG.primaryTotal), 'primary error must not appear while primary is 100%').toBe(false);
  103 |         await test.step('completing the secondary group to 100%', async () => {
  104 |             await ben.goto(id);
  105 |             await ben.addAndExpectRow(beneficiary({ level: 'SECONDARY', allocation: 20, relationship: 'PARENT' }), 4);
  106 |             expect(await ben.secondaryTotal()).toBe(100);
  107 |         });
  108 |     });
  109 |     test("TC-BEN-005 | BEN-V05 | Verify that minor beneficiary requires guardian details", { "tag": ["@regression", "@beneficiary", "@P1"], "annotation": [{ "type": "validation-id", "description": "BEN-V05" }, { "type": "risk", "description": "R-BEN-02" }, { "type": "priority", "description": "P1" }] }, async ({ page, api }) => {
  110 |         const id = await atBeneficiaries(page);
  111 |         const ben = new BeneficiaryPage(page);
  112 |         await ben.goto(id);
  113 |         const minor = beneficiary({ dob: dobForAge(17), allocation: 50, relationship: 'CHILD' });
  114 |         await test.step('minor without guardian is rejected', async () => {
  115 |             await expect(ben.guardianSection).toBeVisible();
  116 |             await ben.add(minor);
  117 |             expect(await ben.errorsText()).toMatch(MSG.guardian);
  118 |             await expect(ben.rows()).toHaveCount(0);
  119 |         });
  120 |         await test.step('minor with guardian details and legal acknowledgement is saved', async () => {
  121 |             await ben.goto(id);
  122 |             await ben.add({ ...minor, guardian: GUARDIAN, legalAcknowledgement: true });
  123 |             await expect(ben.rows()).toHaveCount(1);
  124 |         });
  125 |         await test.step('an adult needs no guardian', async () => {
  126 |             await ben.goto(id);
  127 |             await ben.add(beneficiary({ dob: dobForAge(30), allocation: 50, relationship: 'SIBLING' }));
  128 |             await expect(ben.rows()).toHaveCount(2);
  129 |         });
  130 |     });
  131 |     test("TC-BEN-008 | BEN-V08 | Verify that duplicate beneficiary is blocked", { "tag": ["@regression", "@api", "@beneficiary",  "@P2"], "annotation": [{ "type": "validation-id", "description": "BEN-V08" }, { "type": "risk", "description": "R-BEN-03" }, { "type": "priority", "description": "P2" }] }, async ({ page, api }) => {
  132 |         const id = await atBeneficiaries(page);
  133 |         const ben = new BeneficiaryPage(page);
  134 |         await ben.goto(id);
  135 |         const original = beneficiary({ allocation: 40 });
  136 |         await ben.addAndExpectRow(original, 1);
  137 |         await test.step('same name + date of birth + relationship is blocked', async () => {
  138 |             await ben.add({ ...original });
  139 |             expect(await ben.errorsText(), 'duplicate error').toMatch(MSG.duplicate);
  140 |             await ben.goto(id);
  141 |             await expect(ben.rows()).toHaveCount(1);
  142 |             if (api.available) {
  143 |                 const list = await api.listBeneficiaries(id, agent());
  144 |                 expect(list.body?.data, 'API holds a single record').toHaveLength(1);
  145 |             }
  146 |         });
  147 |         await test.step('a different relationship is a different beneficiary', async () => {
  148 |             await ben.addAndExpectRow({ ...original, relationship: 'CHILD' }, 2);
  149 |         });
  150 |     });
  151 | });
  152 | 
```