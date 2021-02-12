const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const FollowSchema = Schema(
  {
    idUser: {
      //id del usuario que sigue
      type: Schema.Types.ObjectId,
      require: true,
      ref: "User",
    },
    follow: {
      //id al que sigue
      type: Schema.Types.ObjectId,
      require: true,
      ref: "User",
    },
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Follow", FollowSchema);
