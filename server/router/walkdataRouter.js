const express = require("express");
const router = express.Router();

const Walkdata = require("../lib/walkdata");

router.post("/:userId", async (req, res) => {
  console.log("getStep");
  Walkdata.getStep(req, res);
});

router.put("/:userId", async (req, res) => {
  console.log("updateDailyWalkData");
  Walkdata.updateDailyWalkData(req, res);
});

module.exports = router;
