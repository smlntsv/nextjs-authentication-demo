import { ReactNode } from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theming/theme-provider'
import { ThemeSwitcher } from '@/components/theming/theme-switcher'
import { JavaScriptDisabledNotification } from '@/components/java-script-disabled-notification'

const inter = Inter({
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: {
    template: '%s - Next.js Authentication Demo',
    default: 'Next.js Authentication Demo',
  },
  description:
    'Next.js demo showcasing email/password authentication with registration, sign-in, password reset, and email notifications, even when JavaScript is disabled.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <JavaScriptDisabledNotification />
          <ThemeSwitcher />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
