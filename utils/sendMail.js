const nodemailer = require("nodemailer");
require("dotenv").config({ path: ".env" });
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
  "298460132135-373ucj7l2dd683hct650qe8mg2he4mch.apps.googleusercontent.com", // ClientID
  "WOHJtGn3_MA8Un6Hk1POEFC5", // Client Secret
  "https://developers.google.com/oauthplayground" // Redirect URL
);

oauth2Client.setCredentials({
  refresh_token:
    "1//04OZjz9d2wzgACgYIARAAGAQSNwF-L9IrrnO7fDizbcWjrlUeTouEK6ZKErWrbYAMxEFVH-Pw5FH3HMgu6Tiaj87baTtU2c5XiVQ",
});

const accessToken = oauth2Client.getAccessToken();

async function sendMail(email, url) {
  const transporter = nodemailer.createTransport({
    tls: {
      rejectUnauthorized: false,
    },
    // host: "smtp.gmail.com",
    service: "gmail",
    // port: 465,
    // secure: true,
    auth: {
      type: "OAuth2",
      user: "lomeetoinfo@gmail.com",
      clientId:
        "298460132135-373ucj7l2dd683hct650qe8mg2he4mch.apps.googleusercontent.com",
      clientSecret: "WOHJtGn3_MA8Un6Hk1POEFC5",
      refreshToken:
        "1//04OZjz9d2wzgACgYIARAAGAQSNwF-L9IrrnO7fDizbcWjrlUeTouEK6ZKErWrbYAMxEFVH-Pw5FH3HMgu6Tiaj87baTtU2c5XiVQ",
      accessToken: accessToken,
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

  console.log("Message sent: %s", info);
}

module.exports = sendMail;
