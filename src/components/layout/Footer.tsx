import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t bg-muted/40">
      <div className="container mx-auto max-w-6xl px-4 py-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-foreground">AI Decoded</p>
            <p className="mt-1 text-xs text-muted-foreground">
              AI knowledge made accessible. Published every Monday.
            </p>
          </div>

          <nav className="flex flex-wrap gap-4 text-xs text-muted-foreground" aria-label="Footer navigation">
            <Link href="/weekly" className="hover:text-foreground">
              This Week
            </Link>
            <Link href="/hub" className="hover:text-foreground">
              Hub
            </Link>
            <Link href="/careers" className="hover:text-foreground">
              Careers
            </Link>
            <Link href="/about" className="hover:text-foreground">
              About
            </Link>
          </nav>
        </div>

        <div className="mt-6 border-t pt-4">
          <p className="text-xs text-muted-foreground">
            This site uses Google AdSense, which may set cookies.{' '}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-foreground"
            >
              Google Privacy Policy
            </a>
            .
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            © {new Date().getFullYear()} AI Decoded. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
