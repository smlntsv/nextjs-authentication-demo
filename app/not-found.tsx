import { Text } from '@/components/ui/typography/text'
import { Heading } from '@/components/ui/typography/heading'
import { LinkButton } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { GoBackButton } from '@/components/go-back-button'
import styles from './not-found.module.css'

const NotFound = () => {
  return (
    <Container className={styles.container}>
      <Text className={styles.subheading} as={'span'} size={'md'} weight={'semibold'}>
        404 error
      </Text>
      <Heading className={styles.heading} as={'h1'} size={'xl'} weight={'semibold'}>
        We can&#39;t find that page
      </Heading>
      <Text className={styles.description}>
        Sorry, the page you are looking for doesn&#39;t exist or has to be moved.
      </Text>
      <div className={styles.buttonsGroup}>
        <LinkButton href={'/'} size={'2xl'}>
          Take me home
        </LinkButton>
        <GoBackButton />
      </div>
    </Container>
  )
}

export default NotFound
