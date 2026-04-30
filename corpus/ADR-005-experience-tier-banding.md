# ADR-005: Experience-tier banding for "accomplished" hires

*Tier: 2 — Pattern*
*Status: Stable*
*Created: 2026-04-18*

## Context

Jane uses an explicit compensation framework where most hires enter at the "accomplished" tier within the role's band. For Senior Developer roles ($128k–$200k), the accomplished entry point is around $152k. For Staff and Senior Manager roles ($158.4k–$247.5k), it's around $188k. Years-of-experience expectations track this banding.

## Decision

For Senior Developer roles, the system targets candidates with 6–10 years of relevant experience and demonstrable independent project leadership. For Staff Developer roles, the system targets 8+ years with evidence of cross-team scope, mentorship, and architectural authority. Years are necessary but not sufficient; title patterns and shipping evidence matter more.

## Rationale

Years-of-experience is a weak signal on its own. Two engineers with the same years can be at very different levels of effectiveness. The system uses years as a Tier 1 floor and scope/leadership/shipping evidence as the Tier 2 calibration.

## Examples

- 6 years FE, has shipped two greenfield projects independently: AT BAND for Senior.
- 12 years FE, currently Tech Lead managing four ICs: AT BAND for Staff (verify shipping evidence in screen).
- 4 years FE, has shipped one small feature: BELOW BAND for Senior.
- 20 years FE, all in maintenance roles: AT BAND for Senior, surface for screen on Staff (need to assess scope evidence).

## Application

The `triage-application` skill calculates a band match using both years and demonstrated scope. Candidates significantly above or below band get flagged for recruiter judgment about fit, not auto-pass.

## Boundary

This is a Tier 2 signal that informs band fit, not a Tier 1 hard filter. A candidate at the edge of the band can still move forward if Tier 3 signals are exceptional. The system surfaces band mismatch; the recruiter decides.
