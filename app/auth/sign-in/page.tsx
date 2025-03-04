import { Container } from '@/components/ui/container'
import { Text } from '@/components/ui/typography/text'
import { signInAction } from '@/lib/auth/actions/sign-in-action'
import { AuthForm } from '@/components/auth-form'
import { LinkButton } from '@/components/ui/button'
import { Card, CardHeading, CardText } from '@/components/card'
import { IconKey } from '@/components/icons/icon-key'
import styles from './page.module.css'

const SignInPage = () => {
  return (
    <Container centered>
      <Card icon={<IconKey />}>
        <CardHeading>Log in to your account</CardHeading>
        <CardText>Welcome back! Please enter your details.</CardText>
        <AuthForm
          className={styles.form}
          action={signInAction}
          submitButtonText={'Sign In'}
          passwordAutocomplete={'current-password'}
        />
        <div className={styles.bottomLinks}>
          <Text size={'sm'} className={styles.bottomLinksText}>
            Don&#39;t have an account?{' '}
            <LinkButton href={'/auth/sign-up'} variant={'linkColor'}>
              Sign Up
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

export default SignInPage
