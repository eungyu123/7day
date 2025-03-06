const express = require("express");
const router = express.Router();

const Walkdata = require("../lib/walkdata");

router.put("/:userId", async (req, res) => {
  console.log("updateDailyWalkData");
  Walkdata.updateDailyWalkData(req, res);
});

router.post("/:userId", async (req, res) => {
  Walkdata.getStep(req, res);
});

module.exports = router;
