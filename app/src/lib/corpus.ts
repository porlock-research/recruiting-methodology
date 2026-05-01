export interface ADR {
  id: string;
  title: string;
  tier: 1 | 2 | 3;
  tierLabel: 'Floor' | 'Pattern' | 'Human';
  decision: string;
  rationale: string;
}

export function adrGitHubUrl(adrId: string): string {
  const slugMap: Record<string, string> = {
    'ADR-001': 'canada-based-eligibility',
    'ADR-002': 'employment-authorization',
    'ADR-003': 'module-federation-knowledge',
    'ADR-004': 'ai-in-workflow',
    'ADR-005': 'experience-tier-banding',
    'ADR-006': 'build-tooling-depth',
    'ADR-007': 'absent-public-profile',
    'ADR-008': 'ic-vs-leadership-gaps',
    'ADR-009': 'cover-letter-team-engagement',
  };
  const slug = slugMap[adrId] ?? '';
  return `https://github.com/porlock-research/recruiting-methodology/blob/main/corpus/${adrId}-${slug}.md`;
}

export const CORPUS: ADR[] = [
  {
    id: 'ADR-001',
    title: 'Canada-based eligibility',
    tier: 1,
    tierLabel: 'Floor',
    decision:
      'Candidates whose application materials indicate residence outside Canada are flagged as ineligible at Tier 1, except for explicit US-eligible roles.',
    rationale:
      'Jane operates as a Canadian remote-first company. Tax, employment, and benefits are aligned with Canadian residency. Edge cases (relocation, dual residence) are surfaced for human review.',
  },
  {
    id: 'ADR-002',
    title: 'Employment authorization',
    tier: 1,
    tierLabel: 'Floor',
    decision:
      'The system checks only the explicit "authorized to work in Canada" field. It never infers authorization from name, school, or other proxy signals.',
    rationale:
      'Inferring work authorization from proxies is both inaccurate and a legal risk. The only acceptable signal is the candidate\'s direct answer.',
  },
  {
    id: 'ADR-003',
    title: 'Module Federation working knowledge',
    tier: 2,
    tierLabel: 'Pattern',
    decision:
      'Flag MF experience as STRONG only when the candidate has demonstrable practical experience: shipping shared remotes, managing shared dependencies, owning a deployment pattern, or debugging an MF-specific failure.',
    rationale:
      'Module Federation is a buzzword that candidates can claim from a single tutorial. Practical experience under load is the differentiator.',
  },
  {
    id: 'ADR-004',
    title: 'AI in workflow — what counts and what doesn\'t',
    tier: 2,
    tierLabel: 'Pattern',
    decision:
      'AI-in-workflow is flagged STRONG only with concrete evidence: public posts, opinionated workflow patterns, specific avoided use cases. Generic mentions are PRESENT but generic.',
    rationale:
      'A candidate who has actually integrated AI has opinions, has been burned by hallucinations, has adjusted patterns. None of that comes through in "I use AI."',
  },
  {
    id: 'ADR-005',
    title: 'Experience-tier banding for "accomplished" hires',
    tier: 2,
    tierLabel: 'Pattern',
    decision:
      'For Senior Developer roles, target 6-10 years with independent project leadership. For Staff Developer, target 8+ years with cross-team scope, mentorship, architectural authority. Years are necessary but not sufficient.',
    rationale:
      'Years-of-experience is a weak signal alone. Two engineers with the same years can be at very different effectiveness levels. Years are the floor; scope and shipping evidence are the calibration.',
  },
  {
    id: 'ADR-006',
    title: 'Frontend build tooling depth',
    tier: 2,
    tierLabel: 'Pattern',
    decision:
      'Build-tooling depth is flagged STRONG when the candidate has tuned, configured, or extended a build tool — not just used it. Specific outcomes (perf numbers, migrations, custom plugins) are STRONG.',
    rationale:
      'Most senior frontend engineers have seen a webpack.config.js. Far fewer have changed one to solve a real problem. The depth signal distinguishes someone who can lead Foundations work.',
  },
  {
    id: 'ADR-007',
    title: 'Absent public profile interpretation',
    tier: 3,
    tierLabel: 'Human',
    decision:
      'The system flags an absent public profile as a Tier 3 observation, never a Tier 2 negative. The recruiter assesses in context.',
    rationale:
      'Penalizing for absent public work disproportionately affects parents, certain cultural backgrounds, candidates with employer-restricted publishing, and candidates who simply prefer privacy.',
  },
  {
    id: 'ADR-008',
    title: 'IC contributions vs. leadership-role gaps',
    tier: 3,
    tierLabel: 'Human',
    decision:
      'Surface gaps in recent individually-attributable shipping as a Tier 3 hand-off note when the candidate has been in a leadership role. The recruiter asks during the screen rather than disqualifying.',
    rationale:
      'A Tech Lead who hasn\'t merged a PR in six months may still be deeply technical. None of architecture, code reviews, mentoring, or strategic shaping shows up as commits.',
  },
  {
    id: 'ADR-009',
    title: 'Cover-letter engagement with team-specific public work',
    tier: 3,
    tierLabel: 'Human',
    decision:
      'When a cover letter references team-specific public work (writing, talks, public artifacts authored by hiring-team members), flag as STRONG Tier 3 engagement signal. Generic references to JD-visible content are NEUTRAL.',
    rationale:
      'Reading and engaging with what a team has publicly written is rare. It indicates genuine interest in the work, not just the role.',
  },
];
