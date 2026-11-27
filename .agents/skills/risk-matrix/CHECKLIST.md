# Risk Matrix — Acceptance Checklist

## Content

- [ ] Every risk in the inventory is written as a risk statement in the form "If `<cause>` occurs, then `<effect>` may impact `<objective>`" — not a single-word label or a restatement of a generic concern.
- [ ] Each risk is assigned to one of the four categories: technical, external, organizational, or project management.
- [ ] Probability and impact are each scored on the 1–5 scale, and the Score column equals Probability × Impact for every row.
- [ ] Every risk has a response strategy chosen from: avoid, mitigate, transfer, or accept. The strategy is consistent with the risk's score and zone.
- [ ] The top-5 focus list covers the five highest-scoring risks, or all risks with score ≥ 15 if fewer than five cross that threshold. Each item includes concrete actions, owner, trigger conditions, and target resolution date.
- [ ] The risk-trends narrative states whether the posture is increasing, stable, or decreasing, and names the largest movers by ID.

## Format

- [ ] The 5 × 5 matrix visualization places every risk ID from the inventory into exactly one cell, with axes labeled (probability 5→1 on rows, impact 1→5 on columns).
- [ ] The zoning legend is present and consistent: green 1–6, yellow 7–14, red 15–25.
- [ ] The inventory table includes all required columns: ID, Description, Category, Probability, Impact, Score, Response strategy, Owner, Trigger conditions, Target resolution date.

## Compliance

- [ ] The output cites the canonical reference URL (`https://en.wikipedia.org/wiki/Risk_matrix`).
- [ ] The "Source consulted" section records which mode was used (offline or online) and does not include fabricated quotations or page numbers.
- [ ] The facilitation dialogue is in the language at `language.communication`, and the saved artifact is in the language at `language.output` (falling back to `language.communication` if `language.output` is absent or empty).
- [ ] The artifact is saved to `docs/pm-kit/outputs/risk-matrix/<slug>.md` and begins with the three-line provenance header.

> Mark **PASS** or **FAIL**. On **FAIL**, return to the skill with notes.
