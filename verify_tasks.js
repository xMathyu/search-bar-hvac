// Quick verification script to count tasks by category
const fs = require("fs");

// Read and evaluate the data file content without const declarations
let dataContent = fs.readFileSync("./src/js/data.js", "utf8");
dataContent = dataContent.replace(/const /g, "var ");
eval(dataContent);

console.log("Task Count by Category:");
console.log("========================");

Object.keys(taskCategories).forEach((category) => {
  const count = taskCategories[category].tasks.length;
  const name = taskCategories[category].name;
  console.log(`${name}: ${count} tasks`);
});

console.log("\nTotal tasks:", tasks.length);
