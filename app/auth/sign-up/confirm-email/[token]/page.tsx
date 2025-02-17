import { FC } from 'react'
import { completeSignUpProcess, isEmailConfirmationTokenValid } from '@/lib/auth/utils/auth-utils'
import { InvalidTokenMessage } from '@/app/auth/sign-up/confirm-email/[token]/invalid-token-message'
import { UnrecoverableErrorMessage } from '@/app/auth/sign-up/confirm-email/[token]/unrecoverable-error-message'
import { SuccessMessage } from '@/app/auth/sign-up/confirm-email/[token]/success-message'

type Props = {
  params: Promise<{ token: string }>
}

const ConfirmEmailPage: FC<Props> = async ({ params }) => {
  const token = (await params).token

  const isTokenValid = await isEmailConfirmationTokenValid(token)

  if (!isTokenValid) {
    return <InvalidTokenMessage />
  }

  const isComplete = await completeSignUpProcess(token)

  if (!isComplete) {
    return <UnrecoverableErrorMessage />
  }

  return <SuccessMessage />
}

export default ConfirmEmailPage
