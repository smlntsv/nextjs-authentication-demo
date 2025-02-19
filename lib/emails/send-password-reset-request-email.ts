import { sendEmail } from '@/lib/emails/mailer'
import { renderEmailTemplateToHtml } from '@/lib/emails/render-email-template-to-html'
import { PasswordResetRequest } from '@/lib/emails/templates/password-reset-request'

async function sendPasswordResetRequestEmail(
  recipient: string,
  setNewPasswordUrl: string
): Promise<boolean> {
  const projectName = process.env.PROJECT_NAME ?? 'Project Name'
  const userEmail = recipient
  const subject = `[${projectName}] Reset Your Password`
  const emailHtml = await renderEmailTemplateToHtml(PasswordResetRequest, {
    projectName,
    userEmail,
    setNewPasswordUrl,
  })

  return await sendEmail(recipient, subject, emailHtml)
}

export { sendPasswordResetRequestEmail }
