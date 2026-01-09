/**
 * Very minimal SQL parser
 * Supports: CREATE TABLE, INSERT INTO, SELECT *
 */

function parse(sql) {
  const trimmed = sql.trim();
  const command = trimmed.split(" ")[0].toUpperCase();

  if (command === "CREATE") {
    return { type: "CREATE", sql: trimmed };
  }

  if (command === "INSERT") {
    return { type: "INSERT", sql: trimmed };
  }

  if (command === "SELECT") {
    return { type: "SELECT", sql: trimmed };
  }

  throw new Error(`Unsupported SQL command: ${command}`);
}

module.exports = parse;
