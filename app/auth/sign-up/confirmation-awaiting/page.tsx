import { ResendConfirmationEmailButton } from '@/components/resend-confirmation-button'
import { FC } from 'react'
import { Heading } from '@/components/ui/typography/heading'
import { Container } from '@/components/ui/container'

// NOTE: Email query parameter check implemented in middleware.ts

type Props = {
  searchParams: Promise<Record<string, string>>
}

const ConfirmationAwaitingPage: FC<Props> = async ({ searchParams }) => {
  const email = (await searchParams).email

  return (
    <Container centered style={{ maxWidth: '320px' }}>
      <Heading size={'sm'} weight={'semibold'}>
        Check Your Email
      </Heading>
      <p>
        Confirmation email was sent to <strong>{email}</strong>. Please check your inbox and click
        the link to verify your email address.
      </p>
      <p>
        Don&#39;t receive the email? Check your spam folder or click the button below to resend the
        confirmation email.
      </p>
      <ResendConfirmationEmailButton email={email} />
    </Container>
  )
}

export default ConfirmationAwaitingPage
