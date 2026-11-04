# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api\api.spec.js >> API >> TC-API-010 | API-P02 | Verify that login API status codes and response schema
- Location: tests\api\api.spec.js:149:5

# Error details

```
TypeError: api.login is not a function
```

# Test source

```ts
  52  |             for (const [label, client] of [['no key', noKey], ['wrong key', wrongKey]]) {
  53  |                 await test.step(label, async () => {
  54  |                     const list = await client.listApplications(agent());
  55  |                     expectApiError(list, 401, MSG.unauthorized);
  56  |                     const submit = await client.submit(1, agent());
  57  |                     expectApiError(submit, 401, MSG.unauthorized);
  58  |                     expect(list.text, 'no application data leaks').not.toMatch(/application_reference_number/);
  59  |                 });
  60  |             }
  61  |             await test.step('health check is public', async () => {
  62  |                 // The Lab Manual's health example sends the key, so whether health is public is only recorded, not asserted.
  63  |                 const health = await noKey.health();
  64  |                 testInfo.annotations.push({ type: 'observation', description: `GET health without a key: HTTP ${health.status}` });
  65  |             });
  66  |         }
  67  |         finally {
  68  |             await noKey.dispose();
  69  |             await wrongKey.dispose();
  70  |         }
  71  |         expect((await api.listApplications(agent())).status, 'valid key works').toBe(200);
  72  |     });
  73  |     test("TC-API-003 | API-V03 | Verify that client API prevents invalid dates of birth", { "tag": ["@regression", "@api", "@P1"], "annotation": [{ "type": "validation-id", "description": "API-V03" }, { "type": "risk", "description": "R-CLI-01, R-CLI-02, R-API-01" }, { "type": "priority", "description": "P1" }] }, async ({ api }, testInfo) => {
  74  |      //   test.skip(!api.available, 'REST API is not available on this environment');
  75  |         const draft = async () => (await buildApplication(api, { agentEmail: agent(), upTo: 'draft' })).id;
  76  |         const payload = (dob) => ({
  77  |             first_name: 'Qa', last_name: 'Tester', date_of_birth: dob, gender: 'MALE', marital_status: 'SINGLE',
  78  |             nationality: 'United States', occupation: 'Engineer', employer_name: 'Acme', employer_address: '1 Corporate Way',
  79  |         });
  80  |         await test.step('future date of birth is rejected', async () => {
  81  |             const id = await draft();
  82  |             const res = await api.saveClient(id, agent(), payload(futureDate(1)));
  83  |             expectApiError(res, 422, MSG.futureDob);
  84  |             expect(JSON.stringify(res.body.errors)).toMatch(/date_of_birth/);
  85  |         });
  86  |         for (const c of [{ label: 'age 17 years 364 days', dob: dobForAge(18, 1) }, { label: 'age 66', dob: dobForAge(66) }]) {
  87  |             await test.step(`${c.label}: rejected on save, or flagged by validate`, async () => {
  88  |                 const id = await draft();
  89  |                 const res = await api.saveClient(id, agent(), payload(c.dob));
  90  |                 if (res.status === 422) {
  91  |                     testInfo.annotations.push({ type: 'observation', description: `${c.label}: rejected when saving` });
  92  |                     expect(errorTexts(res).join(' ')).toMatch(MSG.ageRange);
  93  |                 }
  94  |                 else {
  95  |                     expect(res.status, 'accepted on save').toBe(200);
  96  |                     const validate = await api.validate(id, agent());
  97  |                     testInfo.annotations.push({ type: 'observation', description: `${c.label}: accepted on save; validate returned HTTP ${validate.status}` });
  98  |                     expect(errorTexts(validate).join(' | '), `${c.label} must be flagged somewhere`).toMatch(MSG.ageRange);
  99  |                 }
  100 |             });
  101 |         }
  102 |         await test.step('a valid date of birth is stored', async () => {
  103 |             const id = await draft();
  104 |             const dob = dobForAge(40);
  105 |             expectApiSuccess(await api.saveClient(id, agent(), payload(dob)));
  106 |             const stored = (await api.getClient(id, agent())).body?.data?.date_of_birth;
  107 |             expect(String(stored).slice(0, 10)).toBe(dob);
  108 |         });
  109 |     });
  110 |     test("TC-API-004 | API-V04 | Verify that validate API reports beneficiary allocation errors", { "tag": ["@regression", "@api", "@P1"], "annotation": [{ "type": "validation-id", "description": "API-V04" }, { "type": "risk", "description": "R-BEN-01, R-API-01" }, { "type": "priority", "description": "P1" }] }, async ({ api }, testInfo) => {
  111 |        // test.skip(!api.available, 'REST API is not available on this environment');
  112 |         const cases = [
  113 |             { label: 'primary total 90%', second: 30, expectError: true },
  114 |             { label: 'primary total 110%', second: 50, expectError: true },
  115 |             { label: 'primary total 100%', second: 40, expectError: false },
  116 |         ];
  117 |         for (const c of cases) {
  118 |             await test.step(c.label, async () => {
  119 |                 const app = await buildApplication(api, { agentEmail: agent(), upTo: 'documents', beneficiaries: [beneficiary({ allocation: 60 })] });
  120 |                 const add = await api.addBeneficiary(app.id, agent(), toApiBeneficiary(beneficiary({ allocation: c.second, relationship: 'CHILD' })));
  121 |                 if (add.status === 422) {
  122 |                     // The API itself may refuse an over-allocation when adding. That also satisfies the rule.
  123 |                     testInfo.annotations.push({ type: 'observation', description: `${c.label}: refused when adding the beneficiary (HTTP 422)` });
  124 |                     expect(c.expectError, 'only the over-allocation case may be refused on add').toBe(true);
  125 |                     return;
  126 |                 }
  127 |                 expect(add.status).toBeLessThan(300);
  128 |                 const res = await api.validate(app.id, agent());
  129 |                 if (c.expectError) {
  130 |                     expectApiError(res, 422, MSG.primaryTotal);
  131 |                 }
  132 |                 else {
  133 |                     expectApiSuccess(res);
  134 |                     expect(errorTexts(res).join(' ')).not.toMatch(MSG.primaryTotal);
  135 |                 }
  136 |             });
  137 |         }
  138 |     });
  139 |     test("TC-API-005 | API-V05 | Verify that submit API prevents an incomplete application", { "tag": ["@regression", "@api", "@P1"], "annotation": [{ "type": "validation-id", "description": "API-V05" }, { "type": "risk", "description": "R-WF-02, R-KYC-02, R-API-01" }, { "type": "priority", "description": "P1" }] }, async ({ api }) => {
  140 |       //  test.skip(!api.available, 'REST API is not available on this environment');
  141 |         const app = await buildApplication(api, { agentEmail: agent(), upTo: 'product' }); // no riders step, beneficiaries or documents
  142 |         const res = await api.submit(app.id, agent());
  143 |         expectApiError(res, 422, MSG.validationFailed);
  144 |         expect(errorTexts(res).join(' | ')).toMatch(/benefici|document/i);
  145 |         const status = (await api.status(app.id, agent())).body.data;
  146 |         expect(status.application_status, 'still a draft').toBe('DRAFT');
  147 |         expect(status.application_reference_number ?? '', 'no WL reference issued').not.toMatch(/^WL\d+/);
  148 |     });
  149 |     test("TC-API-010 | API-P02 | Verify that login API status codes and response schema", { "tag": ["@regression", "@smoke", "@api", "@P1"], "annotation": [{ "type": "validation-id", "description": "API-P02" }, { "type": "risk", "description": "R-AUTH-01, R-AUTH-02" }, { "type": "priority", "description": "P1" }] }, async ({ api }) => {
  150 |        // test.skip(!api.available, 'REST API is not available on this environment');
  151 |         await test.step('valid credentials', async () => {
> 152 |             const res = await api.login(agent(), env.password);
      |                                   ^ TypeError: api.login is not a function
  153 |             expectApiSuccess(res);
  154 |             expect(res.body.message).toMatch(/login validated successfully/i);
  155 |             for (const key of ['user_id', 'name', 'email', 'role', 'learner_code', 'account_status'])
  156 |                 expect(res.body.data).toHaveProperty(key);
  157 |             expect(res.body.data.email).toBe(agent());
  158 |             expect(Object.keys(res.body.data)).not.toContain('password');
  159 |             expect(JSON.stringify(res.body), 'no token is issued by this API').not.toMatch(/token/i);
  160 |         });
  161 |         await test.step('wrong password -> 401', async () => {
  162 |             expectApiError(await api.login(agent(), 'Wrong#Pass123'), 401, MSG.invalidCredentials);
  163 |         });
  164 |         await test.step('blank and malformed input -> 422', async () => {
  165 |             expect((await api.login('', '')).status).toBe(422);
  166 |             expect((await api.login('not-an-email', 'x')).status).toBe(422);
  167 |         });
  168 |         await test.step('locked user -> 403', async () => {
  169 |             const res = await api.login(emailOf('locked'), env.password);
  170 |             expectApiError(res, 403, MSG.accountLocked);
  171 |         });
  172 |     });
  173 | });
  174 | 
```