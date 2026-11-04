# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api\api.spec.js >> API >> TC-API-001 | API-V01 | Verify that products API responds with 200 and the required schema
- Location: tests\api\api.spec.js:16:5

# Error details

```
TypeError: api.products is not a function
```

# Test source

```ts
  1   | "use strict";
  2   | Object.defineProperty(exports, "__esModule", { value: true });
  3   | const { test, asRole, expect } = require("../../fixtures/auth.fixture");
  4   | const { emailOf } = require("../../fixtures/users");
  5   | const { beneficiary } = require("../../fixtures/applicationData");
  6   | const { PRODUCTS, product, RIDERS } = require("../../fixtures/referenceData");
  7   | const { ApiClient } = require("../../utils/apiClient");
  8   | const { buildApplication, toApiBeneficiary } = require("../../utils/applicationBuilder");
  9   | const { expectApiSuccess, expectApiError, errorTexts } = require("../../utils/assertions");
  10  | const { futureDate, dobForAge } = require("../../utils/dataGenerator");
  11  | const { env } = require("../../utils/env");
  12  | const { MSG } = require("../../utils/messages");
  13  | test.use(asRole('learner'));
  14  | const agent = () => emailOf('learner');
  15  | test.describe('API', () => {
  16  |     test("TC-API-001 | API-V01 | Verify that products API responds with 200 and the required schema", { "tag": ["@regression", "@smoke", "@api", "@P1"], "annotation": [{ "type": "validation-id", "description": "API-V01" }, { "type": "risk", "description": "R-API-03, R-PROD-05" }, { "type": "priority", "description": "P1" }] }, async ({ api }) => {
  17  |        // test.skip(!api.available, 'REST API is not available on this environment');
> 18  |         const res = await api.products();
      |                               ^ TypeError: api.products is not a function
  19  |         expectApiSuccess(res);
  20  |         const items = res.body.data;
  21  |         expect(items).toHaveLength(PRODUCTS.length);
  22  |         for (const item of items) {
  23  |             for (const key of ['id', 'product_code', 'product_name', 'eligibility_age_min', 'eligibility_age_max', 'face_value_min', 'face_value_max', 'base_rate_per_1000', 'is_active']) {
  24  |                 expect(item, `product has "${key}"`).toHaveProperty(key);
  25  |             }
  26  |             const ref = product(String(item.product_code));
  27  |             expect(item.product_name).toBe(ref.name);
  28  |             expect(Number(item.eligibility_age_min)).toBe(ref.ageMin);
  29  |             expect(Number(item.eligibility_age_max)).toBe(ref.ageMax);
  30  |             expect(Number(item.face_value_min)).toBe(ref.faceMin);
  31  |             expect(Number(item.face_value_max)).toBe(ref.faceMax);
  32  |             expect(Number(item.base_rate_per_1000)).toBeCloseTo(ref.ratePer1000, 4);
  33  |         }
  34  |         await test.step('riders API (extension)', async () => {
  35  |             const riders = await api.riders();
  36  |             expectApiSuccess(riders);
  37  |             const list = riders.body.data;
  38  |             expect(list).toHaveLength(Object.keys(RIDERS).length);
  39  |             for (const r of Object.values(RIDERS)) {
  40  |                 const live = list.find((x) => x.rider_code === r.code);
  41  |                 expect(live, `rider ${r.code} listed`).toBeTruthy();
  42  |                 expect(Number(live?.eligibility_age_min)).toBe(r.ageMin);
  43  |                 expect(Number(live?.eligibility_age_max)).toBe(r.ageMax);
  44  |             }
  45  |         });
  46  |     });
  47  |     test("TC-API-002 | API-V02 | Verify that application APIs require the API key", { "tag": ["@regression", "@smoke", "@api", "@P1"], "annotation": [{ "type": "validation-id", "description": "API-V02" }, { "type": "risk", "description": "R-API-02, R-AUTH-06" }, { "type": "priority", "description": "P1" }] }, async ({ api }, testInfo) => {
  48  |       //  test.skip(!api.available, 'REST API is not available on this environment');
  49  |         const noKey = await ApiClient.create({ apiKey: null });
  50  |         const wrongKey = await ApiClient.create({ apiKey: 'definitely-wrong-key' });
  51  |         try {
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
```