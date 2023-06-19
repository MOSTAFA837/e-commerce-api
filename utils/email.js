import nodemailer from "nodemailer";
import expressAsyncHandler from "express-async-handler";

export const sendEmail = expressAsyncHandler(async (data, req, res) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  let info = await transporter.sendMail({
    from: process.env.SMTP_MAIL,
    to: data.to,
    subject: data.subject,
    text: data.text,
    html: data.html,
  });

  console.log("message", info.messageId);
  console.log("url", nodemailer.getTestMessageUrl(info));
});
