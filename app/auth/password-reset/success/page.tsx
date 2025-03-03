import { LinkButton } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { Card, CardHeading, CardText } from '@/components/card/card'
import { IconKey } from '@/components/icons/icon-key'
import styles from './page.module.css'

const PasswordResetSuccessPage = () => (
  <Container centered>
    <Card icon={<IconKey />}>
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
