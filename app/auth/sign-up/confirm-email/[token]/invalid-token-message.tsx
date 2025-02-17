import { FC } from 'react'
import Link from 'next/link'

const InvalidTokenMessage: FC = () => (
  <div>
    <p>The confirmation link is invalid or has expired. Please try signing up again.</p>
    <Link href="/auth/sign-up">Go to Sign Up</Link>
  </div>
)

export { InvalidTokenMessage }
