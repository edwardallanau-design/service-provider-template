import { Resend } from 'resend'

const resend = new Resend(process.env['RESEND_API_KEY'])

export interface ContactEmailPayload {
  name: string
  email: string
  company?: string
  phone?: string
  service?: string
  budget?: string
  message: string
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

function buildContactEmailHtml(data: ContactEmailPayload): string {
  const rows = [
    ['Name', data.name],
    ['Email', data.email],
    ...(data.company ? [['Company', data.company]] : []),
    ...(data.phone ? [['Phone', data.phone]] : []),
    ...(data.service ? [['Service', data.service]] : []),
    ...(data.budget ? [['Budget', data.budget]] : []),
  ]

  const detailRows = rows
    .map(
      ([label, value]) => `
      <tr>
        <td style="padding:8px 12px;font-weight:600;color:#9ca3af;width:110px;vertical-align:top;">${escapeHtml(label ?? '')}</td>
        <td style="padding:8px 12px;color:#f9fafb;">${escapeHtml(value ?? '')}</td>
      </tr>`,
    )
    .join('')

  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:ui-sans-serif,system-ui,sans-serif;">
  <div style="max-width:600px;margin:40px auto;background:#111111;border-radius:8px;overflow:hidden;border:1px solid #222222;">
    <div style="padding:32px;border-bottom:1px solid #222222;">
      <h1 style="margin:0;font-size:20px;font-weight:700;color:#ffffff;">New Contact Form Submission</h1>
    </div>
    <div style="padding:32px;">
      <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
        ${detailRows}
      </table>
      <div style="background:#0a0a0a;border-radius:6px;padding:16px;border:1px solid #222222;">
        <p style="margin:0 0 8px;font-size:12px;font-weight:600;color:#9ca3af;text-transform:uppercase;letter-spacing:.05em;">Message</p>
        <p style="margin:0;color:#e5e7eb;line-height:1.6;white-space:pre-wrap;">${escapeHtml(data.message)}</p>
      </div>
    </div>
  </div>
</body>
</html>`
}

export async function sendContactEmail(data: ContactEmailPayload) {
  return resend.emails.send({
    from: process.env['RESEND_FROM_EMAIL'] ?? 'noreply@example.com',
    to: process.env['RESEND_TO_EMAIL'] ?? 'admin@example.com',
    replyTo: data.email,
    subject: `New inquiry from ${data.name}${data.company ? ` — ${data.company}` : ''}`,
    html: buildContactEmailHtml(data),
  })
}
