const express = require("express");
const router = express.Router();

const main = require("../lib/main");

router.get("/test", async (req, res) => {
  console.log("test");
  main.test(req, res);
});

module.exports = router;
