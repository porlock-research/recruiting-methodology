# ADR-009: Cover-letter engagement with team-specific public work

*Tier: 3 — Human (recruiter judgment)*
*Status: Stable*
*Created: 2026-04-29*
*Triggered by: Priya Krishnamurthy application for Senior Developer — Frontend Foundations (see worked-example.md)*

## Context

Some cover letters reference what's visible in the JD — the company, the team name, the technologies listed. Many do. A small number engage with content the hiring team has published independently: a specific blog post, a conference talk, a public RFC, or technical writing from a member of the hiring team. That deeper engagement is rare and meaningful.

## Decision

When a cover letter references team-specific public work (writing, talks, public artifacts authored by hiring-team members), the system flags it as a STRONG Tier 3 engagement signal. Generic references to JD-visible content (company name, mission, listed tech) are NEUTRAL.

## Rationale

Reading what a team has publicly written and engaging with the substance of it is rare. It indicates genuine interest in the work, not just the role. A candidate who has done this research is signaling: *I want to work with this specific team on this specific problem*, not *I want any role.*

## Examples

- Reference to a Jane engineer's specific blog post on Module Federation deployment: STRONG.
- Reference to Burrito design system mentioned in the JD: NEUTRAL (visible in the JD).
- Reference to a Jane engineer's RubyConf talk on monolith-to-modular migration: STRONG.
- Reference to "Jane's mission to help the helpers": NEUTRAL (visible in marketing).
- Reference to a public ADR or RFC published by the hiring team: STRONG.

## Application

The `triage-application` skill explicitly checks for engagement with team-specific public work as a separate signal from JD-visible references. Future candidates whose cover letters demonstrate this kind of research engagement get flagged toward move-forward, with the specific reference cited in the triage output.

## Boundary

Tier 3 signal. Strong cover-letter engagement weights toward move-forward but does not overcome Tier 1 or Tier 2 capability gaps.
