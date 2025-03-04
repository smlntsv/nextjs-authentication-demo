import { FC } from 'react'
import { getUserEmailByPasswordResetToken } from '@/lib/auth/utils/auth-utils'
import { InvalidPasswordResetTokenPage } from '@/components/password-reset/invalid-password-reset-token-page'
import { SetNewPasswordForm } from '@/components/password-reset/set-new-password-form'
import { Container } from '@/components/ui/container'
import { Card, CardHeading, CardText } from '@/components/card'
import { IconLock } from '@/components/icons/icon-lock'
import { LinkButton } from '@/components/ui/button'
import { IconArrowLeft } from '@/components/icons/icon-arrow-left'
import styles from './page.module.css'

type Props = {
  params: Promise<{ token: string }>
}

const SetNewPasswordPage: FC<Props> = async ({ params }) => {
  const token = (await params).token
  const userEmail = await getUserEmailByPasswordResetToken(token)

  if (!userEmail) {
    return <InvalidPasswordResetTokenPage />
  }

  return (
    <Container centered>
      <Card icon={<IconLock />}>
        <CardHeading>Set New Password</CardHeading>
        <CardText>Set up your new password below.</CardText>
        <SetNewPasswordForm className={styles.form} email={userEmail} passwordResetToken={token} />
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

export default SetNewPasswordPage
