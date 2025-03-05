const express = require("express");
const router = express.Router();

const Walkdata = require("../lib/walkdata");

router.put("/dailywalkdata/:userId", async (req, res) => {
  Walkdata.updateStep(req, res);
});

router.get("/:userId", async (req, res) => {
  Walkdata.getWalkdata(req, res);
});

module.exports = router;
