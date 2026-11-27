---
name: cost-estimation
description: "Teach the team three complementary estimation techniques — Planning Poker, T-shirt sizing, and three-point (PERT) — and record the estimates the team produces for their own items. This is a human-led skill: the agent teaches and facilitates; the team estimates. Invoke when the team needs to estimate stories, epics, or tasks and wants a shared technique, or when an estimate is required for a planning gate."
---

> Originally authored for Agentic PM Kit (MIT).

## When to use

Use this skill when the team needs to estimate a set of backlog items together and would benefit from a taught technique plus a recorded aggregate. Typical triggers include:

- The backlog contains user stories that have not been sized and sprint planning is imminent
- Epics or features need a rough size before committing to a release date
- A task is novel or uncertain and a probabilistic estimate would support better scheduling
- A planning gate requires a documented total estimate with a confidence range

Do not invoke this skill for estimates the agent is expected to produce alone; the team performs the estimation. The agent teaches, facilitates, asks the questions, and records — it does not fabricate numbers on the team's behalf.

## Summon the SME

Before facilitating, load the canonical reference so the techniques and formulas taught match established practice.

**Reading the config.** Check `.pm-kit.config.json` for the `sourcesMode` field:

- If `sourcesMode` is `"online"` (opt-in): fetch the URL stored at the key `sources.costEstimation` in `vendor/pm-kit/sources-index.json` using your available web-fetch capability. Do not name a specific tool — use whatever your runtime provides. Ground the teaching in what you read. Do not fabricate quotations or page numbers.
- If `sourcesMode` is `"offline"` or the field is absent (the default): rely on your general knowledge of three-point estimation (PERT), Planning Poker with the Fibonacci sequence, and T-shirt sizing as community-standard agile estimation practices. Cite the canonical URL from `vendor/pm-kit/sources-index.json` at key `sources.costEstimation` in the output. Do not fabricate quotations or page numbers.

In both cases, the URL to cite is `https://en.wikipedia.org/wiki/Three-point_estimation`.

## Facilitation script

Walk the user through these steps in sequence. Do not skip steps or combine them. The team performs every estimate; the agent teaches, asks, and records.

**Step 1 — List the items.** Ask the user to list the stories, epics, or tasks to be estimated. Confirm the scope with the user before proceeding.

**Step 2 — Teach Planning Poker.** Explain that Planning Poker is used to estimate individual user stories with team agreement. Each estimator picks a card from the Fibonacci sequence `1, 2, 3, 5, 8, 13, 21` representing relative size. All cards are revealed simultaneously. If the estimates diverge, the highest and lowest estimators explain their reasoning, the team discusses, and the round is repeated until convergence. Worked example (illustrative only): for a "registration screen" story, one estimator might play 3 and another 8; after discussing hidden CAPTCHA work, the team converges on 5.

**Step 3 — Teach T-shirt sizing.** Explain that T-shirt sizing is used for epic- or feature-level items when numeric precision is not yet warranted. Sizes are **S**, **M**, **L**, **XL**. Worked example (illustrative only): an "email notifications" epic might be **M** (well-understood, one integration), while a "multi-tenant authentication" epic might be **XL** (new architecture, spans several sprints).

**Step 4 — Teach three-point (PERT) estimation.** Explain that three-point estimation is used for individual tasks where a probabilistic estimate is wanted. For each task, the team produces three values:

- **O** — optimistic estimate (best case)
- **M** — most likely estimate
- **P** — pessimistic estimate (worst case)

The expected value is `E = (O + 4M + P) / 6` and the standard deviation is `SD = (P − O) / 6`. Worked example (illustrative only): for a "data migration script" task, the team gives O = 2 days, M = 5 days, P = 14 days, yielding E = 6 days and SD = 2 days.

**Step 5 — Select technique per item.** For each item in the list from Step 1, ask the user (or the team present) which technique fits: Planning Poker for stories needing team agreement, T-shirt for epics where precision is premature, three-point for tasks where uncertainty warrants a probabilistic range. Combinations are allowed — a feature can be T-shirted, then its stories Planning-Pokered later.

**Step 6 — Facilitate estimation per item.** For each item, walk the team through the chosen technique as taught in Steps 2–4. Record only the value the team produces. Do not supply the estimate yourself. If the team is uncertain or disagrees, capture confidence as **H / M / L** and note the disagreement.

**Step 7 — Aggregate.** Sum the estimates into a total. For three-point items, aggregate variance by summing the per-item variances (variance = SD²) and taking the square root of the sum to produce the aggregate standard deviation. Report the expected total and an 80% confidence interval (approximately expected ± 1.28 × aggregate SD for a normal approximation). For Planning Poker and T-shirt items, report the sum and a qualitative confidence label.

**Step 8 — Document assumptions.** Ask the team what was deliberately excluded from scope or assumed as given (e.g., "assumes no changes to the authentication library", "excludes migration of legacy data"). Record these separately from the estimates.

**Step 9 — Output.** Produce the completed estimate using the structure in `TEMPLATE.md` (sibling file). Fill every section. Leave no placeholder unfilled.

**Step 10 — Save the artifact.** Save the filled artifact to `docs/pm-kit/outputs/cost-estimation/<short-slug>.md`. `<short-slug>` is a kebab-case ASCII slug (max 40 characters) derived from the scope being estimated (e.g., `sprint-12-backlog` or `payment-epic-estimate`). Confirm the final path with the user before writing. If the target file already exists, ask the user whether to overwrite, append a date suffix (e.g., `-2026-04-20`), or choose a different slug. The artifact must begin with the three-line provenance header below (preserved as HTML comments so they do not render):

```
<!-- Generated by agentic-pm-kit:cost-estimation on YYYY-MM-DD -->
<!-- Languages: communication=<value>, output=<value> -->
<!-- Source mode: offline | online -->
```

## Languages

The kit separates the language used for live agent–user dialogue from the language used in the saved artifact. Both values live in `.pm-kit.config.json` and are free-form strings — read each value verbatim, never infer a language from the conversation, and never select from a hardcoded list.

**Facilitation dialogue.** Speak to the user during facilitation in the language at `language.communication`. Use the string verbatim.

**Filled artifact (saved TEMPLATE.md output).** Produce the written artifact in the language at `language.output`. If `language.output` is absent or empty, fall back to `language.communication`.

Example values either field might contain: `"en-US"`, `"es-MX"`, `"Português brasileiro"`, `"Mandarin Chinese"`. Accept any string as given. This bifurcation is the normative pattern for every skill in the kit.

## Acceptance gate

When the estimate is complete, point the user to `CHECKLIST.md` (sibling file) and ask them to verify each item. Remind them that the output must be marked **PASS** or **FAIL**. On **FAIL**, invite the user to return with specific notes so the facilitation can be resumed or corrected.
