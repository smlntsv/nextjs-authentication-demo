import { signInAction } from '@/lib/auth/actions/sign-in-action'
import { AuthForm } from '@/app/auth/auth-form'
import Link from 'next/link'

const SignInPage = () => {
  return (
    <div>
      <h1>Log in to your account</h1>
      <AuthForm
        action={signInAction}
        submitButtonText={'Sign in'}
        passwordAutocomplete={'current-password'}
      />
      <div>
        <Link href={'/auth/sign-up'}>Sign Up</Link>
      </div>
      <div>
        <Link href={'/auth/password-reset'}>Reset Password</Link>
      </div>
    </div>
  )
}

export default SignInPage
