'use server'

import 'server-only'
import { emailPasswordSchema } from '@/lib/auth/validation/email-password-schema'
import { redirect } from 'next/navigation'
import { isUserRegisteredByEmail, processPendingUserSignUp } from '@/lib/auth/utils/auth-utils'
import { AuthFormState } from '@/app/auth/auth-form'

async function signUpAction(_: AuthFormState, formData: FormData): Promise<AuthFormState> {
  const nextState = {
    fields: {
      email: formData.get('email'),
      password: formData.get('password'),
    },
  } as AuthFormState

  // Validate input
  const validationResult = emailPasswordSchema.safeParse(nextState.fields)

  if (!validationResult.success) {
    nextState.errors = validationResult.error.flatten().fieldErrors
    return nextState
  }

  const { email, password } = validationResult.data

  try {
    // Check if user already registered
    if (await isUserRegisteredByEmail(email)) {
      nextState.errors = { email: ['Email already in use'] }
      return nextState
    }

    // Process sign-up
    await processPendingUserSignUp(email, password)
  } catch (error) {
    console.error('Error during sign-up process:', error)
    nextState.globalError = 'An unexpected error occurred. Please try again later.'

    return nextState
  }

  // Success registration
  redirect(`/auth/sign-up/confirmation-awaiting?email=${email}`)
}

export { signUpAction }
