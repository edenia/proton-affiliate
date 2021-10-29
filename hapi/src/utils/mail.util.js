const nodemailer = require('nodemailer')
const {
  mailConfig: { host, port, user, pass }
} = require('../config')
const {
  mailTemplate: { generateConfirmationMail }
} = require('./templates')

const sendConfirmation = async ({ account, to, subject }) => {
  try {
    const transporter = nodemailer.createTransport({
      host,
      secure: false,
      port,
      auth: { user, pass },
      tls: { rejectUnauthorized: false }
    })

    await transporter.sendMail({
      from: `Proton Affiliate <${user}>`,
      to,
      subject,
      html: generateConfirmationMail({ account })
    })
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  sendConfirmation
}
