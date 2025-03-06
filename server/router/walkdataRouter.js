const express = require("express");
const router = express.Router();

const Walkdata = require("../lib/walkdata");

router.get("/:userId", async (req, res) => {
  console.log("getStep");
  Walkdata.getStep(req, res);
});

router.put("/dailywalkdata/:userId", async (req, res) => {
  Walkdata.updateStep(req, res);
});

module.exports = router;
