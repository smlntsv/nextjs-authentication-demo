import { SignOutButton } from '@/components/sign-out-button'
import { getAuthenticatedUser } from '@/lib/auth/session'
import { IconUser } from '@/components/icons/icon-user'
import { Card, CardHeading, CardText } from '@/components/card/card'
import styles from './page.module.css'
import { Container } from '@/components/ui/container'

// If removed it produce https://nextjs.org/docs/messages/dynamic-server-error
export const dynamic = 'force-dynamic'

const DashboardPage = async () => {
  const user = await getAuthenticatedUser()

  if (!user) {
    throw new Error('No user found')
  }

  return (
    <Container centered>
      <Card icon={<IconUser />}>
        <CardHeading>Welcome Back</CardHeading>
        <CardText>
          You have successfully logged in as <br />
          <strong>{user.email}</strong>
        </CardText>
        <SignOutButton className={styles.signOutButton} />
      </Card>
    </Container>
  )
}

export default DashboardPage
