const mongoose = require("mongoose");

const InventorySchema = new mongoose.Schema(
  {
    //_id
    user_id: { type: String, required: true },
    character: { type: String },
    pet: { type: String },
    egg: { type: String },
  },
  { timestamps: true }
);

const Inventory = mongoose.model("Inventory", InventorySchema);

module.exports = Inventory;
