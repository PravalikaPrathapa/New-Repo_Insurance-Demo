# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: riders\riders.spec.js >> Rider selection >> TC-RID-003 | RIDER-V03 | Verify that age-ineligible rider cannot be added
- Location: tests\riders\riders.spec.js:81:5

# Error details

```
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /\/riders/
Received string:  "http://34.100.179.13:8081/applications/438/beneficiaries"
Timeout: 10000ms

Call log:
  - Expect "toHaveURL" with timeout 10000ms
    23 × locator resolved to <html lang="en">…</html>
       - unexpected value "http://34.100.179.13:8081/applications/438/beneficiaries"

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
  - link "Learner Agent 001":
    - /url: http://34.100.179.13:8081/profile
  - button "Logout"
- main:
  - alert: Rider selection saved.
  - link "← Back to Riders":
    - /url: http://34.100.179.13:8081/applications/438/riders
  - link "Application Summary":
    - /url: http://34.100.179.13:8081/applications/438
  - text: "Application #438"
  - heading "Beneficiaries" [level=1]
  - paragraph: Add or update primary and secondary beneficiaries for the policy.
  - link "Back to Application":
    - /url: http://34.100.179.13:8081/applications/438
  - text: "Primary allocation: 0.00% | Secondary allocation: 0.00% No beneficiary has been added. Estate assignment will apply by default if no beneficiary is named."
  - strong: Existing Beneficiaries
  - table:
    - rowgroup:
      - row "Level Type Name Designation Relationship Age Allocation Email Phone Action":
        - columnheader "Level"
        - columnheader "Type"
        - columnheader "Name"
        - columnheader "Designation"
        - columnheader "Relationship"
        - columnheader "Age"
        - columnheader "Allocation"
        - columnheader "Email"
        - columnheader "Phone"
        - columnheader "Action"
    - rowgroup:
      - row "No beneficiaries added yet. Estate assignment will apply by default.":
        - cell "No beneficiaries added yet. Estate assignment will apply by default."
  - strong: Add Beneficiary
  - text: Beneficiary Level *
  - combobox:
    - option "Select" [selected]
    - option "Primary"
    - option "Secondary"
  - text: Beneficiary Type *
  - combobox:
    - option "Individual" [selected]
    - option "Trust"
    - option "Organization"
  - text: Relationship *
  - combobox:
    - option "Select" [selected]
    - option "Spouse"
    - option "Child"
    - option "Parent"
    - option "Sibling"
    - option "Trust"
    - option "Organization"
    - option "Other"
  - text: Allocation % *
  - spinbutton: "100"
  - text: Beneficiary Designation *
  - combobox:
    - option "Revocable" [selected]
    - option "Irrevocable"
  - text: Irrevocable beneficiaries cannot be changed or removed in this demo without beneficiary consent. Phone
  - textbox "(212) 555-1212"
  - text: Email
  - textbox
  - text: Country
  - textbox: US
  - strong: Individual Beneficiary Details
  - text: First Name *
  - textbox
  - text: Middle Name
  - textbox
  - text: Last Name *
  - textbox
  - text: Date of Birth *
  - textbox
  - text: Gender
  - combobox:
    - option "Select" [selected]
    - option "Male"
    - option "Female"
    - option "Non-binary"
  - strong: Address Details
  - text: Address Line 1
  - textbox
  - text: City
  - textbox
  - text: State
  - textbox
  - text: Postal Code
  - textbox
  - strong: Minor Beneficiary Guardian Details
  - text: Guardian Name
  - textbox
  - text: Guardian Relationship
  - textbox
  - text: Guardian Contact
  - textbox
  - text: Guardian Address
  - textbox
  - checkbox "Legal acknowledgement completed for minor beneficiary"
  - text: Legal acknowledgement completed for minor beneficiary
  - link "Back":
    - /url: http://34.100.179.13:8081/applications/438/riders
  - button "Save Beneficiary"
  - link "Continue":
    - /url: http://34.100.179.13:8081/applications/438/documents
- contentinfo: TalentFarm QA Automation Lab Insurance Order Entry Demo
```

# Test source

