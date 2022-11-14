const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("supposed to be list of found items");
});

router.get("/:foundId", (req, res) => {
  res.send("supposed to be a single page of found item");
});

router.post("/newitem", (req, res) => {
  console.log(req.body);
  res.send("supposed to send the data");
});

router.delete("/:foundId", (req, res) => {
  res.send("supposed to delete an item which is picked up");
});

module.exports = router;
