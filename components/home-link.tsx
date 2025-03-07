import { FC } from 'react'
import Link from 'next/link'
import { IconHome } from '@/components/icons/icon-home'
import styles from './icon-button.module.css'
import { clsx } from 'clsx'

const HomeLink: FC = () => {
  return (
    <div className={styles.wrapper}>
      <Link
        href={'/'}
        className={clsx(styles.base, styles.homeButton)}
        aria-label={'Go to the home page'}
        title={'Go to the home page'}
      >
        <IconHome />
      </Link>
    </div>
  )
}

export { HomeLink }
