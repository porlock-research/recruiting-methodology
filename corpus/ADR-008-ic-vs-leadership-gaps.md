# ADR-008: IC contributions vs. leadership-role gaps

*Tier: 3 — Human (recruiter judgment)*
*Status: Stable*
*Created: 2026-04-22*

## Context

Senior candidates often move into Tech Lead or Staff roles where their individually-attributable shipping decreases. This is a feature of the role, not a bug. But for an IC opening (e.g., Senior Developer — Foundations), the hiring team needs evidence of recent technical contribution.

## Decision

The system surfaces gaps in recent individually-attributable shipping as a Tier 3 observation when the candidate has been in a leadership role. The recruiter asks during the screen rather than the system disqualifying.

## Rationale

A Tech Lead who hasn't merged a PR in six months may still be deeply technical — they may be running architecture reviews, leading code reviews, mentoring on hard problems, owning the technical roadmap. None of that shows up as commits. Disqualifying on commit gaps loses good IC candidates who took a leadership tour.

## Examples

- Tech Lead at PayKit for the last 18 months, prior IC role at Stripe with strong shipping: SURFACE the gap as a screen question. Likely strong.
- Engineering Manager for the last 4 years, no recent technical artifacts at all: SURFACE as a possibly-deeper concern. The candidate may have moved away from IC work entirely; the screen reveals.
- Senior IC with recent commits visible across multiple repos: NO GAP — strong Tier 2 signal.

## Application

The `triage-application` skill checks the candidate's most recent role(s) against indicators of leadership scope. If a leadership role is present and recent IC contributions are absent, it flags this as a Tier 3 hand-off note for the screen.

## Boundary

Tier 3 signal. The system surfaces what looks like a gap and proposes screen-call questions. The recruiter decides whether to weight against.
