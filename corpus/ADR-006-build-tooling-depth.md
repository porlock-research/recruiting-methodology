# ADR-006: Frontend build tooling depth

*Tier: 2 — Pattern*
*Status: Stable*
*Created: 2026-04-18*
*Roles applicable: Senior Developer — Frontend Foundations, Staff Developer — Frontend Foundations*

## Context

Jane's frontend stack runs on webpack, rspack, and Vite. The Foundations team needs candidates who understand the underlying mechanics, not just users of the tools. The JD calls for "modern frontend build tooling expertise with understanding of underlying mechanics."

## Decision

Build-tooling depth is flagged STRONG when the candidate has demonstrably tuned, configured, or extended a build tool — not just used it. Evidence can be: custom webpack plugins, performance work, migration from one tool to another, or specific debugging at the build-tool level.

## Rationale

Most senior frontend engineers have seen a `webpack.config.js` file. Far fewer have actually changed one to solve a real problem. The depth signal here is what distinguishes someone who can lead Foundations work from someone who consumes it.

## Examples

- "Migrated webpack to rspack across four apps, including custom loader changes": STRONG.
- "Reduced bundle size by 40% via webpack optimizations": STRONG.
- "Built and debugged custom Vite plugins for our PWA": STRONG.
- "Familiar with webpack and Vite": PRESENT but generic. Surface for screen.
- "Used create-react-app": NEUTRAL — does not satisfy this signal.

## Application

The `triage-application` skill scans for build-tool mentions and weighs them by specificity. Specific outcomes (perf numbers, migration completions, custom configurations) are STRONG. Generic mentions are NEUTRAL.

## Boundary

Tier 2 signal. Required for Foundations roles, less critical for product-team roles. Strong tooling depth alone doesn't move a candidate forward — it clears a Foundations-specific pattern requirement.
