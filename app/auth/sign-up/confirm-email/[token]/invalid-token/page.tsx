import { FC } from 'react'
import { Container } from '@/components/ui/container'
import { LinkButton } from '@/components/ui/button'
import { Card, CardHeading, CardText } from '@/components/card'
import { IconError } from '@/components/icons/icon-error'
import styles from './../confirm-email.module.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Invalid or Expired Link',
  description: 'This email confirmation link is no longer valid. Please request a new one.',
}

const InvalidConfirmationTokenPage: FC = () => (
  <Container centered>
    <Card icon={<IconError className={styles.icon} />}>
      <CardHeading>Invalid or Expired Link</CardHeading>
      <CardText>
        This email confirmation link is no longer valid. Please try signing up again.
      </CardText>
      <LinkButton className={styles.button} href={'/auth/sign-up'} size={'lg'}>
        Go to Sign Up
      </LinkButton>
    </Card>
  </Container>
)

export default InvalidConfirmationTokenPage
