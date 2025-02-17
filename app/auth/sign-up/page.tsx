import { AuthForm } from '@/app/auth/auth-form'
import { signUpAction } from '@/lib/auth/actions/sign-up-action'
import Link from 'next/link'

const SignUpPage = () => {
  return (
    <>
      <h1>Create an account</h1>
      <AuthForm
        action={signUpAction}
        submitButtonText={'Get Started'}
        passwordAutocomplete={'new-password'}
      />
      <div>
        <Link href={'/auth/sign-in'}>Sign In</Link>
      </div>
      <div>
        <Link href={'/auth/password-reset'}>Reset Password</Link>
      </div>
    </>
  )
}

export default SignUpPage
