'use client'

import { FC } from 'react'
import { useTheme } from 'next-themes'
import { useIsMounted } from '@/hooks/use-is-mounted'

const ThemeSwitcher: FC = () => {
  const { theme, setTheme } = useTheme()
  const isMounted = useIsMounted()

  return (
    <select
      disabled={!isMounted}
      value={isMounted ? theme : 'system'}
      onChange={(e) => setTheme(e.target.value)}
    >
      <option label={'System'} value={'system'} />
      <option label={'Dark'} value={'dark'} />
      <option label={'Light'} value={'light'} />
    </select>
  )
}

export { ThemeSwitcher }
