import { ErrorPage, ErrorPagePropsWithoutActions } from '@/components/error-page'
import { LinkButton } from '@/components/ui/button'
import { GoBackButton } from '@/components/go-back-button'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Page Not Found',
  description:
    'The page you are looking for does not exist. Please check the URL or return to the homepage.',
}

const notFoundErrorPageProps: ErrorPagePropsWithoutActions = {
  subheading: '404 error',
  heading: `We can't find that page`,
  description: `Sorry, the page you are looking for doesn't exist or has to be moved.`,
}

const NotFound = () => {
  return (
    <ErrorPage
      {...notFoundErrorPageProps}
      renderActionButtons={() => (
        <>
          <LinkButton href={'/'} size={'xl'}>
            Take me home
          </LinkButton>
          <GoBackButton size={'xl'} variant={'secondaryGray'} />
        </>
      )}
    />
  )
}

export { notFoundErrorPageProps }
export default NotFound
