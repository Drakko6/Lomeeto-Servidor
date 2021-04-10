const nodemailer = require("nodemailer");
require("dotenv").config({ path: ".env" });

async function sendMail(email, url) {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      type: "OAuth2",
      user: "lomeetoinfo@gmail.com",
      clientId:
        "298460132135-mlb1tjr3uncleans8u5e85qihgh6jq55.apps.googleusercontent.com",
      clientSecret: "GL9J0nXldWzOX8qjLxvI1OA1",
      refreshToken:
        "1//04YOpMOd-pG6fCgYIARAAGAQSNwF-L9Ir915CVoGqYo-u6k8Ge3VjHeReiU3REUF3xJdgbg_tkDuphdwkNS3DktqbchZn0yhab5w",
      accessToken:
        "ya29.a0AfH6SMC2EqzU7jP2uH6b2LOV0OBx2LrwXMaVO5fAKXzIgvDDkfBbH4WCL26cbqJpPMUuPVBWo9ah_suKUqh3TGQjkg3qGzfU-eY59gPGhzJ0DTGXANgRMxdoS_kJCVXB9fnU2YbwvBcGy0XLmyHymo9Te9RC",
      expires: 3599,
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

  //console.log("Message sent: %s", info.messageId);
}

module.exports = sendMail;
