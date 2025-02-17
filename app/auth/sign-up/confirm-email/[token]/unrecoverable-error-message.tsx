import { FC } from 'react'
import Link from 'next/link'

const UnrecoverableErrorMessage: FC = () => (
  <div>
    <p>Sorry, an unexpected error occurred. Please contact support for assistance.</p>
    <p>You can also try signing up again:</p>
    <Link href="/auth/sign-up">Go to Sign Up</Link>
  </div>
)

export { UnrecoverableErrorMessage }
