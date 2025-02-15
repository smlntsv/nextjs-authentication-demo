'use client'

import { useActionState } from 'react'
import { signUpAction, SignUpFormState } from '@/lib/auth/auth-actions'

const SignUpPage = () => {
  const initialState: SignUpFormState = {
    fields: { email: '', password: '', passwordConfirmation: '' },
  }

  const [state, formAction, isPending] = useActionState<SignUpFormState, FormData>(
    signUpAction,
    initialState
  )

  return (
    <>
      <h1>Create an account</h1>
      <form action={formAction}>
        {/* Email */}
        <div>
          <label htmlFor="email">Email</label>
          <br />
          <input
            type="email"
            id={'email'}
            name={'email'}
            defaultValue={state.fields.email}
            placeholder={'Enter your email address'}
            disabled={isPending}
            aria-describedby={'email-error'}
            autoComplete={'email'}
          />
          {state.errors?.email && <p id={'email-error'}>{state.errors.email[0]}</p>}
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password">Password</label>
          <br />
          <input
            type="password"
            id={'password'}
            name={'password'}
            defaultValue={state.fields.password}
            placeholder={'Enter your password'}
            disabled={isPending}
            aria-describedby={'password-error'}
            autoComplete={'new-password'}
          />
          {state.errors?.password && <p id={'password-error'}>{state.errors.password[0]}</p>}
        </div>

        {/* Password Confirmation */}
        <div>
          <label htmlFor="passwordConfirmation">Confirm Password</label>
          <br />
          <input
            type="password"
            id={'passwordConfirmation'}
            name={'passwordConfirmation'}
            defaultValue={state.fields.passwordConfirmation}
            placeholder={'Enter password confirmation'}
            disabled={isPending}
            aria-describedby={'passwordConfirmation-error'}
            autoComplete={'new-password'}
          />
          {state.errors?.passwordConfirmation && (
            <p id={'passwordConfirmation-error'}>{state.errors.passwordConfirmation[0]}</p>
          )}
        </div>
        <br />

        <button type={'submit'} disabled={isPending}>
          Get started
        </button>
      </form>
    </>
  )
}

export default SignUpPage
