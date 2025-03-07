import { LinkButton } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { Card, CardHeading, CardText } from '@/components/card'
import { IconCheck } from '@/components/icons/icon-check'
import styles from './page.module.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Password Updated',
  description: 'Your password has been successfully updated.',
}

const PasswordResetSuccessPage = () => (
  <Container centered>
    <Card icon={<IconCheck className={styles.icon} />}>
      <CardHeading>Password Updated</CardHeading>
      <CardText>
        Your password has been successfully updated.
        <br /> Click below to go to the login page.
      </CardText>
      <LinkButton href={'/auth/sign-in'} className={styles.continueButton}>
        Go to Login Page
      </LinkButton>
    </Card>
  </Container>
)

export default PasswordResetSuccessPage
