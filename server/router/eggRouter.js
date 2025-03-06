const express = require("express");
const router = express.Router();

const egg = require("../lib/egg");

router.get("/:userId", async (req, res) => {
  console.log("getEgg");
  await egg.getEgg(req, res);
});

router.put("/:userId", async (req, res) => {
  console.log("updateEgg");
  await egg.updateEgg(req, res);
});

router.post("/hatch/:userId", async (req, res) => {
  console.log("eggHatch");
  await egg.eggHatch(req, res);
});

module.exports = router;
