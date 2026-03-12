import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'

const allowedOrigins = [
  process.env['NEXT_PUBLIC_SERVER_URL'],
  process.env['VERCEL_PROJECT_PRODUCTION_URL']
    ? `https://${process.env['VERCEL_PROJECT_PRODUCTION_URL']}`
    : undefined,
  process.env['VERCEL_URL'] ? `https://${process.env['VERCEL_URL']}` : undefined,
  'http://localhost:3000',
].filter(Boolean) as string[]

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.public.blob.vercel-storage.com',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      ...allowedOrigins
        .filter((o) => o.startsWith('https://'))
        .map((o) => ({
          protocol: 'https' as const,
          hostname: new URL(o).hostname,
        })),
    ],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 2592000,
  },
}

export default withPayload(nextConfig)
