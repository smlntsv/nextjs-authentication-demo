import { ComponentPropsWithRef, FC } from 'react'
import { clsx } from 'clsx'
import { DisplaySize, Weight } from '@/components/ui/typography/typography-shared'
import styles from './heading.module.css'
import sharedStyles from '../typography.module.css'

const headingWeightMap: Record<Weight, string> = {
  regular: sharedStyles.regular,
  medium: sharedStyles.medium,
  semibold: sharedStyles.semibold,
  bold: sharedStyles.bold,
}

const headingSizeMap: Record<DisplaySize, string> = {
  '2xl': styles.display2XL,
  xl: styles.displayXL,
  lg: styles.displayLG,
  md: styles.displayMD,
  sm: styles.displaySM,
  xs: styles.displayXS,
}

type HeadingNativeElements = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

const allowedHeadingElements: HeadingNativeElements[] = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']

interface HeadingProps extends ComponentPropsWithRef<HeadingNativeElements> {
  as?: HeadingNativeElements
  size?: DisplaySize
  weight?: Weight
  className?: string
}

const Heading: FC<HeadingProps> = ({
  ref,
  as = 'h1',
  size = 'md',
  weight = 'regular',
  className,
  children,
  ...rest
}) => {
  const Component = as

  return (
    <Component
      ref={ref}
      className={clsx(sharedStyles.base, headingSizeMap[size], headingWeightMap[weight], className)}
      {...rest}
    >
      {children}
    </Component>
  )
}

Heading.displayName = 'Heading'

export { Heading, allowedHeadingElements, headingWeightMap, headingSizeMap }
