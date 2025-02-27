const express = require("express");
const router = express.Router();

const main = require("../lib/main");

router.post("/googleSignin", (req, res) => {
  console.log("googleSignin");
  main.googleSignin(req, res);
});

router.get("/test", async (req, res) => {
  console.log("test");
  main.test(req, res);
});

module.exports = router;
