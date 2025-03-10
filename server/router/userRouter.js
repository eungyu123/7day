const express = require("express");
const router = express.Router();

const User = require("../lib/user");

router.get("/:userId", async (req, res) => {
  console.log("getUser");
  User.getUser(req, res);
});

// 유저 좌표 닉네임 한번에 가능
router.put("/:userId", async (req, res) => {
  // console.log("updateUser");
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

router.get("");
module.exports = router;
