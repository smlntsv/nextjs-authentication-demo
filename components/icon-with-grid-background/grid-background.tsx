import { FC, SVGProps } from 'react'

const GridBackground: FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg width="752" height="752" {...props}>
      {/* Grid pattern */}
      <defs>
        <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
          <path d="M 0 25 L 50 25" fill="none" stroke="currentColor" strokeWidth="1" />
          <path d="M 25 0 L 25 50" fill="none" stroke="currentColor" strokeWidth="1" />
        </pattern>

        {/* Radial gradient for masking */}
        <radialGradient id="fadeOutMask" cx="50%" cy="50%" r="50%">
          <stop offset="0%" style={{ stopColor: 'white', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: 'white', stopOpacity: 0 }} />
        </radialGradient>

        {/* Mask using the radial gradient */}
        <mask id="mask">
          <rect width="100%" height="100%" fill="url(#fadeOutMask)" />
        </mask>
      </defs>

      {/* Apply the grid pattern with the mask */}
      <rect width="100%" height="100%" fill="url(#grid)" mask="url(#mask)" />
    </svg>
  )
}

export { GridBackground }
