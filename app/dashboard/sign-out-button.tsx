import { signOutAction } from '@/lib/auth/actions/sign-out-action'

const SignOutButton = () => {
  return (
    <form action={signOutAction}>
      <button>Sign Out</button>
    </form>
  )
}

export { SignOutButton }
