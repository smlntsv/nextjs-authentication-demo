import { FC } from 'react'
import { Container } from '@/components/ui/container'
import { Card, CardHeading, CardText } from '@/components/card'
import { LinkButton } from '@/components/ui/button'
import { IconError } from '@/components/icons/icon-error'
import styles from './registration-failed-page.module.css'

const RegistrationFailedPage: FC = () => (
  <Container centered>
    <Card icon={<IconError className={styles.icon} />}>
      <CardHeading>Registration Failed</CardHeading>
      <CardText>We couldn&#39;t verify your email. Please try again or contact support.</CardText>
      <LinkButton className={styles.goToSignUpButton} href="/auth/sign-up">
        Go to Sign Up
      </LinkButton>
    </Card>
  </Container>
)

export { RegistrationFailedPage }
