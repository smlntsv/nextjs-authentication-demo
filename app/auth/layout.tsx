import { ReactNode } from 'react'
import { HomeLink } from '@/components/home-link'

export default function AuthLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <>
      <HomeLink />
      {children}
    </>
  )
}
