const express = require("express");
const router = express.Router();

const egg = require("../lib/egg");

router.get("/hatch", async (req, res) => {
  console.log("getHatchery");
  await egg.getHatchery(req, res);
});

router.post("/oneEgg", async (req, res) => {
  console.log("getEgg");
  await egg.getEgg(req, res);
});

router.put("/state/:userId", async (req, res) => {
  console.log("updateEggState");
  await egg.updateEggState(req, res);
});

router.put("/insert/:userId", async (req, res) => {
  console.log("insertEgg");
  await egg.insertEgg(req, res);
});

router.get("/:userId", async (req, res) => {
  console.log("getUserEgg");
  await egg.getUserEgg(req, res);
});

router.put("/:userId", async (req, res) => {
  console.log("updateEgg");
  await egg.updateEgg(req, res);
});

router.post("/hatch/:userId", async(req,res) => {
  console.log("hatch"); 
  await egg.hatchEgg(req,res); 
})

module.exports = router;
