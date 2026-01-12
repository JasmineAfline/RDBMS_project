const Table = require("./Table");
const { saveDatabase, loadDatabase } = require("./storage");

class Database {
  constructor() {
    this.tables = {};

    // Load persisted data
    const data = loadDatabase();
    for (const tableName in data) {
      const tableData = data[tableName];
      const table = new Table(tableName, tableData.schema);
      table.rows = tableData.rows;
      this.tables[tableName] = table;
    }
  }

  createTable(name, schema) {
    if (this.tables[name]) {
      throw new Error(`Table "${name}" already exists`);
    }

    this.tables[name] = new Table(name, schema);
    this.persist();
  }

  getTable(name) {
    if (!this.tables[name]) {
      throw new Error(`Table "${name}" not found`);
    }
    return this.tables[name];
  }

  persist() {
    const data = {};

    for (const name in this.tables) {
      data[name] = {
        schema: this.tables[name].schema,
        rows: this.tables[name].rows
      };
    }

    saveDatabase(data);
  }
}

module.exports = Database;
