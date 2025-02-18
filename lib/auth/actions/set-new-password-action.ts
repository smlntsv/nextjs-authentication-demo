'use server'

import 'server-only'
import { setNewPasswordSchema } from '@/lib/auth/validation/set-new-password-schema'
import { redirect } from 'next/navigation'
import {
  getPasswordResetRecord,
  markPasswordResetTokenAsUsed,
  updatePasswordAndFetchEmail,
} from '@/lib/auth/utils/auth-utils'

export type SetNewPasswordState = {
  fields: {
    password: string
    passwordResetToken: string
  }
  errors?: {
    password?: string[]
    passwordResetToken?: string[]
  }
  globalError?: string
}

async function setNewPasswordAction(
  _: SetNewPasswordState,
  formData: FormData
): Promise<SetNewPasswordState> {
  const nextState = {
    fields: {
      password: formData.get('password'),
      passwordResetToken: formData.get('passwordResetToken'),
    },
  } as SetNewPasswordState

  // Basic validation
  const validationResult = setNewPasswordSchema.safeParse(nextState.fields)

  if (!validationResult.success) {
    nextState.errors = validationResult.error.flatten().fieldErrors
    return nextState
  }

  const { passwordResetToken, password } = validationResult.data

  // Check if token valid
  const passwordResetRecord = await getPasswordResetRecord(passwordResetToken)
  if (
    !passwordResetRecord ||
    passwordResetRecord.isUsed ||
    new Date(passwordResetRecord.expiresAt + 'UTC') < new Date()
  ) {
    nextState.globalError =
      'Password reset token invalid or expired. Please try to reset your password again.'
    return nextState
  }

  let email: string

  try {
    email = await updatePasswordAndFetchEmail(passwordResetRecord.userId, password)
    await markPasswordResetTokenAsUsed(passwordResetToken)
    // TODO: send email
  } catch (error) {
    console.error('Failed to set new password: ', error)
    nextState.globalError = 'An unexpected error occurred. Please try again later.'

    return nextState
  }

  redirect(`/auth/password-reset/success?email=${email!}`)
}

export { setNewPasswordAction }
