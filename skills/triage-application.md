# Skill: triage-application

*Type: Per-application skill*
*Invoked by: Recruiter, on each new application*

## Purpose

Reads an inbound application and produces a tier-tagged triage decision (move forward / hold / pass) with reasoning anchored to the corpus of ADRs.

## When to use

- A new application arrives in the ATS
- You need a structured second opinion before deciding to screen, hold, or pass
- You want the reasoning written down in a citable, reviewable form

## Inputs

- The role name (e.g., "Senior Developer — Frontend Foundations")
- The application materials: resume text, cover letter text, portfolio links
- Optional: stated location, work-authorization answer, available start date

## Output structure

```
Triage: [Candidate name] → [Role]

Recommendation: [Move forward / Hold / Pass]

Tier 1 — Floor: [PASS / FAIL / SURFACE]
- [Each signal with status and ADR reference]

Tier 2 — Pattern: [STRONG / PRESENT / WEAK]
- [Each signal with status, ADR reference, and brief evidence]

Tier 3 — Human signals (recruiter judgment required):
- [Observations only — never decisions]
- Concerns surfaced for review:
  - [Each concern with a hand-off note for the screen]

Recommended next step: [What the recruiter should do]

Things to double-check during the screen:
- [Specific question prompts]
```

## How to invoke

In the Claude.ai Project, paste:

> Triage this application against [role]:
>
> [Application materials]

The system reads, queries the corpus, applies the relevant hooks (`check-tier-boundary`, `flag-pii-concerns`, `anti-bias-check`), and returns the structured output.

## Behavior rules

- Cite specific ADRs by ID for every Tier 1 and Tier 2 signal
- Never make a recommendation based on Tier 3 signals alone (enforced by `check-tier-boundary`)
- Never infer protected-class information from proxies (enforced by `anti-bias-check`)
- Surface, don't decide, on Tier 3

## Boundaries

This skill recommends; it does not decide. The recruiter accepts, modifies, or overrides. If the recruiter overrides, run `update-corpus` to capture the override.

## See also

- [`/methodology/worked-example.md`](../methodology/worked-example.md) — full end-to-end example
- [`/hooks/check-tier-boundary.md`](../hooks/check-tier-boundary.md) — Tier 3 boundary enforcement
- [`/hooks/anti-bias-check.md`](../hooks/anti-bias-check.md) — protected-class proxy scan
