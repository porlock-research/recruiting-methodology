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
