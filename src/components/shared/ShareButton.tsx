'use client'

import { useState } from 'react'
import { Share2, Check } from 'lucide-react'
import { track } from '@vercel/analytics/react'
import { cn } from '@/lib/utils'

interface ShareButtonProps {
  url: string
  title?: string
  itemId?: string
  className?: string
}

export function ShareButton({ url, title, itemId, className }: ShareButtonProps) {
  const [copied, setCopied] = useState(false)

  async function handleShare() {
    try {
      if (navigator.share) {
        await navigator.share({ title, url })
        if (itemId) track('weekly_item_shared', { item_id: itemId, method: 'native' })
        return
      }
    } catch {
      // navigator.share threw — fall through to clipboard
    }

    try {
      await navigator.clipboard.writeText(url)
      if (itemId) track('weekly_item_shared', { item_id: itemId, method: 'clipboard' })
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard also failed — silent
    }
  }

  return (
    <button
      onClick={handleShare}
      aria-label={copied ? 'Copied!' : 'Share this item'}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors',
        'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
        className
      )}
    >
      {copied ? (
        <>
          <Check className="h-3.5 w-3.5" aria-hidden="true" />
          Copied!
        </>
      ) : (
        <>
          <Share2 className="h-3.5 w-3.5" aria-hidden="true" />
          Share
        </>
      )}
    </button>
  )
}
