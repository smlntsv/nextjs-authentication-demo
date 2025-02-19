import { FC } from 'react'

type ConfirmEmailProps = {
  projectName: string
  userEmail: string
  emailConfirmationUrl: string
}

const ConfirmEmail: FC<ConfirmEmailProps> = ({ projectName, userEmail, emailConfirmationUrl }) => {
  return (
    <html lang="en">
      <body>
        <main>
          <p>
            <strong>Hello {userEmail},</strong>
          </p>
          <p>
            Thank you for signing up for <strong>{projectName}</strong>! Please confirm your email
            address by clicking the link below:
          </p>
          <a
            href={emailConfirmationUrl}
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
            Confirm Email
          </a>
          <p>If you did not sign up for this account, you can safely ignore this email.</p>
          <p>Regards,</p>
          <p>
            The <strong>{projectName}</strong> Team
          </p>
        </main>
      </body>
    </html>
  )
}

export type { ConfirmEmailProps }
export { ConfirmEmail }
