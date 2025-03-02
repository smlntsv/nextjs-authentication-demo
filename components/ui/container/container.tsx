import { ComponentPropsWithRef, FC } from 'react'
import { clsx } from 'clsx'
import styles from './container.module.css'

interface ContainerProps extends ComponentPropsWithRef<'main'> {
  centered?: boolean
}

const Container: FC<ContainerProps> = ({ ref, children, className, centered, ...rest }) => {
  return (
    <main
      ref={ref}
      className={clsx(styles.container, centered && styles.centered, className)}
      {...rest}
    >
      {children}
    </main>
  )
}

export { Container }
