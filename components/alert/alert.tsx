import { IconError } from '@/components/icons/icon-error'
import { Text } from '@/components/ui/typography/text'
import { ComponentPropsWithRef, FC, SVGProps } from 'react'
import { clsx } from 'clsx'
import { IconCheck } from '@/components/icons/icon-check'
import { AnimatePresence, motion, MotionProps } from 'motion/react'
import styles from './alert.module.css'
import { useIsMounted } from '@/hooks/use-is-mounted'

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
    className?: string
  }

const Alert: FC<AuthFormErrorProps> = ({ ref, type = 'success', text, className, ...rest }) => {
  const Icon = iconsMap[type]

  const isMounted = useIsMounted()

  return (
    <AnimatePresence mode={'popLayout'}>
      {text && (
        <motion.div
          initial={isMounted ? { y: -20, opacity: 0 } : {}}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.25 }}
          ref={ref}
          role={'alert'}
          className={clsx(styles.container, stylesMap[type].container, className)}
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

export type { AlertType }
export { Alert }
