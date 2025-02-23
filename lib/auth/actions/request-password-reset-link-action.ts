'use server'

import 'server-only'
import { createRateLimiter } from '@/lib/rate-limiter'
import { getUserByEmail, processPasswordResetLinkRequest } from '@/lib/auth/utils/auth-utils'
import { redirect } from 'next/navigation'
import { requestPasswordResetSchema } from '@/lib/auth/validation/request-password-reset-schema'

const checkRequestPasswordResetRateLimiter = createRateLimiter({
  points: 1,
  duration: 60,
})

export type RequestPasswordResetLinkState = {
  fields: {
    email: string
    redirect: 'true' | 'false'
  }
  errors?: {
    email?: string[]
  }
  rateLimit?: {
    isCounting: boolean
    secondsRemaining: number
  }
  globalError?: string
  emailSent?: boolean
}

async function requestPasswordResetLinkAction(
  _: RequestPasswordResetLinkState,
  formData: FormData
): Promise<RequestPasswordResetLinkState> {
  const nextState = {
    fields: {
      email: formData.get('email'),
      redirect: formData.get('redirect'),
    },
  } as RequestPasswordResetLinkState

  // Basic validation
  const validationResult = requestPasswordResetSchema.safeParse(nextState.fields)

  if (!validationResult.success) {
    nextState.errors = validationResult.error.flatten().fieldErrors
    return nextState
  }

  const email = validationResult.data.email
  const doRedirect = validationResult.data.redirect === 'true'

  try {
    // Get user
    const user = await getUserByEmail(email)

    if (!user) {
      nextState.errors = { email: ['Email not found'] }
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
    await processPasswordResetLinkRequest(user)

    nextState.emailSent = true
  } catch (error) {
    console.error('Request password reset link action failed: ', error)
    nextState.globalError = 'An unexpected error occurred. Please try again later.'

    return nextState
  }

  if (doRedirect) {
    redirect(`/auth/password-reset/confirmation?email=${email}`)
  }

  return nextState
}

export { requestPasswordResetLinkAction }
