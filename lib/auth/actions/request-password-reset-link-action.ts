'use server'

import 'server-only'
import { createRateLimiter } from '@/lib/rate-limiter'
import { getUserByEmail, processPasswordResetLinkRequest } from '@/lib/auth/utils/auth-utils'
import { redirect } from 'next/navigation'
import { emailSchema } from '@/lib/auth/validation/email-schema'

const checkRequestPasswordResetRateLimiter = createRateLimiter({
  points: 1,
  duration: 60,
})

export type RequestPasswordResetLinkState = {
  fields: {
    email: string
  }
  errors?: {
    email?: string[]
  }
  rateLimit?: {
    isCounting: boolean
    secondsRemaining: number
  }
  globalError?: string
}

async function requestPasswordResetLinkAction(
  _: RequestPasswordResetLinkState,
  formData: FormData
): Promise<RequestPasswordResetLinkState> {
  const nextState = {
    fields: {
      email: formData.get('email'),
    },
  } as RequestPasswordResetLinkState

  // Basic validation
  const validationResult = emailSchema.safeParse(nextState.fields)

  if (!validationResult.success) {
    nextState.errors = validationResult.error.flatten().fieldErrors
    return nextState
  }

  const email = validationResult.data.email

  try {
    // Get user
    const user = await getUserByEmail(email)

    if (!user) {
      nextState.errors = { email: ['User not found'] }
      return nextState
    }

    // Check rate limiter
    const rateLimiterKey = `request-password-reset-link-action-for:${email}`
    const rateLimiterStatus = await checkRequestPasswordResetRateLimiter(rateLimiterKey)

    if (!rateLimiterStatus.passed) {
      nextState.rateLimit = {
        isCounting: false,
        secondsRemaining: Math.floor(rateLimiterStatus.msBeforeNext / 1000),
      }

      return nextState
    }

    // Create and store password reset token and send email
    await processPasswordResetLinkRequest(user.id)

    // TODO: send password reset email (email, plain password reset token)
  } catch (error) {
    console.log('Request password reset link action failed: ', error)
    nextState.globalError = 'An unexpected error occurred. Please try again later.'

    return nextState
  }

  redirect(`/auth/password-reset/confirmation?email=${email}`)
}

export { requestPasswordResetLinkAction }
