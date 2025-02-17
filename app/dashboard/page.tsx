import { SignOutButton } from '@/app/dashboard/sign-out-button'
import { getAuthenticatedUser } from '@/lib/auth/session'

const DashboardPage = async () => {
  const user = await getAuthenticatedUser()

  return (
    <div>
      <h1>Dashboard Page</h1>
      {user && (
        <div>
          <h4>User info:</h4>
          <div>Email: {user.email}</div>
          <div>Created At: {new Date(user.createdAt + 'UTC').toLocaleString()}</div>
          <div>Updated At: {new Date(user.updatedAt + 'UTC').toLocaleString()}</div>
        </div>
      )}
      <SignOutButton />
    </div>
  )
}

export default DashboardPage
