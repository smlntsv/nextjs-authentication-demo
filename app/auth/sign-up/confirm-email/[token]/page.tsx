import { FC } from 'react'
import { completeSignUpProcess, isEmailConfirmationTokenValid } from '@/lib/auth/utils/auth-utils'
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Confirm Email',
}

type Props = {
  params: Promise<{ token: string }>
}

const ConfirmEmailPage: FC<Props> = async ({ params }) => {
  const token = (await params).token
  const basePath = `/auth/sign-up/confirm-email/${token}`

  const isTokenValid = await isEmailConfirmationTokenValid(token)

  if (!isTokenValid) {
    redirect(`${basePath}/invalid-token`)
  }

  const isComplete = await completeSignUpProcess(token)

  if (!isComplete) {
    redirect(`${basePath}/failed`)
  }

  redirect(`${basePath}/completed`)
}

export default ConfirmEmailPage
