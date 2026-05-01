import { useState } from 'react';
import { TriageForm } from './components/TriageForm';
import { TriageResult } from './components/TriageResult';
import { CorpusViewer } from './components/CorpusViewer';
import { ReflectPanel } from './components/ReflectPanel';
import { TechnicalDetails } from './components/TechnicalDetails';
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

const LOADING_MESSAGES = [
  'Reading the corpus, applying hooks…',
  'Querying ADRs, checking tier boundaries…',
  'Surfacing observations, formatting handoff…',
];

function App() {
  const [result, setResult] = useState<TriageResultType | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(role: string, application: string) {
    setLoading(true);
    setLoadingMessage(LOADING_MESSAGES[Math.floor(Math.random() * LOADING_MESSAGES.length)]);
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
      <div className="max-w-[1100px] mx-auto">
        {/* Hero — anchors the page; left-aligned with a small marker on the kicker */}
        <header className="mb-28 md:mb-36">
          <div className="flex items-center gap-4 mb-7">
            <span aria-hidden className="block w-16 h-px bg-ink" />
            <p className="text-kicker text-ink">A small thing for Alain</p>
          </div>
          <h1 className="text-hero text-ink mb-8 font-display max-w-[14ch]">
            Recruiting&nbsp;methodology, running<span className="period-accent">.</span>
          </h1>
          <p className="text-lead text-ink-soft max-w-prose">
            Paste an inbound application below. The methodology runs against a corpus of decision records grounded in Jane&rsquo;s open roles, returns a tier-tagged triage with cited reasoning, and hands off cleanly where recruiter judgment is needed.
          </p>
          <p className="mt-5 text-sm text-ink-mute leading-relaxed max-w-prose">
            Built as a follow-up to our conversation. No sign-up. No install. Source on{' '}
            <a
              href="https://github.com/porlock-research/recruiting-methodology"
              className="underline decoration-1 underline-offset-[3px] hover:text-accent transition-colors"
            >
              GitHub
            </a>
            .
          </p>
        </header>

        {/* Form — narrower, lives in prose width */}
        <div className="max-w-prose">
          <TriageForm
            roles={ROLES}
            onSubmit={handleSubmit}
            loading={loading}
            loadingMessage={loadingMessage}
          />

          {error && (
            <div className="mt-10 p-5 border border-border bg-surface">
              <p className="text-sm text-ink-soft">
                <span className="font-mono text-2xs uppercase tracking-wider text-accent mr-2">Error</span>
                {error}
              </p>
            </div>
          )}
        </div>

        {/* Triage result — also prose width, with breathing room above */}
        {result && (
          <div id="triage-result" className="max-w-prose mt-24 pt-14 border-t border-border">
            <TriageResult result={result} />
          </div>
        )}

        {/* Corpus — breaks out wider, signaling "this is the methodology, not the tool" */}
        <div className="mt-32 md:mt-40 pt-16 border-t border-border-strong">
          <CorpusViewer />
        </div>

        {/* Reflect — back to prose width with generous space */}
        <div className="max-w-prose mt-32 md:mt-40 pt-16 border-t border-border">
          <ReflectPanel />
        </div>

        {/* Technical details — wider canvas, two-column on md+ */}
        <div className="mt-32 md:mt-40 pt-16 border-t border-border-strong">
          <TechnicalDetails />
        </div>

        {/* Footer — pure space separation, no border */}
        <footer className="mt-40 pt-10 max-w-prose">
          <div className="flex items-center gap-4 mb-5">
            <span aria-hidden className="block w-10 h-px bg-border-strong" />
            <p className="text-kicker text-ink-mute">Closing</p>
          </div>
          <p className="text-sm text-ink-mute leading-relaxed">
            Built by{' '}
            <a
              href="https://manukapoor.ca"
              className="text-ink-soft underline decoration-1 underline-offset-[3px] hover:text-accent transition-colors"
            >
              Manu Kapoor
            </a>
            {' '}as a follow-up to a conversation. The corpus, skills, and hooks are documented in{' '}
            <a
              href="https://github.com/porlock-research/recruiting-methodology"
              className="text-ink-soft underline decoration-1 underline-offset-[3px] hover:text-accent transition-colors"
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
