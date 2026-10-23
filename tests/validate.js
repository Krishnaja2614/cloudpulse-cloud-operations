const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
let failed = false;

function checkFile(relativePath) {
const fullPath = path.join(root, relativePath);

if (!fs.existsSync(fullPath)) {
console.error(`FAIL: Missing required file: ${relativePath}`);
failed = true;
return null;
}

const content = fs.readFileSync(fullPath, "utf8");

if (!content.trim()) {
console.error(`FAIL: File is empty: ${relativePath}`);
failed = true;
return null;
}

console.log(`PASS: ${relativePath} exists and is not empty`);
return content;
}

// 1. Check required website files.
const html = checkFile("index.html");
const css = checkFile("css/style.css");
const js = checkFile("js/app.js");

// 2. Check project documentation.
checkFile("README.md");
checkFile("docs/incident-report.md");
checkFile("docs/troubleshooting-guide.md");

// 3. Check required HTML elements and asset references.
if (html !== null) {
const expectedHtml = [
'id="serviceList"',
'id="deploymentRows"',
'id="incidentRows"',
"css/style.css",
"js/app.js"
];

for (const expected of expectedHtml) {
if (!html.includes(expected)) {
console.error(`FAIL: index.html is missing: ${expected}`);
failed = true;
} else {
console.log(`PASS: index.html includes ${expected}`);
}
}
}
// 4. Check that incident investigation features are present.
if (js !== null) { 
    const expectedFeatures = [ "data-investigate", "data-resolve", "incidentInvestigation", "investigation-checkbox", "updateInvestigationProgress", "investigationProgressBar" ]; 
    for (const feature of expectedFeatures) { if (!js.includes(feature)) { console.error( `FAIL: js/app.js is missing incident feature: ${feature}` ); failed = true; 
} else {
     console.log(`PASS: js/app.js includes ${feature}`); } } }
// 5. Check that JavaScript has valid syntax.
if (js !== null) {
try {
new Function(js);
console.log("PASS: js/app.js syntax is valid");
} catch (error) {
console.error(`FAIL: js/app.js syntax error: ${error.message}`);
failed = true;
}
}

// 6. Report the final result.
if (failed) {
console.error("\nCloudPulse validation failed. Review the errors above.");
process.exit(1);
}

console.log("\nAll CloudPulse validation checks passed.");
