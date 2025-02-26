import styles from './button.module.css'

type ButtonVariant =
  | 'primary'
  | 'secondaryGray'
  | 'secondaryColor'
  | 'tertiaryGray'
  | 'tertiaryColor'
  | 'linkGray'
  | 'linkColor'

const buttonVariantMap: Record<ButtonVariant, string> = {
  primary: styles.variantPrimary,
  secondaryGray: styles.variantSecondaryGray,
  secondaryColor: styles.variantSecondaryColor,
  tertiaryGray: styles.variantTertiaryGray,
  tertiaryColor: styles.variantTertiaryColor,
  linkGray: styles.variantLinkGray,
  linkColor: styles.variantLinkColor,
}

type ButtonSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl'

const buttonSizeMap: Record<ButtonSize, string> = {
  sm: styles.sizeSM,
  md: styles.sizeMD,
  lg: styles.sizeLG,
  xl: styles.sizeXL,
  '2xl': styles.size2XL,
}

export type { ButtonVariant, ButtonSize }
export { buttonVariantMap, buttonSizeMap }
