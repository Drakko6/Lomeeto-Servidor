const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CommentSchema = Schema(
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
    comment: {
      type: String,
      trim: true,
      require: true,
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

module.exports = mongoose.model("Comment", CommentSchema);
