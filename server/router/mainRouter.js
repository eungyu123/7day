const express = require("express");
const router = express.Router();

const main = require("../lib/main");

// users
router.get("/users/:googleId", async (req, res) => {
  console.log("users");
  main.getUser(req, res);
});

router.put("/users/:googleId", async (req, res) => {
  console.log("UpdateUserName");
  main.UpdateUserName(req, res);
});

// walkdata

router.get("/walkdatas/:googleId", async (req, res) => {
  console.log("getWalkDataByGoogleId");
  main.getWalkDataByGoogleId(req, res);
});

router.get("/todayWalkdata/:googleId", async (req, res) => {
  console.log("getTodayWalkDataByGoogleId");
  main.getTodayWalkDataByGoogleId(req, res);
});
router.put("/todayWalkdata/:googleId", async (req, res) => {
  console.log("updateTodayWalkData");
  main.updateTodayWalkData(req, res);
});
router.get("/weekWalkdatas/:googleId", async (req, res) => {
  console.log("getWeekWalkDataByGoogleId");
  main.getWeekWalkDataByGoogleId(req, res);
});

// 지도
router.put("/userCoord/:googleId", async (req, res) => {
  console.log("updateUserCoord");
  main.updateUserCoord(req, res);
});

// 아이템
router.get("/items/:googleId", async (req, res) => {
  console.log("getItems");
  main.getItems(req, res);
});

router.post("/removeItems/:googleId", async (req, res) => {
  console.log("removeItems");
  main.removeItems(req, res);
});
module.exports = router;
