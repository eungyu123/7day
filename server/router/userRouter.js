const express = require("express");
const router = express.Router();

const User = require("../lib/user");

router.get("/:userId", async (req, res) => {
  console.log("profileRouter");
  User.getUser(req, res);
});

router.put("/:userId", async (req, res) => {
  User.updateUser(req, res);
});

router.get("/friend/:userId", async (req, res) => {
  User.getFriends(req, res);
});

module.exports = router;
