import { FC } from 'react'
import Link from 'next/link'

const InvalidPasswordResetTokenMessage: FC = () => (
  <div>
    <h1>Password Reset Link is Invalid or Expired</h1>
    <p>
      The link you used is either invalid or has expired. Please request a new password reset link.
    </p>
    <Link href="/auth/password-reset">Request a New Password Reset</Link>
  </div>
)

export { InvalidPasswordResetTokenMessage }
