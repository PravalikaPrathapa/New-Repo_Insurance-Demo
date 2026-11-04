"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { test, asRole, expect } = require("../../fixtures/auth.fixture");
const { emailOf } = require("../../fixtures/users");
const { clientData } = require("../../fixtures/applicationData");
const { DashboardPage } = require("../../pages/DashboardPage");
const { ClientInformationPage } = require("../../pages/ClientInformationPage");
const { ReviewPage } = require("../../pages/ReviewPage");
const { buildApplication } = require("../../utils/applicationBuilder");
const { ageErrorSurface } = require("../../utils/flows");
const { MSG } = require("../../utils/messages");
const { dobForAge, futureDate, toIso } = require("../../utils/dataGenerator");
const { anyMatches } = require("../../utils/assertions");
test.use(asRole('learner'));
/** Fast set-up: an empty draft created through the API; the UI is then used for the behaviour under test. */
async function emptyDraft(page) {
    return (await buildApplication(page, { agentEmail: emailOf('learner'), upTo: 'draft' })).id;
}
/** Calculated age the app shows on the review page. Diagnostic only: it makes an age-rule failure self-explanatory. */
async function shownAge(page, applicationId) {
    const review = new ReviewPage(page);
    await review.goto(applicationId);
    return review.calculatedAge().catch(() => 'n/a');
}
test.describe('Client / insured information', () => {
    test("TC-CLI-001 | CLI-V01 | Verify that an agent is able to provide valid insured information", { "tag": ["@regression", "@smoke", "@client", "@P1"], "annotation": [{ "type": "validation-id", "description": "CLI-V01" }, { "type": "risk", "description": "R-CLI-03, R-CLI-05" }, { "type": "priority", "description": "P1" }] }, async ({ page, api }) => {
        const dashboard = new DashboardPage(page);
        await dashboard.goto();
        const id = await dashboard.startNewApplication(); // full UI flow: dashboard -> start -> create draft
        const client = new ClientInformationPage(page);
        const data = clientData();
        await client.fillAndSave(data);
        await client.expectNoErrors();
        await test.step('saved values equal the entered values (API read-back)', async () => {
            await client.goto(id);
            expect(await client.values()).toMatchObject({ firstName: data.firstName, lastName: data.lastName, dob: data.dob });
        });
    });
    test("TC-CLI-003 | CLI-V03 | Verify that dOB below 18 is blocked", { "tag": ["@regression", "@client", "@P1"], "annotation": [{ "type": "validation-id", "description": "CLI-V03" }, { "type": "risk", "description": "R-CLI-01" }, { "type": "priority", "description": "P1" }] }, async ({ page, api }, testInfo) => {
        const id = await emptyDraft(page);
        const client = new ClientInformationPage(page);
        await client.goto(id);
        const dob = dobForAge(18, 1); // 17 years 364 days
        await client.fill(clientData({ dob }));
        await client.save();
        const where = await ageErrorSurface(page, id);
        testInfo.annotations.push({ type: 'observation', description: `Age error shown on: ${where ?? 'NOWHERE'}` });
        const shown = where === null ? await shownAge(page, id) : 'n/a';
        expect(where, `DOB ${dob} (17y364d) must produce the age-range error (form or review page); app calculated age = ${shown}`).not.toBeNull();
    });
    test("TC-CLI-004 | CLI-V04 | Verify that dOB above 65 is blocked", { "tag": ["@regression", "@client",  "@P1"], "annotation": [{ "type": "validation-id", "description": "CLI-V04" }, { "type": "risk", "description": "R-CLI-01" }, { "type": "priority", "description": "P1" }] }, async ({ page, api }, testInfo) => {
        const id = await emptyDraft(page);
        const client = new ClientInformationPage(page);
        await client.goto(id);
        const dob = dobForAge(66);
        await client.fill(clientData({ dob }));
        await client.save();
        const where = await ageErrorSurface(page, id);
        testInfo.annotations.push({ type: 'observation', description: `Age error shown on: ${where ?? 'NOWHERE'}` });
        const shown = where === null ? await shownAge(page, id) : 'n/a';
        expect(where, `DOB ${dob} (age 66) must produce the age-range error (form or review page); app calculated age = ${shown}`).not.toBeNull();
    });
    test("TC-CLI-005 | CLI-V05 | Verify that future DOB is blocked", { "tag": ["@regression", "@client", "@P2"], "annotation": [{ "type": "validation-id", "description": "CLI-V05" }, { "type": "risk", "description": "R-CLI-02" }, { "type": "priority", "description": "P2" }] }, async ({ page, api }) => {
        const id = await emptyDraft(page);
        const client = new ClientInformationPage(page);
        for (const dob of [futureDate(1), futureDate(3650)]) {
            await test.step(`DOB ${dob}`, async () => {
                await client.goto(id);
                await client.fill(clientData({ dob }));
                await client.save();
                await expect(page).toHaveURL(/\/client/);
                await client.expectErrorMatching(MSG.futureDob);
            });
        }
        await test.step('nothing in the future was stored', async () => {
            if (!api.available)
                return; // the REST API is not reachable on this environment: the UI checks above already ran
            const res = await api.getClient(id, emailOf('learner'));
            const stored = res.body?.data?.date_of_birth;
            if (stored)
                expect(String(stored).slice(0, 10) <= toIso(new Date())).toBe(true);
        });
    });
    test("TC-CLI-006 | CLI-P01 | Verify that age boundaries 18 and 65 are accepted", { "tag": ["@regression", "@client", "@P1"], "annotation": [{ "type": "validation-id", "description": "CLI-P01" }, { "type": "risk", "description": "R-CLI-01" }, { "type": "priority", "description": "P1" }] }, async ({ page, api }) => {
        const id = await emptyDraft(page);
        const client = new ClientInformationPage(page);
        const review = new ReviewPage(page);
        for (const age of [18, 65]) {
            await test.step(`age exactly ${age}`, async () => {
                await client.goto(id);
                const dob = dobForAge(age);
                await client.fill(clientData({ dob }));
                await client.save();
                await expect(page, `age ${age} is accepted and the flow moves on`).toHaveURL(/address-contact/);
                await review.goto(id);
                expect(await review.calculatedAge(), `calculated age on review page for DOB ${dob} (exactly ${age} today)`).toBe(age);
                expect(anyMatches(await review.errors(), MSG.ageRange), `no age error at ${age}`).toBe(false);
            });
        }
    });
});
