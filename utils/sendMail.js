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
    "1//0459p5p94HYTUCgYIARAAGAQSNwF-L9Irotk0W1NM8qoJZABVevIDv1nOGSj0l76S3eu1J4hOFNeHdQhIadUXh7KUb-k2TxWSgsc",
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
        "1//0459p5p94HYTUCgYIARAAGAQSNwF-L9Irotk0W1NM8qoJZABVevIDv1nOGSj0l76S3eu1J4hOFNeHdQhIadUXh7KUb-k2TxWSgsc",
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
