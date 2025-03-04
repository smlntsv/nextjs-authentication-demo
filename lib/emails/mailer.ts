'use server'

import 'server-only'
import { createTransport, SentMessageInfo } from 'nodemailer'
import { Address } from 'nodemailer/lib/mailer'

const sender: Address = {
  name: process.env.SMTP_FROM_NAME ?? 'Sender Name',
  address: process.env.SMTP_FROM_ADDRESS ?? 'sender@example.com',
}

const transporter = createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_ENCRYPTION === 'SSL',
  requireTLS: process.env.SMTP_ENCRYPTION === 'TLS',
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD,
  },
})

async function sendEmail(recipient: string, subject: string, emailHtml: string) {
  try {
    const info: SentMessageInfo = await transporter.sendMail({
      from: sender,
      to: recipient,
      subject: subject,
      html: emailHtml,
    })

    console.log('Email sent: ', info.messageId)
    return true
  } catch (e) {
    console.error('Error sending email: ', e)
    return false
  }
}

export { sendEmail }
