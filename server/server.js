const express = require("express");
const { syncBuiltinESMExports } = require("module");
const db = require("../db/knex");

function setupServer() {
  const app = express();

  //middleware
  app.use(express.json());
  // app.use(express.static(path.join(__dirname, "../public")));

  app.get("/", (req, res) => {
    res.status(200).send("ok");
  });

  app.get("/api/button", async (req, res) => {
    try {
      const buttons = await db("button_table").select("*");
      buttons.length > 0
        ? res.status(200).send(button)
        : res.status(404).send("No buttons found");
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  });

  return app;
}

module.exports = setupServer;
