"use strict";
// Reads static test data from testdata/smoke-data.xlsx (sheet per entity, columns: Field | Value | Type).
// Global setup converts it to .tmp/testdata.json once; workers read that JSON synchronously.
const { readFileSync, writeFileSync, mkdirSync } = require("fs");
const { resolve } = require("path");
const ROOT = resolve(__dirname, "..");
const XLSX_PATH = resolve(ROOT, process.env.TEST_DATA_FILE ?? "testdata/smoke-data.xlsx");
const CACHE_PATH = resolve(ROOT, ".tmp", "testdata.json");
const cast = (value, type) => {
    if (value === null || value === undefined) return "";
    switch ((type || "string").toLowerCase()) {
        case "number": return Number(value);
        case "boolean": return String(value).toLowerCase() === "true";
        default: return String(value);
    }
};
async function convertExcelToJson() {
    const ExcelJS = require("exceljs");
    const wb = new ExcelJS.Workbook();
    await wb.xlsx.readFile(XLSX_PATH);
    const out = {};
    wb.eachSheet((ws) => {
        const obj = {};
        ws.eachRow((row, i) => {
            if (i === 1) return;
            const field = row.getCell(1).value, value = row.getCell(2).value, type = row.getCell(3).value;
            if (field) obj[String(field)] = cast(value?.result ?? value, type?.toString());
        });
        out[ws.name] = obj;
    });
    mkdirSync(resolve(ROOT, ".tmp"), { recursive: true });
    writeFileSync(CACHE_PATH, JSON.stringify(out, null, 2));
    console.log(`[setup] test data loaded from Excel: ${XLSX_PATH}`);
    return out;
}
function testData(sheet) {
    let all;
    try { all = JSON.parse(readFileSync(CACHE_PATH, "utf8")); }
    catch { throw new Error(`Excel test data cache missing (${CACHE_PATH}). It is created by global setup from ${XLSX_PATH}.`); }
    if (!all[sheet]) throw new Error(`Sheet "${sheet}" not found in ${XLSX_PATH}`);
    return all[sheet];
}
module.exports = { convertExcelToJson, testData, XLSX_PATH };
