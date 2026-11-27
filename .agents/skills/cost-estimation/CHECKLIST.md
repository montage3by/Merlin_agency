# Cost Estimation — Acceptance Checklist

- [ ] Every item in scope appears in the "Items being estimated" list with a type (story, epic, or task).
- [ ] The technique (or combination of techniques) used is explicitly named and justified for the items estimated.
- [ ] The estimates recorded in the artifact were produced by the team; the agent facilitated and recorded but did not fabricate any numerical value.
- [ ] Each per-item row records the estimate verbatim: a Fibonacci value for Planning Poker, a size for T-shirt, or O / M / P / E / SD for three-point.
- [ ] Each per-item row has a confidence label (H, M, or L), with notes where the team disagreed or flagged uncertainty.
- [ ] The total is aggregated correctly: sums for Planning Poker and T-shirt; for three-point, the aggregate SD is the square root of the sum of per-item variances, and the 80% confidence interval uses expected ± 1.28 × aggregate SD (or an equivalent method stated in the aggregation note).
- [ ] The assumptions and scope exclusions section names at least two items that would invalidate the estimate if violated.
- [ ] The output cites the canonical reference URL (`https://en.wikipedia.org/wiki/Three-point_estimation`).
- [ ] The "Source consulted" section records which mode was used (offline or online) and does not include fabricated quotations or page numbers.
- [ ] The facilitation dialogue is in the language at `language.communication`, and the saved artifact is in the language at `language.output` (falling back to `language.communication` if `language.output` is absent or empty).
- [ ] The artifact is saved to `docs/pm-kit/outputs/cost-estimation/<slug>.md` and begins with the three-line provenance header.

> Mark **PASS** or **FAIL**. On **FAIL**, return to the skill with notes.
