# Schema Changelog

## Version 1 (2026-02-24)

Initial schema. All content types defined.

### WeeklyItem
- `id`, `week`, `slot`, `title`, `source`, `url`, `bucket`, `level`, `readingTimeMin`, `summary`, `dayHint`, `tags?`

### WeeklyList
- `week`, `items` (exactly 5), `featuredSlot`

### HubArticle
- `slug`, `bucket`, `title`, `level`, `readingTimeMin`, `excerpt`, `keyTakeaways` (tuple of 3), `publishedAt`, `lastReviewed`, `sources`, `relatedSlugs?`, `tags?`

### CareerPage
- `slug`, `title`, `category`, `threatLevel`, `threatExplainer`, `summary`, `whatIsChanging`, `companyAdoptions`, `skillImplications`, `weeklySignalId?`, `recommendedReading`, `toolsWorthKnowing`, `version`, `lastUpdated`, `publishedAt`

---

## Upgrading Schema

1. Increment `CONTENT_SCHEMA_VERSION` in `src/lib/content/schema-version.ts`.
2. Update Zod schemas in `scripts/validate-content.ts`.
3. Update TypeScript interfaces in `src/types/`.
4. Update all existing MDX frontmatter files.
5. Run `npm run validate` — must exit 0.
6. Update this changelog.
