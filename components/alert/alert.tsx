import { IconError } from '@/components/icons/icon-error'
import { Text } from '@/components/ui/typography/text'
import { ComponentPropsWithRef, FC, SVGProps } from 'react'
import { clsx } from 'clsx'
import { IconCheck } from '@/components/icons/icon-check'
import { AnimatePresence, motion, MotionProps } from 'motion/react'
import styles from './alert.module.css'

type AlertType = 'success' | 'warning' | 'error'

const stylesMap: Record<AlertType, { container: string; icon: string; text: string }> = {
  success: {
    container: styles.successContainer,
    icon: styles.successIcon,
    text: styles.successText,
  },
  warning: {
    container: styles.warningContainer,
    icon: styles.warningIcon,
    text: styles.warningText,
  },
  error: {
    container: styles.errorContainer,
    icon: styles.errorIcon,
    text: styles.errorText,
  },
}

const iconsMap: Record<AlertType, FC<SVGProps<SVGSVGElement>>> = {
  warning: IconError,
  error: IconError,
  success: IconCheck,
}

type AuthFormErrorProps = ComponentPropsWithRef<'div'> &
  MotionProps & {
    type?: AlertType
    text?: string
  }

const Alert: FC<AuthFormErrorProps> = ({ ref, type = 'success', text, ...rest }) => {
  const Icon = iconsMap[type]

  return (
    <AnimatePresence mode={'popLayout'}>
      {text && (
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.25 }}
          ref={ref}
          role={'alert'}
          className={clsx(styles.container, stylesMap[type].container)}
          {...rest}
        >
          <Icon className={stylesMap[type].icon} />
          <Text className={stylesMap[type].text} size={'sm'}>
            {text}
          </Text>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export { Alert }
