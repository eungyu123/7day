const express = require("express");
const router = express.Router();

const User = require("../lib/user");

router.get("/:userId", async (req, res) => {
  console.log("profileRouter");
  User.getUser(req, res);
});

// 유저 좌표 닉네임 한번에 가능
router.put("/:userId", async (req, res) => {
  User.updateUser(req, res);
});

router.get("/friend/:userId", async (req, res) => {
  User.getFriends(req, res);
});
// 선물상자 생성
router.post("/user/generateGift/:userId", async (req, res) => {
  User.generateGift(req, res);
});
// 선물상자 삭제
router.post("/user/removeGift/:userId", async (req, res) => {
  User.removeGift(req, res);
});

router.get("");
module.exports = router;
