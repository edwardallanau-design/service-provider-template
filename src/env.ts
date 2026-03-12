import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().min(1),
    PAYLOAD_SECRET: z.string().min(32),
    RESEND_API_KEY: z.string().min(1),
    RESEND_FROM_EMAIL: z.string().email(),
    RESEND_TO_EMAIL: z.string().email(),
    REVALIDATION_SECRET: z.string().min(16),
    NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
    BLOB_READ_WRITE_TOKEN: z.string().optional(),
  },
  client: {
    NEXT_PUBLIC_SERVER_URL: z.string().url().optional(),
  },
  runtimeEnv: {
    DATABASE_URL: process.env['DATABASE_URL'],
    PAYLOAD_SECRET: process.env['PAYLOAD_SECRET'],
    RESEND_API_KEY: process.env['RESEND_API_KEY'],
    RESEND_FROM_EMAIL: process.env['RESEND_FROM_EMAIL'],
    RESEND_TO_EMAIL: process.env['RESEND_TO_EMAIL'],
    REVALIDATION_SECRET: process.env['REVALIDATION_SECRET'],
    NODE_ENV: process.env['NODE_ENV'],
    BLOB_READ_WRITE_TOKEN: process.env['BLOB_READ_WRITE_TOKEN'],
    NEXT_PUBLIC_SERVER_URL: process.env['NEXT_PUBLIC_SERVER_URL'],
  },
  emptyStringAsUndefined: true,
})
