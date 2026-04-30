---
name: update-corpus
description: Capture a finalized recruiting decision (especially a recruiter override of the system's recommendation) as a proposed new ADR ready to add to the corpus. Use when the recruiter's judgment differed from the system in a way worth capturing, or when a recurring pattern surfaces from `reflect`.
---

# Skill: update-corpus

*Type: Capture skill*
*Invoked by: Recruiter, after an override or when capturing a new pattern*

## Purpose

Takes a finalized decision — especially one where the recruiter overrode the system's recommendation — and proposes a new ADR ready to add to the corpus.

## When to use

- The recruiter's judgment differed from the system's recommendation in a way worth capturing
- A pattern has shown up across recent triages that deserves its own ADR
- A `reflect` cycle surfaced a candidate-pattern worth promoting to a stable decision

## Inputs

- The decision context: which candidate, which role, which prior recommendation
- The override reason: what the recruiter saw that the system missed (or vice versa)
- Optional: the relevant tier (1/2/3) — if unspecified, the skill infers and surfaces

## Output structure

A complete ADR draft in the corpus convention:

```markdown
# ADR-NNN: [Concise title]

*Tier: [1 / 2 / 3] — [Floor / Pattern / Human]*
*Status: Proposed*
*Created: [Date]*
*Triggered by: [Specific candidate or pattern that surfaced this]*

## Context
[When this signal applies]

## Decision
[What we do when we encounter this signal]

## Rationale
[Why we made this decision]

## Examples
[Specific cases]

## Application
[How the system should apply this]

## Boundary
[What the system cannot do with this signal]
```

## How to invoke

> Capture this override as a new ADR:
>
> Context: [describe the candidate and role]
> Original recommendation: [what the system said]
> Override: [what the recruiter decided and why]

The skill drafts the ADR, applies `validate-adr-format` to check completeness, and returns the draft for review.

## Behavior rules

- Status is always "Proposed" until a recruiter accepts it
- Tier is explicit and enforced — Tier 1 ADRs are filters, Tier 2 are patterns, Tier 3 are recruiter-domain
- Examples include both positive and negative cases (what triggers the signal vs. what doesn't)
- Boundary section is required — every ADR specifies what the system cannot do with this signal

## Boundaries

This skill drafts; the recruiter accepts. The new ADR is not added to the corpus until the recruiter reviews and approves. The `validate-adr-format` hook ensures structural completeness; the recruiter judges substantive correctness.

## See also

- [`/hooks/validate-adr-format.md`](../hooks/validate-adr-format.md) — structural completeness check
- [`/hooks/check-corpus-coherence.md`](../hooks/check-corpus-coherence.md) — checks for contradictions with existing ADRs
- [`/corpus/decisions.md`](../corpus/decisions.md) — the index where accepted ADRs appear
