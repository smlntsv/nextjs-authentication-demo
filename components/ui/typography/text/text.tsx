import { FC, ElementType, ComponentPropsWithRef } from 'react'
import { clsx } from 'clsx'
import { TextSize, Weight } from '../typography-shared'
import styles from './text.module.css'
import sharedStyles from '../typography.module.css'

const textWeightMap: Record<Weight, string> = {
  regular: sharedStyles.regular,
  medium: sharedStyles.medium,
  semibold: sharedStyles.semibold,
  bold: sharedStyles.bold,
}

const textSizeMap: Record<TextSize, string> = {
  xl: styles.textXL,
  lg: styles.textLG,
  md: styles.textMD,
  sm: styles.textSM,
  xs: styles.textXS,
}

interface TextProps extends ComponentPropsWithRef<ElementType> {
  as?: ElementType
  size?: TextSize
  weight?: Weight
}

const allowedTextElements: ElementType[] = ['b', 'em', 'i', 'p', 'pre', 'span', 'strong']

const Text: FC<TextProps> = ({
  ref,
  as = 'p',
  size = 'md',
  weight = 'regular',
  children,
  ...rest
}) => {
  if (!allowedTextElements.includes(as)) {
    throw new Error(
      `Invalid element for Text component. Use one of: ${allowedTextElements.join(', ')}`
    )
  }

  const Component = as

  return (
    <Component
      ref={ref}
      className={clsx(sharedStyles.base, textSizeMap[size], textWeightMap[weight])}
      {...rest}
    >
      {children}
    </Component>
  )
}

Text.displayName = 'Text'

export { Text, textWeightMap, textSizeMap, allowedTextElements }
