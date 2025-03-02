import styles from './page.module.css'
import Link from 'next/link'

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Link href={'/auth/sign-up'}>Sign Up</Link>
        <Link href={'/auth/sign-in'}>Sign In</Link>
        <Link href={'/auth/password-reset'}>Password Reset</Link>
        <Link href={'/dashboard'}>Dashboard</Link>
      </main>
    </div>
  )
}
