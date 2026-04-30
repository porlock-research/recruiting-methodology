# ADR-007: Absent public profile interpretation

*Tier: 3 — Human (recruiter judgment)*
*Status: Stable*
*Created: 2026-04-22*

## Context

Some candidates have rich public profiles — GitHub, blog, conference talks, public ADRs. Some don't. Absence of a public profile is sometimes a signal (the candidate hasn't engaged with the broader community) and sometimes nothing (the candidate values privacy or simply hasn't made time to publish).

## Decision

The system flags an absent public profile as a Tier 3 observation, never as a Tier 2 negative. The recruiter assesses whether absence matters in the context of other signals.

## Rationale

Penalizing candidates for absent public work disproportionately affects: parents with limited extracurricular time, people from cultural backgrounds where public self-promotion is uncommon, candidates from countries where employer policies restrict public technical writing, and candidates who simply prefer privacy. None of these are valid reasons to weight against a candidate.

## Examples

- Strong Tier 1 + Tier 2 signals + cover letter shows specific engagement, no GitHub: NOT A NEGATIVE. Move forward; ask in screen if curious.
- Generic application, no specific engagement, no GitHub: NEUTRAL. The lack of engagement is the issue, not the lack of GitHub.
- Public profile present and very thoughtful: STRONG positive Tier 3 signal in its own right (see ADR-009 for specific engagement criteria).

## Application

The `triage-application` skill never flags absent public profile as a negative. If the recruiter wants to know more, the screen-call is the place to ask. The system can include "no public profile linked — worth asking about in screen" as a hand-off note, but it never weights against the candidate.

## Boundary

Tier 3 signal. The system surfaces what's missing from the public record. The recruiter decides whether that absence matters for this candidate.
