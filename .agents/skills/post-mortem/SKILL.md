---
name: post-mortem
description: "Facilitate a blameless post-mortem for a serious incident, near-miss, or project-level retrospective. Invoke when a failure significant enough to warrant system-level learning has occurred, or when an entire project closes and needs a final retrospective."
---

> Originally authored for Agentic PM Kit (MIT).

## When to use

Use this skill when the learning surface is larger than a single sprint: a serious incident, a near-miss worth treating like one, or a project-level retrospective that spans months and supersedes the normal sprint cadence. This skill produces a blameless artifact in the Google SRE tradition. Typical triggers include:

- An incident that breached SLA, caused customer-visible impact, or triggered an escalation
- A near-miss whose impact was contained but whose mechanism was identical to an incident worth studying
- An entire project or program has closed and a multi-sprint retrospective is required
- A release shipped but produced outcomes materially worse than forecast
- An external event (audit finding, regulatory notice, customer escalation) requires a documented review

Do not invoke for sprint-level inspect-and-adapt sessions (use the `retrospective` skill), for single-defect root-cause analysis (use the `brainstorming-five-whys` skill), or to assign individual performance consequences (this skill is blameless by contract and refuses that framing).

## Summon the SME

Before facilitating, load the canonical blameless post-mortem reference to ground the session in established practice.

**Reading the config.** Check `.pm-kit.config.json` for the `sourcesMode` field:

- If `sourcesMode` is `"online"` (opt-in): fetch the URL stored at the key `sources.postMortem` in `vendor/pm-kit/sources-index.json` using your available web-fetch capability. Do not name a specific tool — use whatever your runtime provides. Ground the facilitation in what you read. Do not fabricate quotations or page numbers from any version of that page.
- If `sourcesMode` is `"offline"` or the field is absent (the default): rely on your general knowledge of the "Postmortem Culture: Learning from Failure" chapter of Google's *Site Reliability Engineering* book, edited by Betsy Beyer, Chris Jones, Jennifer Petoff, and Niall Richard Murphy. Cite the canonical URL from `vendor/pm-kit/sources-index.json` at key `sources.postMortem` in the output. Do not fabricate quotations or page numbers.

In both cases, the URL to cite is `https://sre.google/sre-book/postmortem-culture/`.

## Facilitation script

Walk the user through these steps in sequence. Do not skip steps or combine them.

**Step 1 — State the blameless posture.** Open the session by stating, verbatim: "This is a blameless post-mortem. We're here to make the system better, not to blame the people who operated it. Human error is a starting point for analysis, not an endpoint." Confirm the user and each attendee acknowledges this posture before any data is gathered. If a participant cannot accept the posture, pause the session and escalate to the facilitator's manager before continuing — a post-mortem held without a blameless contract will harm the team and produce shallow findings.

**Step 2 — Metadata.** Capture the incident or project name, the type (incident, near-miss, or project-level retrospective), severity if applicable, the date of the event, the date of the review, the facilitator, and the attendees. Note absences.

**Step 3 — Summary.** Draft a one-paragraph TL;DR readable by someone not on the incident call or project team. Name impact, duration, and outcome in plain language. Do not name individuals. Confirm the summary with attendees before proceeding.

**Step 4 — Timeline.** Walk chronologically from the earliest signal through detection, investigation, mitigation, and resolution. Use times (with timezone) for incidents and dated markers for project-level reviews. Capture what was observed, what action was taken, and what the observed effect was at each step.

**Step 5 — Impact.** Quantify who was affected, for how long, and what the user or business consequence was. Separate internal impact from external impact. If data is incomplete, record "data pending" and name an owner to fill it in — do not fabricate counts.

**Step 6 — Root cause analysis.** Apply the Five Whys pattern or an equivalent multi-layered analysis. **Reject "human error," "operator mistake," "developer oversight," and any equivalent as a terminal root cause.** If the causal chain reaches a person, ask the next why: why did the system, process, training, tooling, documentation, alerting, or incentive structure allow that person to make that error at that moment? Terminate only at a systemic cause the team can change.

**Step 7 — Contributing factors.** List conditions that made the outcome worse even if they are not the root cause: incomplete runbooks, missing alert thresholds, brittle dependencies, on-call rotation gaps, stale documentation, ambiguous ownership. These are the defenses that failed to trip.

**Step 8 — What went well and what could have gone better.** Capture the response's strengths first — detection, escalation, communication, rollback — so they are preserved. Then capture gaps, describing systems and conditions rather than individuals. Any bullet that names or implies a person must be rewritten.

**Step 9 — Action items.** Build the action-item table. Every row must have an Owner (role or team), a Category (Prevent / Detect / Mitigate), a Due date, a Success criteria, and a "Targets" column that cross-references a specific root cause or contributing factor from this document. Reject orphan actions — actions that address nothing named in the analysis — and reject rows with blank columns or "TBD."

**Step 10 — Follow-up commitments.** Record where the document will be published, who owns progress review on the action items, and when the team will reconvene to check progress. Publishing and reviewing are part of the blameless contract: a post-mortem that is not circulated and not followed up becomes theater.

**Step 11 — Output.** Produce the completed post-mortem using the structure in `TEMPLATE.md` (sibling file). Fill every section. Leave no placeholder unfilled.

**Step 12 — Save the artifact.** Save the filled artifact to `docs/pm-kit/outputs/<skill-name>/<short-slug>.md`. For this skill, `<skill-name>` is `post-mortem`. `<short-slug>` is a kebab-case ASCII slug (max 40 characters) derived from the incident date plus a short descriptor (e.g., `2026-04-20-payment-outage`) or, for a project-level review, the project identifier (e.g., `mvp-1-closure`). Confirm the final path with the user before writing. If the target file already exists, ask the user whether to overwrite, append a date suffix (e.g., `-2026-04-20`), or choose a different slug. The artifact must begin with the three-line provenance header below (preserved as HTML comments so they do not render):

```
<!-- Generated by agentic-pm-kit:post-mortem on YYYY-MM-DD -->
<!-- Languages: communication=<value>, output=<value> -->
<!-- Source mode: offline | online -->
```

This save-to-disk path and provenance-header pattern are the convention for every skill in the kit; only the skill name in the first comment changes per skill.

## Languages

The kit separates the language used for live agent–user dialogue from the language used in the saved artifact. Both values live in `.pm-kit.config.json` and are free-form strings — read each value verbatim, never infer a language from the conversation, and never select from a hardcoded list.

**Facilitation dialogue.** Speak to the user during facilitation in the language at `language.communication`. Use the string verbatim.

**Filled artifact (saved TEMPLATE.md output).** Produce the written artifact in the language at `language.output`. If `language.output` is absent or empty, fall back to `language.communication`.

Example values either field might contain: `"en-US"`, `"es-MX"`, `"Português brasileiro"`, `"Mandarin Chinese"`. Accept any string as given. This bifurcation is the normative pattern for every skill in the kit.

## Acceptance gate

When the post-mortem is complete, point the user to `CHECKLIST.md` (sibling file) and ask them to verify each item. Remind them that the output must be marked **PASS** or **FAIL**. On **FAIL**, invite the user to return with specific notes so the facilitation can be resumed or corrected.
