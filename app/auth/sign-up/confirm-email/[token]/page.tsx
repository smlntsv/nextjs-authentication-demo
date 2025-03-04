import { FC } from 'react'
import { completeSignUpProcess, isEmailConfirmationTokenValid } from '@/lib/auth/utils/auth-utils'
import { RegistrationFailedPage } from '@/components/sign-up/registration-failed-page'
import { RegistrationCompletePage } from '@/components/sign-up/registration-complete-page'
import { InvalidConfirmationTokenPage } from '@/components/sign-up/invalid-confirmation-token-page'

type Props = {
  params: Promise<{ token: string }>
}

const ConfirmEmailPage: FC<Props> = async ({ params }) => {
  const token = (await params).token

  const isTokenValid = await isEmailConfirmationTokenValid(token)

  if (!isTokenValid) {
    return <InvalidConfirmationTokenPage />
  }

  const isComplete = await completeSignUpProcess(token)

  if (!isComplete) {
    return <RegistrationFailedPage />
  }

  return <RegistrationCompletePage />
}

export default ConfirmEmailPage
