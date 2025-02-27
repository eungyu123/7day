const express = require("express");
const router = express.Router();

const main = require("../lib/main");

router.post("/googleSignin", (req, res) => {
  console.log("googleSignin");
  main.googleSignin(req, res);
});

module.exports = router;
