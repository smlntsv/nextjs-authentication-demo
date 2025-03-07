import { FC } from 'react'
import { Container } from '@/components/ui/container'
import { Card, CardHeading, CardText } from '@/components/card'
import { IconKeyOff } from '@/components/icons/icon-key-off'
import { LinkButton } from '@/components/ui/button'
import styles from './page.module.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Invalid or Expired Link',
  description: 'This password reset link is no longer valid.',
}

const InvalidPasswordResetTokenPage: FC = () => (
  <Container centered>
    <Card icon={<IconKeyOff className={styles.icon} />}>
      <CardHeading>Invalid or Expired Link</CardHeading>
      <CardText>
        This password reset link is no longer valid. <br /> Please request a new one.
      </CardText>
      <LinkButton className={styles.requestButton} href="/auth/password-reset">
        Request a New Password Reset
      </LinkButton>
    </Card>
  </Container>
)

export default InvalidPasswordResetTokenPage
