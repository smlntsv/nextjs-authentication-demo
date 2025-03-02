import { SignOutButton } from '@/components/sign-out-button'
import { getAuthenticatedUser } from '@/lib/auth/session'
import { Container } from '@/components/ui/container'
import { Heading } from '@/components/ui/typography/heading'
import { Text } from '@/components/ui/typography/text'
import { IconWithGridBackground } from '@/components/icon-with-grid-background'
import styles from './dashboard-page.module.css'
import { IconUser } from '@/components/icons/icon-user'

// If removed it produce https://nextjs.org/docs/messages/dynamic-server-error
export const dynamic = 'force-dynamic'

const DashboardPage = async () => {
  const user = await getAuthenticatedUser()

  if (!user) {
    throw new Error('No user found')
  }

  return (
    <Container centered className={styles.container}>
      <IconWithGridBackground icon={<IconUser />} />
      <Heading className={styles.heading} size={'sm'} weight={'semibold'}>
        Welcome Back
      </Heading>
      <Text className={styles.description}>
        You have successfully logged in as <br />
        <strong>{user.email}</strong>
      </Text>
      <SignOutButton className={styles.signOutButton} />
    </Container>
  )
}

export default DashboardPage
