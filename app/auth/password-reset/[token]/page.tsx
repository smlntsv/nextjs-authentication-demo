import { FC } from 'react'
import { isPasswordResetTokenValid } from '@/lib/auth/utils/auth-utils'
import { InvalidPasswordResetTokenMessage } from '@/components/password-reset/invalid-password-reset-token-message'
import { SetNewPasswordForm } from '@/components/password-reset/set-new-password-form'

type Props = {
  params: Promise<{ token: string }>
}

const SetNewPasswordPage: FC<Props> = async ({ params }) => {
  const token = (await params).token
  const isTokenValid = await isPasswordResetTokenValid(token)

  if (!isTokenValid) {
    return <InvalidPasswordResetTokenMessage />
  }

  return <SetNewPasswordForm passwordResetToken={token} />
}

export default SetNewPasswordPage
