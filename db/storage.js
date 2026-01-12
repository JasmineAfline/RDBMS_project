const fs = require("fs");
const path = require("path");

const DB_FILE = path.join(__dirname, "../data/database.json");

function saveDatabase(tables) {
  fs.writeFileSync(DB_FILE, JSON.stringify(tables, null, 2));
}

function loadDatabase() {
  if (!fs.existsSync(DB_FILE)) {
    return {};
  }
  return JSON.parse(fs.readFileSync(DB_FILE, "utf-8"));
}

module.exports = { saveDatabase, loadDatabase };
