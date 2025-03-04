const mongoose = require("mongoose");

const CharacterSchema = new mongoose.Schema(
  {
    //_id
    characterName: { type: String },
    price: { type: Number},
    characterLink: { type: String },
  },
  { timestamps: true, collection: "characters" }
);

const Character = mongoose.model("Character", CharacterSchema);

module.exports = Character;
