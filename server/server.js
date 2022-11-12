const express = require("express");
const { syncBuiltinESMExports } = require("module");
const db = require("../db/knex");

const lostRoutes = require("./routes/found");

function setupServer() {
  const app = express();

  //middleware
  app.use(express.json());
  // app.use(express.static(path.join(__dirname, "../client/build")));

  app.get("/", (req, res) => {
    res.status(200).send("ok");
  });

  app.use("/found", lostRoutes);

  return app;
}

module.exports = setupServer;
