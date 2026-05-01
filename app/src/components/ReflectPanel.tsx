import { useState } from 'react';
import type { ReflectReport } from '../lib/types';

export function ReflectPanel() {
  const [report, setReport] = useState<ReflectReport | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function runReflect() {
    setLoading(true);
    setError(null);
    setReport(null);
    try {
      const res = await fetch('/api/reflect', { method: 'POST' });
      if (!res.ok) {
        const errBody = (await res.json()) as { error?: string };
        throw new Error(errBody.error || `Reflect failed (${res.status})`);
      }
      const data = (await res.json()) as ReflectReport;
      setReport(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Reflect failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section>
      <header className="mb-10">
        <div className="flex items-center gap-4 mb-5">
          <span aria-hidden className="block w-16 h-px bg-ink" />
          <p className="text-kicker text-ink">Reflect</p>
        </div>
        <h2 className="text-section text-ink mb-4 font-display">
          Audit the corpus<span className="period-accent">.</span>
        </h2>
        <p className="text-lead text-ink-soft max-w-prose mb-8">
          The methodology evolves through reflection. Run it to surface coverage gaps, tier-coherence concerns, and the most valuable next ADRs to add. Output is proposals; nothing applies automatically. The recruiter decides what to accept.
        </p>
        <div className="flex items-center gap-4 flex-wrap">
          <button
            type="button"
            onClick={runReflect}
            disabled={loading}
            className="btn-lift px-5 py-2.5 bg-accent text-bg font-medium tracking-tight disabled:opacity-30 disabled:cursor-not-allowed hover:bg-accent-strong"
          >
            {loading ? (
              <span className="inline-flex items-center gap-2">
                <span className="inline-block w-3 h-3 border-2 border-bg border-t-transparent rounded-full animate-spin" />
                Reflecting
              </span>
            ) : (
              'Run reflect'
            )}
          </button>
          {loading && (
            <p className="text-sm text-ink-mute">
              Auditing 9 ADRs across 3 tiers…
            </p>
          )}
        </div>
      </header>

      {error && (
        <div className="mt-6 p-4 border border-border bg-surface">
          <p className="text-sm text-ink-soft">
            <span className="font-mono text-2xs uppercase tracking-wider text-accent mr-2">Error</span>
            {error}
          </p>
        </div>
      )}

      {report && <ReflectResult report={report} />}
    </section>
  );
}

function ReflectResult({ report }: { report: ReflectReport }) {
  return (
    <div className="mt-10 pt-8 border-t border-border space-y-10">
      <div>
        <p className="text-kicker text-ink-mute mb-2">
          Summary
        </p>
        <p className="text-lg text-ink leading-relaxed">{report.summary}</p>
      </div>

      {report.suggested_new_adrs?.length > 0 && (
        <Block label="Suggested new ADRs" emphasis>
          <ul className="space-y-5">
            {report.suggested_new_adrs.map((s, i) => (
              <li key={i}>
                <div className="flex items-baseline gap-3 flex-wrap">
                  <p className="text-ink font-medium">{s.title}</p>
                  <span className="text-kicker text-ink-mute">
                    Tier {s.tier}
                  </span>
                </div>
                <p className="text-sm text-ink-soft mt-1.5 leading-relaxed">
                  {s.rationale}
                </p>
              </li>
            ))}
          </ul>
        </Block>
      )}

      {report.coverage_gaps?.length > 0 && (
        <Block label="Coverage gaps">
          <ul className="space-y-5">
            {report.coverage_gaps.map((g, i) => (
              <li key={i}>
                <div className="flex items-baseline gap-3 flex-wrap">
                  <p className="text-ink">{g.gap}</p>
                  <span className="text-kicker text-ink-mute">
                    Tier {g.suggested_tier}
                  </span>
                </div>
                <p className="text-sm text-ink-soft mt-1.5 leading-relaxed">
                  {g.why_it_matters}
                </p>
              </li>
            ))}
          </ul>
        </Block>
      )}

      {report.anti_bias_observations?.length > 0 && (
        <Block label="Anti-bias observations">
          <ul className="space-y-5">
            {report.anti_bias_observations.map((o, i) => (
              <li key={i}>
                <p className="text-ink">{o.concern}</p>
                <p className="text-sm text-ink-soft mt-1.5 leading-relaxed italic pl-4 border-l border-border">
                  Suggested guardrail: {o.suggested_guardrail}
                </p>
              </li>
            ))}
          </ul>
        </Block>
      )}

      {report.tier_coherence_notes?.length > 0 && (
        <Block label="Tier coherence">
          <ul className="space-y-3">
            {report.tier_coherence_notes.map((n, i) => (
              <li key={i} className="text-ink-soft leading-relaxed">
                <span className="text-kicker text-ink-mute mr-2">
                  {n.adr}
                </span>
                {n.note}
              </li>
            ))}
          </ul>
        </Block>
      )}

      {report.consolidation_candidates?.length > 0 && (
        <Block label="Consolidation candidates">
          <ul className="space-y-3">
            {report.consolidation_candidates.map((c, i) => (
              <li key={i} className="text-ink-soft leading-relaxed">
                <span className="text-kicker text-ink-mute mr-2">
                  {c.adrs.join(' + ')}
                </span>
                {c.note}
              </li>
            ))}
          </ul>
        </Block>
      )}
    </div>
  );
}

function Block({
  label,
  emphasis,
  children,
}: {
  label: string;
  emphasis?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p
        className={`text-2xs uppercase tracking-[0.2em] mb-4 ${
          emphasis ? 'text-accent' : 'text-ink-mute'
        }`}
      >
        {label}
      </p>
      {children}
    </div>
  );
}
