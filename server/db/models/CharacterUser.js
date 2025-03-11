// 사용자별 캐릭터 정보
const mongoose = require("mongoose");

const UserCharacterSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    characterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Character",
      required: true,
    },
    characterName: { type: String },
    price: { type: Number },
    characterLink: { type: String },
  },
  { timestamps: true, collection: "user_characters" }
);

const UserCharacter = mongoose.model("UserCharacter", UserCharacterSchema);

module.exports = UserCharacter;
