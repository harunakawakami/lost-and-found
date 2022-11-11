const express = require("express");

function setupServer() {
  const app = express();

  //middleware
  app.use(express.json());
  // app.use(express.static(path.join(__dirname, "../public")));

  app.get("/", (req, res) => {
    res.status(200).send("ok");
  });

  return app;
}

module.exports = setupServer;
