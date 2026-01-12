const Database = require("./Database");


class Table {
  constructor(name, columns) {
    this.name = name;            // table name
    this.columns = columns;      // { columnName: { type: "INT", primary: true, unique: true } }
    this.rows = [];              // array to store row objects
    this.indexes = {};           // index maps for primary/unique keys
    this.primaryKey = null;

    // Setup indexes for primary and unique keys
    for (const colName in columns) {
      const col = columns[colName];
      if (col.primary) {
        this.primaryKey = colName;
        this.indexes[colName] = new Map();
      }
      if (col.unique && !this.indexes[colName]) {
        this.indexes[colName] = new Map();
      }
    }
  }

  // Insert a new row with key checks
  insert(row) {
    // Check for primary/unique duplicates
    for (const colName in this.indexes) {
      const val = row[colName];
      if (this.indexes[colName].has(val)) {
        throw new Error(`Duplicate value for column "${colName}": ${val}`);
      }
    }

    // Add row
    this.rows.push(row);

    // Update indexes
    const rowIndex = this.rows.length - 1;
    for (const colName in this.indexes) {
      this.indexes[colName].set(row[colName], rowIndex);
    }
  }

  // Simple SELECT (optionally by column equality)
  select(where = null) {
    if (!where) return this.rows;

    const { column, value } = where;

    // Use index if available
    if (this.indexes[column]) {
      const idx = this.indexes[column].get(value);
      return idx !== undefined ? [this.rows[idx]] : [];
    }

    return this.rows.filter(r => r[column] === value);
  }

  // Simple UPDATE (by column equality)
  update(where, newValues) {
    const rows = this.select(where);
    rows.forEach(row => {
      Object.assign(row, newValues);
    });
  }

  // Simple DELETE (by column equality)
  delete(where) {
    const toDelete = this.select(where);
    this.rows = this.rows.filter(r => !toDelete.includes(r));

    // Rebuild indexes
    for (const colName in this.indexes) {
      this.indexes[colName].clear();
    }
    this.rows.forEach((row, idx) => {
      for (const colName in this.indexes) {
        this.indexes[colName].set(row[colName], idx);
      }
    });
  }
}

module.exports = Table;
