# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: workflow\workflow.spec.js >> Submission and status tracking >> TC-WF-007 | WF-V07 | Verify that status page agrees with the status API
- Location: tests\workflow\workflow.spec.js:146:5

# Error details

```
TypeError: api.submit is not a function
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
    - alert [ref=f10e24]: Document uploaded and required document validation passed.
    - generic [ref=f10e26]:
      - link "← Back to Beneficiaries" [ref=f10e27] [cursor=pointer]:
        - /url: http://34.100.179.13:8081/applications/445/beneficiaries
      - link "Application Summary" [ref=f10e28] [cursor=pointer]:
        - /url: http://34.100.179.13:8081/applications/445
    - generic [ref=f10e29]:
      - generic [ref=f10e32]:
        - heading "Upload Document" [level=1] [ref=f10e33]
        - generic [ref=f10e34]:
          - generic [ref=f10e35]:
            - generic [ref=f10e36]: Document Type
            - combobox [ref=f10e37]:
              - option "KYC_ID" [selected]
              - option "ADDRESS_PROOF"
              - option "INCOME_PROOF"
              - option "OTHER"
          - generic [ref=f10e38]:
            - generic [ref=f10e39]: Upload File
            - button "Choose File" [ref=f10e40] [cursor=pointer]
          - generic [ref=f10e41]:
            - generic [ref=f10e42]: Simulated File Name
            - textbox "simulated-upload.pdf" [ref=f10e43]
          - button "Upload Document" [ref=f10e44] [cursor=pointer]
      - generic [ref=f10e47]:
        - heading "Uploaded Documents" [level=2] [ref=f10e48]
        - table [ref=f10e50]:
          - rowgroup [ref=f10e51]:
            - row [ref=f10e52]:
              - columnheader "Type" [ref=f10e53]
              - columnheader "File" [ref=f10e54]
              - columnheader "Size KB" [ref=f10e55]
              - columnheader "Status" [ref=f10e56]
              - columnheader [ref=f10e57]
          - rowgroup [ref=f10e58]:
            - row [ref=f10e59]:
              - cell "KYC_ID" [ref=f10e60]
              - cell "kyc-445.pdf" [ref=f10e61]
              - cell "0" [ref=f10e62]
              - cell "UPLOADED" [ref=f10e63]
              - cell [ref=f10e64]:
                - button "Remove" [ref=f10e66] [cursor=pointer]
        - link "Continue to Review" [ref=f10e67] [cursor=pointer]:
          - /url: http://34.100.179.13:8081/applications/445/review
  - contentinfo [ref=f10e68]:
    - generic [ref=f10e69]:
      - generic [ref=f10e70]: TalentFarm QA Automation Lab
      - generic [ref=f10e71]: Insurance Order Entry Demo
```

# Test source

