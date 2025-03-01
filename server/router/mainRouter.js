const express = require("express");
const router = express.Router();

const main = require("../lib/main");

// users 관련
router.get("/users", async (req, res) => {
  console.log("getUsers");
  main.getUsers(req, res);
});

router.put("/users/:googleId", async (req, res) => {
  console.log("UpdateUserName");
  main.UpdateUserName(req, res);
});

// walkdata 관련
router.get("/walkdatas/:googleId", async (req, res) => {
  console.log("getWalkDataByGoogleId");
  main.getWalkDataByGoogleId(req, res);
});

router.get("/weekWalkdatas/:googleId", async (req, res) => {
  main.getWeekWalkDataByGoogleId(req, res);
});
module.exports = router;
