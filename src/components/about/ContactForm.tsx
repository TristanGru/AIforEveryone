'use client'

import { useState, useEffect } from 'react'

const RATE_LIMIT_KEY = 'ai-decoded-contact-lastSent'
const MS_PER_DAY = 24 * 60 * 60 * 1000

export function ContactForm() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error' | 'limited'>('idle')

  useEffect(() => {
    try {
      const last = localStorage.getItem(RATE_LIMIT_KEY)
      if (last && Date.now() - parseInt(last, 10) < MS_PER_DAY) {
        setStatus('limited')
      }
    } catch {}
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    // Re-check rate limit before sending
    try {
      const last = localStorage.getItem(RATE_LIMIT_KEY)
      if (last && Date.now() - parseInt(last, 10) < MS_PER_DAY) {
        setStatus('limited')
        return
      }
    } catch {}

    setStatus('sending')

    try {
      const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_ID
      if (!formspreeId) throw new Error('Formspree ID not configured')

      const res = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          email: email.trim() || '(no email provided)',
          message,
          _subject: 'AI Decoded: Reader Comment',
        }),
      })

      if (res.ok) {
        try { localStorage.setItem(RATE_LIMIT_KEY, String(Date.now())) } catch {}
        setStatus('success')
        setEmail('')
        setMessage('')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'limited') {
    return (
      <p className="text-sm text-muted-foreground italic">
        You&apos;ve already sent a message today. Check back tomorrow.
      </p>
    )
  }

  if (status === 'success') {
    return (
      <p className="text-sm text-foreground">
        Thanks — message received. I read every one.
      </p>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="contact-email" className="block text-sm font-medium mb-1.5">
          Your email{' '}
          <span className="text-muted-foreground font-normal">(optional — only if you want a reply)</span>
        </label>
        <input
          id="contact-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="w-full rounded border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      <div>
        <label htmlFor="contact-message" className="block text-sm font-medium mb-1.5">
          Message <span className="text-destructive" aria-hidden="true">*</span>
        </label>
        <textarea
          id="contact-message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          rows={5}
          placeholder="A career you'd like to see covered, an error you found, or anything else..."
          className="w-full rounded border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
        />
      </div>

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={status === 'sending' || !message.trim()}
          className="rounded bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50 transition-colors"
        >
          {status === 'sending' ? 'Sending…' : 'Send message'}
        </button>

        {status === 'error' && (
          <p className="text-sm text-destructive">
            Something went wrong. Email directly:{' '}
            <a href="mailto:comments@aidecodedbrief.com" className="underline">
              comments@aidecodedbrief.com
            </a>
          </p>
        )}
      </div>
    </form>
  )
}
