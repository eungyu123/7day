const express = require("express");
const router = express.Router();

const User = require("../lib/user");

router.get("/:userId", async (req, res) => {
  console.log("getUser");
  User.getUser(req, res);
});

// 유저 좌표 닉네임 한번에 가능
router.put("/:userId", async (req, res) => {
  console.log("updateUser");
  User.updateUser(req, res);
});

router.get("/friend/:userId", async (req, res) => {
  console.log("getFriend");
  User.getFriends(req, res);
});

router.put("/updatefriend/:userId", async (req, res) => {
  console.log("updateFriends 진입 전");
  User.updateFriends(req, res);
});
// 선물상자 생성
router.post("/generateGift/:userId", async (req, res) => {
  console.log("generateGift");
  User.generateGift(req, res);
});
// 선물상자 삭제
router.post("/removeGift/:userId", async (req, res) => {
  console.log("removeGift");
  User.removeGift(req, res);
});
// 유저 포인트 설정
router.post("/setUserPoints", async (req, res) => {
  console.log("[setUserPoints]유저 아이디는 ", req.body.userId);
  console.log("[setUserPoints]유저가 얻은 포인트는 ", req.body.point);
  User.setPoints(req, res);
});
// 유저 만보기미션 클리어 true로
router.put("/setPedometerMissionClear/:userId", async (req, res) => {
  User.setPedometerMissionClear(req, res);
});

router.get("");
module.exports = router;
