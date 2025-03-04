const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    //_id
    nickname: { type: String, required: true },
    friend_list: [{ freind_id: { type: String } }],
    user_point: { type: Number, required: true },
    googleId: { type: String, required: true },
    character: { type: String },
    pet: { type: String },
    petList: [{ petId: { type: String } }],
    characterList: [{ characterId: { type: String } }],
    eggList: [{ eggId: { type: String } }],
    rewardList: [{ rewardId: { type: String } }],
  },
  { timestamps: true, collection: "users" }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
