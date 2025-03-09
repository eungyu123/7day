const express = require("express");
const router = express.Router();

const Walkdata = require("../lib/walkdata");

router.put("/dailywalkdata/:userId", async (req, res) => {
  Walkdata.updateStep(req, res);
});

router.post("/:userId", async (req, res) => {
  Walkdata.getStep(req, res);
});

  router.get("/todaysteps/:userId", async (req, res) => {
    console.log("walkdatarouter 진입");
    Walkdata.getTodayWalkData(req,res);
  });
  

module.exports = router;
