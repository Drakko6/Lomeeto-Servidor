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
        "1//04znwke6VZSo5CgYIARAAGAQSNwF-L9IrcACvR97LYNW6iE_qitTIVGVilv-SMwooI4wYRhhYs_yjbH-RfmJ_uqNdJDC0A-KT2Bc",
      accessToken:
        "ya29.A0AfH6SMD5pii72htQxwXOXZ00dWeyCZ8r6D_mFn-s1noeEbgNLqwvt8DE1eyz7mOzYd5ZX_JpxUSNWMaj6oFoC9njs0DoXqy70uJzadJ7oQGtZh7q3Z9QGtxgjcXZhWbt-j12oz8a0dLabaUgTqPRtbv4WNoM",
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

  // console.log(info);

  //console.log("Message sent: %s", info.messageId);
}

module.exports = sendMail;
