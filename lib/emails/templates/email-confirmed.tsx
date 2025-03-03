import { FC } from 'react'
import { EmailGlobalStyle } from '@/lib/emails/components/email-global-style'

type EmailConfirmedProps = {
  projectName: string
  userEmail: string
  signInUrl: string
}

const EmailConfirmed: FC<EmailConfirmedProps> = ({ projectName, userEmail, signInUrl }) => {
  return (
    <html lang="en">
      {/* eslint-disable-next-line @next/next/no-head-element */}
      <head>
        <title>Email Confirmed</title>
        <EmailGlobalStyle />
      </head>
      <body>
        <h1>🎉 Welcome To {projectName}</h1>
        <p>
          Hello <strong>{userEmail}</strong>,<br />
          <br /> Your registration is now complete.
          <br /> You can log in using your email and password.
        </p>
        <a href={signInUrl}>Go to Login</a>
        <p>If you did not create this account, please contact our support team.</p>
        <p>
          Best regards,
          <br />
          The {projectName} Team
        </p>
      </body>
    </html>
  )
}

export type { EmailConfirmedProps }
export { EmailConfirmed }
