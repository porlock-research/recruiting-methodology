# Hook: flag-pii-concerns

*Type: Pre-output check*
*Fires before: `triage-application` and `summarize-screen` produce their final output*
*Invoked by: System, automatically*

## Purpose

Scans the proposed output for personally identifiable information (PII) that isn't relevant to the triage or screen-call summary. Removes or flags it before the output is shown to the recruiter.

## What it checks

The hook scans for:

1. **Full physical addresses** — only city/region matters for eligibility; full street addresses don't belong in a triage record
2. **Phone numbers** — typically don't belong in a triage decision-record
3. **Personal email addresses** — only relevant if the candidate's outreach context requires it
4. **Date of birth** — never relevant
5. **References to protected characteristics** that don't appear in the original application as candidate-stated identity (e.g., the system shouldn't infer ethnicity from a name and surface it)

## What happens on detection

For each instance of PII detected:

1. The PII is redacted from the output (replaced with `[redacted: type]`)
2. A note is added at the bottom of the output: "PII redacted by `flag-pii-concerns` hook: [list of types]. Original application materials retain this information; the triage record does not."

For protected-characteristic inferences:
1. The inference is removed entirely
2. A note is added: "Inferred attribute removed; the methodology does not infer protected-class information from proxies."

## Why this exists

Two reasons. First, the corpus and triage records become artifacts that get shared, reviewed in retrospectives, used for calibration. Keeping unnecessary PII out of these artifacts reduces data-handling risk. Second, the boundary between "what the application says" and "what the system inferred" matters — and inferred protected-class information is exactly the kind of bias-encoding the methodology is designed to resist.

## Boundary

The hook redacts and flags. It does not fundamentally change recommendations. PII is removed from the output but the underlying application data is unchanged.
