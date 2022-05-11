import nodemailer from "nodemailer";
import path from 'path'
export async function sendEmail(email: string, subject: string, text: string) {
  const emailUser = process.env.EMAIL_USERNAME;
  const pass = process.env.EMAIL_PASSWORD;
  
  let transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: emailUser,
      pass: pass,
    },
  });

  let mailOptions = {
    from: emailUser,
    to: email,
    subject: subject,
    html: text,
  };

  transport.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log("Email sent " + info.response);
    }
  });
}