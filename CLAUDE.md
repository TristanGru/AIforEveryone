@package.json

## Project Overview
AI Decoded is a Next.js 14 content platform explaining AI's impact on professions, published at aidecodedbrief.com. Deployed on Vercel (not GitHub Pages — the old deploy.yml has been removed).

## Tech Stack
- Next.js 14 (App Router, `output: 'export'` — fully static)
- TypeScript strict mode
- Tailwind CSS + `cn()` utility pattern
- next-mdx-remote v4 (MDX rendering)
- gray-matter (frontmatter parsing)
- Zod (content validation)
- Fuse.js (client-side search)
- date-fns
- @vercel/analytics
- Jest + Playwright

## Commands
- `npm run dev` — start dev server with Turbopack (localhost:3000)
- `npm run build` — validate content then production build
- `npm run validate` — run content schema validation only
- `npm test` — run Jest unit tests
- `npm test -- --testPathPattern=src/utils/format` — run single test file
- `npm run type-check` — TypeScript check without building
- `npm run lint` — ESLint
- `npm run format` — Prettier over src/ and content/
- `npm run new-career` — scaffold a new career MDX file
- `npm run new-week` — scaffold a new weekly issue MDX file
- `npm run new-article` — scaffold a new hub article MDX file

## Architecture
- `src/app/` — App Router pages: `page.tsx`, `professional-impacts/`, `hub/`, `weekly/`, `about/`
- `src/components/` — UI: `careers/`, `home/`, `hub/`, `layout/`, `shared/`, `weekly/`
- `src/lib/content/` — MDX loaders for careers, hub, weekly (gray-matter + Zod)
- `src/lib/seo/` — metadata helpers per page type
- `src/types/` — shared TypeScript types (careers.ts, hub.ts, weekly.ts, index.ts)
- `content/careers/` — MDX files, one per profession
- `content/hub/` — bucket-based hub articles
- `content/weekly/` — weekly issue MDX files
- `scripts/` — content scaffolding scripts (new-career.ts, new-week.ts, new-article.ts)
- `vercel.json` — runtime redirects (required because static export can't use next.config.mjs redirects)
- `scripts/send-newsletter.ts` — reads a weekly MDX file and sends it as a Resend broadcast
- `.github/workflows/send-newsletter.yml` — triggers on push to main only when `content/weekly/*.mdx` changes

## Coding Rules
- All content parsing goes through `src/lib/content/` — never read MDX files directly in pages
- Use `cn()` from `src/lib/utils` for all conditional Tailwind classes
- Career MDX frontmatter requires: `riskLevel`, `transformationLevel`, `impactSummary` (not the old `threatLevel`)
- New content pages must be added to `src/app/sitemap.ts`
- Keep color semantics consistent: risk = emerald/yellow/red; transformation = indigo (light→dark)

## Known Gotchas
- Deployed on Vercel — do NOT recreate a GitHub Pages deploy workflow
- `output: 'export'` means Next.js `redirects` in `next.config.mjs` are ignored at runtime — use `vercel.json` instead
- Windows: can't `mv` a directory the dev server has open — use `cp -r` then `rm -rf`
- `npm run build` runs `validate` first — content schema errors will fail the build
- `weeklySignalId` fields in career MDX are empty strings — not linked yet, don't remove them
- `public/og-default.png` is an SVG placeholder — needs a real 1200×630 PNG for OG images
- About page has a TODO placeholder for creator name/contact info
- `scripts/new-career.ts` scaffolds old fields (`threatLevel`, `threatExplainer`) — manually replace with `riskLevel`, `transformationLevel`, `impactSummary` after scaffolding. Script needs updating.
- `scripts/new-article.ts` scaffolds old `<Accessible>`/`<Technical>` MDX tags — remove them, write body content directly (mode was cut)
- Hub article titles with apostrophes must use double-quoted YAML strings (e.g. `title: "What's Next"`) — single quotes break YAML parsing
- Career `category` enum values: `knowledge-workers` | `skilled-trades` | `service-workers` | `administrative` | `industrial-workers` — `media` is not valid; journalists = `knowledge-workers`
- Always verify source URLs before publishing — AP, WaPo, Reuters official pages restructure frequently; use Poynter/Nieman Lab/Digiday as reliable fallback sources for journalism AI coverage

## Writing Rules
- Do not use analogies to explain AI concepts — explain clearly and correctly; analogies feel condescending to the audience
- Hub articles and career pages are accessible-first — no jargon without plain-English explanation inline

## Context Management
When compacting, always preserve:
- The current task and its exact status (done / in progress / blocked)
- All files created or modified this session with their paths
- Every decision made and the reason behind it
- What is broken, what is next, and any open questions
- Any new rules that should be added to this CLAUDE.md

## Session Log
**2026-03-28 (session 2)** — Newsletter infrastructure complete. Subscribe form moved to right side of weekly page header. Deleted stale GitHub Pages deploy workflow. Built `scripts/send-newsletter.ts` (Resend Broadcasts API) and `.github/workflows/send-newsletter.yml`. GitHub secrets set: `RESEND_API_KEY`, `RESEND_AUDIENCE_ID`, `RESEND_FROM_EMAIL`. Domain `aidecodedbrief.com` verified in Resend.

**2026-03-30** — Monday content session. Created two new content pieces:
1. **Hub article** — `content/hub/models/claude-explained-haiku-sonnet-opus-and-whats-coming-next.mdx` (slug: `claude-explained`). Full rundown of Anthropic's Claude model lineup: Claude 3 history, Claude 4 tiers (Haiku 4.5 / Sonnet 4.6 / Opus 4.6), access methods (Claude.ai / API / Claude Code / Cowork), Mythos leak section with light speculation. ~2,000 words.
2. **Career page** — `content/careers/journalist.mdx`. riskLevel: medium, transformationLevel: high. Company adoptions: AP (Poynter source), WaPo Heliograf (Digiday source), Reuters Lynx Insight (Digiday source). 5 tools, 3 recommended reads, full article body.
3. **Weekly spotlight** — wired `careerSpotlightSlug: 'journalist'` into `content/weekly/2026-03-30.mdx`.
4. **Spec doc** — `docs/superpowers/specs/2026-03-30-claude-models-hub-article-design.md` (brainstorming artefact).

Decisions: Claude-only scope for hub article (cross-company = separate piece); Past→Present→Future arc; no analogies for readers; light speculation on Mythos leak; Journalist career added as week's spotlight.

Next priorities: logo, update `scripts/new-career.ts` and `scripts/new-article.ts` to use current schema, more career posts, expert predictions on career pages.
