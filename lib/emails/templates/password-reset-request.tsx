import { FC } from 'react'

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
      <body>
        <main>
          <p>
            <strong>Hello {userEmail},</strong>
          </p>
          <p>
            We received a request to reset your password. If you initiated this request, click the
            button below to set a new password:
          </p>
          <a
            href={setNewPasswordUrl}
            style={{
              display: 'inline-block',
              backgroundColor: '#007bff',
              color: '#ffffff',
              textDecoration: 'none',
              padding: '12px 24px',
              fontSize: '16px',
              borderRadius: '5px',
              marginTop: '20px',
            }}
          >
            Set new password
          </a>
          <p>
            If you did not request this, you can ignore this email, and your password will remain
            unchanged.
          </p>
          <p>Regards,</p>
          <p>
            The <strong>{projectName}</strong> Team
          </p>
        </main>
      </body>
    </html>
  )
}

export type { PasswordResetRequestProps }
export { PasswordResetRequest }
