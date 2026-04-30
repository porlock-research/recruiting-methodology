# Hook: check-tier-boundary

*Type: Post-skill check*
*Fires after: `triage-application`, `summarize-screen`*
*Invoked by: System, automatically*

## Purpose

Verifies that no triage recommendation is being made based on Tier 3 signals alone. The methodology's central principle — surface Tier 3, don't decide on it — is enforced here, not just stated.

## What it checks

When `triage-application` or `summarize-screen` produces a recommendation, this hook scans the output to verify:

1. Tier 1 signals (eligibility) explicitly support the recommendation, OR
2. Tier 2 signals (pattern match) explicitly support the recommendation
3. Tier 3 signals appear in the output as observations, never as load-bearing reasoning

## What happens on failure

If the recommendation is detected as Tier 3-dependent (e.g., the only support for "pass" is a Tier 3 concern about story coherence):

1. The recommendation is replaced with a Tier 3 hand-off pattern:
   > "The signals supporting this recommendation are primarily Tier 3 (human judgment). The system surfaces these observations but does not recommend action on them. Recruiter judgment required."
2. The Tier 3 observations are listed explicitly
3. The recruiter is prompted to make the call directly, with the corpus citations as background

## Why this exists

Tier 3 signals are often the most differentiating — they're what separates strong candidates from competent-on-paper ones. A system that learned to make decisions on Tier 3 alone would drift toward exactly the bias-encoding pattern this methodology is designed to resist. The hook structurally prevents that drift.

## Boundary

The hook enforces the boundary; it does not judge the substantive correctness of Tier 3 observations. That's the recruiter's call.
