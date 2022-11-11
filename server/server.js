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
      const button = await db("buttons").select("*");
      res.status(200).send(button);
    } catch (err) {
      console.error(err);
    }
  });

  return app;
}

module.exports = setupServer;
