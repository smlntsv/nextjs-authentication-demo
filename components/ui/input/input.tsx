import { ComponentPropsWithRef, FC, useId, useState } from 'react'
import styles from './input.module.css'
import { clsx } from 'clsx'
import { IconEye } from '@/components/icons/icon-eye'
import { IconEyeOff } from '@/components/icons/icon-eye-off'
import { AnimatePresence, motion } from 'motion/react'
import { useIsMounted } from '@/hooks/use-is-mounted'

type InputSize = 'sm' | 'md'

type InputType = 'email' | 'password' | 'text'

const inputSizeMap = {
  sm: styles.sizeSM,
  md: styles.sizeMD,
}

interface InputProps extends ComponentPropsWithRef<'input'> {
  variantSize?: InputSize
  label?: string
  error?: string
  type?: InputType
}

const Input: FC<InputProps> = ({
  ref,
  variantSize = 'md',
  type = 'text',
  label,
  error,
  className,
  style,
  ...rest
}) => {
  const inputId = useId()
  const errorId = useId()
  const isMounted = useIsMounted()
  const [innerInputType, setInnerInputType] = useState<InputType>(type)

  const isPasswordInput = type === 'password'
  const showPasswordToggle = isMounted && isPasswordInput

  const togglePasswordVisibility = () => {
    setInnerInputType((prevState) => (prevState === 'password' ? 'text' : 'password'))
  }

  return (
    <div className={clsx(styles.wrapper, className)} style={style}>
      {label && <label htmlFor={inputId}>{label}</label>}
      <div className={styles.inputWrapper}>
        <input
          ref={ref}
          id={inputId}
          type={innerInputType}
          className={clsx(
            styles.inputBase,
            error && styles.inputError,
            showPasswordToggle && styles.rightIconPadding,
            inputSizeMap[variantSize]
          )}
          aria-required={rest.required ? 'true' : undefined}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          {...rest}
        />
        {showPasswordToggle && (
          <button
            className={clsx(styles.passwordVisibilityButton, error && styles.inputError)}
            onClick={togglePasswordVisibility}
            title={innerInputType === 'password' ? 'Show password' : 'Hide password'}
            aria-label={innerInputType === 'password' ? 'Show password' : 'Hide password'}
          >
            {innerInputType === 'password' ? <IconEyeOff /> : <IconEye />}
          </button>
        )}
      </div>
      <AnimatePresence>
        {error && (
          <motion.span
            id={errorId}
            initial={{ y: isMounted ? -10 : 0 }}
            animate={{ y: 0 }}
            exit={{ y: -10 }}
            transition={{ duration: 0.2 }}
            className={styles.error}
          >
            {error}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  )
}

export { inputSizeMap }
export { Input }
