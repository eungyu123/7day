const express = require("express");
const router = express.Router();

const Log = require("../lib/log");

router.put("/:userId", async (req, res) => {
  Log.createLog(req, res);
});

router.get("/:userId", async (req, res) => {
  console.log("getLog")
  Log.getLog(req, res);
});

module.exports = router;
