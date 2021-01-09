const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const LikeSchema = Schema(
  {
    idPost: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "Post",
    },
    idUser: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "User",
    },
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Like", LikeSchema);
