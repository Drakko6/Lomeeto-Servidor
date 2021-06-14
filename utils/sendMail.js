const nodemailer = require("nodemailer");
require("dotenv").config({ path: ".env" });
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
  process.env.OAUTH_CLIENT_ID,
  process.env.OAUTH_CLIENT_SECRET,
  "https://developers.google.com/oauthplayground" // Redirect URL
);

oauth2Client.setCredentials({
  refresh_token: process.env.OAUTH_REFRESH_TOKEN,
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
      clientId: process.env.OAUTH_CLIENT_ID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
      refreshToken: process.env.OAUTH_REFRESH_TOKEN,
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
