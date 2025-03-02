import { FC } from 'react'
import { LinkButton } from '@/components/ui/button'

const SuccessMessage: FC = () => (
  <div>
    <p>Your email has been confirmed successfully! You can now log in.</p>
    <LinkButton href="/auth/sign-in">Go to Sign In</LinkButton>
  </div>
)

export { SuccessMessage }
