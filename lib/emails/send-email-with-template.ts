import { sendEmail } from '@/lib/emails/mailer'
import { renderEmailTemplateToHtml } from '@/lib/emails/render-email-template-to-html'
import { FC } from 'react'

async function sendEmailWithTemplate<T extends Record<string, unknown>>(
  recipient: string,
  subject: string,
  template: FC<T>,
  templateProps: T
): Promise<boolean> {
  const emailHtml = await renderEmailTemplateToHtml(template, templateProps)
  return await sendEmail(recipient, subject, emailHtml)
}

export { sendEmailWithTemplate }
