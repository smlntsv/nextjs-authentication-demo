import { Container } from '@/components/ui/container'
import { IconKey } from '@/components/icons/icon-key'
import { PasswordResetForm } from '@/components/password-reset/password-reset-form'
import { LinkButton } from '@/components/ui/button'
import { IconArrowLeft } from '@/components/icons/icon-arrow-left'
import { Card, CardHeading, CardText } from '@/components/card'
import styles from './page.module.css'

const PasswordResetPage = () => {
  return (
    <Container centered>
      <Card icon={<IconKey />}>
        <CardHeading>Forgot Password?</CardHeading>
        <CardText>No worries, we&#39;ll send you reset instructions.</CardText>
        <PasswordResetForm className={styles.form} />
        <LinkButton
          className={styles.backToLogInButton}
          size={'md'}
          leadingIcon={<IconArrowLeft />}
          variant={'linkGray'}
          href={'/auth/sign-in'}
        >
          Back to log in
        </LinkButton>
      </Card>
    </Container>
  )
}

export default PasswordResetPage
