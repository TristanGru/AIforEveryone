# Hub Article Spec: Claude, Explained

**Date:** 2026-03-30
**Bucket:** `models`
**Level:** `accessible`
**Slug:** `claude-explained`
**Title:** "Claude, Explained: Haiku, Sonnet, Opus, and What's Coming Next"
**Estimated reading time:** 7–9 min (~1,750–2,250 words)
**Per-section word budgets:** Opening ~200 | Past ~250 | Present ~900 | Future ~400 | Closing ~100
**Citation style:** Inline hyperlinks on first mention of a source; "Sources" MDX block at the end of the article listing all references.

---

## Frontmatter

```yaml
slug: claude-explained
bucket: models
title: "Claude, Explained: Haiku, Sonnet, Opus, and What's Coming Next"
level: accessible
readingTimeMin: 8
excerpt: >
  Anthropic's Claude comes in multiple tiers — Haiku, Sonnet, and Opus — each
  built for different tasks and budgets. Here's a plain-English rundown of every
  model, how to access Claude, and what's coming next.
keyTakeaways:
  - Claude comes in three tiers — Haiku, Sonnet, and Opus — optimized for different tasks and budgets, not just ranked by quality
  - You can use Claude through a free web app, a paid subscription, or — if you're a developer — directly inside your code editor; the right access point depends on what you're trying to do
  - A new model called Claude Mythos recently leaked; Anthropic confirmed it exists and is in early testing, but has not announced a release date
publishedAt: "2026-03-30"
lastReviewed: "2026-03-30"
tags:
  - anthropic
  - claude
  - ai-models
  - llm
  - haiku
  - sonnet
  - opus
```

---

## Article Structure

### 1. Opening — What is Claude, and who is Anthropic?

2–3 short paragraphs covering:
- Anthropic: AI safety company founded in 2021 by former OpenAI researchers (including Dario and Daniela Amodei). Their core thesis is that the most capable AI labs should also be the most safety-focused.
- Claude: Anthropic's flagship AI model, first released in 2023. Named after Claude Shannon (the father of information theory).
- What makes Claude distinct: known for nuanced, natural writing quality and a strong emphasis on being helpful without being harmful. Used by individuals, businesses, and developers worldwide.

**Tone note:** Brief and factual. Not a history lesson — just enough context for a reader who's heard of Claude but doesn't know the backstory.

---

### 2. The Past — Claude 3

One section, relatively brief. Purpose: establish the Haiku/Sonnet/Opus naming system and why it exists, so readers understand the logic before diving into Claude 4.

- Anthropic introduced the three-tier naming convention with Claude 3 in early 2024.
- **Haiku:** Fast, lightweight, built for high-volume or speed-sensitive tasks.
- **Sonnet:** The balanced middle tier — capable enough for most professional tasks, faster and cheaper than Opus.
- **Opus:** The most capable model in the family, for complex, demanding work.
- Claude 3 was a landmark release and widely praised. It has largely been superseded by Claude 4 but remains in use.
- **Important:** Acknowledge that intermediate releases (Claude 3.5, Claude 3.7) exist between Claude 3 and Claude 4 — briefly note them so the article doesn't appear to have a gap — but do not deep-dive them. One sentence is sufficient (e.g., "Anthropic released several incremental updates — Claude 3.5 and 3.7 — before the Claude 4 family arrived").

**Tone note:** Respectful of the history, not dismissive. One paragraph per tier is enough.

---

### 3. The Present — Claude 4 (main event)

The bulk of the article. Three model subsections, each with a "who this is for" callout, followed by an access methods section.

#### Haiku 4.5
- Fastest and cheapest model in the Claude 4 family.
- 200k token context window.
- Best for: high-volume tasks, quick Q&A, simple classification, customer-facing chatbots, any situation where speed matters more than maximum reasoning depth.
- **Who this is for:** Developers building products that need to handle many requests cheaply and quickly. Not the right choice for nuanced, complex tasks.

#### Sonnet 4.6
- The recommended default for most users and use cases.
- First Sonnet model to outperform the previous generation's Opus on coding benchmarks.
- 1M token context window (enough to process a very large document or codebase in one go).
- Best for: professional writing, coding assistance, document analysis, research summaries, most everyday AI tasks.
- **Who this is for:** Anyone — professionals, students, developers — who wants a capable, fast AI without paying top-tier prices. This is the model most people are using when they use Claude.

