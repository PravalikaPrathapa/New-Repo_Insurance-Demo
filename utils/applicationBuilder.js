"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildApplication = void 0;
const { expect } = require("@playwright/test");
const { clientData, addressData, kycData, productData, beneficiary } = require("../fixtures/applicationData");
const { makeFile } = require("./fileUploadHelper");
const { DashboardPage } = require("../pages/DashboardPage");
const { ClientInformationPage } = require("../pages/ClientInformationPage");
const { AddressContactPage } = require("../pages/AddressContactPage");
const { KycFinancialPage } = require("../pages/KycFinancialPage");
const { ProductConfigurationPage } = require("../pages/ProductConfigurationPage");
const { RiderSelectionPage } = require("../pages/RiderSelectionPage");
const { BeneficiaryPage } = require("../pages/BeneficiaryPage");
const { DocumentUploadPage } = require("../pages/DocumentUploadPage");
const ORDER = ['draft', 'client', 'address', 'kyc', 'product', 'riders', 'beneficiaries', 'documents'];
/**
 * Creates and fills an application THROUGH THE UI (the API is not available on every environment).
 * `page` must already be logged in (use test.use(asRole('learner'))). The page ends up on the screen after the last step.
 * When a step is given overrides that make it invalid on purpose (e.g. kyc declaration false) the step is saved
 * but the redirect to the next screen is not required.
 */
async function buildApplication(page, opts = {}) {
    const upTo = ORDER.indexOf(opts.upTo ?? 'documents');
    const reached = (s) => ORDER.indexOf(s) <= upTo;
    const client = clientData(opts.client);
    const address = addressData(opts.address);
    const kyc = kycData(opts.kyc);
    const product = productData(opts.product);
    const riders = opts.riders ?? [];
    const beneficiaries = opts.beneficiaries ?? [beneficiary()];
    const next = async (pageObject, data, nextUrl, tolerant) => {
        await pageObject.fill(data);
        await pageObject.save({ ignoreBrowserValidation: tolerant });
        if (!tolerant)
            await expect(page, `UI set-up: expected to reach ${nextUrl}`).toHaveURL(nextUrl);
    };
    const dashboard = new DashboardPage(page);
    await dashboard.goto();
    const id = await dashboard.startNewApplication();
    expect(id, 'new application id').toBeGreaterThan(0);
    if (reached('client'))
        await next(new ClientInformationPage(page), client, /address-contact/, !!opts.client);
    if (reached('address'))
        await next(new AddressContactPage(page), address, /kyc-financial/, !!opts.address);
    if (reached('kyc'))
        await next(new KycFinancialPage(page), kyc, /\/product/, !!opts.kyc);
    if (reached('product'))
        await next(new ProductConfigurationPage(page), product, /\/riders/, !!opts.product);
    if (reached('riders')) {
        const ridersPage = new RiderSelectionPage(page);
        for (const r of riders)
            await ridersPage.select(r.key, r.coverage);
        await ridersPage.save();
        await expect(page).toHaveURL(/beneficiaries/);
    }
    if (reached('beneficiaries')) {
        const ben = new BeneficiaryPage(page);
        let count = 0;
        for (const b of beneficiaries)
            await ben.addAndExpectRow(b, ++count);
        await ben.continueLink.click();
        await expect(page).toHaveURL(/documents/);
    }
    if (reached('documents') && opts.withDocument !== false) {
        const f = makeFile('pdf', `kyc-${id}.pdf`);
        const docs = new DocumentUploadPage(page);
        await docs.upload('KYC_ID', f);
        await expect(docs.rows()).toHaveCount(1);
    }
    return { id, client, address, kyc, product, riders, beneficiaries };
}
exports.buildApplication = buildApplication;
