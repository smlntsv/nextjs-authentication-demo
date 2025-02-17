'use client'

import { useActionState, useCallback, useEffect, useState, startTransition } from 'react'
import { signUpAction, SignUpFormState } from '@/lib/auth/actions/sign-up-action'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { emailPasswordSchema, EmailPassword } from '@/lib/auth/validation/email-password-schema'

const SignUpPage = () => {
  const [state, formAction, isSubmitting] = useActionState<SignUpFormState, FormData>(
    signUpAction,
    { fields: { email: '', password: '' } }
  )

  const [validationErrors, setValidationErrors] = useState<SignUpFormState['errors']>(state.errors)

  const { handleSubmit, register, formState, setError } = useForm<EmailPassword>({
    resolver: zodResolver(emailPasswordSchema),
    mode: 'onChange',
  })

  // Handle react-hook-form validation errors
  useEffect(() => {
    const emailError = formState.errors.email?.message
    const passwordError = formState.errors.password?.message

    setValidationErrors({
      email: emailError ? [emailError] : undefined,
      password: passwordError ? [passwordError] : undefined,
    })
  }, [formState.errors.email, formState.errors.password, formState.errors])

  // Handle useActionState state errors
  useEffect(() => {
    Object.keys(state.errors ?? []).forEach((value) => {
      const field = value as keyof NonNullable<SignUpFormState['errors']>
      setError(field, { type: 'server', message: state.errors![field]![0] })
    })
  }, [setError, state])

  const onSubmit: SubmitHandler<EmailPassword> = useCallback(
    (data) => {
      const formData = new FormData()
      Object.entries(data).forEach(([field, value]) => formData.append(field, value))
      startTransition(() => formAction(formData))
    },
    [formAction]
  )

  const renderValidationError = (field: keyof NonNullable<SignUpFormState['errors']>) => {
    if (!validationErrors) return

    const errorMessage = validationErrors[field] ? validationErrors[field][0] : undefined
    if (!errorMessage) return null

    return (
      <div id={`${field}-error`}>
        <p style={{ color: 'red' }}>{errorMessage}</p>
      </div>
    )
  }

  const getAriaLabelBy = (field: keyof NonNullable<SignUpFormState['errors']>) => {
    return validationErrors && validationErrors[field] ? `${field}-error` : undefined
  }

  return (
    <>
      <h1>Create an account</h1>
      {state.globalError && (
        <div>
          <p style={{ color: 'red' }}>{state.globalError}</p>
        </div>
      )}
      <form action={formAction} onSubmit={handleSubmit(onSubmit)}>
        {/* Email */}
        <div>
          <label htmlFor="email">Email</label>
          <br />
          <input
            type="email"
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

        {/* Password */}
        <div>
          <label htmlFor="password">Password</label>
          <br />
          <input
            type="password"
            id={'password'}
            defaultValue={state.fields.password}
            placeholder={'Enter your password'}
            disabled={isSubmitting}
            aria-describedby={getAriaLabelBy('password')}
            autoComplete={'new-password'}
            {...register('password')}
          />
          {renderValidationError('password')}
        </div>

        <button type={'submit'} disabled={isSubmitting}>
          Get started
        </button>
      </form>
    </>
  )
}

export default SignUpPage
