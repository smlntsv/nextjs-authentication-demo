import { ResendPasswordResetButton } from '@/components/password-reset/resend-password-reset-button'
import { FC } from 'react'

type Props = {
  searchParams: Promise<Record<string, string>>
}

const PasswordResetConfirmation: FC<Props> = async ({ searchParams }) => {
  // Email presence checked in middleware
  const email = (await searchParams).email

  return (
    <div>
      <h1>Check Your Email</h1>
      <p>We sent a password reset link to {email}.</p>
      <p>If you did not receive the email, click the button below:</p>
      <ResendPasswordResetButton email={email} />
    </div>
  )
}

export default PasswordResetConfirmation
