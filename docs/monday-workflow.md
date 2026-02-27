# Monday Workflow — Publishing This Week in AI

## Step 1: Scaffold the new file

Open a terminal in the project root and run:

```bash
npm run new-week
```

This creates `content/weekly/YYYY-MM-DD.mdx` with today's Monday date and empty placeholders.

---

## Step 2: Find 5 articles

Look for recent AI articles (published in the last 7 days) across these categories:

| Bucket | What belongs here |
|---|---|
| `business` | AI adoption, enterprise tools, workforce impact |
| `models` | New model releases, benchmarks, research |
| `tools` | Practical AI tools, product launches, workflows |
| `regulation` | Policy, legislation, ethics, safety |

Good sources: MIT Technology Review, The Verge, Wired, Ars Technica, The Gradient, Ben's Bites, Stratechery, Brookings, Stanford HAI.

Aim for a mix: 1–2 accessible explainers, 1–2 business/impact pieces, 1 more technical piece.

---

## Step 3: Fill in the file

Open the new MDX file and replace every `<!-- TODO -->` with real content.

### Fields to fill in for each of the 5 items:

```yaml
title: 'The exact article headline'
source: 'Publication name'          # e.g. MIT Technology Review
url: 'https://...'                  # the real link — double check it works
bucket: 'business'                  # models | business | regulation | tools
level: 'accessible'                 # accessible | intermediate | technical
readingTimeMin: 8                   # rough estimate in minutes
dayHint: 'sunday'                   # sunday | wednesday | friday (just a soft suggestion)
summary: >
  Your 2–3 sentence take on the article. This is the value-add —
  explain what it covers and why it matters to someone who hasn't read it yet.
tags: ['enterprise', 'llm']         # optional, lowercase, 1–3 tags
```

### Level guide:
- `accessible` — no technical background needed
- `intermediate` — some familiarity with AI concepts
- `technical` — assumes engineering or research background

### Day hint guide (loose):
- `sunday` — good longer read for the weekend
- `wednesday` — midweek, medium length
- `friday` — either a quick read or something to sit with over the weekend

---

## Step 4: Fill in the bonus reads (optional)

At the bottom of the file, fill in 2–3 `bonusItems` — these appear in a "Going Deeper" section without checkboxes, for readers who want more.

```yaml
bonusItems:
  - title: 'Article title'
    source: 'Publication'
    url: 'https://...'
    why: 'One sentence on why it's worth reading.'
```

These can be evergreen resources, longer reads, videos, or papers — not just this week's news.

---

## Step 5: Save and verify locally

With the dev server running (`npm run dev`), visit [http://localhost:3000/weekly](http://localhost:3000/weekly) and confirm:
- All 5 articles appear
- Links open correctly (no 404s)
- The "Going Deeper" section shows at the bottom

---

## Step 6: Deploy

Push the new file to your main branch. Vercel will deploy automatically.

If the site is already live and was showing last week's list, it will update within the hour (the page has a 1-hour cache).

---

## Quick checklist

- [ ] Ran `npm run new-week`
- [ ] All 5 articles have real, working URLs
- [ ] Each summary is original (not copy-pasted from the article)
- [ ] Mix of buckets covered (not all `models`, not all `business`)
- [ ] Bonus reads filled in
- [ ] Checked locally at `/weekly`
- [ ] Pushed to main
