import { sendEmail } from '@/lib/emails/mailer'
import { renderEmailTemplateToHtml } from '@/lib/emails/render-email-template-to-html'
import { PasswordResetSuccess } from '@/lib/emails/templates/password-reset-success'

async function sendPasswordResetSuccessEmail(
  recipient: string,
  signInUrl: string
): Promise<boolean> {
  const projectName = process.env.PROJECT_NAME ?? 'Project Name'
  const userEmail = recipient
  const subject = `[${projectName}] Your Password Has Been Changed`
  const emailHtml = await renderEmailTemplateToHtml(PasswordResetSuccess, {
    projectName,
    userEmail,
    signInUrl,
  })

  return await sendEmail(recipient, subject, emailHtml)
}

export { sendPasswordResetSuccessEmail }
