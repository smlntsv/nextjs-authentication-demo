import { AuthForm } from '@/components/auth-form'
import { signUpAction } from '@/lib/auth/actions/sign-up-action'
import { Container } from '@/components/ui/container'
import { Card, CardHeading } from '@/components/card'
import { IconKey } from '@/components/icons/icon-key'
import { CardText } from '@/components/card'
import { Text } from '@/components/ui/typography/text'
import { LinkButton } from '@/components/ui/button'
import styles from '@/app/auth/sign-in/page.module.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Create an account',
  description:
    'Sign up to access our Next.js authentication demo. Fill in your details for a secure registration and get started with our email/password-based flows.',
}

const SignUpPage = () => {
  return (
    <Container centered>
      <Card icon={<IconKey />}>
        <CardHeading>Create an account</CardHeading>
        <CardText>Fill in your details to sign up.</CardText>

        <AuthForm
          className={styles.form}
          action={signUpAction}
          submitButtonText={'Get Started'}
          passwordAutocomplete={'new-password'}
        />

        <div className={styles.bottomLinks}>
          <Text size={'sm'} className={styles.bottomLinksText}>
            Already have an account?{' '}
            <LinkButton href={'/auth/sign-in'} variant={'linkColor'}>
              Log in
            </LinkButton>
          </Text>

          <LinkButton href={'/auth/password-reset'} variant={'linkColor'}>
            Forgot password
          </LinkButton>
        </div>
      </Card>
    </Container>
  )
}

export default SignUpPage
