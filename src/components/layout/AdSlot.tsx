'use client'

import Script from 'next/script'
import { useEffect, useRef } from 'react'
import type { AdSlotName } from '@/types'

const SLOT_ENV_MAP: Record<AdSlotName, string | undefined> = {
  hero: process.env.NEXT_PUBLIC_AD_SLOT_HERO,
  sidebar: process.env.NEXT_PUBLIC_AD_SLOT_SIDEBAR,
  inline: process.env.NEXT_PUBLIC_AD_SLOT_INLINE,
  article: process.env.NEXT_PUBLIC_AD_SLOT_ARTICLE,
}

const CLIENT_ID = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID

interface AdSlotProps {
  slot: AdSlotName
  className?: string
}

export function AdSlot({ slot, className }: AdSlotProps) {
  const adRef = useRef<HTMLDivElement>(null)
  const slotId = SLOT_ENV_MAP[slot]

  useEffect(() => {
    if (!CLIENT_ID || !slotId) return
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ;((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({})
    } catch {}
  }, [slotId])

  // No AdSense credentials — render a labeled placeholder
  if (!CLIENT_ID || !slotId) {
    if (process.env.NODE_ENV === 'production') {
      return <div className={className} aria-hidden="true" />
    }
    return (
      <div
        className={`flex items-center justify-center rounded-md border-2 border-dashed border-border bg-muted/30 p-4 text-xs text-muted-foreground ${className ?? ''}`}
        aria-hidden="true"
      >
        Ad slot: {slot} (placeholder — set NEXT_PUBLIC_ADSENSE_CLIENT_ID to activate)
      </div>
    )
  }

  return (
    <>
      <Script
        async
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${CLIENT_ID}`}
        crossOrigin="anonymous"
        strategy="lazyOnload"
      />
      <div ref={adRef} className={className}>
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client={CLIENT_ID}
          data-ad-slot={slotId}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    </>
  )
}
