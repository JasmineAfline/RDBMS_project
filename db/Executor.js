const Table = require("./Table");

function execute(db, parsed) {
  const sql = parsed.sql;

  if (parsed.type === "CREATE") {
    // Example: CREATE TABLE users (id INT PRIMARY KEY, name TEXT, email TEXT UNIQUE);
    const tableName = sql.match(/CREATE TABLE (\w+)/i)[1];
    const colsString = sql.match(/\((.+)\)/)[1];
    const columns = {};

    colsString.split(",").forEach(colDef => {
      let [name, type, ...rest] = colDef.trim().split(" ");
      const colObj = { type: type.toUpperCase() };
      if (rest.includes("PRIMARY")) colObj.primary = true;
      if (rest.includes("UNIQUE")) colObj.unique = true;
      columns[name] = colObj;
    });

    db.createTable(tableName, columns);
    return `Table "${tableName}" created.`;
  }

  if (parsed.type === "INSERT") {
    // Example: INSERT INTO users VALUES (1, "Alice", "alice@mail.com");
    const tableName = sql.match(/INSERT INTO (\w+)/i)[1];
    const valuesString = sql.match(/\((.+)\)/)[1];
    const values = valuesString.split(",").map(v => v.trim().replace(/^"|"$/g, ""));
    
    const table = db.getTable(tableName);
    const row = {};
    let i = 0;
    for (const colName in table.columns) {
      row[colName] = isNaN(values[i]) ? values[i] : Number(values[i]);
      i++;
    }

    table.insert(row);
    return `Row inserted into "${tableName}".`;
  }

  if (parsed.type === "SELECT") {
    const tableName = sql.match(/FROM (\w+)/i)[1];
    const table = db.getTable(tableName);

    const whereMatch = sql.match(/WHERE (.+)/i);
    if (whereMatch) {
        const [col, val] = whereMatch[1].split("=");
        return table.select({ column: col.trim(), value: isNaN(val) ? val.replace(/^"|"$/g, '') : Number(val) });
    }

    return table.select();
}


  if (parsed.type === "UPDATE") {
    // Example: UPDATE users SET name="Bobby" WHERE id=2
    const [, tableName, , setPart, , wherePart] = sql.split(" ");
    const colToSet = setPart.split("=")[0];
    const valueToSet = setPart.split("=")[1].replace(/^"|"$/g, "");

    const whereCol = wherePart.split("=")[0];
    const whereVal = wherePart.split("=")[1];

    const table = db.getTable(tableName);
    table.update({ column: whereCol, value: isNaN(whereVal) ? whereVal : Number(whereVal) },
                 { [colToSet]: valueToSet });

    return `Row(s) updated in "${tableName}".`;
}

if (parsed.type === "DELETE") {
    // Example: DELETE FROM users WHERE id=1
    const tableName = sql.match(/FROM (\w+)/i)[1];
    const wherePart = sql.match(/WHERE (.+)/i)[1];
    const [whereCol, whereVal] = wherePart.split("=");
    const table = db.getTable(tableName);

    table.delete({ column: whereCol.trim(), value: isNaN(whereVal) ? whereVal.trim() : Number(whereVal) });
    return `Row(s) deleted from "${tableName}".`;
}

if (parsed.type === "JOIN") {
    // Example: SELECT * FROM orders JOIN users ON orders.user_id=users.id
    const [ , tableAName, , , tableBName, , onCondition] = sql.split(" ");
    const [colA, colB] = onCondition.split("=");

    const tableA = db.getTable(tableAName);
    const tableB = db.getTable(tableBName);

    const result = [];
    tableA.rows.forEach(rowA => {
        tableB.rows.forEach(rowB => {
            if (rowA[colA.split(".")[1]] === rowB[colB.split(".")[1]]) {
                result.push({ ...rowA, ...rowB });
            }
        });
    });
    return result;
}


  throw new Error("Command not implemented.");
}

module.exports = execute;
