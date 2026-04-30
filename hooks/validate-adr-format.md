# Hook: validate-adr-format

*Type: Post-skill check*
*Fires after: `update-corpus`*
*Invoked by: System, automatically*

## Purpose

When `update-corpus` drafts a new ADR, this hook verifies the draft is structurally complete before it's offered to the recruiter for review. Prevents incomplete ADRs from entering the corpus.

## What it checks

Every ADR must include:

1. **Title** — `# ADR-NNN: [Concise title]`
2. **Tier metadata** — `*Tier: [1/2/3] — [Floor/Pattern/Human]*`
3. **Status** — `*Status: Proposed / Stable / Archived*`
4. **Created date** — `*Created: [ISO date]*`
5. **Triggered by** (for new ADRs from overrides) — `*Triggered by: [Specific candidate or pattern]*`
6. **Context section** — when this signal applies
7. **Decision section** — what the system does when it encounters the signal
8. **Rationale section** — why we made this decision
9. **Examples section** — at least 2 specific cases (positive and negative or graded examples)
10. **Application section** — how the system should apply this in `triage-application` or `summarize-screen`
11. **Boundary section** — what the system cannot do with this signal

## What happens on failure

If any required section is missing:

1. The draft is flagged as incomplete
2. The missing sections are listed explicitly
3. The recruiter is asked to fill in the missing pieces (or `update-corpus` re-runs to fill them)
4. The ADR is not added to `decisions.md` until validation passes

## Why this exists

ADRs that lack examples drift into vague principles. ADRs without an explicit Boundary section invite scope creep. ADRs without tier tagging break the `check-tier-boundary` hook. Format completeness isn't ceremony — it's what keeps the corpus reviewable in six months.

## Boundary

The hook validates structure, not content. A well-structured ADR with bad reasoning will pass this check. The recruiter judges substantive correctness.
