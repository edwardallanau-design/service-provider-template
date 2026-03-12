'use server'

import { z } from 'zod'

import { sendContactEmail } from '../email.ts'

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Please enter a valid email address'),
  company: z.string().max(100).optional(),
  phone: z.string().max(30).optional(),
  service: z.string().optional(),
  budget: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters').max(2000),
})

export type ContactFormState = {
  status: 'idle' | 'success' | 'error'
  errors?: Partial<Record<keyof z.infer<typeof contactSchema>, string[]>>
  message?: string
}

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const rawData = {
    name: formData.get('name') as string,
    email: formData.get('email') as string,
    company: (formData.get('company') as string) || undefined,
    phone: (formData.get('phone') as string) || undefined,
    service: (formData.get('service') as string) || undefined,
    budget: (formData.get('budget') as string) || undefined,
    message: formData.get('message') as string,
  }

  const result = contactSchema.safeParse(rawData)

  if (!result.success) {
    return {
      status: 'error',
      errors: result.error.flatten().fieldErrors,
    }
  }

  try {
    await sendContactEmail(result.data)
    return { status: 'success', message: "Thanks! We'll be in touch soon." }
  } catch {
    return {
      status: 'error',
      message: 'Something went wrong. Please try again or email us directly.',
    }
  }
}
