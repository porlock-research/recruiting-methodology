# ADR-004: AI in workflow — what counts and what doesn't

*Tier: 2 — Pattern*
*Status: Stable*
*Created: 2026-04-18*
*Roles applicable: All engineering roles*

## Context

Every Jane engineering JD names "AI integrated into current workflow with developed judgment about application." Jane wants candidates who use AI tools actively and have opinions about effectiveness. The bar is higher than "I use ChatGPT sometimes."

## Decision

AI-in-workflow is flagged STRONG only when there is concrete evidence the candidate is integrating AI into their development practice with intentionality. Evidence can be public (blog posts, talks, repos) or private (cover letter detail, portfolio examples). Generic mentions don't count.

## Rationale

A candidate who has actually integrated AI into their work has opinions. They have things they avoid using AI for. They have workflow patterns. They've been burned by hallucinations or low-leverage usage and have adjusted. None of this comes through in "I use AI."

## Examples

- "I run an AI-native methodology I designed: 148 ADRs, 66 rule files, MCP-driven Playwright tests. I avoid AI for decisions whose verification lives outside the code.": STRONG. Specific, opinionated, includes constraints.
- "Five public blog posts on AI-assisted development with concrete code examples": STRONG. Evidence of sustained engagement.
- "I use Cursor and Copilot daily": PRESENT but generic. Surface as a screen question to probe depth.
- "Excited about AI": NEUTRAL — does not satisfy this signal.

## Application

The `triage-application` skill scans for AI-related mentions and weighs them by specificity. A specific avoided use case is a stronger signal than a list of tools. Public artifacts (blog, GitHub, talks) raise the weight further.

## Boundary

This is a Tier 2 signal. Strong evidence of AI fluency does not move a candidate forward by itself. It clears a specific pattern requirement. Tier 3 (story coherence, specific engagement, etc.) still needs to land.
