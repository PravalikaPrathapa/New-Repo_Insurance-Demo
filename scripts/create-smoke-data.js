"use strict";
// One-off generator for testdata/smoke-data.xlsx (edit the workbook afterwards; tests read it).
const ExcelJS = require("exceljs");
const sheets = {
    ClientData: { gender: "MALE", maritalStatus: "SINGLE", nationality: "United States", occupation: "Software Engineer", employerName: "Acme Corporation", employerAddress: "1 Corporate Way, New York, NY 10001", age: 40 },
    AddressData: { line1: "10 Main St", city: "New York", state: "NY", postalCode: "10001", sameAsResidential: true, mobile: "(212) 555-0147", preferredMode: "EMAIL" },
    KycData: { idType: "SSN", idNumber: "123-45-6789", annualIncome: 50000, netWorth: 200000, sourceOfFunds: "SALARY", riskProfile: "MODERATE", isPep: false, declaration: true },
    ProductData: { productCode: "WL_SECURE_BASIC", faceValue: 250000, frequency: "MONTHLY", paymentTerm: 20, policyTerm: "WHOLE_LIFE" },
    BeneficiaryData: { level: "PRIMARY", type: "INDIVIDUAL", relationship: "SPOUSE", allocation: 100, firstName: "Jane", gender: "FEMALE", age: 38 },
    GuardianData: { name: "Pat Guardian", relationship: "Parent", contact: "(212) 555-0199", address: "5 Elm St, New York, NY 10001" },
};
(async () => {
    const wb = new ExcelJS.Workbook();
    for (const [name, rows] of Object.entries(sheets)) {
        const ws = wb.addWorksheet(name);
        ws.addRow(["Field", "Value", "Type"]).font = { bold: true };
        for (const [k, v] of Object.entries(rows)) ws.addRow([k, v, typeof v]);
        ws.columns = [{ width: 22 }, { width: 40 }, { width: 10 }];
    }
    await wb.xlsx.writeFile("testdata/smoke-data.xlsx");
    console.log("written testdata/smoke-data.xlsx");
})();
