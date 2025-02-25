'use client'

import { FC, useEffect, useState } from 'react'
import { useTheme } from 'next-themes'

const ThemeSwitcher: FC = () => {
  const [isMounted, setIsMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setIsMounted(true)
  }, [])

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
