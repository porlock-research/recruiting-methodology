interface SkillRow {
  name: string;
  purpose: string;
}

const SKILLS: SkillRow[] = [
  { name: 'triage-application', purpose: 'reads an inbound application, produces a tier-tagged triage with ADR-cited reasoning' },
  { name: 'summarize-screen', purpose: 'turns a screen-call transcript into a structured candidate decision record' },
  { name: 'update-corpus', purpose: 'captures recruiter overrides as proposed new ADRs ready to add to the corpus' },
  { name: 'reflect', purpose: 'audits the corpus on demand for coverage gaps, contradictions, and consolidation opportunities' },
];

const HOOKS: SkillRow[] = [
  { name: 'check-tier-boundary', purpose: 'blocks the system from making a recommendation on Tier 3 signals alone' },
  { name: 'validate-adr-format', purpose: 'enforces structural completeness on every new ADR before it joins the corpus' },
  { name: 'flag-pii-concerns', purpose: 'redacts unnecessary PII (full addresses, phone, DOB) from triage outputs' },
  { name: 'anti-bias-check', purpose: 'removes school-based, name-based, and location-as-proxy reasoning before output' },
  { name: 'check-corpus-coherence', purpose: 'detects contradictions or duplications when proposing a new ADR' },
];

export function TechnicalDetails() {
  return (
    <section>
      <header className="mb-12 max-w-prose">
        <div className="flex items-center gap-4 mb-5">
          <span aria-hidden className="block w-16 h-px bg-ink" />
          <p className="text-kicker text-ink">Technical details</p>
        </div>
        <h2 className="text-section text-ink mb-4 font-display">
          Methodology, in summary<span className="period-accent">.</span>
        </h2>
        <p className="text-lead text-ink-soft">
          What runs when you click <span className="italic">Run triage</span>, where the methodology comes from, and how it&rsquo;s built. Source on{' '}
          <a
            href="https://github.com/porlock-research/recruiting-methodology"
            className="underline decoration-1 underline-offset-[3px] hover:text-accent transition-colors"
          >
            GitHub
          </a>
          .
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
        <Block label="Skills" sub={`${SKILLS.length} named procedures`}>
          <DefinitionList rows={SKILLS} />
        </Block>

        <Block label="Hooks" sub={`${HOOKS.length} runtime checks`}>
          <DefinitionList rows={HOOKS} />
        </Block>

        <Block label="Corpus" sub="9 ADRs across 3 signal tiers">
          <p className="text-sm text-ink-soft leading-relaxed">
            Each ADR is a one-page record with context, decision, rationale, examples, application, and a boundary clause. Tier 1 covers eligibility; Tier 2 covers patterns; Tier 3 stays in the recruiter&rsquo;s domain — the system surfaces, never decides.
          </p>
          <p className="text-sm text-ink-soft leading-relaxed mt-3">
            Grounded in five real Jane open roles: Senior Frontend, Senior Backend, Staff Frontend Foundations, Staff Onboarding, Software Development Manager.
          </p>
        </Block>

        <Block label="Origins" sub="From engineering practice">
          <p className="text-sm text-ink-soft leading-relaxed">
            The methodology runs daily on Pecking Order, my solo-engineered multiplayer game engine: <span className="text-ink tabular-nums">148 ADRs</span>, <span className="text-ink tabular-nums">66 rule files</span>, <span className="text-ink tabular-nums">21 custom Claude Code skills</span>, <span className="text-ink tabular-nums">8 slash commands</span>, <span className="text-ink tabular-nums">6 hooks</span>.
          </p>
          <p className="text-sm text-ink-soft leading-relaxed mt-3">
            This recruiting demonstration is the same methodology, translated into recruiting vocabulary, sized to nine seed decisions.
          </p>
        </Block>

        <Block label="Stack" sub="Light, deployable in minutes">
          <DefinitionList
            rows={[
              { name: 'Frontend', purpose: 'Vite + React + TypeScript, Tailwind with custom design tokens' },
              { name: 'Backend', purpose: 'Cloudflare Pages Function calling Anthropic API (claude-sonnet-4-6)' },
              { name: 'Hosting', purpose: 'Cloudflare Pages — single-command deploy, no infrastructure to manage' },
              { name: 'Source', purpose: 'github.com/porlock-research/recruiting-methodology' },
            ]}
          />
        </Block>

        <Block label="Evolution" sub="The corpus learns from use">
          <p className="text-sm text-ink-soft leading-relaxed">
            When a recruiter overrides a system call, <span className="font-mono text-ink">update-corpus</span> captures the reason as a new ADR. Periodically, <span className="font-mono text-ink">reflect</span> audits the corpus for gaps, drift, and consolidation. Nothing applies automatically — every change is a recruiter decision.
          </p>
        </Block>
      </div>
    </section>
  );
}

function Block({
  label,
  sub,
  children,
}: {
  label: string;
  sub: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <header className="mb-5">
        <p className="text-kicker text-ink mb-1.5">{label}</p>
        <p className="text-2xs text-ink-mute uppercase tracking-[0.1em]">{sub}</p>
      </header>
      {children}
    </div>
  );
}

function DefinitionList({ rows }: { rows: SkillRow[] }) {
  return (
    <dl className="space-y-3.5">
      {rows.map((row) => (
        <div key={row.name}>
          <dt className="font-mono text-sm text-ink leading-snug">{row.name}</dt>
          <dd className="text-sm text-ink-soft leading-relaxed mt-0.5">{row.purpose}</dd>
        </div>
      ))}
    </dl>
  );
}
