const express = require("express");
const router = express.Router();

const Store = require("../lib/store");

router.get("/", async (req, res) => {
  console.log("getStore");
  Store.getStore(req, res);
});

module.exports = router;
