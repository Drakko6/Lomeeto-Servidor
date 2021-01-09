const nodemailer = require("nodemailer");
require("dotenv").config({ path: ".env" });

const USER = process.env.GMAIL_EMAIL;
const PASS = process.env.GMAIL_PASS;

async function sendMail(email, url) {
  // const transporter = nodemailer.createTransport({
  //   // service: "gmail",
  //   service: "hotmail",
  //   auth: {
  //     user: USER,
  //     pass: PASS,
  //   },
  // });

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
        "1//04kGLj2b-t8f9CgYIARAAGAQSNwF-L9Ir5iDDDjS8HeC-YO3rM6z8AJ1sWNsx-QgU3AhAX2qtn_U1fKcx2YOuywl6d_M8Fk2yxnY",
      accessToken:
        "ya29.a0AfH6SMAOJyvQEViRTAZNUf6eV_29S6l1tlx14_KGeBROZ6YFnVTnlqTM4glqfM53TVAEaRyK94gCd42f67-tAkeDILtiYQ_W8vE9HEwzKsXgohEQqvtc-SeGdtqWWdbO0BlrXB_yhEijXnuuIeMZ3kJk1DAIBVzlyx9mf_FPUCQ",
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

  console.log(info);

  console.log("Message sent: %s", info.messageId);

  // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

module.exports = sendMail;
