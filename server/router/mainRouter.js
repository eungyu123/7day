const express = require("express");
const router = express.Router();

const main = require("../lib/main");
const item = require("../lib/item");

router.get("/users", async (req, res) => {
  console.log("getUsers");
  main.getUsers(req, res);
});
router.delete("/users/:id", async (req, res) => {
  console.log("deleteUser");
  main.removeUser(req, res);
});
router.post("/steps/:id", async (req, res) => {
  console.log("steps");
  main.walkUpdate(req, res);
});

router.post("/inventory/:id", async (req, res) => {
  console.log("inventory");
  item.getInventory(req, res);
});
router.get("/friends/:id", async (req, res) => {
  console.log("friends");
  main.getFriends(req, res);
});

module.exports = router;
