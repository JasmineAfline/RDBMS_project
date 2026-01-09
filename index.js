console.log("Mini-RDBMS setup complete. Ready to start coding!");


const Database = require("./db/Database");

const db = new Database();
global.db = db;

// Create a table
db.createTable("users", {
  id: { type: "INT", primary: true },
  name: { type: "TEXT" },
  email: { type: "TEXT", unique: true }
});

// Insert some rows
db.getTable("users").insert({ id: 1, name: "Alice", email: "alice@mail.com" });
db.getTable("users").insert({ id: 2, name: "Bob", email: "bob@mail.com" });

// Select rows
console.log(db.getTable("users").select());

// Update a row
db.getTable("users").update({ column: "id", value: 2 }, { name: "Bobby" });
console.log(db.getTable("users").select({ column: "id", value: 2 }));

// Delete a row
db.getTable("users").delete({ column: "id", value: 1 });
console.log(db.getTable("users").select());
