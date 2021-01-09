const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ConfirmationSchema = Schema(
  {
    idUser: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "User",
    },
    token: {
      type: String,
      trim: true,
      require: true,
    },
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Confirmation", ConfirmationSchema);
