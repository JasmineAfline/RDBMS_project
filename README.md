# Mini-RDBMS

Mini-RDBMS is a simple relational database management system built from scratch using Node.js. The goal of this project is to demonstrate core database concepts such as table schemas, CRUD operations, constraints, persistence, and a SQL-like interface, without using any external database systems.

This project was developed as part of a technical challenge.

---

## Features

* Custom-built database engine
* Table creation with schemas
* Supported data types: INT, TEXT
* CRUD operations (Create, Read, Update, Delete)
* Primary key and unique constraints
* Basic indexing logic
* SQL-like interactive REPL
* JSON-based persistence (data survives restarts)
* Express.js web app demonstrating real usage

---

## Project Structure

```
mini-rdbms/
├── db/        # Database engine logic
├── repl/      # SQL-like REPL
├── web/       # Express web app and API routes
├── data/      # Persisted database (database.json)
├── index.js   # Initializes the database
└── README.md
```

---

## How It Works

* The database runs in memory during execution
* Tables store rows and enforce constraints
* After every INSERT, UPDATE, or DELETE, data is saved to `data/database.json`
* On startup, the database reloads data from the JSON file

---

## Running the Project

### Requirements

* Node.js (v18 or higher recommended)

### Start the SQL-like REPL

```bash
node repl/repl.js
```

Example commands:

```sql
CREATE TABLE users (id INT PRIMARY KEY, name TEXT, email TEXT UNIQUE);
INSERT INTO users VALUES (1, "Alice", "alice@mail.com");
SELECT * FROM users;
UPDATE users SET name="Alicia" WHERE id=1;
DELETE FROM users WHERE id=1;
```

---

## Web Application (CRUD API)

Start the server:

```bash
node web/server.js
```

Base URL:

```
http://localhost:3000
```

Endpoints:

* POST /api/users
* GET /api/users
* PUT /api/users/:id
* DELETE /api/users/:id

The API uses the custom database internally.

---

## Testing

* Database functionality tested via the interactive REPL
* API endpoints tested using Thunder Client, Postman, or curl

---

## Notes

* JOIN support is planned but not fully implemented
* SQL grammar is intentionally minimal
* This project is for educational and demonstration purposes

---

## Author

Afline Jasmine
