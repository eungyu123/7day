const mongoose = require("mongoose");

const FriendSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    friendId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    state: {
      type: String,
    },
  },
  { timestamps: true, collection: "friends" }
);

const Friend = mongoose.model("Friend", FriendSchema);

module.exports = Friend;
