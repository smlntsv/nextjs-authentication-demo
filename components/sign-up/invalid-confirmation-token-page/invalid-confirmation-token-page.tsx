import { FC } from 'react'
import { Container } from '@/components/ui/container'
import { LinkButton } from '@/components/ui/button'
import { Card, CardHeading, CardText } from '@/components/card'
import { IconError } from '@/components/icons/icon-error'
import styles from './invalid-confirmation-token-page.module.css'

const InvalidConfirmationTokenPage: FC = () => (
  <Container centered>
    <Card icon={<IconError className={styles.icon} />}>
      <CardHeading>Invalid or Expired Link</CardHeading>
      <CardText>
        This email confirmation link is no longer valid. Please try signing up again.
      </CardText>
      <LinkButton className={styles.goToSignUpButton} href={'/auth/sign-up'} size={'lg'}>
        Go to Sign Up
      </LinkButton>
    </Card>
  </Container>
)

export { InvalidConfirmationTokenPage }
