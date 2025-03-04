import { FC } from 'react'
import { EmailGlobalStyle } from '@/lib/emails/components/email-global-style'

type PasswordResetRequestProps = {
  projectName: string
  userEmail: string
  setNewPasswordUrl: string
}

const PasswordResetRequest: FC<PasswordResetRequestProps> = ({
  projectName,
  userEmail,
  setNewPasswordUrl,
}) => {
  return (
    <html lang="en">
      {/* eslint-disable-next-line @next/next/no-head-element */}
      <head>
        <title>Password Reset Request</title>
        <EmailGlobalStyle />
      </head>
      <body>
        <h1>🔑 Reset Your Password</h1>
        <p>
          Hello <strong>{userEmail}</strong>,<br />
          <br /> We received a request to reset your password.
          <br /> If you made this request, click the button below to set a new password:
        </p>
        <a className={'buttonLink'} href={setNewPasswordUrl}>
          Set New Password
        </a>
        <p>
          If you did not request this, please ignore this email. Your password will remain
          unchanged.
        </p>
        <p>
          Best Regards,
          <br />
          The {projectName} Team
        </p>
      </body>
    </html>
  )
}

export type { PasswordResetRequestProps }
export { PasswordResetRequest }
