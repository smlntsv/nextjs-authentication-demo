import { sendEmail } from '@/lib/emails/mailer'
import { renderEmailTemplateToHtml } from '@/lib/emails/render-email-template-to-html'
import { ConfirmEmail } from '@/lib/emails/templates/confirm-email'

async function sendConfirmEmail(recipient: string, emailConfirmationUrl: string): Promise<boolean> {
  const projectName = process.env.PROJECT_NAME ?? 'Project Name'
  const userEmail = recipient
  const subject = `[${projectName}] Confirm Your Email to Complete Registration`
  const emailHtml = await renderEmailTemplateToHtml(ConfirmEmail, {
    projectName,
    userEmail,
    emailConfirmationUrl,
  })

  return await sendEmail(recipient, subject, emailHtml)
}

export { sendConfirmEmail }
