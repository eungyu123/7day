const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    //_id
    nickname: { type: String, required: true },
    friendList: [{ freind_id: { type: String } }],
    userPoint: { type: Number, required: true },
    googleId: { type: String, required: true },
    character: { type: String },
    pet: { type: String },
    petList: [{ petId: { type: String } }],
    characterList: [{ characterId: { type: String } }],
    eggList: [{ eggId: { type: String } }],
    rewardList: [{ rewardId: { type: String } }],
    gifts: [{ giftId: { type: String } }],
    location: {
      type: {
        type: String,
        enum: ["Point"],
      },
      coordinates: [Number],
    },
    lastitemGeneratedAt: { type: Date },
  },
  { timestamps: true, collection: "users" }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
