import { ComponentPropsWithRef, FC } from 'react'
import { clsx } from 'clsx'
import styles from './heading.module.css'

export type DisplaySize = '2xl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs'
export type Weight = 'regular' | 'medium' | 'semibold' | 'bold'
export type HeadingNativeElements = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

interface HeadingProps extends ComponentPropsWithRef<HeadingNativeElements> {
  as?: HeadingNativeElements
  size?: DisplaySize
  weight?: Weight
}

const weightMap: Record<Weight, string> = {
  regular: styles.regular,
  medium: styles.medium,
  semibold: styles.semibold,
  bold: styles.bold,
}

const sizeMap: Record<DisplaySize, string> = {
  '2xl': styles.display2XL,
  xl: styles.displayXL,
  lg: styles.displayLG,
  md: styles.displayMD,
  sm: styles.displaySM,
  xs: styles.displayXS,
}

const Heading: FC<HeadingProps> = ({
  ref,
  as = 'h1',
  size = 'md',
  weight = 'regular',
  children,
  ...rest
}) => {
  const Component = as

  return (
    <Component ref={ref} className={clsx(styles.base, sizeMap[size], weightMap[weight])} {...rest}>
      {children}
    </Component>
  )
}

Heading.displayName = 'Heading'

export { Heading }
