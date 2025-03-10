const express = require("express");
const router = express.Router();

const inventory = require("../lib/inventory");

router.put("/:userId", async (req, res) => {
  console.log("updateUser");
  inventory.updateUser(req, res);
});

module.exports = router;
