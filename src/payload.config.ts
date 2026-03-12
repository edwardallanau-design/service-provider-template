import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'

import { collections } from './collections/index.ts'
import { globals } from './globals/index.ts'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const allowedOrigins = [
  process.env['NEXT_PUBLIC_SERVER_URL'],
  process.env['VERCEL_PROJECT_PRODUCTION_URL']
    ? `https://${process.env['VERCEL_PROJECT_PRODUCTION_URL']}`
    : undefined,
  process.env['VERCEL_URL'] ? `https://${process.env['VERCEL_URL']}` : undefined,
  'http://localhost:3000',
].filter(Boolean) as string[]

const serverUrl =
  process.env['NEXT_PUBLIC_SERVER_URL'] ??
  (process.env['VERCEL_PROJECT_PRODUCTION_URL']
    ? `https://${process.env['VERCEL_PROJECT_PRODUCTION_URL']}`
    : process.env['VERCEL_URL']
      ? `https://${process.env['VERCEL_URL']}`
      : 'http://localhost:3000')

export default buildConfig({
  serverURL: serverUrl,
  secret: process.env['PAYLOAD_SECRET'] ?? 'placeholder-secret-change-me',

  admin: {
    user: 'users',
    meta: {
      titleSuffix: '— Service Provider',
    },
    importMap: {
      baseDir: path.resolve(dirname, 'app/(payload)/admin'),
    },
  },

  collections,
  globals,

  editor: lexicalEditor({
    features: ({ defaultFeatures }) => [...defaultFeatures],
  }),

  db: postgresAdapter({
    pool: {
      connectionString: (process.env['DATABASE_URL'] ?? '').replace(
        'sslmode=require',
        'sslmode=verify-full',
      ),
      max: 10,
    },
  }),

  plugins: [
    ...(process.env['BLOB_READ_WRITE_TOKEN']
      ? [
          vercelBlobStorage({
            enabled: true,
            token: process.env['BLOB_READ_WRITE_TOKEN'] ?? '',
            collections: {
              media: true,
            },
          }),
        ]
      : []),
  ],

  upload: {
    limits: {
      fileSize: 10000000,
    },
  },

  cors: allowedOrigins,
  csrf: allowedOrigins,

  routes: {
    admin: '/admin',
    api: '/api',
    graphQL: '/api/graphql',
    graphQLPlayground: '/api/graphql-playground',
  },

  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },

  graphQL: {
    schemaOutputFile: path.resolve(dirname, 'generated-schema.graphql'),
  },
})
