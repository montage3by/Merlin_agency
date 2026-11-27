---
name: risk-matrix
description: "Produce a probability × impact risk matrix with PMBOK-style response strategies, derived from a project charter and optional stakeholder register or schedule. Invoke when the team needs a structured risk register before a planning gate, milestone review, or go/no-go decision."
---

> Originally authored for Agentic PM Kit (MIT).

## When to use

Use this skill when the team needs to identify, score, and plan responses to project risks in a single, auditable artifact. Typical triggers include:

- A planning gate or milestone review requires a formal risk register before approval
- The project charter is signed and the team must now surface risks before execution begins
- An existing risk list is stale, unranked, or contains only obvious threats and needs an adversarial refresh
- A sponsor or auditor has asked for a probability × impact view with explicit response strategies per risk

Do not invoke for diagnosing the root cause of an incident that has already occurred (use a root-cause analysis skill) or for generic ideation without a project context.

## Summon the SME

Before facilitating, load the canonical risk-matrix reference to ground the scoring and zoning approach in established practice.

**Reading the config.** Check `.pm-kit.config.json` for the `sourcesMode` field:

- If `sourcesMode` is `"online"` (opt-in): fetch the URL stored at the key `sources.riskMatrix` in `vendor/pm-kit/sources-index.json` using your available web-fetch capability. Do not name a specific tool — use whatever your runtime provides. Ground the facilitation in what you read. Do not fabricate quotations or page numbers.
- If `sourcesMode` is `"offline"` or the field is absent (the default): rely on your general knowledge of the risk matrix as a probability × impact scoring tool and on PMBOK's four standard risk response strategies — avoid, mitigate, transfer, accept. Cite the canonical URL from `vendor/pm-kit/sources-index.json` at key `sources.riskMatrix` in the output. Do not fabricate quotations or page numbers.

In both cases, the URL to cite is `https://en.wikipedia.org/wiki/Risk_matrix`.

## Facilitation script

Walk the user through these steps in sequence. Do not skip steps or combine them.

**Step 1 — Load the inputs.** Ask the user for the project charter and, if available, the stakeholder register and schedule. Confirm which inputs are present; continue with charter alone if the others are not yet produced.

**Step 2 — Invert the goal to surface failure modes.** Restate the project's success criteria as their opposite and ask: "What actions, decisions, inactions, or conditions would guarantee that this project fails or overruns?" Generate at least eight failure modes without filtering.

**Step 3 — Stress-test across categories.** Iterate across four categories and ask what could disrupt the plan in each: **technical** (architecture, integration, unknowns), **external** (vendors, regulatory, market), **organizational** (staffing, sponsorship, funding), and **project management** (scope, schedule, estimation). Add any new failure variables the inversion step did not produce.

**Step 4 — Consolidate into candidate risks.** Merge duplicates from Steps 2 and 3 into a single list of candidate risks. Rewrite each as a risk statement in the form: "If `<cause>` occurs, then `<effect>` may impact `<objective>`."

**Step 5 — Score probability and impact.** For each candidate risk, ask the team to score probability on a 1–5 scale (1 = rare, 5 = almost certain) and impact on a 1–5 scale (1 = negligible, 5 = catastrophic). Compute the risk score as `probability × impact`. Record each score with the rationale in one short sentence.

**Step 6 — Assign a response strategy.** For each risk, assign one of the four PMBOK response strategies: **avoid** (eliminate the cause), **mitigate** (reduce probability or impact), **transfer** (shift ownership, e.g., insurance or contract), or **accept** (document and monitor). The chosen strategy must be consistent with the risk's score and zone.

**Step 7 — Plot the matrix.** Place each risk by ID onto a 5 × 5 grid: rows are probability (5 at top, 1 at bottom), columns are impact (1 at left, 5 at right). Apply zoning: **green** for score 1–6 (accept or monitor), **yellow** for 7–14 (mitigate or transfer), **red** for 15–25 (avoid, transfer, or escalate).

**Step 8 — Extract the top-5 focus list.** Select the five highest-scoring risks (or any with score ≥ 15 if fewer than five cross that threshold). For each, write a concrete response plan: specific actions, owner, trigger conditions that would activate the plan, and target resolution date.

**Step 9 — Summarize the risk trend.** Write a short narrative stating whether the overall risk posture is increasing, stable, or decreasing relative to the previous review (or "baseline" if this is the first matrix) and why.

**Step 10 — Output.** Produce the completed analysis using the structure in `TEMPLATE.md` (sibling file). Fill every section. Leave no placeholder unfilled.

**Step 11 — Save the artifact.** Save the filled artifact to `docs/pm-kit/outputs/risk-matrix/<short-slug>.md`. `<short-slug>` is a kebab-case ASCII slug (max 40 characters) derived from the project name (e.g., `bookswap-campus-v1`). Confirm the final path with the user before writing. If the target file already exists, ask the user whether to overwrite, append a date suffix (e.g., `-2026-04-20`), or choose a different slug. The artifact must begin with the three-line provenance header below (preserved as HTML comments so they do not render):

```
<!-- Generated by agentic-pm-kit:risk-matrix on YYYY-MM-DD -->
<!-- Languages: communication=<value>, output=<value> -->
<!-- Source mode: offline | online -->
```

## Languages

The kit separates the language used for live agent–user dialogue from the language used in the saved artifact. Both values live in `.pm-kit.config.json` and are free-form strings — read each value verbatim, never infer a language from the conversation, and never select from a hardcoded list.

**Facilitation dialogue.** Speak to the user during facilitation in the language at `language.communication`. Use the string verbatim.

**Filled artifact (saved TEMPLATE.md output).** Produce the written artifact in the language at `language.output`. If `language.output` is absent or empty, fall back to `language.communication`.

Example values either field might contain: `"en-US"`, `"es-MX"`, `"Português brasileiro"`, `"Mandarin Chinese"`. Accept any string as given. This bifurcation is the normative pattern for every skill in the kit.

## Acceptance gate

When the matrix is complete, point the user to `CHECKLIST.md` (sibling file) and ask them to verify each item. Remind them that the output must be marked **PASS** or **FAIL**. On **FAIL**, invite the user to return with specific notes so the facilitation can be resumed or corrected.
