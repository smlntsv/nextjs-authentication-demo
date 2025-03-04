import { FC } from 'react'
import { EmailGlobalStyle } from '@/lib/emails/components/email-global-style'

type PasswordResetSuccessProps = {
  projectName: string
  userEmail: string
  signInUrl: string
}

const PasswordResetSuccess: FC<PasswordResetSuccessProps> = ({
  projectName,
  userEmail,
  signInUrl,
}) => {
  return (
    <html lang="en">
      {/* eslint-disable-next-line @next/next/no-head-element */}
      <head>
        <title>Password Reset Successful</title>
        <EmailGlobalStyle />
      </head>
      <body>
        <h1>🔒 Password Updated</h1>
        <p>
          Hello <strong>{userEmail}</strong>,<br />
          <br /> Your password has been successfully updated.
          <br /> You can now log in using your new password.
        </p>
        <a className={'buttonLink'} href={signInUrl}>
          Go to Login Page
        </a>
        <p>
          If you did not request this password change, please contact our support team immediately.
        </p>
        <p>
          Stay secure,
          <br />
          The {projectName} Team
        </p>
      </body>
    </html>
  )
}

export type { PasswordResetSuccessProps }
export { PasswordResetSuccess }
