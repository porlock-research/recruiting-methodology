# Hook: check-corpus-coherence

*Type: Post-skill check*
*Fires after: `update-corpus` proposes a new ADR*
*Invoked by: System, automatically*

## Purpose

When a new ADR is proposed, this hook checks the existing corpus for contradictions or significant overlap with existing ADRs. Surfaces conflicts before the new ADR joins the corpus, so the recruiter can reconcile rather than discover the conflict later.

## What it checks

For each new ADR proposed by `update-corpus`, the hook compares:

1. **Decision text overlap** — does an existing ADR cover the same decision?
2. **Example overlap** — do the examples in the new ADR match examples already in another ADR?
3. **Tier consistency** — if the same signal is described at a different tier in an existing ADR, that's a flag
4. **Direct contradiction** — does the new decision contradict an existing one (e.g., "weight X positively" vs. existing "weight X neutrally")?

## What happens on detection

For each conflict detected:

1. The new ADR draft is held
2. The conflicting existing ADR is referenced explicitly
3. The recruiter is presented with three options:
   - **Consolidate**: merge the new ADR into the existing one
   - **Replace**: archive the existing ADR and accept the new one
   - **Distinguish**: keep both, but tighten the language so the conflict is resolved
4. No corpus change happens until the recruiter chooses

## Why this exists

A corpus that contradicts itself is worse than no corpus. If ADR-007 says "absent public profile is neutral" and a new ADR-010 says "absent public profile suggests low engagement," the system's recommendations become incoherent and recruiters lose trust. This hook makes contradictions visible at the moment of introduction, when they're easiest to reconcile.

## Boundary

The hook detects and surfaces; the recruiter resolves. It does not auto-merge or auto-archive. Reconciliation is a substantive decision, not a structural one.
