import { FC } from 'react'
import { Container } from '@/components/ui/container'
import { LinkButton } from '@/components/ui/button'

const InvalidTokenMessage: FC = () => (
  <Container centered>
    <p>The confirmation link is invalid or has expired. Please try signing up again.</p>
    <LinkButton href={'/auth/sign-up'} size={'lg'}>
      Go to Sign Up
    </LinkButton>
  </Container>
)

export { InvalidTokenMessage }
