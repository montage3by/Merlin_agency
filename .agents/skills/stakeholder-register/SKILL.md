---
name: stakeholder-register
description: "Identify, classify, and document project stakeholders by running a structured brainstorming strategy against the project charter, then emit a complete stakeholder register. Invoke when initiating a project or whenever the stakeholder landscape needs a systematic refresh."
---

> Originally authored for Agentic PM Kit (MIT).

## When to use

Use this skill during project initiation, after a charter has been drafted, to surface all parties with interest in or influence over the project outcome. Typical triggers include:

- The project charter has been approved and the team is moving into detailed planning
- A mid-project review reveals that key stakeholder groups were overlooked in the initial register
- The project scope has expanded, opening the door to new stakeholder categories
- A sponsor or steering committee requests a formal stakeholder inventory before the kickoff meeting

Do not invoke for ongoing stakeholder communications management; prefer the `communication-plan` skill for that. Do not invoke before a charter exists — the charter is required input.

## Summon the SME

Before facilitating, load the canonical stakeholder analysis reference to ground the classification work in established practice.

**Reading the config.** Check `.pm-kit.config.json` for the `sourcesMode` field:

- If `sourcesMode` is `"online"` (opt-in): fetch the URL stored at the key `sources.stakeholderRegister` in `vendor/pm-kit/sources-index.json` using your available web-fetch capability. Do not name a specific tool — use whatever your runtime provides. Ground the facilitation in what you read. Do not fabricate quotations or page numbers.
- If `sourcesMode` is `"offline"` or the field is absent (the default): rely on your general knowledge of stakeholder analysis, including the Power/Interest grid and stakeholder identification concepts as described in the Wikipedia article on stakeholder analysis. Cite the canonical URL from `vendor/pm-kit/sources-index.json` at key `sources.stakeholderRegister` in the output. Do not fabricate quotations or page numbers.

In both cases, the URL to cite is `https://en.wikipedia.org/wiki/Stakeholder_analysis`.

## Facilitation script

Walk the user through these steps in sequence. Do not skip steps or combine them.

**Step 1 — Inputs.** Ask the user to confirm the project charter is available. If an optional concept memo exists, ask whether to include it. Read both before proceeding.

**Step 2 — Strategy selection.** Explain that identifying stakeholders benefits from structured perspective-taking. Recommend one of two strategies based on project context:

- Use `brainstorming-role-playing` when the team has limited knowledge of the stakeholder landscape and needs to inhabit unfamiliar roles to surface hidden parties.
- Use `brainstorming-six-thinking-hats` when the team knows the main stakeholders but wants to probe the landscape from multiple analytical angles (risks, benefits, emotions, process).

Ask the user which strategy they prefer, or default to `brainstorming-role-playing` if they are unsure.

**Step 3 — Brainstorming pass.** Run the selected strategy against the charter content. For each perspective or hat, prompt: "Who has a stake in this outcome from this angle? Who could block, enable, or be affected by this project?" Capture every name or role that surfaces. Aim for breadth — duplicates and overlaps are resolved in the next step.

**Step 4 — Classification.** For each stakeholder identified, prompt the user to supply:

- Interest level in the project outcome (High / Medium / Low)
- Influence over the project outcome (High / Medium / Low)
- Current attitude (Advocate / Neutral / Blocker / Unknown)
- Preferred communication channel (e.g., email, meeting, report, async tool)
- Communication cadence (e.g., weekly, bi-weekly, milestone-only)
- Owner of the relationship (the team member accountable for this stakeholder)

**Step 5 — Engagement grid.** Group stakeholders into the four quadrants of the classic influence × interest grid:

- **Manage Closely** — high influence, high interest
- **Keep Satisfied** — high influence, low interest
- **Keep Informed** — low influence, high interest
- **Monitor** — low influence, low interest

Confirm the groupings with the user before finalizing.

**Step 6 — Open questions.** Ask: "Are there any stakeholder groups we are unsure about or need to investigate further?" Capture all open items.

**Step 7 — Output.** Produce the completed register using the structure in `TEMPLATE.md` (sibling file). Fill every section. Leave no placeholder unfilled.

**Step 8 — Save the artifact.** Save the filled artifact to `docs/pm-kit/outputs/stakeholder-register/<short-slug>.md`. `<short-slug>` is a kebab-case ASCII slug (max 40 chars) derived from the project name (e.g., `bookswap-campus`). Confirm the final path with the user before writing. If the file exists, ask: overwrite, append a date suffix (e.g., `-2026-04-20`), or pick a new slug. The artifact begins with the three-line provenance header below (HTML comments, do not render):

```
<!-- Generated by agentic-pm-kit:stakeholder-register on YYYY-MM-DD -->
<!-- Languages: communication=<value>, output=<value> -->
<!-- Source mode: offline | online -->
```

## Languages

The kit separates the language used for live agent–user dialogue from the language used in the saved artifact. Both values live in `.pm-kit.config.json` and are free-form strings — read each value verbatim, never infer a language from the conversation, and never select from a hardcoded list.

**Facilitation dialogue.** Speak to the user during facilitation in the language at `language.communication`. Use the string verbatim.

**Filled artifact (saved TEMPLATE.md output).** Produce the written artifact in the language at `language.output`. If `language.output` is absent or empty, fall back to `language.communication`.

Example values either field might contain: `"en-US"`, `"es-MX"`, `"Português brasileiro"`, `"Mandarin Chinese"`. Accept any string as given. This bifurcation is the normative pattern for every skill in the kit.

## Acceptance gate

When the register is complete, point the user to `CHECKLIST.md` (sibling file) and ask them to verify each item. Remind them that the output must be marked **PASS** or **FAIL**. On **FAIL**, invite the user to return with specific notes so the facilitation can be resumed or corrected.
