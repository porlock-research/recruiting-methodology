import { useState } from 'react';
import { CORPUS, adrGitHubUrl, type ADR } from '../lib/corpus';

export function CorpusViewer() {
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  function toggle(id: string) {
    const next = new Set(expanded);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setExpanded(next);
  }

  const tier1 = CORPUS.filter((a) => a.tier === 1);
  const tier2 = CORPUS.filter((a) => a.tier === 2);
  const tier3 = CORPUS.filter((a) => a.tier === 3);

  return (
    <section>
      <header className="mb-12 max-w-prose">
        <div className="flex items-center gap-4 mb-5">
          <span aria-hidden className="block w-16 h-px bg-ink" />
          <p className="text-kicker text-ink">The corpus</p>
        </div>
        <h2 className="text-section text-ink mb-4 font-display">
          Nine decisions, three tiers<span className="period-accent">.</span>
        </h2>
        <p className="text-lead text-ink-soft">
          The triage above runs against this corpus. Each ADR is a stable decision with explicit rationale. The corpus grows when a recruiter overrides a system call; <span className="italic">reflect</span> audits it for gaps, contradictions, and consolidation opportunities.
        </p>
      </header>

      <TierGroup label="Tier 1 — Floor" sub="Eligibility, hard filters." adrs={tier1} expanded={expanded} onToggle={toggle} />
      <TierGroup label="Tier 2 — Pattern" sub="Relevant experience, demonstrable skills." adrs={tier2} expanded={expanded} onToggle={toggle} />
      <TierGroup label="Tier 3 — Human" sub="Recruiter judgment required. The system surfaces; it does not decide." adrs={tier3} expanded={expanded} onToggle={toggle} />
    </section>
  );
}

function TierGroup({
  label,
  sub,
  adrs,
  expanded,
  onToggle,
}: {
  label: string;
  sub: string;
  adrs: ADR[];
  expanded: Set<string>;
  onToggle: (id: string) => void;
}) {
  const tierColor = label.includes('Tier 1')
    ? 'bg-tier-1'
    : label.includes('Tier 2')
    ? 'bg-tier-2'
    : 'bg-tier-3';

  return (
    <div className="mb-16 last:mb-0">
      <header className="mb-6 max-w-prose">
        <div className="flex items-center gap-4 mb-3">
          <span aria-hidden className={`block w-12 h-px ${tierColor}`} />
          <p className="text-kicker text-ink">{label}</p>
        </div>
        <p className="text-sm text-ink-mute leading-relaxed">{sub}</p>
      </header>
      <ul className="border-t border-border">
        {adrs.map((adr) => (
          <li key={adr.id} className="border-b border-border">
            <button
              type="button"
              onClick={() => onToggle(adr.id)}
              className="w-full text-left py-5 flex items-baseline gap-4 md:gap-6 hover:bg-surface transition-colors group"
            >
              <span className="text-kicker text-ink-mute shrink-0 w-16 md:w-20 tabular-nums">
                {adr.id}
              </span>
              <span className="text-ink flex-1 leading-snug">{adr.title}</span>
              <span className="text-kicker text-ink-mute shrink-0 group-hover:text-accent transition-colors">
                {expanded.has(adr.id) ? '— close' : '+ open'}
              </span>
            </button>
            {expanded.has(adr.id) && (
              <div className="pb-7 pl-20 md:pl-24 pr-4 grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-5">
                <div>
                  <p className="text-kicker text-ink-mute mb-2">Decision</p>
                  <p className="text-sm text-ink leading-relaxed">{adr.decision}</p>
                </div>
                <div>
                  <p className="text-kicker text-ink-mute mb-2">Rationale</p>
                  <p className="text-sm text-ink-soft leading-relaxed">{adr.rationale}</p>
                </div>
                <a
                  href={adrGitHubUrl(adr.id)}
                  className="md:col-span-2 inline-block text-kicker text-ink-mute hover:text-accent transition-colors"
                  target="_blank"
                  rel="noreferrer"
                >
                  View full ADR ↗
                </a>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
