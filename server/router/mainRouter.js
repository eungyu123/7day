const express = require("express");
const router = express.Router();

const main = require("../lib/main");

router.get("/test", async (req, res) => {
  console.log("test");
  main.test(req, res);
});

router.post("/walkUpdate", async (req, res) => {
  console.log("walkUpdate");
  const { user_id, walk } = req.body;
  main.walkUpdate(user_id, walk, res);
});

module.exports = router;
