const readline = require("readline");
const parse = require("../db/Parser");
const execute = require("../db/Executor");
const Database = require("../db/Database");

// Initialize global database
if (!global.db) {
  global.db = new Database();
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "db > "
});

rl.prompt();

rl.on("line", line => {
  try {
    const parsed = parse(line);
    const result = execute(global.db, parsed);
    console.log(result);
  } catch (e) {
    console.error(e.message);
  }
  rl.prompt();
});
