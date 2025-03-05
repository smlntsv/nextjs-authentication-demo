import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  // https://nextjs.org/docs/pages/api-reference/next-config-js/output#automatically-copying-traced-files
  output: 'standalone',
  productionBrowserSourceMaps: false,
}

export default nextConfig
