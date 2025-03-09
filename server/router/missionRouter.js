const express = require("express");
const router = express.Router();

const Mission = require("../lib/mission");

router.get("/:userId", async (req, res) => {
  console.log("getmission router");
  Mission.getUserMission(req, res);
});

router.put("/:userId", async (req, res) => {
  Mission.updateUserMission(req, res);
});

router.get("/createusermission/:userId", async (req, res) => {
  console.log("createmission router");
  Mission.createUserMission(req, res);
});

module.exports = router;
