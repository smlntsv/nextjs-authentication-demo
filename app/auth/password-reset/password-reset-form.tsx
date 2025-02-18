'use client'

import {
  requestPasswordResetLinkAction,
  RequestPasswordResetLinkState,
} from '@/lib/auth/actions/request-password-reset-link-action'
import { startTransition, useActionState, useCallback, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useCountdown } from '@/lib/hooks/use-countdown'
import {
  RequestPasswordResetData,
  requestPasswordResetSchema,
} from '@/lib/auth/validation/request-password-reset-schema'

const PasswordResetForm = () => {
  const initialState: RequestPasswordResetLinkState = { fields: { email: '', redirect: 'true' } }
  const [state, formAction, isSubmitting] = useActionState<RequestPasswordResetLinkState, FormData>(
    requestPasswordResetLinkAction,
    initialState
  )

  const [validationErrors, setValidationErrors] = useState<RequestPasswordResetLinkState['errors']>(
    state.errors
  )

  const { handleSubmit, register, formState, setError } = useForm<RequestPasswordResetData>({
    resolver: zodResolver(requestPasswordResetSchema),
    mode: 'onChange',
  })

  const rateLimitState = useCountdown(state.rateLimit?.secondsRemaining ?? 0)

  // Handle react-hook-form validation errors
  useEffect(() => {
    const emailError = formState.errors.email?.message

    setValidationErrors({
      email: emailError ? [emailError] : undefined,
    })
  }, [formState.errors.email, formState.errors])

  // Handle useActionState state errors
  useEffect(() => {
    Object.keys(state.errors ?? []).forEach((value) => {
      const field = value as keyof NonNullable<RequestPasswordResetLinkState['errors']>
      setError(field, { type: 'server', message: state.errors![field]![0] })
    })
  }, [setError, state])

  const onSubmit: SubmitHandler<RequestPasswordResetData> = useCallback(
    (data) => {
      const formData = new FormData()
      Object.entries(data).forEach(([field, value]) => formData.append(field, value))
      startTransition(() => formAction(formData))
    },
    [formAction]
  )

  const renderValidationError = (
    field: keyof NonNullable<RequestPasswordResetLinkState['errors']>
  ) => {
    if (!validationErrors) return

    const errorMessage = validationErrors[field] ? validationErrors[field][0] : undefined
    if (!errorMessage) return null

    return (
      <div id={`${field}-error`}>
        <p style={{ color: 'red' }}>{errorMessage}</p>
      </div>
    )
  }

  const getAriaLabelBy = (field: keyof NonNullable<RequestPasswordResetLinkState['errors']>) => {
    return validationErrors && validationErrors[field] ? `${field}-error` : undefined
  }

  return (
    <div>
      <h1>Password Reset</h1>
      {state.globalError && (
        <div>
          <p style={{ color: 'red' }}>{state.globalError}</p>
        </div>
      )}
      {rateLimitState && rateLimitState.secondsRemaining > 0 && (
        <p>Too many attempts. Please wait {rateLimitState.secondsRemaining} seconds.</p>
      )}
      <form action={formAction} onSubmit={handleSubmit(onSubmit)}>
        {/* Email */}
        <div>
          <label htmlFor={'email'}>Email</label>
          <input
            id={'email'}
            defaultValue={state.fields.email}
            placeholder={'Enter your email address'}
            disabled={isSubmitting}
            aria-describedby={getAriaLabelBy('email')}
            autoComplete={'email'}
            {...register('email')}
          />
          {renderValidationError('email')}
        </div>

        <input type={'hidden'} value={'true'} {...register('redirect')} />

        {/* Submit Button */}
        <button type="submit" disabled={isSubmitting}>
          Reset Password
        </button>
      </form>
      <div>
        <Link href={'/auth/sign-in'}>Sign In</Link>
      </div>
    </div>
  )
}

export { PasswordResetForm }
