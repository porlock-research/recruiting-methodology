---
name: summarize-screen
description: Convert a screen-call transcript into a candidate decision-record draft in the corpus convention. Use after a recruiter screen call where a transcript is available, when preparing a structured handoff record for the hiring manager.
---

# Skill: summarize-screen

*Type: Per-call skill*
*Invoked by: Recruiter, after a screen call*

## Purpose

Reads a screen-call transcript and produces a candidate decision-record draft in the corpus convention. Replaces the manual writeup that follows every screen call.

## When to use

- A screen call has concluded
- A transcript is available (Jane's transcription pipeline produces these automatically)
- You need a structured record to share with the hiring manager

## Inputs

- The role name
- The screen-call transcript (raw)
- Optional: any prior triage record for the candidate

## Output structure

```
Screen-call summary: [Candidate name] → [Role]

Recommendation: [Move forward to next stage / Hold for comparison / Decline with note]

Background summary (3–4 sentences):
[Plain-language summary of the candidate's relevant background]

Tier 1 — Floor: [PASS / FAIL / verified during call]
- [Confirmations and any changes from prior triage]

Tier 2 — Pattern signals heard in the call:
- [Each signal with brief quote or paraphrase, ADR reference]

Tier 3 — Human signals (recruiter's read):
- [Observations: voice, coherence, specificity, growth signals]
- Concerns:
  - [Anything that needs follow-up or hiring-manager attention]

Compensation discussion summary:
- [What was said about expectations, if discussed]

Recommended next step: [Specific action]

Hiring-manager handoff notes:
- [Three bullets the hiring manager should read before their interview]
```

## How to invoke

In the Project:

> Summarize this screen call against [role]:
>
> [Transcript]

The skill reads, references any prior triage in the corpus, applies `check-tier-boundary` and `flag-pii-concerns`, and returns the structured record.

## Behavior rules

- Quote or paraphrase specific moments from the transcript when citing signals (anchors the recruiter's claims)
- Three-sentence summary cap — don't write essays
- Tier 3 observations explicitly tagged as recruiter's read, not system conclusion
- If the candidate's compensation expectations were discussed, summarize without speculation

## Boundaries

This skill drafts; the recruiter edits. The output goes through human review before reaching the hiring manager.

## See also

- [`/skills/triage-application.md`](./triage-application.md) — pre-screen triage that produces a record this can build on
- [`/hooks/flag-pii-concerns.md`](../hooks/flag-pii-concerns.md) — ensures PII isn't surfaced unnecessarily
