import { GridBackground } from '@/components/grid-background'
import styles from './icon-with-grid-background.module.css'
import { ComponentPropsWithRef, FC, ReactNode } from 'react'

interface Props extends ComponentPropsWithRef<'div'> {
  icon: ReactNode
}

const IconWithGridBackground: FC<Props> = ({ icon, ...rest }) => {
  return (
    <div className={styles.container} {...rest}>
      {icon}
      <GridBackground className={styles.background} />
    </div>
  )
}

export { IconWithGridBackground }
