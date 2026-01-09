const fs = require("fs");

function save(db) {
    fs.writeFileSync("data/database.json", JSON.stringify(db, null, 2));
}

function load() {
    if (!fs.existsSync("data/database.json")) return null;
    return JSON.parse(fs.readFileSync("data/database.json"));
}

module.exports = { save, load };
