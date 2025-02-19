import { FC } from 'react'

type EmailConfirmedProps = {
  projectName: string
  userEmail: string
  signInUrl: string
}

const EmailConfirmed: FC<EmailConfirmedProps> = ({ projectName, userEmail, signInUrl }) => {
  return (
    <html lang="en">
      <body>
        <main>
          <p>
            <strong>Hello {userEmail},</strong>
          </p>
          <p>
            <strong>🎉 Welcome To {projectName}!</strong> Your registration is now complete.
          </p>
          <p>You can log in using your email and password.</p>
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
          <p>If you did not create this account, please contact support.</p>
          <p>Regards,</p>
          <p>
            The <strong>{projectName}</strong> Team
          </p>
        </main>
      </body>
    </html>
  )
}

export type { EmailConfirmedProps }
export { EmailConfirmed }
