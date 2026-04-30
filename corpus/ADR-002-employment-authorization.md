# ADR-002: Employment authorization

*Tier: 1 — Floor*
*Status: Stable*
*Created: 2026-04-15*

## Context

Candidates need to be authorized to work in Canada. The application form asks this question directly. The system should not infer authorization from indirect signals (school location, name, etc.).

## Decision

The `triage-application` skill checks only the explicit "authorized to work in Canada" field. If the field is unanswered, the skill surfaces the gap as a screen-call question rather than inferring an answer.

## Rationale

Inferring work authorization from name, ethnicity, school, or other proxy signals is both inaccurate and a legal risk. The only acceptable signal is the candidate's direct answer to the explicit question.

## Examples

- Field answered "Yes": PASS Tier 1.
- Field answered "No": FAIL Tier 1, with a note that sponsorship is rarely available; flag for recruiter review only if the candidate is otherwise an exceptional fit.
- Field unanswered: SURFACE as a screen-call question. Do not block triage on this alone; the question can be answered in a 30-second exchange.

## Application

The `triage-application` skill reads the explicit authorization field only. It does not look at name, school, or location to infer authorization status.

## Boundary

This is a Tier 1 hard filter, but the system never infers status from proxy signals. If the candidate didn't answer, the recruiter asks. The system never guesses on this question.
