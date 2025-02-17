import { FC } from 'react'
import Link from 'next/link'

const SuccessMessage: FC = () => (
  <div>
    <p>Your email has been confirmed successfully! You can now log in.</p>
    <Link href="/auth/sign-in">Go to Sign In</Link>
  </div>
)

export { SuccessMessage }
