import { FC } from 'react'

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
      <body>
        <main>
          x
          <p>
            <strong>Hello {userEmail},</strong>
          </p>
          <p>
            ✅ Your password has been successfully updated. You can now log in using your new
            password.
          </p>
          <a
            href={signInUrl}
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
            Go to Login Page
          </a>
          <p>If you did not request this password change, please contact our support team.</p>
          <p>Stay secure,</p>
          <p>
            The <strong>{projectName}</strong> Team
          </p>
        </main>
      </body>
    </html>
  )
}

export type { PasswordResetSuccessProps }
export { PasswordResetSuccess }
