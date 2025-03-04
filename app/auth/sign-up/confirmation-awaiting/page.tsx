import { FC } from 'react'
import { Container } from '@/components/ui/container'
import { Card, CardHeading, CardText } from '@/components/card'
import { ResendConfirmationEmailButton } from '@/components/sign-up/resend-confirmation-button'
import { IconMail } from '@/components/icons/icon-mail'
import styles from './page.module.css'
import { IconArrowLeft } from '@/components/icons/icon-arrow-left'
import { LinkButton } from '@/components/ui/button'

// NOTE: Email query parameter check implemented in middleware.ts

type Props = {
  searchParams: Promise<Record<string, string>>
}

const ConfirmationAwaitingPage: FC<Props> = async ({ searchParams }) => {
  const email = (await searchParams).email

  return (
    <Container centered>
      <Card icon={<IconMail />}>
        <CardHeading>Check Your Email</CardHeading>
        <CardText>
          We sent a confirmation email to <br /> <strong>{email}</strong>
        </CardText>
        <ResendConfirmationEmailButton email={email} className={styles.resendConfirmationButton} />
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

export default ConfirmationAwaitingPage
