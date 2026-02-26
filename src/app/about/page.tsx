import { getAboutMetadata } from '@/lib/seo/metadata'
import { JsonLd } from '@/components/shared/JsonLd'

export const metadata = getAboutMetadata()

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://aidecoded.com'

export default function AboutPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About AI Decoded',
    url: `${SITE_URL}/about`,
    description: metadata.description,
  }

  return (
    <>
      <JsonLd data={jsonLd} />
      <div className="container mx-auto max-w-2xl px-4 py-12">
        <h1 className="text-3xl font-bold">About AI Decoded</h1>

        <div className="prose prose-slate mt-8 max-w-none">
          <p className="lead text-lg text-muted-foreground">
            AI Decoded is a weekly reading list and knowledge hub built to make the AI era
            navigable for everyone — not just engineers.
          </p>

          <h2>What This Is</h2>
          <p>
            Every Monday, I spend 45 minutes reading everything new and significant in AI —
            research papers, industry reports, policy documents, practitioner essays. Then I
            pick the five pieces that I think will matter most to someone who isn&apos;t
            building AI but is living and working alongside it.
          </p>
          <p>
            The result is the weekly reading list: five curated articles with honest summaries
            and real reading time estimates. No hype, no doom, no jargon unless it&apos;s necessary.
          </p>

          <h2>The Knowledge Hub</h2>
          <p>
            Beyond the weekly list, I&apos;m building a library of explainer articles organized
            around four buckets: how the models work (Models), what businesses are actually
            doing (Business), how governments are responding (Regulation), and what tools are
            worth your time (Tools).
          </p>
          <p>
            Every article has two reading modes: Accessible (plain language, no assumptions)
            and Technical (for people who want the details). Switch between them at any time.
          </p>

          <h2>The Career Pages</h2>
          <p>
            The question I hear most often from people outside tech: &ldquo;Should I be worried
            about my job?&rdquo; The career pages are my attempt to answer that question honestly,
            for specific roles, without panic or false reassurance.
          </p>
          <p>
            Each career page includes a threat level, an explanation of what&apos;s actually
            changing (with real company examples), a skills matrix showing what&apos;s declining
            and what&apos;s growing, and practical tools worth knowing.
          </p>

          <h2>Who I Am</h2>
          <p>
            {/* TODO: Your name and background */}
            I&apos;m a solo creator who has spent years thinking about how technology changes
            work. AI Decoded is the site I wish existed when I started trying to make sense
            of this moment.
          </p>

          <h2>Contact</h2>
          <p>
            {/* TODO: Add contact information or link */}
            Have a career you&apos;d like to see covered? Found an error? I&apos;d love to hear from you.
          </p>
        </div>
      </div>
    </>
  )
}
