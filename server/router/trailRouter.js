const express = require("express");
const trail = require("../lib/trail");
const router = express.Router();

router.get("/:userId", async (req, res) => {
  console.log("getTrails");
  trail.getTrails(req, res);
});

router.post("/oneTrail/:userId", async (req, res) => {
  console.log("getTrail");
  trail.getTrail(req, res);
});

router.put("/userTrail/:userId", async (req, res) => {
  console.log("updateVisitedLandmark");
  trail.updateVisitedLandmark(req, res);
});

module.exports = router;
