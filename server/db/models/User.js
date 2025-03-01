const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    //_id
    nickname: { type: String, required: true },
    nicknameEdit: { type: Boolean },
    friendList: [{ freind_id: { type: String } }],
    userPoint: { type: Number, required: true },
    googleId: { type: String, required: true },
  },
  { timestamps: true, collection: "users" }
);

const User = mongoose.model("users", UserSchema);

module.exports = User;
