import { FC, SVGProps } from 'react'

const IconArrowLeft: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
    <path
      d="M12 19L5 12M5 12L12 5M5 12H19"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

IconArrowLeft.displayName = 'Icon Arrow Left'

export { IconArrowLeft }
