const express = require("express");
const cors = require("cors");
const path = require("path");

const foundRoutes = require("./routes/found");

function setupServer() {
  const app = express();

  //middleware
  app.use(express.json());
  app.use(express.static(path.join(__dirname, "../client")));
  app.use(cors());

  app.get("/", (req, res) => {
    res.status(200).send("ok");
  });

  app.use("/api/found", foundRoutes);

  return app;
}

module.exports = setupServer;
