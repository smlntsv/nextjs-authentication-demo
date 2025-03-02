import { FC, SVGProps } from 'react'

const IconArrowLeft: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
    <path
      d="M21 12H3.5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10 19L3 12L10 5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

IconArrowLeft.displayName = 'Icon Arrow Left'

export { IconArrowLeft }
