# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: beneficiaries\beneficiaries.spec.js >> Beneficiary management >> TC-BEN-008 | BEN-V08 | Verify that duplicate beneficiary is blocked
- Location: tests\beneficiaries\beneficiaries.spec.js:131:5

# Error details

```
Error: duplicate error

expect(received).toMatch(expected)

Expected pattern: /duplicate|already exists|already added/i
Received string:  ""
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
    - alert [ref=f10e24]: Beneficiary saved.
    - generic [ref=f10e26]:
      - link "← Back to Riders" [ref=f10e27] [cursor=pointer]:
        - /url: http://34.100.179.13:8081/applications/417/riders
      - link "Application Summary" [ref=f10e28] [cursor=pointer]:
        - /url: http://34.100.179.13:8081/applications/417
    - generic [ref=f10e29]:
      - generic [ref=f10e30]:
        - generic [ref=f10e31]:
          - generic [ref=f10e32]: "Application #417"
          - heading "Beneficiaries" [level=1] [ref=f10e33]
          - paragraph [ref=f10e34]: Add or update primary and secondary beneficiaries for the policy.
        - link "Back to Application" [ref=f10e35] [cursor=pointer]:
          - /url: http://34.100.179.13:8081/applications/417
      - generic [ref=f10e36]: "Primary allocation: 80.00% | Secondary allocation: 0.00%"
      - generic [ref=f10e37]:
        - strong [ref=f10e39]: Existing Beneficiaries
        - table [ref=f10e42]:
          - rowgroup [ref=f10e43]:
            - row [ref=f10e44]:
              - columnheader "Level" [ref=f10e45]
              - columnheader "Type" [ref=f10e46]
              - columnheader "Name" [ref=f10e47]
              - columnheader "Designation" [ref=f10e48]
              - columnheader "Relationship" [ref=f10e49]
              - columnheader "Age" [ref=f10e50]
              - columnheader "Allocation" [ref=f10e51]
              - columnheader "Email" [ref=f10e52]
              - columnheader "Phone" [ref=f10e53]
              - columnheader "Action" [ref=f10e54]
          - rowgroup [ref=f10e55]:
            - row [ref=f10e56]:
              - cell "PRIMARY" [ref=f10e57]
              - cell "INDIVIDUAL" [ref=f10e58]
              - cell "Jane Pyzand" [ref=f10e59]
              - cell "Revocable" [ref=f10e60]
              - cell "SPOUSE" [ref=f10e62]
              - cell "38" [ref=f10e63]
              - cell "40.00%" [ref=f10e64]
              - cell "-" [ref=f10e65]
              - cell "-" [ref=f10e66]
              - cell [ref=f10e67]:
                - link "Edit" [ref=f10e68] [cursor=pointer]:
                  - /url: http://34.100.179.13:8081/applications/417/beneficiaries?edit=244
                - button "Remove" [ref=f10e70] [cursor=pointer]
            - row [ref=f10e71]:
              - cell "PRIMARY" [ref=f10e72]
              - cell "INDIVIDUAL" [ref=f10e73]
              - cell "Jane Pyzand" [ref=f10e74]
              - cell "Revocable" [ref=f10e75]
              - cell "SPOUSE" [ref=f10e77]
              - cell "38" [ref=f10e78]
              - cell "40.00%" [ref=f10e79]
              - cell "-" [ref=f10e80]
              - cell "-" [ref=f10e81]
              - cell [ref=f10e82]:
                - link "Edit" [ref=f10e83] [cursor=pointer]:
                  - /url: http://34.100.179.13:8081/applications/417/beneficiaries?edit=245
                - button "Remove" [ref=f10e85] [cursor=pointer]
      - generic [ref=f10e86]:
        - generic [ref=f10e87]:
          - strong [ref=f10e89]: Add Beneficiary
          - generic [ref=f10e91]:
            - generic [ref=f10e92]:
              - generic [ref=f10e93]: Beneficiary Level *
              - combobox [ref=f10e94]:
                - option "Select" [selected]
                - option "Primary"
                - option "Secondary"
            - generic [ref=f10e95]:
              - generic [ref=f10e96]: Beneficiary Type *
              - combobox [ref=f10e97]:
                - option "Individual" [selected]
                - option "Trust"
                - option "Organization"
            - generic [ref=f10e98]:
              - generic [ref=f10e99]: Relationship *
              - combobox [ref=f10e100]:
                - option "Select" [selected]
                - option "Spouse"
                - option "Child"
                - option "Parent"
                - option "Sibling"
                - option "Trust"
                - option "Organization"
                - option "Other"
            - generic [ref=f10e101]:
              - generic [ref=f10e102]: Allocation % *
              - spinbutton [ref=f10e103]: "100"
            - generic [ref=f10e104]:
              - generic [ref=f10e105]: Beneficiary Designation *
              - combobox [ref=f10e106]:
                - option "Revocable" [selected]
                - option "Irrevocable"
              - generic [ref=f10e107]: Irrevocable beneficiaries cannot be changed or removed in this demo without beneficiary consent.
            - generic [ref=f10e108]:
              - generic [ref=f10e109]: Phone
              - textbox "(212) 555-1212" [ref=f10e110]
            - generic [ref=f10e111]:
              - generic [ref=f10e112]: Email
              - textbox [ref=f10e113]
            - generic [ref=f10e114]:
              - generic [ref=f10e115]: Country
              - textbox [ref=f10e116]: US
        - generic [ref=f10e117]:
          - strong [ref=f10e119]: Individual Beneficiary Details
          - generic [ref=f10e121]:
            - generic [ref=f10e122]:
              - generic [ref=f10e123]: First Name *
              - textbox [ref=f10e124]
            - generic [ref=f10e125]:
              - generic [ref=f10e126]: Middle Name
              - textbox [ref=f10e127]
            - generic [ref=f10e128]:
              - generic [ref=f10e129]: Last Name *
              - textbox [ref=f10e130]
            - generic [ref=f10e131]:
              - generic [ref=f10e132]: Date of Birth *
              - textbox [ref=f10e133]
            - generic [ref=f10e134]:
              - generic [ref=f10e135]: Gender
              - combobox [ref=f10e136]:
                - option "Select" [selected]
                - option "Male"
                - option "Female"
                - option "Non-binary"
        - generic [ref=f10e137]:
          - strong [ref=f10e139]: Address Details
          - generic [ref=f10e141]:
            - generic [ref=f10e142]:
              - generic [ref=f10e143]: Address Line 1
              - textbox [ref=f10e144]
            - generic [ref=f10e145]:
              - generic [ref=f10e146]: City
              - textbox [ref=f10e147]
            - generic [ref=f10e148]:
              - generic [ref=f10e149]: State
              - textbox [ref=f10e150]
            - generic [ref=f10e151]:
              - generic [ref=f10e152]: Postal Code
              - textbox [ref=f10e153]
        - generic [ref=f10e154]:
          - strong [ref=f10e156]: Minor Beneficiary Guardian Details
          - generic [ref=f10e158]:
            - generic [ref=f10e159]:
              - generic [ref=f10e160]: Guardian Name
              - textbox [ref=f10e161]
            - generic [ref=f10e162]:
              - generic [ref=f10e163]: Guardian Relationship
              - textbox [ref=f10e164]
            - generic [ref=f10e165]:
              - generic [ref=f10e166]: Guardian Contact
              - textbox [ref=f10e167]
            - generic [ref=f10e168]:
              - generic [ref=f10e169]: Guardian Address
              - textbox [ref=f10e170]
            - generic [ref=f10e172]:
              - checkbox "Legal acknowledgement completed for minor beneficiary" [ref=f10e173]
              - generic [ref=f10e174]: Legal acknowledgement completed for minor beneficiary
        - generic [ref=f10e175]:
          - link "Back" [ref=f10e176] [cursor=pointer]:
            - /url: http://34.100.179.13:8081/applications/417/riders
          - generic [ref=f10e177]:
            - button "Save Beneficiary" [ref=f10e178] [cursor=pointer]
            - link "Continue" [ref=f10e179] [cursor=pointer]:
              - /url: http://34.100.179.13:8081/applications/417/documents
  - contentinfo [ref=f10e180]:
    - generic [ref=f10e181]:
      - generic [ref=f10e182]: TalentFarm QA Automation Lab
      - generic [ref=f10e183]: Insurance Order Entry Demo
```

# Test source

```ts
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
  59  |         expect(where, '90% must raise "must total exactly 100%"').not.toBeNull();
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
> 139 |             expect(await ben.errorsText(), 'duplicate error').toMatch(MSG.duplicate);
      |                                                               ^ Error: duplicate error
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