import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getAllCareers, getCareer } from '@/lib/content/careers'
import { getCareerMetadata } from '@/lib/seo/metadata'
import { ThreatLevel } from '@/components/careers/ThreatLevel'
import { CompanyAdoptionTable } from '@/components/careers/CompanyAdoptionTable'
import { SkillsMatrix } from '@/components/careers/SkillsMatrix'
import { LastUpdated } from '@/components/shared/LastUpdated'
import { JsonLd } from '@/components/shared/JsonLd'
import { TechnicalModeProvider } from '@/context/TechnicalModeContext'
import { Accessible, Technical } from '@/components/hub/ModeContent'
import { TechnicalToggle } from '@/components/hub/TechnicalToggle'

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

  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://aidecodedbrief.com'
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


        {/* What Is Changing */}
        <section className="my-8 border-t border-border pt-7" aria-labelledby="changing-heading">
          <h2 id="changing-heading" className="text-lg font-bold tracking-tight mb-4">What Is Changing</h2>
          <ol className="space-y-4">
            {career.whatIsChanging.map((item, i) => (
              <li key={i} className="flex items-start gap-4 text-sm leading-relaxed">
                <span className="flex-shrink-0 tabular-nums font-semibold text-primary w-5 mt-0.5">
                  {i + 1}.
                </span>
                <span className="text-foreground/85">{item}</span>
              </li>
            ))}
          </ol>
        </section>

        {/* Company Adoption Table */}
        <CompanyAdoptionTable adoptions={career.companyAdoptions} />

        {/* Skills Matrix */}
        <SkillsMatrix skills={career.skillImplications} />

        {/* MDX Body */}
        <article className="prose prose-slate max-w-none mt-8">
          <MDXRemote source={career.body} components={mdxComponents} />
        </article>

        {/* Recommended Reading */}
        {career.recommendedReading.length > 0 && (
          <section className="my-8 border-t border-border pt-7" aria-labelledby="reading-heading">
            <h2 id="reading-heading" className="text-lg font-bold tracking-tight mb-4">Recommended Reading</h2>
            <ul className="space-y-3">
              {career.recommendedReading.map((item, i) => (
                <li key={i} className="text-sm">
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-primary underline underline-offset-2 decoration-primary/40 hover:decoration-primary transition-colors"
                  >
                    {item.title}
                  </a>
                  <span className="ml-2 text-muted-foreground">— {item.source}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Tools Worth Knowing */}
        {career.toolsWorthKnowing.length > 0 && (
          <section className="my-8 border-t border-border pt-7" aria-labelledby="tools-heading">
            <h2 id="tools-heading" className="text-lg font-bold tracking-tight mb-4">Tools Worth Knowing</h2>
            <ul className="space-y-3">
              {career.toolsWorthKnowing.map((tool, i) => (
                <li key={i} className="text-sm">
                  <a
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-primary underline underline-offset-2 decoration-primary/40 hover:decoration-primary transition-colors"
                  >
                    {tool.name}
                  </a>
                  <span className="ml-2 text-muted-foreground">— {tool.oneLiner}</span>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </TechnicalModeProvider>
  )
}
