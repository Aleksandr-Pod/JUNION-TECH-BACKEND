const nodemailer = require('nodemailer')
require('dotenv').config();

const config = {
  host: 'smtp.meta.ua',
  port: 465,
  secure: true,
  auth: {
    user: 'stdfire@meta.ua',
    pass: process.env.SECRET_KEY,
  },
}

const transporter = nodemailer.createTransport(config)

const sendEmail = (mail) => {
    console.log("Mailer config:", config)
    mail.from = "stdfire@meta.ua"
    transporter.sendMail(mail)
        .then(() => console.log('mail sended'))
        .catch(err => console.log(err.message))
}

module.exports = sendEmail
