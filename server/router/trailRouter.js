const express = require("express");
const trail = require("../lib/trail");
const router = express.Router();

router.get("/", async (req, res) => {
  console.log("getTrails");
  trail.getTrails(req, res);
});

router.get("/userTrail/:userId", async (req, res) => {
  console.log("getUserTrail");
  trail.getUserTrail(req, res);
});

router.put("/userTrail/:userId", async (req, res) => {
  console.log("updateUserTrail");
  trail.updateUserTrail(req, res);
});

module.exports = router;
