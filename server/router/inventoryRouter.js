const express = require("express");
const router = express.Router();

const Item = require("../lib/item");

router.get("/:id", async (req, res) => {
  console.log("itemRouter");
  Item.item(req.params.id, res);
});

module.exports = router;
