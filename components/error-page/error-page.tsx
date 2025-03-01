import { Text } from '@/components/ui/typography/text'
import { Heading } from '@/components/ui/typography/heading'
import { Container } from '@/components/ui/container'
import { FC, ReactNode } from 'react'
import styles from './error-page.module.css'

interface ErrorPageProps {
  subheading: string
  heading: string
  description: string
  renderActionButtons: () => ReactNode
}

type ErrorPagePropsWithoutActions = Omit<ErrorPageProps, 'renderActionButtons'>

const ErrorPage: FC<ErrorPageProps> = ({
  subheading,
  heading,
  description,
  renderActionButtons,
}) => {
  return (
    <Container className={styles.container}>
      <Text className={styles.subheading} as={'span'} size={'md'} weight={'semibold'}>
        {subheading}
      </Text>
      <Heading className={styles.heading} as={'h1'} size={'xl'} weight={'semibold'}>
        {heading}
      </Heading>
      <Text className={styles.description}>{description}</Text>
      <div className={styles.buttonsGroup}>{renderActionButtons()}</div>
    </Container>
  )
}

export type { ErrorPageProps, ErrorPagePropsWithoutActions }
export { ErrorPage }
