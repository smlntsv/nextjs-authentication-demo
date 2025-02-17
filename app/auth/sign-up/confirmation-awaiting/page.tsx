import { ResendConfirmationEmailButton } from '@/app/auth/sign-up/confirmation-awaiting/resend-confirmation-button'
import { FC } from 'react'

// NOTE: Email query parameter check implemented in middleware.ts

type Props = {
  searchParams: Promise<Record<string, string>>
}

const ConfirmationAwaitingPage: FC<Props> = async ({ searchParams }) => {
  const email = (await searchParams).email

  return (
    <div>
      <h1>You&#39;re Almost There!</h1>
      <p>
        Confirmation email was sent to <strong>{email}</strong>. Please check your inbox and click
        the link to verify your email address.
      </p>
      <p>
        Don&#39;t receive the email? Check your spam folder or click the button below to resend the
        confirmation email.
      </p>
      <ResendConfirmationEmailButton email={email} />
    </div>
  )
}

export default ConfirmationAwaitingPage
