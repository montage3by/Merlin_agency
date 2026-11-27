# Work Breakdown Structure — Acceptance Checklist

- [ ] The work breakdown uses three levels: Level 1 (phases or major deliverables), Level 2 (sub-deliverables), and Level 3 (work packages), all numbered with the dotted scheme (1.0, 1.1, 1.1.1).
- [ ] Every Level 3 work package is independently completable, independently verifiable, and scoped to approximately 40 hours or one sprint.
- [ ] The Mermaid `graph TD` diagram renders without syntax errors and shows at minimum all Level 1 and Level 2 nodes plus a representative sample of Level 3 leaves.
- [ ] The work-package details table records WBS code, deliverable name, owner, estimated duration in days, and dependencies for every Level 3 work package.
- [ ] Dependencies in the details table reference other work packages by WBS code; circular dependencies are absent.
- [ ] The WBS dictionary covers the five to ten most critical or ambiguous work packages with a scope narrative that states what is in scope and what is explicitly excluded.
- [ ] The total scope represented in the WBS is consistent with the source epics-and-stories artifact; no epics or major features are silently dropped.
- [ ] The output cites the canonical WBS reference URL (`https://en.wikipedia.org/wiki/Work_breakdown_structure`).
- [ ] The "Source consulted" section records which mode was used (offline or online) and contains no fabricated quotations or page numbers.
- [ ] The facilitation dialogue is in the language at `language.communication`, and the saved artifact is in the language at `language.output` (falling back to `language.communication` if `language.output` is absent or empty).
- [ ] The artifact is saved to `docs/pm-kit/outputs/wbs/<slug>.md` and begins with the three-line provenance header.

> Mark **PASS** or **FAIL**. On **FAIL**, return to the skill with notes.
