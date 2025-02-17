'use server'

import 'server-only'
import { redirect } from 'next/navigation'
import { deleteSession } from '@/lib/auth/session'

async function signOutAction(): Promise<void> {
  await deleteSession()

  redirect('/auth/sign-in')
}

export { signOutAction }
