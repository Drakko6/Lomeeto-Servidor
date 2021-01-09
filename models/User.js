const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = Schema(
  {
    breed: {
      type: String,
      trim: true,
    },
    years: {
      type: Number,
      trim: true,
    },
    months: {
      type: Number,
      trim: true,
    },
    owner: {
      type: String,
      trim: true,
    },
    name: {
      type: String,
      require: true,
      trim: true,
    },
    username: {
      type: String,
      require: true,
      trim: true,
      unique: true,
    },

    email: {
      type: String,
      require: true,
      trim: true,
      unique: true,
    },
    avatar: {
      type: String,
      trim: true,
    },
    tel: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      require: true,
      trim: true,
    },
    // createAt: {
    //   type: Date,
    //   default: Date.now(),
    // },
    //para confirmar por correo
    confirmed: {
      type: Boolean,
      default: false,
    },
    state: {
      type: String,
      trim: true,
      require: true,
    },
    town: {
      type: String,
      trim: true,
      require: true,
    },
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", UserSchema);
