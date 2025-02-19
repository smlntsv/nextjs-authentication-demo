import Link from 'next/link'

const PasswordResetSuccessPage = () => (
  <div>
    <h1>Password Reset</h1>
    <p>Your password has been successfully reset.</p>
    <p>
      <Link href="/auth/sign-in">Go to sign in</Link>
    </p>
  </div>
)

export default PasswordResetSuccessPage
