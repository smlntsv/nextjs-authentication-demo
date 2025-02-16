'use server'

import 'server-only'
import { signUpSchema } from '@/lib/auth/validation/sign-up-schema'
import { redirect } from 'next/navigation'
import { isUserRegisteredByEmail, processPendingUserSignUp } from '@/lib/auth/utils/auth-utils'

export type SignUpFormState = {
  fields: {
    email: string
    password: string
  }
  errors?: {
    email?: string[]
    password?: string[]
  }
  systemError?: string
}

async function signUpAction(_: SignUpFormState, formData: FormData): Promise<SignUpFormState> {
  const nextState = {
    fields: {
      email: formData.get('email'),
      password: formData.get('password'),
    },
  } as SignUpFormState

  // Validate input
  const validationResult = signUpSchema.safeParse(nextState.fields)

  if (!validationResult.success) {
    nextState.errors = validationResult.error.flatten().fieldErrors
    return nextState
  }

  const { email, password } = validationResult.data

  try {
    // Check if user already registered
    if (await isUserRegisteredByEmail(email)) {
      nextState.errors = { email: ['Email is already registered'] }
      return nextState
    }

    // Process sign-up
    await processPendingUserSignUp(email, password)
  } catch (error) {
    console.error('Error during sign-up process:', error)
    nextState.systemError = 'An unexpected error occurred. Please try again later.'

    return nextState
  }

  // Success registration
  redirect(`/auth/sign-up/confirmation-awaiting?email=${email}`)
}

export { signUpAction }
