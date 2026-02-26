# AI Decoded

An ad-supported Next.js content platform making AI knowledge accessible through a curated weekly reading list, a four-bucket knowledge hub, and job-specific career impact pages.

## Quick Start

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local
# Edit .env.local with your values

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Publishing Workflow

### Weekly Reading List (every Monday)

```bash
npm run new-week
# Opens content/weekly/YYYY-MM-DD.mdx
# Fill in 5 items, then push to main
```

### New Career Page

```bash
npm run new-career -- --title "Data Analyst" --category white-collar
# Opens content/careers/data-analyst.mdx
```

### New Hub Article

```bash
npm run new-article -- --title "AI in Legal Research" --bucket business --level accessible
# Opens content/hub/business/ai-in-legal-research.mdx
```

## Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Validate content + build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run format` | Format code with Prettier |
| `npm run type-check` | TypeScript type check |
| `npm run validate` | Validate all MDX frontmatter |
| `npm run test` | Run unit + integration tests |
| `npm run test:e2e` | Run Playwright E2E tests |

## Content Structure

```
content/
├── weekly/           # One MDX file per week (YYYY-MM-DD.mdx)
├── hub/
│   ├── models/       # AI model explainer articles
│   ├── business/     # AI in business articles
│   ├── regulation/   # AI policy articles
│   └── tools/        # AI tools guides
└── careers/          # One MDX file per career
```

## Environment Variables

See `.env.example` for all required and optional environment variables.

### Required for production

- `NEXT_PUBLIC_SITE_URL` — Your domain (e.g., `https://aidecoded.com`)
- `REVALIDATE_SECRET` — Secret for `/api/revalidate` (generate with `openssl rand -base64 32`)

### Optional (for ads)

- `NEXT_PUBLIC_ADSENSE_CLIENT_ID` — Google AdSense publisher ID
- `NEXT_PUBLIC_AD_SLOT_HERO`, `NEXT_PUBLIC_AD_SLOT_SIDEBAR`, `NEXT_PUBLIC_AD_SLOT_INLINE`, `NEXT_PUBLIC_AD_SLOT_ARTICLE` — Ad slot IDs

## Manual ISR Revalidation

After pushing a new weekly file, force immediate revalidation:

```bash
curl -X POST https://aidecoded.com/api/revalidate \
  -H "x-revalidate-secret: $REVALIDATE_SECRET" \
  -H "Content-Type: application/json" \
  -d '{"path": "/weekly"}'
```

## Deployment

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Push to `main` to deploy

## Documentation

- [Content Guide](docs/CONTENT_GUIDE.md) — How to write and publish content
- [Weekly Sources](docs/WEEKLY_SOURCES.md) — Source library for curation
- [Schema Changelog](docs/SCHEMA_CHANGELOG.md) — MDX frontmatter version history
