const express = require("express");
const router = express.Router();

const main = require("../lib/main");

router.get("/createuser", (req, res) => {
  main.createUser(req, res);
});

router.post("/reward", (req, res) => {
  console.log("maingetReward");
  main.getReward(req, res);
});

router.get("/rewards/:userId", (req, res) => {
  console.log("getRewards");
  main.getRewards(req, res);
});

router.get("/cp", (req, res) => {
  main.updatePetName(req, res);
});
module.exports = router;
