import type { TriageResult as TriageResultType, Signal, Tier3Observation, Tier3Concern } from '../lib/types';
import { adrGitHubUrl } from '../lib/corpus';

interface Props {
  result: TriageResultType;
}

export function TriageResult({ result }: Props) {
  return (
    <article>
      <header className="mb-14 fade-rise fade-rise-1">
        <div className="flex items-center gap-4 mb-5">
          <span aria-hidden className="block w-16 h-px bg-ink" />
          <p className="text-kicker text-ink">Recommendation</p>
        </div>
        <h2 className="text-answer text-ink mb-4 font-display">
          {result.recommendation}<span className="period-accent">.</span>
        </h2>
        <p className="text-ink-soft mb-6">
          For{' '}
          <span className="text-ink font-medium">{result.candidate_name}</span>
          {' → '}
          <span className="italic">{result.role}</span>
        </p>
        <p className="text-lead text-ink max-w-prose">
          {result.summary}
        </p>
      </header>

      <div className="fade-rise fade-rise-2">
        <Section
          label="Tier 1"
          title="Floor signals"
          sub="Eligibility. The system applies these without ceremony."
          status={result.tier_1.status}
        >
          <SignalList signals={result.tier_1.signals} />
        </Section>
      </div>

      <div className="fade-rise fade-rise-3">
        <Section
          label="Tier 2"
          title="Pattern signals"
          sub="Relevant experience and demonstrable skills, evaluated against the corpus."
          status={result.tier_2.status}
        >
          <SignalList signals={result.tier_2.signals} />
        </Section>
      </div>

      <div className="fade-rise fade-rise-4">
        <Section
          label="Tier 3"
          title="Human signals"
          sub="Recruiter judgment required. The system surfaces; it does not decide."
        >
          <Tier3Block
            observations={result.tier_3.observations}
            concerns={result.tier_3.concerns}
          />
        </Section>
      </div>

      <div className="fade-rise fade-rise-5">
      <Section label="Next step" title={result.next_step}>
        {result.screen_questions.length > 0 && (
          <div>
            <p className="text-kicker text-ink-mute mb-3">
              Suggested screen questions
            </p>
            <ol className="space-y-3">
              {result.screen_questions.map((q, i) => (
                <li key={i} className="text-ink-soft leading-relaxed pl-7 relative">
                  <span className="absolute left-0 text-ink-mute font-mono text-sm tabular-nums">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {q}
                </li>
              ))}
            </ol>
          </div>
        )}
      </Section>
      </div>
    </article>
  );
}

function Section({
  label,
  title,
  sub,
  status,
  children,
}: {
  label: string;
  title: string;
  sub?: string;
  status?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-14">
      <header className="mb-7">
        <p className="text-kicker text-ink-mute mb-3">
          {label}
        </p>
        <div className="flex items-baseline flex-wrap gap-x-4 gap-y-2">
          <h3 className="text-subsection text-ink font-display">
            {title}
          </h3>
          {status && <StatusBadge status={status} />}
        </div>
        {sub && (
          <p className="text-sm text-ink-mute mt-2 leading-relaxed max-w-prose">
            {sub}
          </p>
        )}
      </header>
      {children}
    </section>
  );
}

function SignalList({ signals }: { signals: Signal[] }) {
  if (!signals?.length) {
    return <p className="text-ink-mute italic text-sm">No signals to report.</p>;
  }
  return (
    <ul className="space-y-5">
      {signals.map((s, i) => (
        <li key={i} className="flex items-start gap-4">
          <div className="pt-0.5 shrink-0">
            <StatusBadge status={s.status} small />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-baseline gap-3 flex-wrap">
              <p className="text-ink font-medium">{s.name}</p>
              <a
                href={adrGitHubUrl(s.adr)}
                className="text-kicker text-ink-mute hover:text-accent transition-colors tabular-nums"
                target="_blank"
                rel="noreferrer"
              >
                {s.adr}
              </a>
            </div>
            {s.evidence && (
              <p className="text-sm text-ink-soft mt-1.5 leading-relaxed">
                {s.evidence}
              </p>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}

function Tier3Block({
  observations,
  concerns,
}: {
  observations: Tier3Observation[];
  concerns: Tier3Concern[];
}) {
  const hasObs = observations?.length > 0;
  const hasConcerns = concerns?.length > 0;

  if (!hasObs && !hasConcerns) {
    return <p className="text-ink-mute italic text-sm">No human signals surfaced.</p>;
  }

  return (
    <div className="space-y-8">
      {hasObs && (
        <div>
          <p className="text-kicker text-ink-mute mb-3">
            Observations
          </p>
          <ul className="space-y-4">
            {observations.map((o, i) => (
              <li key={i} className="text-ink leading-relaxed">
                <p>
                  {o.observation}
                  <span className="ml-2 text-kicker text-ink-mute tabular-nums">
                    {o.adr}
                  </span>
                </p>
                {o.evidence && (
                  <p className="text-sm text-ink-soft mt-1">{o.evidence}</p>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
      {hasConcerns && (
        <div>
          <p className="text-kicker text-ink-mute mb-3">
            Concerns surfaced for review
          </p>
          <ul className="space-y-5">
            {concerns.map((c, i) => (
              <li key={i} className="text-ink">
                <p className="leading-relaxed">
                  {c.concern}
                  <span className="ml-2 text-kicker text-ink-mute">
                    {c.adr}
                  </span>
                </p>
                <p className="text-sm text-ink-soft italic mt-2 pl-4 border-l border-border">
                  Ask: {c.screen_question}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function StatusBadge({ status, small }: { status: string; small?: boolean }) {
  const tone = statusTone(status);
  const sizing = small ? 'text-2xs px-1.5 py-0.5' : 'text-xs px-2 py-1';
  return (
    <span
      className={`inline-block ${sizing} uppercase tracking-[0.1em] font-mono ${tone}`}
    >
      {status}
    </span>
  );
}

function statusTone(status: string): string {
  const s = status.toLowerCase();
  if (s === 'pass' || s === 'strong') {
    return 'bg-tier-1/8 text-tier-1 border border-tier-1/20';
  }
  if (s === 'present') {
    return 'bg-tier-2/8 text-tier-2 border border-tier-2/20';
  }
  if (s === 'weak' || s === 'fail') {
    return 'bg-tier-3/8 text-tier-3 border border-tier-3/20';
  }
  if (s === 'surface') {
    return 'bg-surface-2 text-ink-soft border border-border';
  }
  return 'bg-surface-2 text-ink-soft border border-border';
}
