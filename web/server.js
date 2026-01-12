const express = require("express");

// This initializes global.db
require("../index");

const routes = require("./routes");

const app = express();
app.use(express.json());

// All API routes
app.use("/api", routes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Web app running on http://localhost:${PORT}`);
});
