import { ComponentPropsWithRef, FC, ReactNode } from 'react'
import styles from './button.module.css'
import { clsx } from 'clsx'
import { IconLoading } from '@/components/icons/icon-loading'
import { ButtonVariant, ButtonSize, buttonSizeMap, buttonVariantMap } from './buttons-shared'

interface ButtonProps extends ComponentPropsWithRef<'button'> {
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
  leadingIcon?: ReactNode
}

const Button: FC<ButtonProps> = ({
  ref,
  variant = 'primary',
  size = 'md',
  disabled,
  loading = false,
  leadingIcon = null,
  children,
  ...rest
}) => (
  <button
    ref={ref}
    className={clsx(styles.base, buttonSizeMap[size], buttonVariantMap[variant])}
    disabled={disabled || loading}
    {...rest}
  >
    {loading ? <IconLoading /> : leadingIcon}
    {children}
  </button>
)

Button.displayName = 'Button'

export { Button }
