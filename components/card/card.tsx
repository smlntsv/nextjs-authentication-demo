import { IconWithGridBackground } from '@/components/icon-with-grid-background'
import { Heading } from '@/components/ui/typography/heading'
import { Text } from '@/components/ui/typography/text'
import { ComponentProps, FC, ReactNode } from 'react'
import { clsx } from 'clsx'
import styles from './card.module.css'

interface CardProps extends ComponentProps<'div'> {
  icon: ReactNode
}

const Card: FC<CardProps> = ({ icon, children, ...rest }) => {
  return (
    <div className={styles.innerContainer} {...rest}>
      <IconWithGridBackground icon={icon} />
      {children}
    </div>
  )
}

const CardHeading: FC<ComponentProps<typeof Heading>> = ({ className, ...rest }) => {
  return (
    <Heading
      className={clsx(styles.heading, className)}
      size={'sm'}
      weight={'semibold'}
      {...rest}
    />
  )
}

const CardText: FC<ComponentProps<typeof Text>> = ({ className, ...rest }) => {
  return <Text className={clsx(styles.description, className)} {...rest} />
}

export { Card, CardHeading, CardText }
