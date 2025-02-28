const express = require("express");
const router = express.Router();

const auth = require("../lib/auth");

router.post("/googleSignin", async (req, res) => {
  console.log("googleSignin");
  await auth.googleSignin(req, res);
});

router.get("/googleSignout", async (req, res) => {
  console.log("googleSignout");
  await auth.googleSignout(req, res);
});

module.exports = router;
