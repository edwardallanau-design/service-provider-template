import { revalidateTag } from 'next/cache'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { CACHE_TAGS } from '@/lib/cache'

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get('Authorization')
  const secret = process.env['REVALIDATION_SECRET']

  if (!secret || authHeader !== `Bearer ${secret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = (await request.json()) as { tag?: string }

    if (body.tag && Object.values(CACHE_TAGS).includes(body.tag as (typeof CACHE_TAGS)[keyof typeof CACHE_TAGS])) {
      revalidateTag(body.tag)
      return NextResponse.json({ revalidated: true, tag: body.tag })
    }

    // Revalidate all tags
    for (const tag of Object.values(CACHE_TAGS)) {
      revalidateTag(tag)
    }
    return NextResponse.json({ revalidated: true, tags: Object.values(CACHE_TAGS) })
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }
}
