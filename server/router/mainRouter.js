const express = require("express");
const router = express.Router();

const main = require("../lib/main");

router.get("/users", async (req, res) => {
  console.log("getUsers");
  main.getUsers(req, res);
});

router.put("/users/:googleId", async (req, res) => {
  console.log("req.body", req.body);
  console.log("req.params", req.params);
  main.UpdateUser(req, res);
});

module.exports = router;
