import Link from 'next/link'

export function HeroSection() {
  return (
    <section className="bg-gradient-to-b from-primary/5 to-background py-16 text-center sm:py-24">
      <div className="container mx-auto max-w-3xl px-4">
        <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">
          AI knowledge for{' '}
          <span className="text-primary">everyone</span>
        </h1>
        <p className="mt-4 text-lg text-muted-foreground sm:text-xl">
          A weekly reading list, career impact analysis, and a knowledge hub — built to make
          the AI era navigable for non-engineers.
        </p>
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/weekly"
            className="inline-flex h-11 items-center rounded-md bg-primary px-6 text-sm font-semibold text-primary-foreground shadow hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            This Week&apos;s Reading List
          </Link>
          <Link
            href="/careers"
            className="inline-flex h-11 items-center rounded-md border border-input bg-background px-6 text-sm font-semibold hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Find Your Career
          </Link>
        </div>
      </div>
    </section>
  )
}
