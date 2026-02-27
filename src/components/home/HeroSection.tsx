import Link from 'next/link'

export function HeroSection() {
  return (
    <section className="border-b border-border py-14 sm:py-20">
      <div className="container mx-auto max-w-content px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">
            Weekly · Knowledge Hub · Careers
          </p>
          <h1 className="font-serif text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
            AI knowledge for everyone
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            A weekly reading list, career impact analysis, and a knowledge hub — built to make
            the AI era navigable for curious people.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-6 text-sm">
            <Link
              href="/weekly"
              className="font-semibold text-primary underline underline-offset-4 decoration-primary/40 hover:decoration-primary transition-colors"
            >
              This week&apos;s reading list →
            </Link>
            <Link
              href="/careers"
              className="font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Find your career
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
