const mongoose = require("mongoose");

const InventorySchema = new mongoose.Schema(
  {
    //_id
    googleId: { type: String, required: true },
    character: { type: String },
    pet: { type: String },
    egg: { type: String },
  },
  // imestamps: true => 자동 createdAt, updateAt 추가
  // collection: "Inventories" => 컬렉션(테이블)이름 강제 지정
  { timestamps: true, collection: "Inventories" }
);

const Inventory = mongoose.model("Inventories", InventorySchema);

module.exports = Inventory;
