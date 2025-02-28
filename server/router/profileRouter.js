const express = require("express");
const router = express.Router();

const Profile = require("../lib/profile");

router.get("/:id", async (req, res) => {
  console.log("profileRouter");
  Profile.profile(req.params.id, res);
});

module.exports = router;
