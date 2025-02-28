const express = require("express");
const router = express.Router();

const Name = require("../lib/name");

router.post("/", async (req, res) => {
  console.log("nameRouter");
  const { name, point } = req.body;
  Name.test(name, point, res);
});

module.exports = router;
