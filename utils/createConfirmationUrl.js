const { v4: uuidv4 } = require("uuid");
const Confirmation = require("../models/Confirmation");

const createConfirmationUrl = (id) => {
  const token = uuidv4();

  const confirmation = new Confirmation({
    idUser: id,
    token,
  });
  confirmation.save();

  // return `http://localhost:3000/user/confirm/${token}`;
  return `https://lomeeto.netlify.app/user/confirm/${token} `;
};

module.exports = createConfirmationUrl;
