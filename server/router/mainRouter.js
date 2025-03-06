const express = require("express");
const router = express.Router();

const main = require("../lib/main");

router.get("/createuser", (req, res) => {
  main.createUser(req, res);
});

module.exports = router;
