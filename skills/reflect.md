---
name: reflect
description: Audit the recruiting corpus for staleness, patterns, contradictions, and consolidation opportunities. Use periodically (monthly cadence or after a burst of recruiting activity) to keep the corpus useful as it accumulates.
---

# Skill: reflect

*Type: Meta skill (operates on the corpus itself)*
*Invoked by: Recruiter, on demand (typically monthly or after notable activity)*

## Purpose

Audits the corpus for staleness, patterns, contradictions, and consolidation opportunities. The corpus accumulates over weeks and months; without periodic review, it drifts toward noise. This skill keeps the corpus useful.

## When to use

- Monthly cadence (recommended baseline)
- After a notable burst of activity (e.g., end of a hiring sprint with many new ADRs)
- When recent triages keep flagging the same recruiter overrides — a pattern is forming
- When you suspect the corpus has grown to where you no longer remember what's in it

## Inputs

- The current corpus (loaded as Project knowledge)
- Optional: a date range to focus on (e.g., "last 30 days")

## Output structure

```
Reflection report: [Date] | [N ADRs reviewed]

## Citation patterns

Most-cited (last 30 days):
- ADR-NNN — [N citations]
- [...]

Stale candidates (no citations in 60+ days):
- ADR-NNN — last cited [Date]. Suggested action: [archive / update / keep-watch]
- [...]

## Patterns suggesting new ADRs

[For each pattern detected]:
- Pattern: [Description]
- Evidence: [3+ recent triages or overrides showing the pattern]
- Suggested new ADR: [Title and tier]
- Confidence: [High / Medium / Low]

## Contradictions or duplications

[Any internal corpus conflicts]:
- ADR-NNN and ADR-MMM appear to give conflicting guidance on [topic]
- ADR-NNN and ADR-MMM cover overlapping ground — consider consolidation

## Skill update suggestions

[Anything the skill specs themselves should change based on observed usage]:
- triage-application: [suggestion]
- summarize-screen: [suggestion]

## Proposed actions (none auto-applied)

For each suggested change above, the recruiter accepts, modifies, or declines. No corpus modification happens without explicit acceptance.
```

## How to invoke

> Run reflection on the corpus.

Optionally:

> Run reflection focused on the last 30 days.
> Run reflection focused on Tier 3 ADRs only.

The skill scans the corpus, reviews citation history (drawn from triage outputs), and produces the structured report.

## Behavior rules

- Nothing applies automatically — every change is a recruiter decision
- Citations are derived from triage outputs; if the corpus hasn't been used much, the report says so honestly
- Duplications and contradictions are flagged, not resolved — resolution is a recruiter call
- Skill update suggestions are observations, not directives

## Boundaries

This skill audits; it does not modify. The recruiter reviews each proposal and decides what to apply. Every accepted change goes through `update-corpus` (for new ADRs) or is applied manually (for archival, consolidation, or skill changes).

## See also

- [`/skills/update-corpus.md`](./update-corpus.md) — used when reflect proposes a new ADR
- [`/hooks/check-corpus-coherence.md`](../hooks/check-corpus-coherence.md) — fires when ADRs are added; reflect surfaces what slipped through