```ts
  1   | "use strict";
  2   | Object.defineProperty(exports, "__esModule", { value: true });
  3   | const { test, asRole, expect } = require("../../fixtures/auth.fixture");
  4   | const { emailOf } = require("../../fixtures/users");
  5   | const { product, RIDERS } = require("../../fixtures/referenceData");
  6   | const { ReviewPage } = require("../../pages/ReviewPage");
  7   | const { RiderSelectionPage } = require("../../pages/RiderSelectionPage");
  8   | const { buildApplication } = require("../../utils/applicationBuilder");
  9   | const { expectApiError } = require("../../utils/assertions");
  10  | const { MSG } = require("../../utils/messages");
  11  | const { periodPremium, totalPremium } = require("../../utils/premium");
  12  | const { dobForAge } = require("../../utils/dataGenerator");
  13  | test.use(asRole('learner'));
  14  | const agent = () => emailOf('learner');
  15  | const BASE = product('WL_SECURE_BASIC');
  16  | const FACE = 250000;
  17  | /** Application with client age 40, SecureLife 250,000 monthly saved, positioned at the riders step. */
  18  | async function atRiders(page, opts = {}) {
  19  |     return buildApplication(page, {
  20  |         agentEmail: agent(), upTo: 'product',
  21  |         client: opts.age ? { dob: dobForAge(opts.age) } : undefined,
  22  |         product: { productCode: BASE.code, faceValue: opts.face ?? FACE, frequency: 'MONTHLY' },
  23  |     });
  24  | }
  25  | async function riderPayload(api, picks) {
  26  |     const out = [];
  27  |     for (const p of picks)
  28  |         out.push({ rider_id: await api.riderId(RIDERS[p.key].code), coverage_amount: p.coverage });
  29  |     return out;
  30  | }
  31  | test.describe('Rider selection', () => {
  32  |     test("TC-RID-001 | RIDER-V01 | Verify that an agent is able to add an eligible protection rider (ADB)", { "tag": ["@regression", "@smoke", "@rider", "@P2"], "annotation": [{ "type": "validation-id", "description": "RIDER-V01" }, { "type": "risk", "description": "R-RID-05" }, { "type": "priority", "description": "P2" }] }, async ({ page, api }) => {
  33  |         const app = await atRiders(page);
  34  |         const riders = new RiderSelectionPage(page);
  35  |         await riders.goto(app.id);
  36  |         await riders.select('ADB', FACE);
  37  |         await riders.saveAndExpectNext();
  38  |         await test.step('rider is stored and itemised in the premium', async () => {
  39  |             await riders.goto(app.id);
  40  |             expect(await riders.isSelected('ADB')).toBe(true);
  41  |             const adb = periodPremium(FACE, RIDERS.ADB.ratePer1000, 'MONTHLY'); // 17.71
  42  |             expect(await riders.summaryText()).toContain(adb.toFixed(2));
  43  |             const total = totalPremium({ face: FACE, rate: BASE.ratePer1000 }, [{ coverage: FACE, rate: RIDERS.ADB.ratePer1000 }], 'MONTHLY'); // 116.67
  44  |             if (api.available) {
  45  |                 const stored = Number((await api.getApplication(app.id, agent())).body?.data?.total_premium);
  46  |                 expect(stored, 'API total premium includes the rider').toBe(total);
  47  |             }
  48  |             await new ReviewPage(page).goto(app.id);
  49  |             expect(await new ReviewPage(page).totalPremium(), 'review page total premium includes the rider').toBe(total);
  50  |         });
  51  |     });
  52  |     test("TC-RID-002 | RIDER-V02 | Verify that rider coverage cannot exceed the base coverage amount", { "tag": ["@regression", "@api", "@rider", "@P1"], "annotation": [{ "type": "validation-id", "description": "RIDER-V02" }, { "type": "risk", "description": "R-RID-01" }, { "type": "priority", "description": "P1" }] }, async ({ page, api }) => {
  53  |         const riders = new RiderSelectionPage(page);
  54  |         await test.step('ADB at face value + 1 is rejected, at face value accepted', async () => {
  55  |             const app = await atRiders(page);
  56  |             await riders.goto(app.id);
  57  |             await riders.select('ADB', FACE + 1);
  58  |             await riders.save();
  59  |             await expect(page).toHaveURL(/\/riders/);
  60  |             await riders.expectErrorMatching(MSG.riderAboveBase);
  61  |             await riders.goto(app.id);
  62  |             await riders.select('ADB', FACE);
  63  |             await riders.saveAndExpectNext();
  64  |         });
  65  |         await test.step('API rejects the same request', async () => {
  66  |             if (!api.available)
  67  |                 return;
  68  |             const app = await atRiders(page);
  69  |             const res = await api.saveRiders(app.id, agent(), await riderPayload(api, [{ key: 'ADB', coverage: FACE + 1 }]));
  70  |             expectApiError(res, 422, MSG.riderAboveBase);
  71  |         });
  72  |         await test.step('Critical Illness is capped at 500,000 even when the base is larger', async () => {
  73  |             const app = await atRiders(page, { face: 1000000 });
  74  |             await riders.goto(app.id);
  75  |             await riders.select('CI', 500001);
  76  |             await riders.save();
  77  |             await expect(page).toHaveURL(/\/riders/);
  78  |             await riders.expectErrorMatching(MSG.riderAboveMax);
  79  |         });
  80  |     });
  81  |     test("TC-RID-003 | RIDER-V03 | Verify that age-ineligible rider cannot be added", { "tag": ["@regression", "@api", "@rider", "@P2"], "annotation": [{ "type": "validation-id", "description": "RIDER-V03" }, { "type": "risk", "description": "R-RID-03" }, { "type": "priority", "description": "P2" }] }, async ({ page, api }) => {
  82  |         // Waiver of Premium - Disability is for ages 18-55; the client below is 56.
  83  |         const app = await atRiders(page, { age: 56 });
  84  |         const riders = new RiderSelectionPage(page);
  85  |         await riders.goto(app.id);
  86  |         await riders.select('WAIVER_DISABILITY', FACE);
  87  |         await riders.save();
> 88  |         await expect(page).toHaveURL(/\/riders/);
      |                            ^ Error: expect(page).toHaveURL(expected) failed
  89  |         await riders.expectErrorMatching(MSG.riderAge);
  90  |         await test.step('API rejects it as well', async () => {
  91  |             if (!api.available)
  92  |                 return;
  93  |             const res = await api.saveRiders(app.id, agent(), await riderPayload(api, [{ key: 'WAIVER_DISABILITY', coverage: FACE }]));
  94  |             expectApiError(res, 422, MSG.riderAge);
  95  |         });
  96  |         await test.step('an eligible age (50) is accepted', async () => {
  97  |             const eligible = await atRiders(page, { age: 50 });
  98  |             await riders.goto(eligible.id);
  99  |             await riders.select('WAIVER_DISABILITY', FACE);
  100 |             await riders.saveAndExpectNext();
  101 |         });
  102 |     });
  103 |     test("TC-RID-007 | RIDER-V07 | Verify that rider premiums are listed separately in the total premium", { "tag": ["@regression", "@api", "@rider",  "@P2"], "annotation": [{ "type": "validation-id", "description": "RIDER-V07" }, { "type": "risk", "description": "R-RID-05" }, { "type": "priority", "description": "P2" }] }, async ({ page, api }) => {
  104 |         const app = await atRiders(page);
  105 |         const riders = new RiderSelectionPage(page);
  106 |         const picks = [{ key: 'ADB', coverage: FACE }, { key: 'HOSPITAL', coverage: 100000 }];
  107 |         const rate = (k) => RIDERS[k].ratePer1000;
  108 |         await riders.goto(app.id);
  109 |         for (const p of picks)
  110 |             await riders.select(p.key, p.coverage);
  111 |         await riders.saveAndExpectNext();
  112 |         await test.step('itemised premiums and total with both riders', async () => {
  113 |             await riders.goto(app.id);
  114 |             const text = await riders.summaryText();
  115 |             // The summary box shows ONE combined rider premium ("Current rider premium: $23.13"), not one line per rider,
  116 |             // so assert the sum of the individually rounded rider premiums (ADB 17.71 + Hospital Cash 5.42).
  117 |             const riderSum = picks.reduce((sum, p) => sum + periodPremium(p.coverage, rate(p.key), 'MONTHLY'), 0);
  118 |             expect(text, 'combined rider premium in the summary').toContain(riderSum.toFixed(2));
  119 |             test.info().annotations.push({ type: 'observation', description: `Rider summary text: "${text}". Per-rider premiums are not itemised in this box.` });
  120 |             const total = totalPremium({ face: FACE, rate: BASE.ratePer1000 }, picks.map((p) => ({ coverage: p.coverage, rate: rate(p.key) })), 'MONTHLY');
  121 |             if (api.available)
  122 |                 expect(Number((await api.getApplication(app.id, agent())).body?.data?.total_premium), 'API total').toBe(total);
  123 |         });
  124 |         await test.step('removing a rider lowers the total', async () => {
  125 |             await riders.deselect('HOSPITAL');
  126 |             await riders.saveAndExpectNext();
  127 |             const total = totalPremium({ face: FACE, rate: BASE.ratePer1000 }, [{ coverage: FACE, rate: rate('ADB') }], 'MONTHLY');
  128 |             if (api.available)
  129 |                 expect(Number((await api.getApplication(app.id, agent())).body?.data?.total_premium), 'API total after removal').toBe(total);
  130 |         });
  131 |     });
  132 | });
  133 | 
```