import Link from 'next/link'
import { SubscribeForm } from '@/components/shared/SubscribeForm'

export function Footer() {
  return (
    <footer className="mt-16 border-t border-border">
      <div className="container mx-auto max-w-content px-4 py-10 sm:px-6">

        <div className="mb-8 pb-8 border-b border-border max-w-md">
          <p className="text-sm font-semibold text-foreground mb-1">Get AI Decoded every Monday</p>
          <p className="text-xs text-muted-foreground mb-3">
            One reading list, one career spotlight, no noise.
          </p>
          <SubscribeForm />
        </div>

        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="font-serif text-base font-bold tracking-tight text-foreground">
              AI Decoded
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              AI knowledge made accessible. Published every Monday.
            </p>
          </div>

          <nav
            className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground"
            aria-label="Footer navigation"
          >
            <Link href="/weekly" className="hover:text-foreground transition-colors">
              This Week
            </Link>
            <Link href="/hub" className="hover:text-foreground transition-colors">
              Knowledge Hub
            </Link>
            <Link href="/professional-impacts" className="hover:text-foreground transition-colors">
              Professional Impacts
            </Link>
            <Link href="/about" className="hover:text-foreground transition-colors">
              About
            </Link>
          </nav>
        </div>

        <div className="mt-8 border-t border-border pt-6">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} AI Decoded. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
