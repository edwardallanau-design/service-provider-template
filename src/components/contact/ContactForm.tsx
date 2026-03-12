'use client'

import { useActionState } from 'react'

import { submitContactForm, type ContactFormState } from '@/lib/actions/contact'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

const initialState: ContactFormState = { status: 'idle' }

interface ContactFormProps {
  serviceOptions?: string[]
}

export function ContactForm({ serviceOptions }: ContactFormProps) {
  const [state, formAction, pending] = useActionState(submitContactForm, initialState)

  if (state.status === 'success') {
    return (
      <div className="card-border bg-section-mid p-8 text-center">
        <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full border border-green-800 bg-green-950">
          <svg className="size-6 text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h3 className="text-sm font-semibold text-(--color-foreground)">Message received!</h3>
        <p className="mt-2 text-sm text-(--color-muted)">{state.message}</p>
      </div>
    )
  }

  return (
    <form action={formAction} className="space-y-5">
      {state.status === 'error' && state.message && (
        <div className="rounded-(--radius-button) border border-red-800 bg-red-950/30 p-3 text-sm text-red-400">
          {state.message}
        </div>
      )}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FormField
          label="Name"
          name="name"
          required
          error={state.errors?.['name']?.[0]}
          placeholder="Your name"
        />
        <FormField
          label="Email"
          name="email"
          type="email"
          required
          error={state.errors?.['email']?.[0]}
          placeholder="you@company.com"
        />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FormField
          label="Company"
          name="company"
          error={state.errors?.['company']?.[0]}
          placeholder="Your company (optional)"
        />
        <FormField
          label="Phone"
          name="phone"
          type="tel"
          error={state.errors?.['phone']?.[0]}
          placeholder="+1 (555) 000-0000"
        />
      </div>

      {serviceOptions && serviceOptions.length > 0 && (
        <div className="space-y-2">
          <Label htmlFor="service">Service</Label>
          <select
            id="service"
            name="service"
            className="flex h-10 w-full rounded-(--radius-button) border border-(--color-border) bg-(--color-surface) px-3 py-2 text-sm text-(--color-foreground) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-accent)"
          >
            <option value="">Select a service…</option>
            {serviceOptions.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="message">
          Message <span className="text-(--color-muted)">*</span>
        </Label>
        <Textarea
          id="message"
          name="message"
          required
          placeholder="Tell us about your project…"
          className="min-h-[140px]"
        />
        {state.errors?.['message'] && (
          <p className="text-xs text-red-400">{state.errors['message'][0]}</p>
        )}
      </div>

      <Button type="submit" disabled={pending} size="lg" className="w-full">
        {pending ? 'Sending…' : 'Send Message'}
      </Button>
    </form>
  )
}

interface FormFieldProps {
  label: string
  name: string
  type?: string
  required?: boolean
  placeholder?: string
  error?: string
}

function FormField({ label, name, type = 'text', required, placeholder, error }: FormFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={name}>
        {label} {required && <span className="text-(--color-muted)">*</span>}
      </Label>
      <Input id={name} name={name} type={type} required={required} placeholder={placeholder} />
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  )
}
