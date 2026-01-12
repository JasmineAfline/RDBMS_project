const Database = require("./db/Database");

// Initialize ONE global database instance
global.db = new Database();

console.log("Mini-RDBMS initialized");
