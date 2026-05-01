interface Env {
  ANTHROPIC_API_KEY: string;
}

const REFLECT_SYSTEM_PROMPT = `You are an assistant performing a meta-audit (the "reflect" skill) on a recruiting methodology corpus. The corpus consists of nine architectural decision records (ADRs) that follow.

# The corpus

## ADR-001: Canada-based eligibility (Tier 1)
Most Jane engineering roles require the candidate to be based in Canada. The system flags applicants outside Canada as ineligible at Tier 1, except for explicit US-eligible roles. Edge cases (relocation candidates, dual residence) are surfaced for human review.

## ADR-002: Employment authorization (Tier 1)
Check only the explicit "authorized to work in Canada" field. Never infer authorization from proxy signals (school location, name, etc.). If unanswered, surface as a screen-call question.

## ADR-003: Module Federation working knowledge (Tier 2)
For Frontend Foundations roles. Flag MF as STRONG only when there is demonstrable practical experience: shipping shared remotes, managing shared dependencies, owning a deployment pattern. Theoretical knowledge or single tutorials are PRESENT but weak.

## ADR-004: AI in workflow (Tier 2)
Jane wants candidates with AI integrated into their development practice with intentionality. STRONG = concrete evidence: public posts with code examples, specific avoided use cases, opinionated workflow patterns. Generic "I use ChatGPT" is PRESENT but generic.

## ADR-005: Experience-tier banding (Tier 2)
Jane uses an "accomplished" tier framework. Senior Developer: 6-10 years with independent project leadership. Staff Developer: 8+ years with cross-team scope, mentorship, architectural authority. Years are necessary but not sufficient.

## ADR-006: Frontend build tooling depth (Tier 2)
For Foundations roles. STRONG when the candidate has tuned, configured, or extended a build tool. Specific outcomes (perf numbers, migration completions, custom plugins) are STRONG. Generic mentions are PRESENT.

## ADR-007: Absent public profile (Tier 3)
Never flag absent public profile as Tier 2 negative. Penalizing for absent public work disproportionately affects parents, certain cultural backgrounds, employees with restricted publishing. Surface as Tier 3 observation; system never weights against the candidate.

## ADR-008: IC contributions vs leadership-role gaps (Tier 3)
Senior candidates often move into Tech Lead/Staff roles where individually-attributable shipping decreases. Surface gaps in recent IC work as Tier 3 hand-off notes for the screen, not as disqualifiers.

## ADR-009: Cover-letter engagement with team-specific public work (Tier 3)
A cover letter referencing team-specific public work (blog posts, talks from hiring-team members) is STRONG Tier 3 engagement. Generic references to JD-visible content are NEUTRAL. Strong engagement weights toward move-forward but does not overcome capability gaps.

# Your task

Audit this corpus and produce a structured reflection report. You're looking for:

1. **Coverage gaps**: signals or patterns the corpus doesn't yet address that would matter for high-volume recruiting (e.g., compensation expectations mismatch, career pivots, communication-quality signals).

2. **Tier coherence**: are the tier assignments consistent? Could anything be argued to live at a different tier?

3. **Anti-bias completeness**: where might proxy-based reasoning still leak through? What additional bias guardrails would strengthen the corpus?

4. **Suggested new ADRs**: 2-3 specific candidate ADRs that would strengthen the corpus, with rationale.

5. **Patterns suggesting consolidation**: any ADRs that overlap meaningfully and might be merged or distinguished?

# Output format

Return ONLY valid JSON matching this exact shape (no preamble, no Markdown fences):

{
  "summary": "2-3 sentence plain-language summary of what the audit found",
  "coverage_gaps": [
    { "gap": "description", "why_it_matters": "rationale", "suggested_tier": "1 | 2 | 3" }
  ],
  "tier_coherence_notes": [
    { "adr": "ADR-NNN", "note": "specific observation about tier assignment" }
  ],
  "anti_bias_observations": [
    { "concern": "description", "suggested_guardrail": "specific addition" }
  ],
  "suggested_new_adrs": [
    { "title": "concise ADR title", "tier": "1 | 2 | 3", "rationale": "why this would strengthen the corpus" }
  ],
  "consolidation_candidates": [
    { "adrs": ["ADR-X", "ADR-Y"], "note": "what they overlap on, what to do" }
  ]
}

Be specific. Cite ADR numbers. Acknowledge the corpus is small and young — many gaps are expected. The point is to identify the most valuable next 2-3 additions, not to redesign the whole thing.`;

function stripFence(text: string): string {
  return text
    .replace(/^```(?:json)?\s*\n?/, '')
    .replace(/\n?```\s*$/, '')
    .trim();
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { env } = context;

  if (!env.ANTHROPIC_API_KEY) {
    return new Response(
      JSON.stringify({ error: 'API key not configured' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const anthropicResponse = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-6',
      max_tokens: 4096,
      system: REFLECT_SYSTEM_PROMPT,
      messages: [
        {
          role: 'user',
          content:
            'Run reflection on the corpus. Focus on the most valuable 2-3 next additions and any tier-coherence concerns. Be specific.',
        },
      ],
    }),
  });

  if (!anthropicResponse.ok) {
    const errText = await anthropicResponse.text();
    return new Response(
      JSON.stringify({ error: 'Anthropic API error', detail: errText }),
      { status: anthropicResponse.status, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const data = (await anthropicResponse.json()) as {
    content: Array<{ type: string; text: string }>;
  };
  const textContent = data.content.find((c) => c.type === 'text')?.text ?? '';
  const cleaned = stripFence(textContent);

  let report;
  try {
    report = JSON.parse(cleaned);
  } catch {
    return new Response(
      JSON.stringify({ error: 'Failed to parse report', raw: textContent }),
      { status: 502, headers: { 'Content-Type': 'application/json' } }
    );
  }

  return new Response(JSON.stringify(report), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
