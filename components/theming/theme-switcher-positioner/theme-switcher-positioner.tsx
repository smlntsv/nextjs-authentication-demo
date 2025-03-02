import { ComponentProps, FC } from 'react'
import styles from './theme-switcher-positioner.module.css'
import { clsx } from 'clsx'

const ThemeSwitcherPositioner: FC<ComponentProps<'div'>> = ({ className, children, ...rest }) => (
  <div className={clsx(styles.wrapper, className)} {...rest}>
    <div className={styles.inner}>{children}</div>
  </div>
)

export { ThemeSwitcherPositioner }
