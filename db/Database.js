const Table = require("./Table");

class Database {
  constructor() {
    this.tables = {};
  }

  // Create a new table
  createTable(name, columns) {
    if (this.tables[name]) {
      throw new Error(`Table "${name}" already exists`);
    }
    const table = new Table(name, columns);
    this.tables[name] = table;
    return table;
  }

  // Get a table by name
  getTable(name) {
    const table = this.tables[name];
    if (!table) {
      throw new Error(`Table "${name}" not found`);
    }
    return table;
  }

  // List all tables
  listTables() {
    return Object.keys(this.tables);
  }
}

module.exports = Database;
