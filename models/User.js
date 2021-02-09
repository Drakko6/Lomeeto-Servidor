const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//modelo de hora para horario

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

    //para confirmar por correo
    confirmed: {
      type: Boolean,
      default: false,
    },

    // Array con primeras preferencias
    preferences: {
      type: [String],
      require: true,
    },

    //  Propiedades relacionadas a si es un negocio
    business: {
      type: Boolean,
      default: false,
    },

    address: {
      type: String,
      trim: true,
    },

    //   tipo de producto
    type: {
      type: String,
      trim: true,
    },

    // Array de telefonos de contacto
    phone: {
      type: [String],
      trim: true,
    },

    //  Correo de contacto
    contactEmail: {
      type: String,
      trim: true,
    },

    //  Array de objetos para horario (dia y hora)
    schedule: [Object],
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", UserSchema);
