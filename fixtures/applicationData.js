"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GUARDIAN = exports.beneficiary = exports.productData = exports.kycData = exports.FAKE_SSN = exports.addressData = exports.clientData = exports.MANDATORY_CLIENT_FIELDS = void 0;
const { uniqueFirstName, capitalised, alphaId, dobForAge, uniqueEmail } = require("../utils/dataGenerator");
const { DEFAULT_PRODUCT } = require("./referenceData");
const { testData } = require("../utils/excelData");
exports.MANDATORY_CLIENT_FIELDS = [
    'firstName', 'lastName', 'dob', 'gender', 'maritalStatus', 'nationality', 'occupation', 'employerName', 'employerAddress',
];
function clientData(overrides = {}) {
    const x = testData('ClientData');
    return {
        firstName: uniqueFirstName(),
        lastName: capitalised(alphaId(7)),
        dob: dobForAge(x.age),
        gender: x.gender,
        maritalStatus: x.maritalStatus,
        nationality: x.nationality,
        occupation: x.occupation,
        employerName: x.employerName,
        employerAddress: x.employerAddress,
        ...overrides,
    };
}
exports.clientData = clientData;
function addressData(overrides = {}) {
    const { line1, city, state, postalCode, sameAsResidential, mobile, preferredMode } = testData('AddressData');
    return {
        line1, city, state, postalCode, sameAsResidential,
        email: uniqueEmail(),
        mobile,
        preferredMode,
        ...overrides,
    };
}
exports.addressData = addressData;
/** Fake SSN (not a real person). Change it only if the application's format rules reject it. */
Object.defineProperty(exports, 'FAKE_SSN', { enumerable: true, configurable: true, get: () => testData('KycData').idNumber });
function kycData(overrides = {}) {
    return {
        ...testData('KycData'),
        ...overrides,
    };
}
exports.kycData = kycData;
function productData(overrides = {}) {
    return {
        ...testData('ProductData'),
        ...overrides,
    };
}
exports.productData = productData;
function beneficiary(overrides = {}) {
    const { age, firstName, gender, ...base } = testData('BeneficiaryData');
    const individual = (overrides.type ?? base.type) === 'INDIVIDUAL';
    return {
        ...base,
        ...(individual ? { firstName, lastName: capitalised(alphaId(6)), dob: dobForAge(age), gender } : {}),
        ...overrides,
    };
}
exports.beneficiary = beneficiary;
Object.defineProperty(exports, 'GUARDIAN', { enumerable: true, get: () => testData('GuardianData') });
