import { FC } from 'react'
import { Container } from '@/components/ui/container'
import { LinkButton } from '@/components/ui/button'
import { Card, CardHeading, CardText } from '@/components/card'
import { IconCheck } from '@/components/icons/icon-check'
import styles from './registration-complete-page.module.css'

const RegistrationCompletePage: FC = () => (
  <Container centered>
    <Card icon={<IconCheck className={styles.icon} />}>
      <CardHeading>Registration Complete</CardHeading>
      <CardText>Your email has been confirmed successfully! You can now log in.</CardText>

      <LinkButton className={styles.goToSignInButton} href="/auth/sign-in">
        Go to Sign In
      </LinkButton>
    </Card>
  </Container>
)

export { RegistrationCompletePage }