#### Opus 4.6
- The most capable model in the Claude 4 family.
- 1M token context window, largest maximum output (128k tokens — enough for a very long document or report).
- Supports Extended Thinking and Adaptive Thinking — modes where the model works through its reasoning step by step before answering, rather than responding immediately. Explain this plainly; do not use the technical terms as standalone labels.
- Dramatically cheaper than its predecessor (Opus 4.1 cost $15/$75 per million tokens; Opus 4.6 costs $5/$25 — a 67% price cut).
- Best for: complex agentic workflows, deep research, advanced coding tasks, situations where accuracy and reasoning depth matter more than speed or cost.
- **Who this is for:** Power users and developers tackling genuinely hard problems. Overkill for everyday tasks, but worth it when the work demands it.

#### How you access Claude

Four access points, each explained briefly. Also mention here that Sonnet and Opus support image and document (PDF) inputs — this is a practically useful feature for non-technical professionals (e.g., uploading a contract, a chart, or a report).

**Tone note:** Factual and neutral. Resist marketing puffery, especially around paid tier upsells.

- **Claude.ai** — The consumer web app. Free tier available with usage limits; Pro ($20/mo) for higher limits and Opus access; Team tier for organizations. The easiest starting point for anyone.
- **Claude API** — For developers who want to build Claude into their own products or workflows. Pay per use based on model and token volume.
- **Claude Code** — An AI coding assistant available as a command-line tool and IDE extension (VS Code, JetBrains). Built for developers who want Claude integrated directly into their coding environment.
- **Claude Cowork** *(research preview)* — A desktop assistant that can create and edit files locally, with domain-specific plugins for legal, finance, HR, and engineering. **Writer instruction:** Include a clear caveat that this is early-access and not available to most users yet — don't present it as a product readers can simply go download.

---

### 4. The Future — What's coming

#### Legacy and deprecations
- Claude 3 Haiku is being retired on **April 19, 2026**. Users on that model need to migrate to Haiku 4.5.
- Other Claude 3 and early Claude 4 models remain available but are not recommended for new projects.

#### Claude Mythos (the leak)
- In late March 2026, a configuration error in Anthropic's CMS exposed roughly 3,000 unpublished internal assets — including references to a model called **Claude Mythos** (also referenced internally as "Capybara").
- **What Anthropic confirmed:** The model exists and is in early-access testing. It represents a significant step up in capability above Opus.
- **What the leak suggested:** Dramatically higher benchmark scores on coding, academic reasoning, and cybersecurity tasks. Anthropic has flagged serious cybersecurity risk concerns as a reason for a careful, controlled rollout.
- **What this means:** Anthropic is already working on a tier beyond Opus. The fact that they're publicly cautious about release — citing safety rather than readiness — signals that the capability jump is real and significant. No public release date has been announced.

**Tone note:** Report confirmed facts clearly. Speculation is limited to the implications of what Anthropic has already said (e.g., caution about safety concerns suggests the capabilities are genuinely powerful). Do not sensationalize.

---

## Key Decisions

| Decision | Rationale |
|---|---|
| Claude-only scope | Cross-company comparison is a different, larger article |
| Tier-first structure | Most logical for a reference piece; scannable |
| Past → Present → Future arc | Gives the piece narrative momentum without sacrificing clarity |
| Light speculation on Mythos | Report confirmed facts + what they imply; don't embellish |
| No central analogy | Readers don't need hand-holding; plain clear explanation is more respectful |
| Accessible level | Audience is non-technical professionals; jargon-free throughout |

---

### 5. Closing (~100 words)

A brief, forward-looking close. Acknowledge that the Claude model landscape is moving fast — what's current today may look different in six months. Point readers toward the article's `lastReviewed` date as a freshness signal. Optional: soft CTA to subscribe to the weekly newsletter for ongoing updates. Do not oversell.

---

## Sources to cite

- Anthropic models overview (platform.claude.com/docs)
- Anthropic pricing page
- Fortune / SiliconANGLE coverage of the Mythos leak (March 26–27, 2026)
- Haiku 3 deprecation notice
