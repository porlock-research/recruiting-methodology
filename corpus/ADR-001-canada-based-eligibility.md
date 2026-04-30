# ADR-001: Canada-based eligibility

*Tier: 1 — Floor*
*Status: Stable*
*Created: 2026-04-15*

## Context

Most Jane engineering roles require the candidate to be based in Canada. The careers page lists one US-based exception (Medical Biller). This is a hard filter applied before any other evaluation.

## Decision

Candidates whose application materials indicate a residence outside Canada are flagged as ineligible at Tier 1, with the exception of the explicit US-eligible roles.

## Rationale

Jane operates as a Canadian remote-first company with a North Shore office and the broader workforce distributed across Canada. Tax, employment, and benefits administration are aligned with Canadian residency.

## Examples

- Application lists a Toronto address: PASS Tier 1.
- Application lists a Seattle address, role is Senior Developer — Frontend Foundations: FAIL Tier 1, *unless* the candidate explicitly states a Canadian relocation plan with timeline.
- Application is ambiguous (no address, but candidate names a Canadian city in cover letter): SURFACE for recruiter to confirm.

## Application

The `triage-application` skill checks the location field and any city/region mentions in the application body. If location is unclear or contradicts Canada-eligibility, the skill flags it explicitly rather than guessing.

## Boundary

This is a Tier 1 hard filter. The system applies it without recruiter intervention. Edge cases (relocation candidates, dual residence) are surfaced for human review.
