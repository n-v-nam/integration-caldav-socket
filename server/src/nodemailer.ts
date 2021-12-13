import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";
// const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    requireTLS: true,
    auth: {
      user: 'caldav.system@gmail.com',
      pass: 'Nam.2kpr',
    },
    logger: true
});

export default transporter 
