---
name: closure-report
description: "Produce a PMBOK-shaped project closure report suitable for sponsor signature, consolidating charter, final schedule, final budget, retrospectives, post-mortems, and stakeholder acceptance records. Invoke when the project has reached final deliverable acceptance and requires formal closure documentation."
---

> Originally authored for Agentic PM Kit (MIT).

## When to use

Use this skill when a project has reached the end of its execution phase and formal closure is required. Typical triggers include:

- All planned deliverables have been accepted by named stakeholders
- The sponsor or governance body has requested a formal closure record
- Lessons from sprint retrospectives and post-mortems need to be consolidated into a single organizational artifact
- The team is preparing to be reassigned and resources must be formally released
- The project record must be archived for audit, contractual, or institutional purposes

Do not invoke for individual sprint retrospectives or mid-project reviews; use `retrospective` or `post-mortem` for those. Invoke `closure-report` only when the entire project is being closed, not a single phase.

## Summon the SME

Before producing the report, load the canonical reference to ground the output in established closing-process-group practice.

**Reading the config.** Check `.pm-kit.config.json` for the `sourcesMode` field:

- If `sourcesMode` is `"online"` (opt-in): fetch the URL stored at the key `sources.closureReport` in `vendor/pm-kit/sources-index.json` using your available web-fetch capability. Do not name a specific tool — use whatever your runtime provides. Ground the report structure in what you read. Do not fabricate quotations or page numbers.
- If `sourcesMode` is `"offline"` or the field is absent (the default): rely on your general knowledge of the project closing process group as described in widely recognized project management literature. Cite the canonical URL from `vendor/pm-kit/sources-index.json` at key `sources.closureReport` in the output. Do not fabricate quotations or page numbers.

In both cases, the URL to cite is `https://en.wikipedia.org/wiki/Project_management`.

## Facilitation script

Walk the user through these steps in sequence. Do not skip steps or combine them.

**Step 1 — Gather source documents.** Ask the user to provide or confirm access to: the approved project charter, the final schedule (planned vs. actual), the final budget summary, all approved scope-change records, stakeholder acceptance records (signed or dated), and any retrospective or post-mortem notes. If any item is missing, ask whether to proceed with available information and note the gap in the report.

**Step 2 — Project identity and metadata.** Collect the project name, project ID, sponsor name, PM name, and the intended closure date. Confirm all names are the actual names of individuals, not role labels.

**Step 3 — Executive summary.** Ask the user to characterize the overall outcome in one paragraph: was the project successful? What was delivered? What is the single most important lesson? Draft the paragraph and confirm it with the user before proceeding.

**Step 4 — Deliverables and acceptance.** For each planned deliverable, record the acceptance date and the name of the stakeholder who accepted it. Note any outstanding issues against that deliverable. Remind the user that "Accepted by" must name a person, not a department or role.

**Step 5 — Objectives, schedule, and budget performance.** Pull each objective from the charter and record the actual result versus the target. Record planned end date versus actual end date and planned budget versus actual spend. For any material variance, ask the user to provide a brief causal explanation; for negligible variance, note it is within acceptable tolerance.

**Step 6 — Scope changes and lessons learned.** Record all formally approved scope changes (ID, description, approver, date, impact). Then consolidate lessons learned from retrospective and post-mortem notes, grouped into four themes: process, technical, organizational, and stakeholder.

**Step 7 — Outstanding items and resource release.** Record any deferred, transferred, or cancelled items with disposition and owner. Document how each team member is being reassigned and the planned decommission date for any equipment, infrastructure, or licenses.

**Step 8 — Archival locations.** Confirm where all project artifacts will be stored long-term. Record the path or URL for each artifact set and the applicable retention period.

**Step 9 — Formal acceptance block.** Confirm the sponsor's and PM's full names. Remind the user that the sign-off block requires physical or electronic signatures before the report is considered formally executed.

**Step 10 — Save the artifact.** Save the filled artifact to `docs/pm-kit/outputs/closure-report/<short-slug>.md`. `<short-slug>` is a kebab-case ASCII slug (max 40 characters) derived from the project name (e.g., `bookswap-campus`). Confirm the final path with the user before writing. If the file exists, ask: overwrite, append a date suffix (e.g., `-2026-04-20`), or pick a new slug. The artifact must begin with the three-line provenance header below (HTML comments, do not render):

```
<!-- Generated by agentic-pm-kit:closure-report on YYYY-MM-DD -->
<!-- Languages: communication=<value>, output=<value> -->
<!-- Source mode: offline | online -->
```

## Languages

The kit separates the language used for live agent–user dialogue from the language used in the saved artifact. Both values live in `.pm-kit.config.json` and are free-form strings — read each value verbatim, never infer a language from the conversation, and never select from a hardcoded list.

**Facilitation dialogue.** Speak to the user during facilitation in the language at `language.communication`. Use the string verbatim.

**Filled artifact (saved TEMPLATE.md output).** Produce the written artifact in the language at `language.output`. If `language.output` is absent or empty, fall back to `language.communication`.

Example values either field might contain: `"en-US"`, `"es-MX"`, `"Português brasileiro"`, `"Mandarin Chinese"`. Accept any string as given. This bifurcation is the normative pattern for every skill in the kit.

## Acceptance gate

When the report is complete, point the user to `CHECKLIST.md` (sibling file) and ask them to verify each item. Remind them that the output must be marked **PASS** or **FAIL**. On **FAIL**, invite the user to return with specific notes so the report can be corrected before sponsor signature.
