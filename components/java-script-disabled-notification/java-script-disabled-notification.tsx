import { FC } from 'react'
import { Text } from '@/components/ui/typography/text'
import { IconError } from '@/components/icons/icon-error'
import styles from './java-script-disabled-notification.module.css'

const JavaScriptDisabledNotification: FC = () => {
  return (
    <noscript className={styles.container}>
      <IconError />
      <Text className={styles.text}>JavaScript is off. Enable it for a better experience.</Text>
    </noscript>
  )
}

export { JavaScriptDisabledNotification }
