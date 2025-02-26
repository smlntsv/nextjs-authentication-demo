import { ComponentPropsWithRef, FC } from 'react'
import { clsx } from 'clsx'
import styles from './container.module.css'

const Container: FC<ComponentPropsWithRef<'main'>> = ({ ref, children, className, ...rest }) => {
  return (
    <main ref={ref} className={clsx(styles.container, className)} {...rest}>
      {children}
    </main>
  )
}

export { Container }
