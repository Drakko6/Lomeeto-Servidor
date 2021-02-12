const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const RatingSchema = Schema({
  //  ID de usuario
  user: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: "User",
  },

  //  Tipo de negocio que sigue
  type: {
    type: String,
    require: true,
  },

  //  Rating
  rating: {
    type: Number,
    require: true,
    default: 0,
  },
});

module.exports = mongoose.model("Rating", RatingSchema);
