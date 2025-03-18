const express = require("express");
const router = express.Router();

const Mission = require("../lib/mission");

router.get("/:userId", async (req, res) => {
  console.log("getmission router");
  await Mission.getUserMission(req, res);
});

router.put("/:userId", async (req, res) => {
  await Mission.updateUserMission(req, res);
});

router.get("/createusermission/:userId", async (req, res) => {
  console.log("createmission router");
  await Mission.createUserMission(req, res);
});

router.post("/finish/:userId", async (req, res) => {
  console.log("finish mission");
  await Mission.finishMission(req, res);
});
module.exports = router;
