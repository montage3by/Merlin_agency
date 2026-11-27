# Blameless Post-Mortem — Acceptance Checklist

## Content

- [ ] The blameless-posture line appears at the top of the artifact, verbatim, and no section of the document names or blames an individual.
- [ ] The metadata header records type (incident / near-miss / project-level), severity if applicable, date of event, date of review, facilitator, and attendees.
- [ ] The Summary is one paragraph readable by someone not in the incident or project, and it names impact, duration, and outcome in plain language.
- [ ] The Timeline is chronological and covers detection, investigation, mitigation, and resolution (or the project-level equivalent) with times or dated markers.
- [ ] The Impact section quantifies affected users or stakeholders, duration, and user or business consequence where data permits.
- [ ] The Root cause analysis is multi-layered (at least three "why" steps) and the terminal root cause is systemic — process, tooling, documentation, alerting, or incentives. "Human error," "operator mistake," or "developer oversight" is not accepted as a terminal root cause.
- [ ] Contributing factors are listed separately from the root cause; none of them is framed as individual fault.

## Action items

- [ ] Every Action items row has a non-empty Owner, Category (Prevent / Detect / Mitigate), Due date, and Success criteria — no orphan actions, no TBDs.
- [ ] Every action item's "Targets" column cross-references a specific root cause or contributing factor listed in the document; no orphan actions that address nothing in the analysis.

## Follow-up and sourcing

- [ ] The Follow-up commitments section names where the document will be published, who reviews progress, and when.
- [ ] The output cites the canonical post-mortem reference URL (`https://sre.google/sre-book/postmortem-culture/`) in the Source consulted section.
- [ ] The Source consulted section records which mode was used (offline or online) and does not include fabricated quotations or page numbers.
- [ ] The facilitation dialogue is in the language at `language.communication`, and the saved artifact is in the language at `language.output` (falling back to `language.communication` if `language.output` is absent or empty).
- [ ] The artifact is saved to `docs/pm-kit/outputs/post-mortem/<slug>.md` and begins with the three-line provenance header.

> Mark **PASS** or **FAIL**. On **FAIL**, return to the skill with notes.
