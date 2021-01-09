const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PostSchema = Schema(
  {
    idUser: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "User",
    },
    file: {
      type: String,
      trim: true,
      require: true,
    },
    typeFile: {
      type: String,
      trim: true,
    },
    text: {
      type: String,
      trim: true,
    },
    // createAt: {
    //   type: Date,
    //   default: Date.now(),
    // },
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Post", PostSchema);
