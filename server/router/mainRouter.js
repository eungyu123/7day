const express = require("express");
const router = express.Router();

const main = require("../lib/main");

router.get("/users", async (req, res) => {
  console.log("getUsers");
  main.getUsers(req, res);
});

router.post("/walkUpdate", async (req, res) => {
  console.log("walkUpdate");
  const { user_id, walk } = req.body;
  main.walkUpdate(user_id, walk, res);
});

module.exports = router;
