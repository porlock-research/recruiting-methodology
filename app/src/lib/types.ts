export interface TriageRequest {
  role: string;
  application: string;
}

export interface Signal {
  name: string;
  status: string;
  adr: string;
  evidence: string;
}

export interface Tier3Observation {
  observation: string;
  adr: string;
  evidence: string;
}

export interface Tier3Concern {
  concern: string;
  adr: string;
  screen_question: string;
}

export interface TriageResult {
  candidate_name: string;
  role: string;
  recommendation: 'Move forward' | 'Hold' | 'Pass';
  summary: string;
  tier_1: { status: string; signals: Signal[] };
  tier_2: { status: string; signals: Signal[] };
  tier_3: {
    observations: Tier3Observation[];
    concerns: Tier3Concern[];
  };
  next_step: string;
  screen_questions: string[];
}

export interface CoverageGap {
  gap: string;
  why_it_matters: string;
  suggested_tier: '1' | '2' | '3';
}

export interface TierCoherenceNote {
  adr: string;
  note: string;
}

export interface AntiBiasObservation {
  concern: string;
  suggested_guardrail: string;
}

export interface SuggestedNewADR {
  title: string;
  tier: '1' | '2' | '3';
  rationale: string;
}

export interface ConsolidationCandidate {
  adrs: string[];
  note: string;
}

export interface ReflectReport {
  summary: string;
  coverage_gaps: CoverageGap[];
  tier_coherence_notes: TierCoherenceNote[];
  anti_bias_observations: AntiBiasObservation[];
  suggested_new_adrs: SuggestedNewADR[];
  consolidation_candidates: ConsolidationCandidate[];
}
