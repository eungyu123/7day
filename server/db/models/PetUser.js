const mongoose = require("mongoose");

const UserPetSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    petId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pet",
      required: true,
    },

    petName: { type: String, required: true },
    price: { type: Number, required: true },
    petLink: { type: String, required: true },
  },
  { timestamps: true, collection: "userpets" }
);

const UserPet = mongoose.model("UserPet", UserPetSchema);

module.exports = UserPet;
