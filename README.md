# Notes on long-term memory for high-volume recruiting

*An ADR-driven methodology applied to applicant triage. A demonstration, not a tool.*

## What this is

I'm Manu Kapoor. I wrote this as a candidate in a clinical-software company's interview process, for a Staff Developer, Frontend Foundations role. After a screen call with one of their senior engineers, I kept thinking about how the methodology I run on Pecking Order (long-term memory via ADRs and self-learning guardrails) might apply to recruiting work. This document is what came out of that thinking. It was written for that company's team first; it's since been generalized into a standing demonstration that the approach transfers across domains, and the corpus and examples now use Larkspur Health, a fictional stand-in company.

It's not a product. It's not a pitch. It's not asking for anything. It's a piece of thinking, with code and corpus as evidence that the thinking is real.

Their mission centers on reducing toil for the clinicians they serve. This document is in that spirit: a methodology that aims to reduce recruiter toil so recruiters can give every candidate a considered look. Same shape of problem, different surface.

## The problem this is about

High-volume recruiting has a particular shape of toil:

- Many applications. Some are obviously bogus, some clearly aren't, most sit somewhere in the middle.
- Decisions need to be consistent across days, across recruiters, across role types.
- What you decide today drifts from what you decided last quarter unless something keeps it anchored.
- Audit trails — *"why did we pass on candidate X?"* — get reconstructed from memory weeks later, when memory has moved on.

Each is a different toil node. They share a root: recruiting decisions are knowledge that doesn't have a good place to live. It lives in a recruiter's head. It lives in Slack threads. It lives in old ATS notes nobody reads. It doesn't accumulate into something the team can lean on tomorrow.

That's the problem this methodology is about — not "summarize this call faster." Anyone can do that with a one-shot prompt. The harder problem is making the *system* of recruiting decisions remember itself.

## The methodology

