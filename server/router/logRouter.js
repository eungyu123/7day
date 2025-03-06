const express = require("express");
const router = express.Router();

const Log = require("../lib/log");

router.put("/:userId", async (req, res) => {
  Log.createLog(req, res);
});

router.post("/log/:userId", async (req, res) => {
  Log.getLog(req, res);
});

module.exports = router;
