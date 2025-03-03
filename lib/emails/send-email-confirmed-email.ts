import { sendEmail } from '@/lib/emails/mailer'
import { renderEmailTemplateToHtml } from '@/lib/emails/render-email-template-to-html'
import { EmailConfirmed } from '@/lib/emails/templates/email-confirmed'

async function sendEmailConfirmedEmail(recipient: string, signInUrl: string): Promise<boolean> {
  const projectName = process.env.PROJECT_NAME ?? 'Project Name'
  const userEmail = recipient
  const subject = `[${projectName}] 🎉 Registration Completed - Welcome!`
  const emailHtml = await renderEmailTemplateToHtml(EmailConfirmed, {
    projectName,
    userEmail,
    signInUrl,
  })

  return await sendEmail(recipient, subject, emailHtml)
}

export { sendEmailConfirmedEmail }
