const nodemailer = require('nodemailer')
const {
  mailConfig: { host, port, user, pass }
} = require('../config')

const send = async ({ account, to, subject, template }) => {
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
      html: template({ account })
    })
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  send
}
