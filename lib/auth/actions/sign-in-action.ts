'use server'

import 'server-only'
import { emailPasswordSchema } from '@/lib/auth/validation/email-password-schema'
import { redirect } from 'next/navigation'
import { isUserPasswordValid, isUserRegisteredByEmail } from '@/lib/auth/utils/auth-utils'
import { createSessionByEmail } from '@/lib/auth/session'
import { AuthFormState } from '@/components/auth-form'
import { createRateLimiter } from '@/lib/rate-limiter'

const checkSignInRateLimiter = createRateLimiter({
  points: 2,
  duration: 60,
})

async function signInAction(_: AuthFormState, formData: FormData): Promise<AuthFormState> {
  const nextState = {
    fields: {
      email: formData.get('email'),
      password: formData.get('password'),
    },
  } as AuthFormState

  const validationResult = emailPasswordSchema.safeParse(nextState.fields)
  if (!validationResult.success) {
    nextState.errors = validationResult.error.flatten().fieldErrors
    return nextState
  }

  const { email, password } = validationResult.data

  try {
    const rateLimiterKey = `sign-in-action-for:${email}`
    const rateLimiterStatus = await checkSignInRateLimiter(rateLimiterKey)

    if (!rateLimiterStatus.passed) {
      nextState.rateLimit = {
        isCounting: false,
        secondsRemaining: Math.floor(rateLimiterStatus.msBeforeNext / 1000),
      }

      return nextState
    }

    if (!(await isUserRegisteredByEmail(email))) {
      nextState.errors = { email: ['Email not found'] }
      return nextState
    }

    const passwordValid = await isUserPasswordValid(email, password)

    if (!passwordValid) {
      nextState.errors = { password: ['Wrong password'] }
      return nextState
    }

    const sessionCreated = await createSessionByEmail(email)
    if (!sessionCreated) {
      nextState.globalError = 'Failed to create session. Please try again or contact support.'
      return nextState
    }
  } catch (error) {
    console.error('Error during sign-in process: ', error)
    nextState.globalError = 'An unexpected error occurred.'

    return nextState
  }

  // Success sign-in
  redirect('/dashboard')
}

export { signInAction }