I run a project called Pecking Order, a production multiplayer game engine I'm building solo through my consultancy. As of July 2026 its corpus runs to 150+ architectural decision records (the log reaches ADR-151), 62 guardrail rules, and 21 custom Claude Code skills. That guardrail count is down from 66 in May. The drop is the method working, not decaying: retiring a rule that's outlived its purpose is part of the discipline. A corpus that shrinks on purpose is a corpus being maintained. The velocity is real too: 1,302 commits since February 2026, with a peak of 579 in a single 30-day window in May. The methodology itself is now extracted and documented as its own repository, [guardian-loop](https://github.com/porlock-research/guardian-loop). The structure transfers naturally to recruiting, in three pieces:

### 1. ADRs as long-term memory

Every stable decision becomes a written record: a short document with the decision, the context, the alternatives considered, and the rationale. The corpus of ADRs is the institutional memory. It lives in version control. It's queryable, citable, reviewable. Other recruiters can read it. New hires can learn from it. It outlasts any individual person's memory.

For recruiting, each role gets a corpus of stable decisions. *"We reject candidates whose materials show no engagement with the specific role they're applying to."* *"We hold candidates with strong adjacent experience but unclear fit until we have more candidates to compare against."* *"Our compensation framework for Staff IC at this stage is anchored to these inputs."* Each is a one-page ADR with reasoning, in plain language.

You can browse the seed corpus in [`/corpus`](./corpus). The index is [`/corpus/decisions.md`](./corpus/decisions.md).

### 2. Skills as named procedures

The system has a small set of named procedures the recruiter invokes:

- `triage-application` — reads an inbound application, proposes a triage decision (move forward / hold / pass) with reasoning anchored to existing ADRs.
- `summarize-screen` — reads a screen-call transcript, produces a candidate decision-record draft in the corpus convention.
- `update-corpus` — takes a finalized decision and proposes a new ADR ready to add to the corpus.
- `reflect` — runs against the corpus itself, on demand, to suggest updates, consolidations, and archival. The meta-skill. See section 4.

The skills are documented, reusable, and produce structured output in the same format every time. A new recruiter joining the team can use the same skills the senior recruiters use. The outputs share a shape, which makes them easier to compare, review, and audit.

Skill definitions are in [`/skills`](./skills).

### 3. Self-learning hooks

This is the part that got the strongest reaction when I described it in that conversation as "self-learning guardrails." In implementation, these are hooks: executable checks that fire at key points in the workflow.

When the system makes a triage call that gets overridden by a human — say, the recruiter passes on a candidate the system flagged as a hold, or moves forward with someone the system flagged for pass — a hook captures the override. The recruiter runs `update-corpus` and a new ADR is generated, capturing the reason for the override. Another hook validates the format of the new ADR before it's added to the corpus.

The next time a similar pattern shows up, the corpus has guidance. The system's recommendations get more aligned with the team's actual judgment over time, not because "the AI gets smarter on its own" (that's marketing fiction), but because the team's accumulated decisions get *captured* instead of evaporating.

Hook definitions are in [`/hooks`](./hooks).

### 4. Reflection cycles

The corpus accumulates over weeks and months. Some ADRs become stale as roles change. Some get cited often, signaling they're working. Patterns emerge across multiple ADRs that suggest consolidation. Without periodic review, the corpus drifts toward noise.

The `reflect` skill audits the corpus on demand. The recruiter runs it monthly, or after a notable burst of activity. It:

- Identifies ADRs not referenced in recent triages (candidates for archival or update)
- Identifies patterns across recent overrides that suggest a new stable ADR
- Surfaces contradictions or duplications between existing ADRs
- Suggests skill updates based on observed patterns

The output is a structured set of proposed changes. Nothing applies automatically. The recruiter reviews the proposals, accepts the ones that make sense, and the corpus updates accordingly.

This is how the methodology evolves with the team. Decisions accumulate, hooks capture them, reflection consolidates. The corpus stays useful.

`reflect` is documented in [`/skills/reflect.md`](./skills/reflect.md).

## Where humans stay in charge

There's a tension at the core of high-volume recruiting. The work is transactional by necessity — you can't give 500 applications the same attention you'd give five. But it's still about humans, and treating it as pure pattern-matching is how candidates get reduced to keyword soup and good people slip through.

The methodology handles this with a three-tier signal model. As the signal becomes more human, the system's role shrinks and the recruiter's grows.

**Tier 1 — Floor signals.** Eligibility, location, baseline requirements, hard filters. The system handles these without ceremony. ATSes already do this; the corpus encodes them as ADRs so the criteria are visible and reviewable.

**Tier 2 — Pattern signals.** Relevant experience, domain alignment, demonstrated skills. The system pattern-matches these against the corpus — *"candidates with this shape of background tend to fit this kind of role."* Pattern-matching starts the analysis. It doesn't finish it.

**Tier 3 — Human signals.** Coherence of story. Specific engagement with this role. Voice. Whether the candidate is solving real problems or just listing them. Whether their growth is plausible. Whether they're applying because they want this work or because they want any work. These are the signals that distinguish strong candidates from competent-on-paper ones, and they're the ones the system *surfaces but never decides on.*

The hooks enforce this explicitly: a `check-tier-boundary` hook fires when `triage-application` runs and verifies that no recommendation is being made based on Tier 3 signals alone. If one is, the hook surfaces the issue and forces a Tier 3 hand-off pattern instead.

This is how the methodology stays honest about what it does and doesn't replace.

## A worked example

To make this concrete: [`/methodology/worked-example.md`](./methodology/worked-example.md) walks through one full loop end-to-end. Sample application in. Triage decision out, with reasoning anchored to specific ADRs and clearly tagged by tier. Recruiter overrides on a Tier 3 judgment. New ADR generated and indexed. The loop closes; the corpus is one piece smarter.

## What this is and isn't

- **It is** a methodology demonstration. A way of structuring recruiting knowledge so it accumulates rather than evaporates.
- **It is not** a replacement for an ATS or a production recruiting tool. Any real recruiting team already has those.
- **It is not** a system that makes hiring decisions on its own. Every triage and every override is a human call, and Tier 3 signals are explicitly the recruiter's domain. The system makes the recruiter faster and more consistent on the parts that should be faster and more consistent. It does not take over the parts that shouldn't be.
- **It is not** a polished product. The corpus is a starting point. The skills are illustrations. The point is the methodology, not the implementation.

## Try it yourself

Three ways in, depending on your tools:

**Hosted demo (browser, no account needed).** [recruiting-methodology.pages.dev](https://recruiting-methodology.pages.dev). Paste an application — or load the sample candidate with one click — and watch the methodology run: tier-tagged triage, ADR citations, and the hand-off where recruiter judgment takes over. The app's source is in [`/app`](./app).

**Claude Code plugin (CLI, for developers).** This repo is structured as a Claude Code plugin. Clone it and install via the plugin's directory, or reference it from your `.claude-plugin/` config. Skill specs are wired up with proper frontmatter; hook docs describe behavioral checks. The corpus lives in `corpus/`; treat as your starting seed.

**Copy-paste fallback (any LLM).** If you don't use Claude Code, [`system-prompt.md`](./system-prompt.md) contains a standalone version of the methodology you can paste into any LLM chat (Claude, ChatGPT, Gemini, etc.). Reference the corpus and skill specs by URL as needed during the conversation.

If you want to read the methodology end-to-end without using it, this README and the linked files are the artifact. The repo is the venue. The thinking is the work.

There's a sample candidate at [`examples/sample-application.md`](./examples/sample-application.md) you can use to test any of the three paths.

## The portfolio, if you want more

Three repos, one methodology:

- [pecking-order-prototype](https://github.com/porlock-research/pecking-order-prototype) — the production system the methodology was developed on.
- [guardian-loop](https://github.com/porlock-research/guardian-loop) — the workflow itself, extracted with its operating history.
- this repo — the same thinking applied to a non-engineering domain.

## Closing

Recruiting decisions are knowledge work. Every hire and every pass is a piece of knowledge about what the team values, what works, what doesn't. Most of that knowledge evaporates because there's nowhere good for it to live. ADRs give it a home.

This isn't a sales pitch. It's me thinking out loud about something I found interesting in that conversation. If any of it is useful to your team, take it.

— Manu Kapoor
