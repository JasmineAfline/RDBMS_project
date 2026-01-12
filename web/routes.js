const express = require("express");
const router = express.Router();

// Create users table if it doesn't exist
if (!global.db.tables["users"]) {
  global.db.createTable("users", {
    id: { type: "INT", primary: true },
    name: { type: "TEXT" },
    email: { type: "TEXT", unique: true }
  });
}

// CREATE
router.post("/users", (req, res) => {
  try {
    global.db.tables["users"].insert(req.body);
    res.json({ status: "created" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ
router.get("/users", (req, res) => {
  res.json(global.db.tables["users"].select());
});

// UPDATE
router.put("/users/:id", (req, res) => {
  try {
    global.db.tables["users"].update(
      { column: "id", value: Number(req.params.id) },
      req.body
    );
    res.json({ status: "updated" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE
router.delete("/users/:id", (req, res) => {
  try {
    global.db.tables["users"].delete({
      column: "id",
      value: Number(req.params.id)
    });
    res.json({ status: "deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
