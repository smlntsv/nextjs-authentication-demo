'use client'

import { FC } from 'react'
import { useTheme } from 'next-themes'
import { useIsMounted } from '@/hooks/use-is-mounted'
import { IconDarkTheme } from '@/components/icons/icon-dark-theme'
import { IconSystemTheme } from '@/components/icons/icon-system-theme'
import { IconLightTheme } from '@/components/icons/icon-light-theme'
import { AnimatePresence, motion } from 'motion/react'
import styles from './theme-switcher.module.css'

type Theme = 'system' | 'dark' | 'light'

const themeIconMap: Record<Theme, FC> = {
  system: IconSystemTheme,
  dark: IconDarkTheme,
  light: IconLightTheme,
}

const ThemeSwitcher: FC = () => {
  const { theme, setTheme } = useTheme()
  const isMounted = useIsMounted()

  const changeTheme = () => {
    setTheme((prevTheme): Theme => {
      if (prevTheme === 'system') return 'dark'
      if (prevTheme === 'dark') return 'light'

      return 'system'
    })
  }

  if (!isMounted) {
    return null
  }

  const Icon = isMounted ? themeIconMap[theme as Theme] : IconSystemTheme

  const ariaLabel = !isMounted
    ? `Theme change doesn't work when JavaScript is disabled.`
    : `Switch to ${theme === 'system' ? 'dark' : theme === 'dark' ? 'light' : 'system'} theme.`

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      onClick={changeTheme}
      className={styles.switcherButton}
      disabled={!isMounted}
      aria-label={ariaLabel}
      title={ariaLabel}
    >
      <AnimatePresence mode={'wait'}>
        <motion.div
          key={theme}
          style={{ display: 'flex', overflow: 'visible' }}
          initial={{ x: isMounted ? -20 : 0, opacity: isMounted ? 0 : 1 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 20, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <Icon />
        </motion.div>
      </AnimatePresence>
    </motion.button>
  )
}

export { ThemeSwitcher }
