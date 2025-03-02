'use client'

import { ThemeProvider as NextThemeProvider, ThemeProviderProps } from 'next-themes'
import { FC } from 'react'

const ThemeProvider: FC<ThemeProviderProps> = ({ children, ...rest }) => {
  return (
    <NextThemeProvider attribute={'data-theme'} defaultTheme={'system'} enableSystem {...rest}>
      {children}
    </NextThemeProvider>
  )
}

export { ThemeProvider }
