# ADR-003: Module Federation working knowledge

*Tier: 2 — Pattern*
*Status: Stable*
*Created: 2026-04-15*
*Roles applicable: Senior Developer — Frontend Foundations, Staff Developer — Frontend Foundations*

## Context

Jane's frontend platform is migrating to Module Federation. The Foundations team needs candidates who can contribute within established MF patterns and define new expansions. Theoretical knowledge is not enough.

## Decision

The system flags Module Federation experience as STRONG only when the candidate has demonstrable practical experience: shipping shared remotes, managing shared dependencies, owning a deployment pattern, or debugging an MF-specific failure mode.

## Rationale

Module Federation is enough of a buzzword that candidates can claim familiarity from a single tutorial. The team has been burned by hires whose only MF experience was a side project that never shipped. Practical experience — *under load, with stakes* — is the differentiator.

## Examples

- "Led MF rollout across four product teams at PayKit, including the rspack migration": STRONG.
- "Built a small POC with module-federation-examples": PRESENT but weak — surface as a screen question to probe depth.
- "Interested in learning Module Federation": NEUTRAL — does not satisfy this signal.
- "Architected a microfrontend system using a framework-agnostic integration layer with React-specific bindings (shared dependencies, host/shell communication, independent deployment)": STRONG, even though it's not MF specifically. The skill maps.

## Application

The `triage-application` skill scans for MF mentions and weighs them by context: project scope, team size affected, specific MF concepts named (remotes, shared deps, lazy loading, deployment topology). For Foundations roles, this is one of the highest-weight Tier 2 signals.

## Boundary

This is a Tier 2 signal. Strong MF experience does not by itself move a candidate forward; it just clears one of the harder pattern hurdles. Tier 3 signals still need to land.
