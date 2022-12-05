const nodemailer = require('nodemailer')
require('dotenv').config();

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'stdfire@gmail.com',
    pass: process.env.GMAIL_PASS,
  },
})

const sendEmail = (mail) => {
    mail.from = "stdfire@gmail.com"
    transporter.sendMail(mail)
        .then(() => console.log('mail sended'))
        .catch(err => console.log(err.message))
}

module.exports = sendEmail
