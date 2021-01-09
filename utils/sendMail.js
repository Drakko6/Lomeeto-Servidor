const nodemailer = require("nodemailer");
require("dotenv").config({ path: ".env" });

const USER = process.env.GMAIL_EMAIL;
const PASS = process.env.GMAIL_PASS;

async function sendMail(email, url) {
  const transporter = nodemailer.createTransport({
    // service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    ignoreTLS: false,
    secure: false,
    auth: {
      user: USER,
      pass: PASS,
    },
  });

  const info = await transporter.sendMail({
    from: " <lomeetoinfo@gmail.com>", // sender address
    to: email, // list of receivers
    subject: "Confirmacion de Usuario ✔", // Subject line
    text: "Confirma tu correo haciendo clic en el link", // plain text body
    html: `Confirma tu correo haciendo clic en el link
          <a href="${url}"> ${url} </a>`, // html body
  });

  console.log(info);

  console.log("Message sent: %s", info.messageId);

  // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

module.exports = sendMail;