```ts
  49  |     const confirmation = new ConfirmationPage(page);
  50  |     await confirmation.expectShown();
  51  |     return confirmation.referenceNumber();
  52  | }
  53  | test.describe('Submission and status tracking', () => {
  54  |     test("TC-WF-001 | WF-V01 | Verify that incomplete application is saved as a draft", { "tag": ["@regression", "@workflow", "@P1"], "annotation": [{ "type": "validation-id", "description": "WF-V01" }, { "type": "risk", "description": "R-WF-01" }, { "type": "priority", "description": "P1" }] }, async ({ page }) => {
  55  |         // The app has no separate "Save draft" button: the draft is created at the start page and saved by each Save and Continue.
  56  |         const dashboard = new DashboardPage(page);
  57  |         await dashboard.goto();
  58  |         const id = await dashboard.startNewApplication();
  59  |         await new ClientInformationPage(page).fillAndSave(clientData());
  60  |         await new AddressContactPage(page).fillAndSave(addressData());
  61  |         await dashboard.goto();
  62  |         expect(await dashboard.statusOf(id)).toBe('DRAFT');
  63  |         await expect(page.getByTestId(`application-open-${id}`)).toBeVisible();
  64  |     });
  65  |     test("TC-WF-002 | WF-V02 | Verify that draft can be resumed with the saved data", { "tag": ["@regression", "@api", "@workflow", "@P1"], "annotation": [{ "type": "validation-id", "description": "WF-V02" }, { "type": "risk", "description": "R-WF-01" }, { "type": "priority", "description": "P1" }] }, async ({ page: setupPage, otherAgent, api }) => {
  66  |         const app = await buildApplication(setupPage, { agentEmail: agent(), upTo: 'address' });
  67  |         // A fresh browser context with the same login stands in for "log out, log in again".
  68  |         const page = await otherAgent('learner');
  69  |         const dashboard = new DashboardPage(page);
  70  |         await dashboard.goto();
  71  |         await dashboard.openApplication(app.id);
  72  |         await test.step('client data is restored', async () => {
  73  |             const client = new ClientInformationPage(page);
  74  |             await client.goto(app.id);
  75  |             expect(await client.values()).toMatchObject({
  76  |                 firstName: app.client.firstName, lastName: app.client.lastName, dob: app.client.dob,
  77  |                 gender: app.client.gender, nationality: app.client.nationality, occupation: app.client.occupation,
  78  |             });
  79  |             if (api.available) {
  80  |                 const res = await api.getClient(app.id, agent());
  81  |                 expect(res.body?.data?.first_name).toBe(app.client.firstName);
  82  |             }
  83  |         });
  84  |         await test.step('address and contact data are restored', async () => {
  85  |             const address = new AddressContactPage(page);
  86  |             await address.goto(app.id);
  87  |             await expect(address.resLine1).toHaveValue(app.address.line1);
  88  |             await expect(address.email).toHaveValue(app.address.email);
  89  |             await expect(address.preferredMode).toHaveValue(app.address.preferredMode);
  90  |         });
  91  |     });
  92  |     test("TC-WF-003 | WF-V03 | Verify that a complete application can be submitted end to end", { "tag": ["@regression", "@smoke", "@e2e", "@api", "@workflow", "@P1"], "annotation": [{ "type": "validation-id", "description": "WF-V03" }, { "type": "risk", "description": "R-WF-03" }, { "type": "priority", "description": "P1" }] }, async ({ page, api }) => {
  93  |         test.setTimeout(240000);
  94  |         for (const flow of FLOWS) {
  95  |             await test.step(flow.label, async () => {
  96  |                 const dashboard = new DashboardPage(page);
  97  |                 await dashboard.goto();
  98  |                 const id = await dashboard.startNewApplication();
  99  |                 await new ClientInformationPage(page).fillAndSave(clientData({ dob: dobForAge(flow.clientAge) }));
  100 |                 await new AddressContactPage(page).fillAndSave(addressData());
  101 |                 await new KycFinancialPage(page).fillAndSave(kycData());
  102 |                 await new ProductConfigurationPage(page).fillAndSave(productData(flow.product));
  103 |                 const riders = new RiderSelectionPage(page);
  104 |                 for (const r of flow.riders)
  105 |                     await riders.select(r.key, r.coverage);
  106 |                 await riders.saveAndExpectNext();
  107 |                 const ben = new BeneficiaryPage(page);
  108 |                 for (const [i, b] of flow.beneficiaries.entries())
  109 |                     await ben.addAndExpectRow(b, i + 1);
  110 |                 await ben.continueLink.click();
  111 |                 await expect(page).toHaveURL(/\/documents/);
  112 |                 const docs = new DocumentUploadPage(page);
  113 |                 await docs.upload('KYC_ID', makeFile('pdf', `kyc-${id}.pdf`));
  114 |                 await docs.expectNoErrors();
  115 |                 await docs.continueToReview();
  116 |                 const reference = await submitViaReview(page, id);
  117 |                 expect(reference, 'generated reference number').toMatch(REFERENCE_NUMBER);
  118 |                 const status = new ApplicationStatusPage(page);
  119 |                 await status.goto(id);
  120 |                 expect(await status.currentStatus()).toBe('SUBMITTED');
  121 |                 expect(await status.referenceNumber()).toBe(reference);
  122 |                 await dashboard.goto();
  123 |                 expect(await dashboard.statusOf(id)).toBe('SUBMITTED');
  124 |                 if (api.available) {
  125 |                     const apiStatus = await api.status(id, agent());
  126 |                     expectApiSuccess(apiStatus);
  127 |                     expect(apiStatus.body.data.application_status).toBe('SUBMITTED');
  128 |                     expect(apiStatus.body.data.application_reference_number).toBe(reference);
  129 |                 }
  130 |             });
  131 |         }
  132 |     });
  133 |     test("TC-WF-006 | WF-V06 | Verify that dashboard status refreshes after submission", { "tag": ["@regression", "@api", "@workflow", "@P1"], "annotation": [{ "type": "validation-id", "description": "WF-V06" }, { "type": "risk", "description": "R-WF-03, R-DASH-02" }, { "type": "priority", "description": "P1" }] }, async ({ page, api }) => {
  134 |         const app = await buildApplication(page, { agentEmail: agent() });
  135 |         const dashboard = new DashboardPage(page);
  136 |         await dashboard.goto();
  137 |         expect(await dashboard.statusOf(app.id)).toBe('DRAFT');
  138 |         const draftBefore = await dashboard.summaryCount('draft');
  139 |         const submittedBefore = await dashboard.summaryCount('submitted');
  140 |         await submitViaReview(page, app.id);
  141 |         await dashboard.goto();
  142 |         expect(await dashboard.statusOf(app.id)).toBe('SUBMITTED');
  143 |         expect(await dashboard.summaryCount('draft'), 'draft counter decreases by one').toBe(draftBefore - 1);
  144 |         expect(await dashboard.summaryCount('submitted'), 'submitted counter increases by one').toBe(submittedBefore + 1);
  145 |     });
  146 |     test("TC-WF-007 | WF-V07 | Verify that status page agrees with the status API", { "tag": ["@regression", "@api", "@workflow",  "@P1"], "annotation": [{ "type": "validation-id", "description": "WF-V07" }, { "type": "risk", "description": "R-DASH-02" }, { "type": "priority", "description": "P1" }] }, async ({ page, api }) => {
  147 |       //  test.skip(!api.available, 'REST API is not available on this environment');
  148 |         const app = await buildApplication(page, { agentEmail: agent() });
> 149 |         expectApiSuccess(await api.submit(app.id, agent()));
      |                                    ^ TypeError: api.submit is not a function
  150 |         const apiStatus = (await api.status(app.id, agent())).body.data;
  151 |         const status = new ApplicationStatusPage(page);
  152 |         await status.goto(app.id);
  153 |         expect(await status.currentStatus(), 'current status').toBe(apiStatus.application_status);
  154 |         expect(await status.referenceNumber(), 'reference number').toBe(apiStatus.application_reference_number);
  155 |         await expect(status.historyRows(), 'history rows equal API history entries').toHaveCount(apiStatus.status_history.length);
  156 |     });
  157 | });
  158 | 
```