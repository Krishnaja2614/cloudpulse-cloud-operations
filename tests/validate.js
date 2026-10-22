const fs = require("fs");
const path = require("path");
const root = path.resolve(__dirname, "..");
const required = [
  "index.html",
  "css/style.css",
  "js/app.js"
];
let failed = false;
for (const file of required) {
  const fullPath = path.join(root, file);
  if (!fs.existsSync(fullPath)) {
    console.error(`FAIL: Missing required file: ${file}`);
    failed = true;
    continue;
  }
  const content = fs.readFileSync(fullPath, "utf8");
  if (!content.trim()) {
    console.error(`FAIL: File is empty: ${file}`);
    failed = true;
  } else {
    console.log(`PASS: ${file} exists and is not empty`);
  }
}
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
for (const expected of ['id="serviceList"', 'id="deploymentRows"', 'id="incidentRows"', 'css/style.css', 'js/app.js']) {
  if (!html.includes(expected)) {
    console.error(`FAIL: index.html is missing expected reference: ${expected}`);
    failed = true;
  } else {
    console.log(`PASS: index.html includes ${expected}`);
  }
}
const js = fs.readFileSync(path.join(root, "js/app.js"), "utf8");
try {
  new Function(js);
  console.log("PASS: js/app.js parses successfully");
} catch (error) {
  console.error(`FAIL: js/app.js syntax error: ${error.message}`);
  failed = true;
}
if (failed) process.exit(1);
console.log("\\nAll CloudPulse validation checks passed.");
