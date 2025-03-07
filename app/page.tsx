import { Container } from '@/components/ui/container'
import { Heading } from '@/components/ui/typography/heading'
import { Text } from '@/components/ui/typography/text'
import styles from './page.module.css'
import { LinkButton } from '@/components/ui/button'
import { IconArrowRight } from '@/components/icons/icon-arrow-right'
import { IconCheck } from '@/components/icons/icon-check'

type NavigationLink = {
  href: string
  label: string
  description: string
  openInNewTab: boolean
}

const navigationLinks: NavigationLink[] = [
  {
    href: '/auth/sign-up',
    label: 'Sign Up',
    description:
      'Create a new account. If already signed in, you will be redirected to the dashboard.',
    openInNewTab: false,
  },
  {
    href: '/auth/sign-in',
    label: 'Sign In',
    description:
      'Sign in to your account. Authenticated users are automatically redirected to the dashboard.',
    openInNewTab: false,
  },
  {
    href: '/auth/password-reset',
    label: 'Password Reset',
    description: 'Forget your password? Start here to reset your credentials and regain access.',
    openInNewTab: false,
  },
  {
    href: '/dashboard',
    label: 'Dashboard',
    description: `Protected route: You must be authenticated to access this page.`,
    openInNewTab: false,
  },
  {
    href: '/storybook-static',
    label: 'Storybook',
    description: 'View interactive stories for the main components and email templates.',
    openInNewTab: true,
  },
]

type Highlight = {
  title: string
  description: string
}

const highlights: Highlight[] = [
  {
    title: 'JavaScript Independence',
    description: 'Fully functional even when JavaScript is disabled.',
  },
  {
    title: 'Authentication Flows',
    description: 'Supports Sign Up, Sign In, and Password Reset.',
  },
  {
    title: 'Email Notification',
    description: 'Provides email confirmation, password reset, and update notifications.',
  },
  {
    title: 'Theming Support',
    description:
      'Offers System, Dark, and Light themes, with automatic preference detection via prefer-color-scheme when JavaScript is disabled.',
  },
  {
    title: 'Storybook Integration',
    description: 'Interactive component demos and email template previews.',
  },
  {
    title: 'Testing',
    description: 'End-to-end tests with Cypress and unit tests with Vitest.',
  },
]

export default function Home() {
  return (
    <Container centered>
      <div className={styles.innerContainer}>
        <Heading size={'lg'} weight={'semibold'} className={styles.title}>
          Next.js Authentication Demo
        </Heading>
        <Text className={styles.subheadingText}>
          This demo project showcases an email/password-based authentication flow build with
          Next.js. It implements registration, sign-in, and password reset functionalities along
          with email notifications. It uses React Server Components, Server Functions, and more to
          remain fully operational even with JavaScript disabled.
        </Text>

        {/* Highlights */}
        <section className={styles.section}>
          <Heading size={'sm'} weight={'semibold'}>
            Highlights
          </Heading>
          <Text className={styles.subheadingText}>Explore key features of this project:</Text>

          <ul className={styles.featuresList}>
            {highlights.map(({ title, description }: Highlight, idx) => (
              <li key={idx}>
                <IconCheck />
                <Text>
                  <strong>{title}</strong>: {description}
                </Text>
              </li>
            ))}
          </ul>
        </section>

        {/* Routes */}
        <section className={styles.section}>
          <Heading size={'sm'} weight={'semibold'}>
            Routes
          </Heading>
          <Text className={styles.subheadingText}>
            Choose an entry point for different authentication flows or view the Storybook demos:
          </Text>

          <ul className={styles.linksList}>
            {navigationLinks.map(({ href, label, description, openInNewTab }: NavigationLink) => (
              <li key={href}>
                <LinkButton
                  target={openInNewTab ? '_blank' : '_self'}
                  trailingIcon={<IconArrowRight />}
                  size={'2xl'}
                  variant={'linkColor'}
                  href={href}
                >
                  {label}
                </LinkButton>
                <Text>{description}</Text>
              </li>
            ))}
          </ul>
        </section>

        {/* Links */}
        <section className={styles.section}>
          <Heading size={'sm'} weight={'semibold'}>
            Contacts
          </Heading>

          <div className={styles.contacts}>
            <Text className={styles.subheadingText}>
              This project available on{' '}
              <LinkButton
                target={'_blank'}
                size={'lg'}
                variant={'linkColor'}
                href={'https://github.com/smlntsv/nextjs-authentication-demo'}
              >
                GitHub
              </LinkButton>
              .
            </Text>
            <Text>
              <LinkButton
                target={'_blank'}
                size={'lg'}
                variant={'linkColor'}
                href={'https://dima-dev.com'}
              >
                My Portfolio Website.
              </LinkButton>
            </Text>
            <LinkButton
              target={'_blank'}
              size={'lg'}
              variant={'linkColor'}
              href={'https://www.linkedin.com/in/dima-dev'}
            >
              Currently open to job opportunities! Let&#39;s connect on LinkedIn.
            </LinkButton>
            <Text className={styles.text}>Made with ❤️ by Dima using Next.js © 2025.</Text>
          </div>
        </section>
      </div>
    </Container>
  )
}
