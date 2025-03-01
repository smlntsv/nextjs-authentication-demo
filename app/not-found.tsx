import { ErrorPage, ErrorPagePropsWithoutActions } from '@/components/error-page'
import { LinkButton } from '@/components/ui/button'
import { GoBackButton } from '@/components/go-back-button'

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
