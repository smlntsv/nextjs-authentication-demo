import { FC } from 'react'
import { EmailGlobalStyle } from '@/lib/emails/components/email-global-style'

type ConfirmEmailProps = {
  projectName: string
  userEmail: string
  emailConfirmationUrl: string
}

const ConfirmEmail: FC<ConfirmEmailProps> = ({ projectName, userEmail, emailConfirmationUrl }) => {
  return (
    <html lang="en">
      {/* eslint-disable-next-line @next/next/no-head-element */}
      <head>
        <title>Confirm Your Email</title>
        <EmailGlobalStyle />
      </head>
      <body>
        <h1>📧 Confirm Your Email</h1>
        <p>
          Hello <strong>{userEmail}</strong>,<br />
          <br />
          Thank you for signing up for <strong>{projectName}</strong>! <br />
          Please confirm your email address by clicking the button below:
        </p>
        <a className={'buttonLink'} href={emailConfirmationUrl}>
          Confirm Email
        </a>
        <p>If you did not sign up for this account, please ignore this email.</p>
        <p>
          Best regards, <br />
          The {projectName} Team
        </p>
      </body>
    </html>
  )
}

export type { ConfirmEmailProps }
export { ConfirmEmail }
