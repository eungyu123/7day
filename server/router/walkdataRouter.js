const express = require("express");
const router = express.Router();

const Walkdata = require("../lib/walkdata");

router.put("/dailywalkdata/:userId", async (req, res) => {
  console.log("updateStep");
  Walkdata.updateStep(req, res);
});

router.post("/:userId", async (req, res) => {
  Walkdata.getStep(req, res);
});

module.exports = router;
