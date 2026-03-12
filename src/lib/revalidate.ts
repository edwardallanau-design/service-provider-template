export async function safeRevalidateTag(tag: string): Promise<void> {
  try {
    const { revalidateTag } = await import('next/cache')
    revalidateTag(tag)
  } catch {
    // No-op outside Next.js runtime (e.g. during payload generate:types / migrate)
  }
}
