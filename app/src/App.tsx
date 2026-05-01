import { useState } from 'react';
import { TriageForm } from './components/TriageForm';
import { TriageResult } from './components/TriageResult';
import type { TriageResult as TriageResultType } from './lib/types';

const ROLES = [
  'Senior Developer — Frontend Foundations',
  'Senior Developer — Backend Foundations',
  'Senior Developer — Platform & Extensions',
  'Staff Developer — Frontend Foundations',
  'Staff Developer — Onboarding',
  'Staff Engineer — Jane AI',
  'Software Development Manager',
];

function App() {
  const [result, setResult] = useState<TriageResultType | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(role: string, application: string) {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch('/api/triage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role, application }),
      });
      if (!res.ok) {
        const errBody = (await res.json()) as { error?: string };
        throw new Error(errBody.error || `Triage failed (${res.status})`);
      }
      const data = (await res.json()) as TriageResultType;
      setResult(data);
      // Smooth scroll to result
      requestAnimationFrame(() => {
        document.getElementById('triage-result')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Triage failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen px-6 py-16 md:px-12 md:py-24">
      <div className="max-w-prose mx-auto">
        <header className="mb-16">
          <p className="text-2xs uppercase tracking-[0.2em] text-ink-mute mb-5">
            A small thing for Alain
          </p>
          <h1 className="text-4xl md:text-5xl font-display font-medium leading-[1.1] tracking-tight text-ink mb-6">
            Recruiting methodology, running.
          </h1>
          <p className="text-lg text-ink-soft leading-relaxed">
            Paste an inbound application below. The methodology runs against a corpus of decision records grounded in Jane's open roles. You'll get a tier-tagged triage with cited reasoning, and a clear hand-off where recruiter judgment is needed.
          </p>
          <p className="mt-4 text-sm text-ink-mute leading-relaxed">
            Built as a follow-up to our conversation. No sign-up. No install. Source on{' '}
            <a
              href="https://github.com/porlock-research/recruiting-methodology"
              className="underline decoration-1 underline-offset-4 hover:text-accent transition-colors"
            >
              GitHub
            </a>
            .
          </p>
        </header>

        <TriageForm
          roles={ROLES}
          onSubmit={handleSubmit}
          loading={loading}
        />

        {error && (
          <div className="mt-10 p-4 border border-border bg-surface">
            <p className="text-sm text-ink-soft">
              <span className="font-mono text-2xs uppercase tracking-wider text-accent mr-2">Error</span>
              {error}
            </p>
          </div>
        )}

        {result && (
          <div id="triage-result" className="mt-20 pt-12 border-t border-border">
            <TriageResult result={result} />
          </div>
        )}

        <footer className="mt-32 pt-8 border-t border-border">
          <p className="text-sm text-ink-mute leading-relaxed">
            Built by{' '}
            <a
              href="https://manukapoor.ca"
              className="text-ink-soft underline decoration-1 underline-offset-4 hover:text-accent transition-colors"
            >
              Manu Kapoor
            </a>
            . Methodology grounded in Jane's actual open roles. The corpus, skills, and hooks are documented in{' '}
            <a
              href="https://github.com/porlock-research/recruiting-methodology"
              className="text-ink-soft underline decoration-1 underline-offset-4 hover:text-accent transition-colors"
            >
              the repo
            </a>
            .
          </p>
        </footer>
      </div>
    </main>
  );
}

export default App;
