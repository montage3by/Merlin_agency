---
name: charter
description: "Draft a PMBOK-shaped project charter from a concept memo or product brief. Invoke when the user needs a charter for initiation-phase documentation."
---

> Originally authored for Agentic PM Kit (MIT).

## When to use

Use this skill when a sponsor is ready to formally authorize a project and needs a single document that names the work, grants authority, and sets the quality bar for every downstream planning artifact. Typical triggers include:

- A concept memo produced by a brainstorming lab run is ready to be converted into an authorized project
- A product brief is signed off and the sponsor requests formal initiation paperwork
- A steering committee requires a charter before budget release or resource allocation
- Initiation-phase documentation is being refreshed after a scope reset

Do not invoke for pre-initiation ideation (use a brainstorming skill), for detailed requirements (use the PRD skill), or to enumerate stakeholders beyond the naming level (use the stakeholder register skill afterward).

## Summon the SME

Before facilitating, load the canonical project-charter reference to ground the artifact in established practice.

**Reading the config.** Check `.pm-kit.config.json` for the `sourcesMode` field:

- If `sourcesMode` is `"online"` (opt-in): fetch the URL stored at the key `sources.charter` in `vendor/pm-kit/sources-index.json` using your available web-fetch capability. Do not name a specific tool — use whatever your runtime provides. Ground the facilitation in what you read. Do not fabricate quotations or page numbers from any version of that page.
- If `sourcesMode` is `"offline"` or the field is absent (the default): rely on your general knowledge of the project charter as described by the Project Management Institute in *The Standard for Project Management* and its 12 Project Management Principles. Cite the canonical URL from `vendor/pm-kit/sources-index.json` at key `sources.charter` in the output. Do not fabricate quotations or page numbers.

In both cases, the URL to cite is `https://www.pmi.org/-/media/pmi/documents/public/pdf/pmbok-standards/12-project-management-principles.pdf`.

## Facilitation script

Walk the user through these steps in sequence. Do not skip steps or combine them.

**Step 1 — Inputs and identification.** Ask the user which upstream inputs are available: a concept memo, a product brief, both, or neither. Read each input verbatim before drafting. Then capture the project title, a unique identifier (kebab-case ASCII), the named sponsor role, the document author, the version, and today's date.

**Step 2 — Strategic alignment and justification.** Ask the user which organizational goal, portfolio objective, or strategic theme this project advances. Then ask why the work must happen now. Capture both answers in full sentences — a charter that cannot answer "why now" is not ready for signature.

**Step 3 — Objectives and success metrics.** Ask the user for three to five high-level objectives. Reshape each into SMART form (Specific, Measurable, Achievable, Relevant, Time-bounded). Then ask for the quantitative success metrics the sponsor will use to declare the project a success. Confirm each metric has a numeric target and a measurement method.

**Step 4 — Scope boundaries.** Capture in-scope bullets and out-of-scope bullets. Prompt the user to be explicit about exclusions — charters that list only inclusions invite scope creep.

**Step 5 — Milestones, budget, constraints, and assumptions.** Capture the key phase-gate milestones with target dates. If any date is a placeholder, mark it with a trailing `(placeholder)` tag. Capture the high-level budget envelope as a range or ceiling, not a point estimate. List constraints (fixed deadlines, regulatory limits, resource ceilings) and assumptions (what must hold for the plan to survive) as separate bulleted lists.

**Step 6 — Preliminary risk summary.** Ask the user for the three risks most likely to threaten the project in its first quarter. For each, capture a one-line probability-impact characterization and a one-line mitigation. Exactly three entries — a fuller risk register is produced later by the risk-matrix skill.

**Step 7 — Key stakeholders and approvals.** Capture a short list of named role-level stakeholders (not individuals unless the sponsor prefers). Remind the user that the full stakeholder analysis is produced later by the stakeholder-register skill and supersedes this list. Then capture the approval signatures block: sponsor, project manager, and any additional approvers the sponsor requires.

**Step 8 — Output.** Produce the completed charter using the structure in `TEMPLATE.md` (sibling file). Fill every section. Leave no placeholder unfilled.

**Step 9 — Save the artifact.** Save the filled artifact to `docs/pm-kit/outputs/<skill-name>/<short-slug>.md`. For this skill, `<skill-name>` is `charter`. `<short-slug>` is a kebab-case ASCII slug (max 40 characters) derived from the project title (e.g., `bookswap-campus-v1`). Confirm the final path with the user before writing. If the target file already exists, ask the user whether to overwrite, append a date suffix (e.g., `-2026-04-21`), or choose a different slug. The artifact must begin with the three-line provenance header below (preserved as HTML comments so they do not render):

```
<!-- Generated by agentic-pm-kit:charter on YYYY-MM-DD -->
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

When the charter is complete, point the user to `CHECKLIST.md` (sibling file) and ask them to verify each item. Remind them that the output must be marked **PASS** or **FAIL**. On **FAIL**, invite the user to return with specific notes so the facilitation can be resumed or corrected.
