import { FC, SVGProps } from 'react'
import styles from './icon-loading.module.css'
import { clsx } from 'clsx'

const IconLoading: FC<SVGProps<SVGSVGElement>> = ({ className, ...rest }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className={clsx(styles.rotate, className)}
      {...rest}
    >
      <path
        d="M12 3C16.97 3 21 7.03 21 12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 3C16.97 3 21 7.03 21 12C21 16.97 16.97 21 12 21C7.03 21 3 16.97 3 12C3 7.03 7.03 3 12 3Z"
        stroke="currentColor"
        strokeOpacity="0.3"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export { IconLoading }
