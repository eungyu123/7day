const express = require("express");
const router = express.Router();
const Store = require("../lib/store");

router.get("/:userId", async (req, res) => {
  console.log("getStore");
  Store.getStore(req, res);
});

router.post("/buyCharacter", async(req, res)=> {
  Store.buyCharacter(req, res);
})

router.post("/buyPet", async(req, res)=> {
  Store.buyPet(req, res);
})

module.exports = router;
