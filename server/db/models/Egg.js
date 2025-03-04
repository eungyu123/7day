const mongoose = require("mongoose");

const EggSchema = new mongoose.Schema(
  {
    //_id
    userId: { type: String },
    goalWalk: { type: Number },
    petLink: { type: String },
  },
  { timestamps: true, collection: "eggs" }
);

const Egg = mongoose.model("Egg", EggSchema);

module.exports = Egg;
