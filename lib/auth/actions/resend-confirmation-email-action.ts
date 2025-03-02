'use server'

import 'server-only'
import { emailSchema } from '@/lib/auth/validation/email-schema'
import {
  isPendingUserExistsByEmail,
  processResendConfirmationEmail,
} from '@/lib/auth/utils/auth-utils'
import { createRateLimiter } from '@/lib/rate-limiter'

const checkResendEmailRateLimiter = createRateLimiter({
  points: 1,
  duration: 60,
})

export type ResendConfirmationEmailFormState = {
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

async function resendConfirmationEmailAction(
  _: ResendConfirmationEmailFormState,
  formData: FormData
): Promise<ResendConfirmationEmailFormState> {
  const nextState: ResendConfirmationEmailFormState = {}
  const validationResult = emailSchema.safeParse(Object.fromEntries(formData))

  if (!validationResult.success) {
    nextState.errors = validationResult.error.flatten().fieldErrors
    return nextState
  }

  const { email } = validationResult.data

  try {
    const rateLimiterKey = `resend-confirmation-email-action-for:${email}`
    const rateLimiterStatus = await checkResendEmailRateLimiter(rateLimiterKey)

    if (!rateLimiterStatus.passed) {
      nextState.rateLimit = {
        isCounting: false,
        secondsRemaining: Math.floor(rateLimiterStatus.msBeforeNext / 1000),
      }
      // nextState.globalError = `Too many attempts. Please wait ${Math.floor(rateLimiterStatus.msBeforeNext / 1000)} seconds.`
      return nextState
    }

    const emailExists = await isPendingUserExistsByEmail(email)
    if (!emailExists) {
      nextState.errors = { email: ['Email not found'] }
      return nextState
    }

    await processResendConfirmationEmail(email)

    nextState.emailSent = true
  } catch (error) {
    console.error('Resend confirmation email failed: ', error)
    nextState.globalError = 'An unexpected error occurred.'
  }

  return nextState
}

export { resendConfirmationEmailAction }
