'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

type Status = 'idle' | 'loading' | 'success' | 'error'

interface SubscribeFormProps {
  className?: string
}

export function SubscribeForm({ className }: SubscribeFormProps) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (status === 'loading' || status === 'success') return

    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const data = await res.json()

      if (!res.ok) {
        setErrorMsg(data.error ?? 'Something went wrong. Please try again.')
        setStatus('error')
        return
      }

      setStatus('success')
      setEmail('')
    } catch {
      setErrorMsg('Something went wrong. Please try again.')
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <p className={cn('text-sm font-medium text-emerald-600 dark:text-emerald-400', className)}>
        You&apos;re subscribed. See you Monday.
      </p>
    )
  }

  return (
    <form onSubmit={handleSubmit} className={cn('flex flex-col gap-2 sm:flex-row sm:items-start', className)}>
      <label htmlFor="subscribe-email" className="sr-only">
        Email address
      </label>
      <input
        id="subscribe-email"
        type="email"
        required
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="you@example.com"
        disabled={status === 'loading'}
        className="min-w-0 flex-1 rounded-md border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-60"
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        className="flex-shrink-0 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {status === 'loading' ? 'Subscribing…' : 'Subscribe'}
      </button>
      {status === 'error' && (
        <p className="w-full text-xs text-red-600 dark:text-red-400 sm:col-span-2">{errorMsg}</p>
      )}
    </form>
  )
}
