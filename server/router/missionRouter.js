const express = require("express");
const router = express.Router();

const Mission = require("../lib/mission");

router.get("/:userId", async (req, res) => {
  Mission.getMissions(req, res);
});

router.put("/:userId", async (req, res) => {
  Mission.updateMission(req, res);
});

router.get("/createusermission/:userId", async (req, res) => {
  Mission.createUserMission(req, res);
});

module.exports = router;
