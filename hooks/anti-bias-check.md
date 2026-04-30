# Hook: anti-bias-check

*Type: Pre-output check*
*Fires before: `triage-application` produces a final recommendation*
*Invoked by: System, automatically*

## Purpose

Scans the recommendation reasoning for signals that could be encoding protected-class proxies. Surfaces or removes any such signals before the recommendation reaches the recruiter.

## What it checks

The hook scans for reasoning patterns that historically correlate with bias in hiring:

1. **School-based pattern matching** — "candidates from these schools tend to..." Schools can correlate with socioeconomic background, ethnicity, and other protected classes. The hook removes school-based generalizations from triage reasoning.
2. **Name-based inferences** — any reasoning that would change based on a candidate's name. The hook flags and removes.
3. **Location-as-discriminator** — using location for anything beyond eligibility (Tier 1). Reasoning like "candidates from this region tend to expect higher compensation" gets flagged.
4. **Career-gap inferences** — gaps in employment history are flagged for review, never used as a reason to weight against. (Career gaps disproportionately affect women, parents, caregivers.)
5. **Communication-style judgments** that aren't anchored to specific role requirements. "Candidate's writing seems unprofessional" is too soft and too proxy-prone; "Candidate's cover letter has many grammatical errors" is specific and defensible.

## What happens on detection

For each pattern detected:

1. The reasoning element is flagged
2. The recommendation is recomputed without that reasoning element
3. A note is added: "anti-bias-check removed reasoning element: [type]. Recommendation has been recomputed without it."
4. If removal causes the Tier 1+2 case to weaken below the recommendation threshold, the output may be downgraded (move forward → hold) — but this is surfaced explicitly to the recruiter.

## Why this exists

Pattern-matching systems learn from past decisions. If past hiring decisions encoded bias, naive pattern-matching will reproduce it at higher volume. This hook is a structural guard against that reproduction. It cannot eliminate bias from a corpus, but it prevents the most common proxy-based reasoning from showing up in triage outputs.

## Boundary

The hook is conservative — it removes proxy reasoning but doesn't try to inject corrective bias in the other direction. The methodology assumes the recruiter is the substantive judge of fairness; the hook ensures the system isn't actively making the recruiter's job harder.

## What this hook is not

This is not a comprehensive bias-mitigation system. It's a structural check that catches the most common proxy patterns. Real bias mitigation in hiring requires ongoing audit, diverse interview panels, structured rubrics, and outside review — none of which the methodology can substitute for.
