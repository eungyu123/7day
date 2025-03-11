const express = require("express");
const router = express.Router();

const inventory = require("../lib/inventory");

router.get("/:userId", async (req, res) => {
  console.log("getInventory");
  inventory.getInventory(req, res);
});

module.exports = router;
