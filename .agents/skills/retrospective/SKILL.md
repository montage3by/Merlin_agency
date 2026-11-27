---
name: retrospective
description: "Facilitate a sprint or iteration retrospective that surfaces real learnings and produces owned, dated action items. Invoke when a sprint or iteration has closed and the team needs a structured inspect-and-adapt session."
---

> Adapted from bmad-method:bmad-retrospective (MIT, © 2025 BMad Code, LLC). See THIRD_PARTY_NOTICES.md.

## When to use

Use this skill when a sprint or iteration has closed and the team needs a structured inspect-and-adapt session focused on the next sprint — not a distant post-mortem of a serious incident, and not a year-end project wrap. Typical triggers include:

- A sprint has ended and the team is about to plan the next one
- A release or feature drop is complete and the team wants to adjust before the next cycle
- Recurring impediments suggest the team's working agreements need revisiting
- A new team member has joined and a reset on norms is due

The default lens for this skill is **Start / Stop / Continue**, which maps to the three "what" sections of the artifact. Acceptable alternative lenses — **Glad / Sad / Mad**, **4Ls (Liked / Learned / Lacked / Longed-for)**, or **Sailboat (Wind / Anchor / Rocks / Island)** — may be substituted if the team prefers; record the choice in the metadata header.

Do not invoke for serious incidents or post-incident analysis (use the `post-mortem` skill), and do not invoke for project-level closure retrospectives that span multiple sprints (also `post-mortem`).

## Summon the SME

Before facilitating, load the canonical retrospective reference to ground the session in established practice.

**Reading the config.** Check `.pm-kit.config.json` for the `sourcesMode` field:

- If `sourcesMode` is `"online"` (opt-in): fetch the URL stored at the key `sources.retrospective` in `vendor/pm-kit/sources-index.json` using your available web-fetch capability. Do not name a specific tool — use whatever your runtime provides. Ground the facilitation in what you read. Do not fabricate quotations or page numbers from any version of that page.
- If `sourcesMode` is `"offline"` or the field is absent (the default): rely on your general knowledge of the Sprint Retrospective event as defined in the Scrum Guide by Ken Schwaber and Jeff Sutherland. Cite the canonical URL from `vendor/pm-kit/sources-index.json` at key `sources.retrospective` in the output. Do not fabricate quotations or page numbers.

In both cases, the URL to cite is `https://scrumguides.org/scrum-guide.html`.

## Facilitation script

Walk the user through these steps in sequence. Do not skip steps or combine them.

**Step 1 — Frame the session.** Open by stating: "This retrospective exists to improve the next sprint, not to evaluate individuals. Describe systems, processes, and conditions — not the people who operated them." Confirm the user acknowledges the frame before collecting any content.

**Step 2 — Metadata and context.** Capture the sprint or iteration identifier, the date, the facilitator, and the attendees (note absences). Ask the user which lens to use; default to Start / Stop / Continue if no preference is given. Record the choice. Then ask what the sprint goal was and whether it was achieved in full, partially, or not at all.

**Step 3 — What went well.** Ask for specific examples the team wants to continue. Reject generalities ("good collaboration") by prompting for the specific event or artifact that demonstrates the behavior.

**Step 4 — What didn't go well.** Ask for specific examples the team wants to stop or change. If a bullet names or implies an individual, rewrite it to describe the system, process, or condition. Reject bullets that are restatements of a "what went well" item with a minus sign.

**Step 5 — Psychological-safety probe.** If participation thins, silence persists, or attendees hedge, offer the anonymously-phrased prompt: "What is one thing you would raise if attribution were removed?" Capture answers in the artifact without attribution. Retrospectives fail when they become performative; treat silence as a signal, not consent.

**Step 6 — What we learned.** Ask for new insights surfaced during the sprint — observations that may not require a Stop or Start but are worth preserving. These feed the team's institutional memory.

**Step 7 — Action items.** Convert the "didn't go well" and "learned" bullets into a table of actions. Every row must have an Owner (role or team), a Due date (calendar date or target sprint), and a Success criteria that states how the team will know the action is complete. Reject rows that leave any column blank, assign the whole team as owner, or use "TBD" as a placeholder.

**Step 8 — Follow-up from previous retro.** Ask whether a previous retrospective exists. If yes, read each prior action item and record the disposition as Resolved, In progress, or Dropped (with rationale). If no, record the single line `First retrospective — no prior items.` in that section.

**Step 9 — Output.** Produce the completed retrospective using the structure in `TEMPLATE.md` (sibling file). Fill every section. Leave no placeholder unfilled.

**Step 10 — Save the artifact.** Save the filled artifact to `docs/pm-kit/outputs/<skill-name>/<short-slug>.md`. For this skill, `<skill-name>` is `retrospective`. `<short-slug>` is a kebab-case ASCII slug (max 40 characters) derived from the sprint or iteration identifier (e.g., `sprint-23`, `2026-04-iter-3`). Confirm the final path with the user before writing. If the target file already exists, ask the user whether to overwrite, append a date suffix (e.g., `-2026-04-20`), or choose a different slug. The artifact must begin with the three-line provenance header below (preserved as HTML comments so they do not render):

```
<!-- Generated by agentic-pm-kit:retrospective on YYYY-MM-DD -->
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

When the retrospective is complete, point the user to `CHECKLIST.md` (sibling file) and ask them to verify each item. Remind them that the output must be marked **PASS** or **FAIL**. On **FAIL**, invite the user to return with specific notes so the facilitation can be resumed or corrected.
