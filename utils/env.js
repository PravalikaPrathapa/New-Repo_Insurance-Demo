"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const { config } = require("dotenv");
config();
function required(name) {
    const value = process.env[name];
    if (!value) {
        throw new Error(`Missing environment variable ${name}. Copy .env.example to .env and fill it in (see README).`);
    }
    return value;
}
/** Origin ("http://host:port") of a URL, or '' when it cannot be parsed. */
function originOf(url) {
    try {
        return new URL(url).origin;
    }
    catch {
        return '';
    }
}
let warnedAboutApiHost = false;
/** Central, lazy environment access. Nothing secret is hard-coded anywhere in the repo. */
exports.env = {
    /** Same default as playwright.config.js so the UI tests and the Node-side helpers never disagree. */
    get baseUrl() {
        return (process.env.INSURANCE_BASE_URL ?? 'http://127.0.0.1:8081').replace(/\/$/, '');
    },
    /**
     * API base URL. It ALWAYS ends with a trailing slash and API paths used with it have NO leading slash,
     * otherwise Playwright's URL resolution drops the "/api" segment (lesson from the earlier FinServe project).
     *
     * The API is served by the same VM as the UI, so it is derived from INSURANCE_BASE_URL. INSURANCE_API_BASE_URL is
     * only honoured when it points at the SAME origin as the UI. A different host almost always means a stale value
     * (for example an old VM IP left in .env while a shell variable points the UI at the new VM). Using it made every API
     * call time out while the UI worked, and silently switched the API checks off.
     */
    get apiBase() {
        const fromBase = `${this.baseUrl}/api/`;
        const raw = process.env.INSURANCE_API_BASE_URL?.trim();
        if (!raw)
            return fromBase;
        const explicit = `${raw.replace(/\/+$/, '')}/`;
        if (originOf(explicit) === originOf(this.baseUrl))
            return explicit;
        if (!warnedAboutApiHost) {
            warnedAboutApiHost = true;
            console.warn(`[env] INSURANCE_API_BASE_URL (${originOf(explicit) || raw}) is on a different host than INSURANCE_BASE_URL ` +
                `(${originOf(this.baseUrl)}). Using ${fromBase} instead. Fix or remove INSURANCE_API_BASE_URL in .env / your shell.`);
        }
        return fromBase;
    },
    get apiKey() {
        return required('INSURANCE_API_KEY');
    },
    get password() {
        return required('INSURANCE_PASSWORD');
    },
    get hasPassword() {
        return !!process.env.INSURANCE_PASSWORD;
    },
    get learnerEmail() {
        return process.env.LEARNER_USER || 'learner001@insurance.test';
    },
    /** Spare account for the destructive lockout test. Empty means that test is skipped. */
    get disposableEmail() {
        return process.env.DISPOSABLE_USER || '';
    },
};
