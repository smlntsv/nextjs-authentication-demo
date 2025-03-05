import { ComponentPropsWithRef, FC, ReactNode } from 'react'
import styles from './button.module.css'
import { clsx } from 'clsx'
import { IconLoading } from '@/components/icons/icon-loading'
import Link from 'next/link'
import { ButtonSize, buttonSizeMap, ButtonVariant, buttonVariantMap } from './buttons-shared'

interface LinkButtonProps extends ComponentPropsWithRef<typeof Link> {
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
  leadingIcon?: ReactNode
  trailingIcon?: ReactNode
  className?: string
}

const LinkButton: FC<LinkButtonProps> = ({
  ref,
  variant = 'primary',
  size = 'md',
  loading = false,
  leadingIcon = null,
  trailingIcon = null,
  className,
  children,
  ...rest
}) => {
  return (
    <Link
      ref={ref}
      className={clsx(styles.base, buttonSizeMap[size], buttonVariantMap[variant], className)}
      {...rest}
    >
      {loading ? <IconLoading /> : leadingIcon}
      {children}
      {trailingIcon}
    </Link>
  )
}

LinkButton.displayName = 'LinkButton'

export type { ButtonSize, ButtonVariant }
export { LinkButton, buttonVariantMap, buttonSizeMap }
