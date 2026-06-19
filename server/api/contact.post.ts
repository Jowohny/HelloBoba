import { Resend } from 'resend'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

interface Body {
  name?: string
  email?: string
  subject?: string
  message?: string
  website?: string
}

export default defineEventHandler(async (event) => {
  const body = await readBody<Body>(event)

  if (body.website) return { ok: true }

  const name = (body.name || '').trim().slice(0, 100)
  const email = (body.email || '').trim().slice(0, 200)
  const subject = (body.subject || '').trim().slice(0, 150) || 'General Inquiry'
  const message = (body.message || '').trim().slice(0, 5000)

  if (!name || !email || !message) {
    throw createError({ statusCode: 400, statusMessage: 'Please fill in name, email, and message.' })
  }
  if (!EMAIL_RE.test(email)) {
    throw createError({ statusCode: 400, statusMessage: 'That email address looks invalid.' })
  }

  const config = useRuntimeConfig(event)
  if (!config.resendApiKey) {
    throw createError({ statusCode: 500, statusMessage: 'Email service is not configured yet.' })
  }

  const resend = new Resend(config.resendApiKey)
  const { error } = await resend.emails.send({
    from: `Hello Boba Contact <${config.contactFromEmail}>`,
    to: config.contactToEmail,
    replyTo: email,
    subject: `[Contact] ${subject}`,
    text: `From: ${name} <${email}>\nSubject: ${subject}\n\n${message}`
  })

  if (error) {
    console.error('[contact] Resend error:', error)
    throw createError({ statusCode: 502, statusMessage: 'Could not send your message. Please try again.' })
  }

  return { ok: true }
})
