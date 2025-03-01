'use client'

import { FC, useEffect, useState } from 'react'
import { Button, LinkButton } from '@/components/ui/button'
import { ErrorPage, ErrorPagePropsWithoutActions } from '@/components/error-page'

const defaultErrorPageProps: ErrorPagePropsWithoutActions = {
  subheading: 'Unexpected Error',
  heading: 'Something went wrong',
  description:
    'An unexpected error occurred. Please try again or contact support if the issue persists.',
}

const failedToFetchErrorPageProps: ErrorPagePropsWithoutActions = {
  subheading: 'Network error',
  heading: 'Connection Issue Detected',
  description:
    'It seems there is a problem with your internet connection. Please check your connection and try again.',
}

type Props = {
  error: Error & { digest?: string }
  reset: () => void
}

const Error: FC<Props> = ({ error, reset }) => {
  const [errorPageProps, setErrorPageProps] =
    useState<ErrorPagePropsWithoutActions>(defaultErrorPageProps)

  useEffect(() => {
    if (error.message === 'Failed to fetch') {
      setErrorPageProps(failedToFetchErrorPageProps)
    }
  }, [error])

  return (
    <ErrorPage
      {...errorPageProps}
      renderActionButtons={() => (
        <>
          <Button data-testid={'try-again-button'} onClick={reset} size={'xl'}>
            Try Again
          </Button>
          <LinkButton variant={'secondaryGray'} href={'/'} size={'xl'}>
            Take me home
          </LinkButton>
        </>
      )}
    />
  )
}

export { defaultErrorPageProps, failedToFetchErrorPageProps }
export default Error
