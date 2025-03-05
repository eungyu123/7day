const mongoose = require("mongoose");

const PetSchema = new mongoose.Schema(
  {
    //_id
    petName: { type: String },
    price: { type: Number },
    petLink: { type: String },
  },
  { timestamps: true, collection: "pets" }
);

const Pet = mongoose.model("Pet", PetSchema);

module.exports = Pet;
