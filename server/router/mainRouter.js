const express = require("express");
const router = express.Router();

const main = require("../lib/main");

router.get("/users", async (req, res) => {
  console.log("getUsers");
  main.getUsers(req, res);
});

module.exports = router;
