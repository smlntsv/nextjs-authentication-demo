'use client'

import {
  FC,
  HTMLInputAutoCompleteAttribute,
  startTransition,
  useActionState,
  useCallback,
  useEffect,
  useState,
} from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { EmailPassword, emailPasswordSchema } from '@/lib/auth/validation/email-password-schema'
import { zodResolver } from '@hookform/resolvers/zod'

export type AuthFormState = {
  fields: {
    email: string
    password: string
  }
  errors?: {
    email?: string[]
    password?: string[]
  }
  globalError?: string
}

type Props = {
  action: (state: AuthFormState, payload: FormData) => AuthFormState | Promise<AuthFormState>
  submitButtonText: string
  passwordAutocomplete: HTMLInputAutoCompleteAttribute
}

const AuthForm: FC<Props> = ({ action, submitButtonText, passwordAutocomplete }) => {
  const [state, formAction, isSubmitting] = useActionState<AuthFormState, FormData>(action, {
    fields: { email: '', password: '' },
  })

  const [validationErrors, setValidationErrors] = useState<AuthFormState['errors']>(state.errors)

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
      const field = value as keyof NonNullable<AuthFormState['errors']>
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

  const renderValidationError = (field: keyof NonNullable<AuthFormState['errors']>) => {
    if (!validationErrors) return

    const errorMessage = validationErrors[field] ? validationErrors[field][0] : undefined
    if (!errorMessage) return null

    return (
      <div id={`${field}-error`}>
        <p style={{ color: 'red' }}>{errorMessage}</p>
      </div>
    )
  }

  const getAriaLabelBy = (field: keyof NonNullable<AuthFormState['errors']>) => {
    return validationErrors && validationErrors[field] ? `${field}-error` : undefined
  }

  return (
    <div>
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
            autoComplete={passwordAutocomplete}
            {...register('password')}
          />
          {renderValidationError('password')}
        </div>

        <button type={'submit'} disabled={isSubmitting}>
          {submitButtonText}
        </button>
      </form>
    </div>
  )
}

export { AuthForm }
