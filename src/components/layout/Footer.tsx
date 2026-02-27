import Link from 'next/link'

export function Footer() {
  return (
    <footer className="mt-16 border-t border-border">
      <div className="container mx-auto max-w-content px-4 py-10 sm:px-6">
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
            <Link href="/careers" className="hover:text-foreground transition-colors">
              Careers
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
