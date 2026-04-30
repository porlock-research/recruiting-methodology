# Worked example: end-to-end loop

This walks through one full triage loop against a real Jane opening, with a fictional candidate. The point is to make the methodology concrete — including the moment the system stops and hands the decision back to the recruiter.

## The role

[Senior Developer — Frontend Foundations](https://jane.app/careers/31a9e38d-1ca3-4d68-8ea1-a0e397b32413/senior-developer-frontend-foundations).

Reports to Hunter Jansen. The team is "actively replacing legacy patterns with modern, scalable infrastructure." Stack includes webpack/rspack/Vite, Module Federation, and the Burrito design system (web + React Native). Comp band $128k–$200k, accomplished hires around $152k.

The corpus has ADRs covering this role at all three signal tiers. Highlights of what's loaded:

- **Floor (Tier 1):** Canada-based eligibility, ability to legally work, target experience band.
- **Pattern (Tier 2):** Module Federation working knowledge, modern build tooling depth, demonstrable AI in workflow, observability tool familiarity (Sentry/Datadog).
- **Human (Tier 3) — surface only:** specific engagement with the team's public work, story coherence across roles, plausibility of growth, evidence of "clean, well-tested, documented code as a default."

See `/corpus/decisions.md` for the full index. The four most-referenced ADRs in this example are:

- **ADR-003** — Module Federation working knowledge: how to evaluate
- **ADR-004** — AI in workflow: what counts vs. what doesn't
- **ADR-007** — Absent public profile: when to weight, when not to
- **ADR-008** — Recent IC contributions vs. leadership-role gaps

## The candidate

**Priya Krishnamurthy.** Toronto, ON. 12 years frontend across mid-stage startups and one fintech. Currently Tech Lead at PayKit (fictional), where she led a Module Federation rollout across four teams. Public blog with five posts on AI-assisted development with concrete code examples. Cover letter mentions Burrito by name and asks a specific question about Module Federation deployment patterns at scale.

Application materials in `/example-materials/priya-krishnamurthy/`.

## Step 1: `triage-application`

The recruiter runs the skill. The system reads the application, queries the corpus, and produces this:

---

**Triage: Priya Krishnamurthy → Senior Developer, Frontend Foundations**

**Recommendation:** HOLD, leaning toward move forward to phone screen.

**Tier 1 — Floor:** PASS
- Canada-based (Toronto): ✓
- Available within four weeks: ✓
- Target experience band met: ✓ (12y vs. accomplished band)

**Tier 2 — Pattern:** STRONG
- Module Federation working knowledge: STRONG (led MF rollout across four teams at PayKit). See ADR-003.
- Modern build tooling depth: PRESENT (webpack and Vite mentioned with project context).
- AI in workflow: STRONG (five public blog posts with concrete examples). See ADR-004.
- Observability familiarity: PRESENT (Sentry mentioned in PayKit context).

**Tier 3 — Human signals (recruiter judgment required):**
- Specific engagement with this role: STRONG. Cover letter names Burrito specifically and asks a concrete technical question about Module Federation deployment at scale. This is not a generic letter.
- Story coherence: STRONG. 12-year arc shows steady growth into platform/lead work; fintech experience is adjacent to clinical fintech in the kind of regulatory and reliability constraints involved.
- Plausibility of growth: PRESENT. Tech Lead role is appropriate for current career stage.
- **Concerns surfaced for recruiter review:**
  - No individually-attributable shipping in the last six months (leadership role). Per ADR-008, this is not a disqualifier but does deserve a question during the screen.
  - No public GitHub presence. Per ADR-007, this can be a privacy preference rather than a signal — worth asking, not weighting against.

**Recommended next step:** Move forward to phone screen.

The Tier 1 and Tier 2 signals are strong enough to clear the floor. The Tier 3 cover-letter engagement is unusual enough to be worth the recruiter's time. The two surfaced concerns are screen questions, not pass reasons.

**Things to ask during the screen:**
- Recent individually-attributable contributions (the leadership-role question)
- Compensation expectations vs. role band ($128k–$200k)
- Reasoning behind the move from PayKit
- The Module Federation deployment question she raised — what made her ask it

---

## Step 2: Recruiter review

The recruiter reads the triage and agrees with the recommendation. They notice the system surfaced the cover-letter engagement signal but didn't weight it as heavily as they would have. Specifically, Priya's letter referenced a topic the team has been writing about publicly — that's a deeper level of engagement than just naming Burrito. The recruiter wants the corpus to learn this distinction.

They run `update-corpus` with the override note.

## Step 3: `update-corpus` generates a new ADR

The system drafts:

---

**ADR-009: Cover-letter engagement with team-specific public work**

*Tier: 3 (Human signal — recruiter judgment, system surfaces only)*
*Date: 2026-04-29*
*Triggered by: Priya Krishnamurthy application for Senior Developer — Frontend Foundations*

**Context.** A candidate's cover letter referenced a specific technical topic the hiring team has been writing about publicly. This is a deeper level of engagement than referencing items visible in the JD itself.

**Decision.** When a cover letter engages with team-specific public work — blog posts, conference talks, public RFCs, public ADRs from members of the hiring team — this counts as a stronger Tier 3 signal than referencing items in the JD.

**Rationale.** Reading what a team has publicly written, and engaging with the substance of it, is rare. It indicates genuine interest in the work, not just the role.

**Examples.**
- Reference to a Jane engineer's specific blog post on Module Federation deployment: STRONG.
- Reference to Burrito design system mentioned in the JD: NEUTRAL (visible in the JD).
- Reference to a Jane engineer's RubyConf talk: STRONG.
- Reference to "Jane's mission": NEUTRAL (visible in marketing).

**Application.** The `triage-application` skill should explicitly check for engagement with team-specific public work and flag it separately from JD-visible references. Future candidates whose cover letters demonstrate this kind of research engagement should be weighted toward move-forward.

**Boundary.** This remains a Tier 3 signal. The system surfaces it; the recruiter weighs it.

---

The recruiter reviews, makes one edit (clarifying that "team-specific" means the actual hiring team, not Jane broadly), and accepts. The new ADR is added to the corpus and indexed in `decisions.md`.

## Step 4: The corpus is one piece smarter

`/corpus/decisions.md` now lists nine ADRs, with ADR-009 newly added. The next time the `triage-application` skill runs against any candidate's application, it will check for engagement with team-specific public work and surface it explicitly.

The corpus accumulates. The methodology gets more useful with use, not because the AI got smarter, but because the team's accumulated decisions are getting captured rather than evaporating.

## What this demonstrates

- **The tier model in action.** The system tier-tagged every signal. It made a clean recommendation on Tier 1 and Tier 2. It surfaced Tier 3 observations with explicit hand-off to the recruiter.
- **Long-term memory via ADRs.** Every recommendation cited specific ADRs. Anyone reading the triage can follow the reasoning back to the corpus.
- **Self-learning hooks.** The recruiter's override fired the `update-corpus` hook, which generated a new ADR. The `validate-adr-format` hook then ensured the new ADR was well-formed before it joined the corpus. Next candidate benefits.
- **Where humans stay in charge.** The recruiter overrode the weight on a Tier 3 signal. The system didn't argue. It captured the override and updated the corpus.

The recruiter spent maybe five minutes on this. Most of that time was on the Tier 3 judgment — which is where it should be. The Tier 1 and Tier 2 work that the system handled would have taken the recruiter twenty or thirty minutes if done by hand.

The toil reduction isn't the only point. The fact that this candidate's evaluation now lives in the corpus, citable and reviewable, is the bigger one. Six months from now, if someone asks why we moved Priya forward, the answer is in `/corpus/`.
