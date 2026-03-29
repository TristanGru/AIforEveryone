import type { Metadata } from 'next'
import type { HubArticle, CareerPage, WeeklyList } from '@/types'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://aidecodedbrief.com'
const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME ?? 'AI Decoded'

function buildMeta({
  title,
  description,
  url,
  image,
}: {
  title: string
  description: string
  url: string
  image?: string
}): Metadata {
  const ogImage = image ?? '/og-default.png'
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${SITE_URL}${url}`,
      siteName: SITE_NAME,
      images: [{ url: ogImage, width: 1200, height: 630 }],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
    alternates: {
      canonical: `${SITE_URL}${url}`,
    },
  }
}

export function getHomeMetadata(): Metadata {
  return buildMeta({
    title: 'AI Decoded — AI Knowledge for Everyone',
    description:
      'Weekly AI reading lists, career impact analysis, and a knowledge hub that makes AI accessible to everyone navigating the modern workplace.',
    url: '/',
  })
}

export function getWeeklyMetadata(list: WeeklyList): Metadata {
  return buildMeta({
    title: `Weekly AI Reading List — Week of ${list.week}`,
    description: `Five curated AI articles for the week of ${list.week}. Filtered by topic and reading level to match your interests.`,
    url: '/weekly',
  })
}

export function getWeeklyArchiveMetadata(): Metadata {
  return buildMeta({
    title: 'Weekly Reading List Archive',
    description: 'Browse all past AI Decoded weekly reading lists, sorted newest first.',
    url: '/weekly/archive',
  })
}

export function getHubMetadata(): Metadata {
  return buildMeta({
    title: 'AI Knowledge Hub',
    description:
      'Explore AI through four lenses: Models, Business, Regulation, and Tools. Articles for every reading level.',
    url: '/hub',
  })
}

export function getBucketMetadata(bucket: string): Metadata {
  const labels: Record<string, { label: string; description: string }> = {
    models: {
      label: 'AI Models',
      description: 'Understand AI models — from LLMs to image generators — without the hype.',
    },
    business: {
      label: 'AI in Business',
      description:
        'How companies are adopting AI, measuring ROI, and transforming workflows.',
    },
    regulation: {
      label: 'AI Regulation',
      description:
        'Keep up with AI policy, the EU AI Act, and what regulation means for your industry.',
    },
    tools: {
      label: 'AI Tools',
      description: 'Practical guides to the AI tools that actually save time and improve output.',
    },
  }

  const meta = labels[bucket] ?? { label: bucket, description: `AI ${bucket} articles.` }
  return buildMeta({
    title: meta.label,
    description: meta.description,
    url: `/hub/${bucket}`,
  })
}

export function getArticleMetadata(article: HubArticle): Metadata {
  return buildMeta({
    title: article.title,
    description: article.excerpt.slice(0, 160),
    url: `/hub/${article.bucket}/${article.slug}`,
  })
}

export function getCareersMetadata(): Metadata {
  return buildMeta({
    title: 'Professional Impacts — How AI Affects Your Profession',
    description:
      'Find out how AI is changing your profession. Threat levels, skill analysis, and what to do about it for 50+ careers.',
    url: '/professional-impacts',
  })
}

export function getCareerMetadata(career: CareerPage): Metadata {
  const title = `How AI Is Affecting ${career.title}s in 2026`
  const description = `${career.summary.slice(0, 120)} Risk: ${career.riskLevel}. Transformation: ${career.transformationLevel}.`.slice(
    0,
    160
  )
  return buildMeta({
    title,
    description,
    url: `/professional-impacts/${career.slug}`,
  })
}

export function getAboutMetadata(): Metadata {
  return buildMeta({
    title: 'About AI Decoded',
    description:
      'AI Decoded is a weekly AI reading list and knowledge hub built to make AI accessible to everyone — not just engineers.',
    url: '/about',
  })
}
