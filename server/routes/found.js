const express = require("express");
const db = require("../../db/knex");
const { default: knex } = require("knex");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const data = await db("found_item").select();
    console.log(data);
    res.status(200).send(data);
  } catch (err) {
    console.error(err);
  }
});

router.get("/:foundId", (req, res) => {
  res.send("supposed to be a single page of found item");
});

router.post("/newitem", async (req, res) => {
  const foundItem = req.body;

  try {
    await db("found_item").insert({
      item: foundItem.item,
      prev_location: foundItem.prev_location,
      curr_location: foundItem.curr_location,
      coordinates: foundItem.coordinates,
      comment: foundItem.comment,
    });
    res.status(200).send("ok");
  } catch (err) {
    console.error(err);
  }
});

router.delete("/:foundId", (req, res) => {
  res.send("supposed to delete an item which is picked up");
});

module.exports = router;
