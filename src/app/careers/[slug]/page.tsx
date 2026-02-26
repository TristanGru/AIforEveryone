import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getAllCareers, getCareer } from '@/lib/content/careers'
import { getCareerMetadata } from '@/lib/seo/metadata'
import { ThreatLevel } from '@/components/careers/ThreatLevel'
import { CompanyAdoptionTable } from '@/components/careers/CompanyAdoptionTable'
import { SkillsMatrix } from '@/components/careers/SkillsMatrix'
import { WeeklySignal } from '@/components/careers/WeeklySignal'
import { AdSlot } from '@/components/layout/AdSlot'
import { LastUpdated } from '@/components/shared/LastUpdated'
import { JsonLd } from '@/components/shared/JsonLd'
import { TechnicalModeProvider } from '@/context/TechnicalModeContext'
import { Accessible, Technical } from '@/components/hub/ModeContent'
import { TechnicalToggle } from '@/components/hub/TechnicalToggle'
import { ExternalLink } from 'lucide-react'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  return getAllCareers().map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: Props) {
  const career = getCareer(params.slug)
  if (!career) return {}
  return getCareerMetadata(career)
}

const mdxComponents = { Accessible, Technical }

export default async function CareerPage({ params }: Props) {
  const career = getCareer(params.slug)
  if (!career) notFound()

  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://aidecoded.com'
  const pageUrl = `${SITE_URL}/careers/${career.slug}`

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `How AI Is Affecting ${career.title}s in 2026`,
    description: career.summary,
    datePublished: career.publishedAt,
    dateModified: career.lastUpdated,
    url: pageUrl,
    publisher: { '@type': 'Organization', name: 'AI Decoded', url: SITE_URL },
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Careers', item: `${SITE_URL}/careers` },
      { '@type': 'ListItem', position: 3, name: career.title, item: pageUrl },
    ],
  }

  return (
    <TechnicalModeProvider>
      <JsonLd data={articleJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <TechnicalToggle />

      <div className="container mx-auto max-w-3xl px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-4 flex items-center gap-1 text-xs text-muted-foreground" aria-label="Breadcrumb">
          <Link href="/careers" className="hover:text-foreground">Careers</Link>
          <span aria-hidden="true">/</span>
          <span className="text-foreground">{career.title}</span>
        </nav>

        {/* Hero */}
        <header className="mb-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold leading-tight">
                How AI Is Affecting {career.title}s in 2026
              </h1>
              <p className="mt-2 text-muted-foreground">{career.summary}</p>
            </div>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
            <LastUpdated date={career.lastUpdated} />
            <span>·</span>
            <span>v{career.version}</span>
          </div>
        </header>

        {/* Threat Level */}
        <ThreatLevel level={career.threatLevel} explainer={career.threatExplainer} />

        <AdSlot slot="article" className="my-6 min-h-[90px]" />

        {/* What Is Changing */}
        <section className="my-6" aria-labelledby="changing-heading">
          <h2 id="changing-heading" className="text-xl font-bold">What Is Changing</h2>
          <ul className="mt-4 space-y-3">
            {career.whatIsChanging.map((item, i) => (
              <li key={i} className="flex items-start gap-3 rounded-lg border bg-card p-4 text-sm leading-relaxed">
                <span className="flex-shrink-0 font-bold text-primary">{i + 1}.</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Company Adoption Table */}
        <CompanyAdoptionTable adoptions={career.companyAdoptions} />

        {/* Skills Matrix */}
        <SkillsMatrix skills={career.skillImplications} />

        {/* Weekly Signal */}
        <section className="my-6" aria-labelledby="signal-heading">
          <h2 id="signal-heading" className="text-xl font-bold">Weekly Signal</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            The most relevant AI development this week for {career.title}s.
          </p>
          <div className="mt-3">
            <WeeklySignal weeklySignalId={career.weeklySignalId} careerTitle={career.title} />
          </div>
        </section>

        {/* MDX Body */}
        <article className="prose prose-slate max-w-none">
          <MDXRemote source={career.body} components={mdxComponents} />
        </article>

        {/* Recommended Reading */}
        {career.recommendedReading.length > 0 && (
          <section className="my-8 border-t pt-6" aria-labelledby="reading-heading">
            <h2 id="reading-heading" className="text-xl font-bold">Recommended Reading</h2>
            <ul className="mt-4 space-y-2">
              {career.recommendedReading.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <ExternalLink className="mt-0.5 h-4 w-4 flex-shrink-0 text-muted-foreground" aria-hidden="true" />
                  <div>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium hover:text-primary hover:underline"
                    >
                      {item.title}
                    </a>
                    <span className="ml-1.5 text-muted-foreground">— {item.source}</span>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Tools Worth Knowing */}
        {career.toolsWorthKnowing.length > 0 && (
          <section className="my-6 border-t pt-6" aria-labelledby="tools-heading">
            <h2 id="tools-heading" className="text-xl font-bold">Tools Worth Knowing</h2>
            <ul className="mt-4 space-y-2">
              {career.toolsWorthKnowing.map((tool, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <div>
                    <a
                      href={tool.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium hover:text-primary hover:underline"
                    >
                      {tool.name}
                    </a>
                    <span className="ml-1.5 text-muted-foreground">— {tool.oneLiner}</span>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </TechnicalModeProvider>
  )
}
