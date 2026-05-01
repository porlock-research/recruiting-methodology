import { useState } from 'react';
import { SAMPLE_APPLICATION, SAMPLE_ROLE } from '../lib/sample-application';

interface Props {
  roles: string[];
  onSubmit: (role: string, application: string) => void;
  loading: boolean;
  loadingMessage?: string;
}

const PLACEHOLDER = `Paste a candidate's resume and cover letter here.

Or click "Use sample candidate" to try with a fictional test case (Marcus Chen, Senior Frontend Foundations).`;

export function TriageForm({ roles, onSubmit, loading, loadingMessage }: Props) {
  const [role, setRole] = useState(roles[0]);
  const [application, setApplication] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!application.trim() || loading) return;
    onSubmit(role, application);
  }

  function handleUseSample() {
    setRole(SAMPLE_ROLE);
    setApplication(SAMPLE_APPLICATION);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-7">
      <div>
        <label
          htmlFor="role"
          className="block text-kicker text-ink-mute mb-2"
        >
          Role
        </label>
        <div className="relative">
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            disabled={loading}
            className="w-full appearance-none px-3 py-2.5 bg-surface border border-border text-ink focus:outline-none focus:border-border-strong transition-colors pr-10 cursor-pointer disabled:opacity-50"
          >
            {roles.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
          <svg
            className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-mute pointer-events-none"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <label
            htmlFor="application"
            className="text-kicker text-ink-mute"
          >
            Application materials
          </label>
          <button
            type="button"
            onClick={handleUseSample}
            disabled={loading}
            className="text-xs text-ink-mute hover:text-accent transition-colors underline decoration-1 underline-offset-[3px] disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Use sample candidate
          </button>
        </div>
        <textarea
          id="application"
          value={application}
          onChange={(e) => setApplication(e.target.value)}
          disabled={loading}
          rows={14}
          placeholder={PLACEHOLDER}
          className="w-full px-3 py-3 bg-surface border border-border text-ink placeholder:text-ink-mute focus:outline-none focus:border-border-strong transition-colors resize-y disabled:opacity-50"
        />
        <p className="mt-2 text-2xs text-ink-mute tabular-nums min-h-[1rem]">
          {application.length > 0 ? `${application.length.toLocaleString()} characters` : ''}
        </p>
      </div>

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={loading || !application.trim()}
          className="btn-lift px-5 py-2.5 bg-accent text-bg font-medium tracking-tight disabled:opacity-30 disabled:cursor-not-allowed hover:bg-accent-strong"
        >
          {loading ? (
            <span className="inline-flex items-center gap-2">
              <span className="inline-block w-3 h-3 border-2 border-bg border-t-transparent rounded-full animate-spin" />
              Triaging
            </span>
          ) : (
            'Run triage'
          )}
        </button>
        {loading && loadingMessage && (
          <p className="text-sm text-ink-mute">{loadingMessage}</p>
        )}
      </div>
    </form>
  );
}
