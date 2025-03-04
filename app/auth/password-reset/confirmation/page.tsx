import { FC } from 'react'
import { Container } from '@/components/ui/container'
import { Card, CardHeading, CardText } from '@/components/card'
import { IconMail } from '@/components/icons/icon-mail'
import { ResendPasswordResetButton } from '@/components/password-reset/resend-password-reset-button'
import styles from './page.module.css'
import { LinkButton } from '@/components/ui/button'
import { IconArrowLeft } from '@/components/icons/icon-arrow-left'

type Props = {
  searchParams: Promise<Record<string, string>>
}

const PasswordResetConfirmationPage: FC<Props> = async ({ searchParams }) => {
  // Email presence checked in middleware
  const email = (await searchParams).email

  return (
    <Container centered>
      <Card icon={<IconMail />}>
        <CardHeading>Check your email</CardHeading>
        <CardText>
          We sent a password reset link to <br /> <strong>{email}</strong>
        </CardText>
        <ResendPasswordResetButton email={email} className={styles.resendButton} />
        <LinkButton
          href={'/auth/sign-in'}
          variant={'linkGray'}
          leadingIcon={<IconArrowLeft />}
          className={styles.backToLogInButton}
        >
          Back to log in
        </LinkButton>
      </Card>
    </Container>
  )
}

export default PasswordResetConfirmationPage
