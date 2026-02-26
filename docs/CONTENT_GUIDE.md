# Content Guide

This guide explains how to create and publish content for AI Decoded.

## Weekly Reading List

Each week, publish exactly 5 curated AI articles. Run:

```bash
npm run new-week
```

This creates `content/weekly/YYYY-MM-DD.mdx` (Monday date). Fill in all 5 items.

### Item Fields

| Field | Description |
|-------|-------------|
| `id` | Format: `YYYY-MM-DD-item-N` |
| `slot` | 1–5 (each unique per week) |
| `title` | Article title (max 200 chars) |
| `source` | Publisher name (e.g., "MIT Technology Review") |
| `url` | Full `https://` URL |
| `bucket` | `models` / `business` / `regulation` / `tools` |
| `level` | `accessible` / `intermediate` / `technical` |
| `readingTimeMin` | Integer, 1–120 |
| `summary` | 2–3 sentence original summary (50–600 chars) |
| `dayHint` | `sunday` / `wednesday` / `friday` |
| `tags` | Optional array of lowercase, no-space tags |

### Featured Slot

Set `featuredSlot` (1–5) to control which item appears as "Top Story" on the home page.

---

## Career Pages

```bash
npm run new-career -- --title "Data Analyst" --category white-collar
```

Categories: `white-collar` | `creative` | `healthcare`

Threat levels: `low` | `moderate` | `significant` | `transformative`

### MDX Body

The body prose should cover:
- Detailed explanation of the threat level
- Day-to-day workflow changes
- Success stories of humans + AI working together

Use `<Accessible>` and `<Technical>` tags to wrap content for each reading mode:

```mdx
<Accessible>
Plain-language explanation here.
</Accessible>

<Technical>
Technical deep-dive here.
</Technical>
```

---

## Hub Articles

```bash
npm run new-article -- --title "My Article" --bucket tools --level accessible
```

Buckets: `models` | `business` | `regulation` | `tools`

- `keyTakeaways`: exactly 3 bullet points
- `sources`: at least 1 source with name + URL
- `relatedSlugs`: max 3, must be in the same bucket

---

## Validation

Before publishing, the build automatically validates all content:

```bash
npm run validate
```

Fix all errors before pushing. The build will fail if validation fails.

---

## EC-014 Note

If an article has `<Technical>` content but no `<Accessible>` content, the accessible view will render an empty body. This is valid — document it here so the creator knows it's intentional.
