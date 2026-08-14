# Work Plan

Active tracker for the hardening programme started 14 Aug 2026. Read this first at the start of any
session; it is the source of truth for what is done, what is next, and what was deliberately declined.

This file replaced `docs/LATER.md`, which was removed: it had become a mix of work already done, work
scheduled here, and observations stale enough to mislead. Everything worth keeping was migrated into
the backlog at the bottom. Future UI/UX work starts from a fresh review rather than from old notes.

---

## Branch order

Branches run **strictly sequentially**. They must not be developed in parallel — the typing work in S8
rewrites props across fourteen component files and conflicts with every UI change.

| Order | Branch                | Contents                          | Target  | Status      |
| ----- | --------------------- | --------------------------------- | ------- | ----------- |
| 1     | `security/hardening`  | C0, S1, S7, S8, S5, S9, S10, S11   | v1.3.0  | merged |
| 2     | `ux/foundations`      | B1, U13, U8, U3, U7, U9, U1        | v1.4.0  | merged |
| A     | `fix/audit-findings`  | Independent audit follow-up        | v1.5.0  | merged |
| 3     | `ux/features`         | U6, U10, U12, U15                  | v1.7.0  | not started |
| 4     | `feat/print-to-pdf`   | Print stylesheet export            | v1.6.0  | merged |
| —     | `deps/majors`         | Not scheduled — see Decisions      | —       | policy      |

Rollback floor for the whole programme: tag `checkpoint/pre-hardening-v1.2.1`.

---

## Branch 1 — `security/hardening`

| ID   | Task                                                          | Status |
| ---- | ------------------------------------------------------------- | ------ |
| —    | Work plan and manual test checklist                            | done   |
| C0   | Validation workflow for branches and pull requests             | done   |
| S1   | Contain path traversal in the offline package's Node server    | done   |
| S7   | Update dependencies within existing majors                     | done   |
| S8   | Make TypeScript checking actually run, fix resulting errors    | done   |
| S5   | Content-Security-Policy                                        | done   |
| S9   | Docker image hardening                                         | done   |
| S10  | Reproducible releases and pinned CI actions                    | done   |
| S11  | Replace the `innerHTML` modals with React components           | done   |

## Branch 2 — `ux/foundations`

Behaviour-preserving except the U1 bug fix. **Acceptance test: the app looks and behaves identically,
and the silent no-op is gone.** Any visible difference is a regression.

| ID   | Task                                                          | Status |
| ---- | ------------------------------------------------------------- | ------ |
| B1   | Declare the offline package as CommonJS                        | done   |
| U13  | Remove dead components, de-duplicate `useFileHandler`          | done   |
| U8   | Clean up the uncancelled timer in `GridView`                   | done   |
| U3   | Remove the hardcoded layout arithmetic                         | done   |
| U7   | One Mermaid instance, cache rendered diagrams                  | done   |
| U9   | Debounce parsing                                               | done   |
| U1   | Fix the silent no-op on paste-then-present                     | done   |

**Grid rendering — fixed by U8.** Grid view used to leave previews stuck on "Loading preview…": 5 of 8
blank before the S7 dependency update, 2 of 8 after it. The cause was the uncancelled timer, not the
render logic — the effect re-ran when `isLoaded` flipped, and because rendering awaits between
diagrams the two passes interleaved and cleared each other's containers. With cancellation the sample
deck renders **8 of 8**, and still 8 of 8 after eight rapid view toggles.

U7 was done on cost grounds rather than correctness, and paid off: re-entering grid view on the
eight-slide sample rendered over a **404ms spread** before caching and **0ms** after — every diagram
appears in the same tick. That scales with deck size.

Measuring here needs care. The browser pane throttles timers to ~1s when backgrounded, so wall-clock
figures are meaningless; the spread between first and last card is the number that means something.

Note that a cached SVG keeps the element id from wherever it was first rendered, so a diagram rendered
in the grid and later shown in single view carries a `grid-` prefixed id. That is cosmetic — the id is
only used by Mermaid's own scoped styles — but it will mislead anyone selecting on it. Audited: zero
duplicate ids in the document.

## Branch A — `fix/audit-findings` (merged, v1.5.0)

An independent audit of v1.4.0 found eleven issues. Eight were fixed here; three were reviewed and
deferred with reasons.

| Finding | Outcome |
| ------- | ------- |
| Crafted markdown could redirect the page via an injected `<meta refresh>` | fixed — images and errors are React elements |
| The bundled sample fetched an image from Wikimedia | fixed — sample uses a bundled image |
| Debounced parsing never settled | fixed — stable callback, no array in state |
| Malformed diagrams leaked DOM nodes | fixed — scratch container removed in `finally` |
| Identical cached diagrams produced duplicate ids | fixed — ids rewritten on cache insert |
| Auto-hide reclaimed no space | fixed — header collapses, `min-h-0` is the trick |
| Release docs described a broken workflow | fixed — rewritten around publish-on-merge |
| Comments and validators asserted false things | fixed — validators extended to 22 checks |
| Viewer controls clipped below ~500px | **deferred** — the app is desktop-first and no longer claims mobile support |
| Dead `isExtensionMode` branches | **deferred** — see B7 |
| Real-browser integration testing | **outstanding** — see B8 |

**The audit's central lesson.** The CSP was accepted as sufficient mitigation for markdown injection
because it blocks script. It does not block *markup*, and `<meta http-equiv="refresh">` needs no
script. Generalising from the payloads one happens to think of is the failure mode; the fix was to
stop building markup from strings entirely rather than to block another payload.

## Branch 3 — `ux/features`

| ID   | Task                                                          | Status |
| ---- | ------------------------------------------------------------- | ------ |
| U6   | Dark mode, session-only, following the OS preference           | todo   |
| U10  | Accessibility pass                                             | todo   |
| U12  | Presenter affordances                                          | todo   |
| U15  | Show which file is currently loaded                            | todo   |

**U15 context.** `CurrentFileDisplay` existed but was never rendered, so the app has never told you
which file you loaded. U13 deleted the component rather than wiring it up, because `ux/foundations`
must not change behaviour. The state is still there — `useFileHandler` tracks `fileName` and has tests
for it — so this is a matter of rendering it somewhere sensible, not rebuilding anything.

## Branch 4 — `feat/print-to-pdf`

| ID   | Task                                                          | Status |
| ---- | ------------------------------------------------------------- | ------ |
| E1   | Print stylesheet, one slide per page, landscape                | done   |

---

## Ordering constraints

These are not arbitrary. Changing the order breaks something concrete.

- **S8 before all UI work.** It changes how every later component gets written. Deferring it means
  writing new code under a typechecker that silently checks nothing, then fixing the same code twice.
- **U8 → U3 → U7.** All three touch `DiagramViewer` and `GridView`. Caching a wrongly-sized render is
  worse than not caching, so sizing is corrected before caching is introduced.
- **U7 before U6.** Dark mode passes a theme into Mermaid; U7 is what creates a single instance to
  pass it to.
- **E1 needed U7, and only U7.** Print renders every slide at once, which is affordable because the
  renderer is shared and cached. It was originally sequenced after `ux/features`; once U7 shipped that
  dependency was satisfied, so it was brought forward rather than left waiting behind unrelated work.
- **U6 must not undo E1.** When dark mode arrives it has to force light colours for print, or a
  printed deck wastes ink and reads badly. The print rules already set `print-color-adjust: exact`,
  which will preserve whatever theme is active — so the theme, not the print sheet, is what needs the
  override.

---

## Decisions

Recorded so they are not re-litigated in a later session.

**Remote images are not blocked.** The CSP permits them. Users place remote images in their markdown
deliberately, and breaking those decks would be user-hostile. The consequence is that a remote image
does reach a third-party server and reveals the viewer's IP and user agent. The documentation states
this plainly rather than claiming otherwise.

**No settings persistence, ever.** Dark mode follows `prefers-color-scheme` on load and can be
overridden for the session, but nothing is written to `localStorage` or anywhere else. Losing your
preferences on reload is the intended behaviour: the app's promise is that it retains nothing, and a
preference store is still a store. Following the OS setting gets a dark-mode user a dark app on first
paint without keeping anything — which is why persistence buys so little here.

**No blanket major upgrades.** A major version is taken when it delivers something concrete: a
security fix not backported to the current line, a capability the project needs, or end-of-life of
what we are on. Upgrading because a higher number exists is churn, and churn on a release pipeline
that publishes on merge is risk without benefit. `deps/majors` is not a scheduled branch; it is a
standing policy.

Applying that test to what is currently available:

| Available            | Take it? | Why                                                          |
| -------------------- | -------- | ------------------------------------------------------------ |
| Node 22 (CI runtime) | **Yes**  | Node 20 hit end of life 2026-04-30; CI was publishing all three channels on an unpatched runtime. Done. |
| `lucide-react` 1.x   | Later    | 0.x means every minor can break. Moving to a stable line is a stability win, but it is an icon library — schedule it with UI work, not alone. |
| Tailwind 4           | No       | CSS-first config rewrite across every component, for no user-visible gain. |
| TypeScript 7         | No       | 5.9 typechecks this project in under two seconds. |
| Vite 8, Vitest 4, ESLint 10, jsdom 30 | No | Current lines are supported and have no outstanding advisories. |

Revisit when one of them moves from "newer" to "needed".

**Server-side rendering is a non-goal.** Headless-browser PDF generation and hosted conversion
endpoints produce better output than anything achievable in the browser. They are still refused,
because they move user content off the device, which is the one thing this project promises not to do.

## Declined

Reviewed and deliberately not scheduled. Do not re-propose without new information.

- **S2** — offline servers bind `0.0.0.0`. One line from S1's fix if it is ever wanted.
- **S3** — `innerHTML` interpolation of image `alt` and `src`. The CSP in S5 blocks the resulting
  script execution, so this is mitigated rather than removed.
- **S4** — Mermaid `securityLevel: 'loose'`.
- **S6** — remote-image leakage. Superseded by the decision above.
- **U2, U4, U5, U11** — button state, swipe navigation, fullscreen, landing-page decluttering.
- **U14** — resolved on `security/hardening` instead: the broken `og:image` was removed rather than
  repaired, along with the Twitter card block, so there is nothing left to fix.
- **Export beyond print** — PPTX, jsPDF, SVG, PNG and ZIP export were all considered and declined.

---

## Session ritual

**Opening.** `git status`, `git log --oneline master..HEAD`, read this file, then run the green check
below **before touching anything**. Never begin work on a red tree; you inherit the breakage as yours.

```bash
npx tsc --noEmit -p config/tsconfig.json && npm run lint && npm run test:run
```

**Closing.** Tree green and committed, statuses above updated, and the next action written down. Never
end a session mid-refactor.

**Scope discipline.** Anything discovered mid-task goes into the backlog below, never into the current
branch. If a diff exceeds roughly twice its estimate, stop and re-scope rather than push through.

**Tripwires.** Stop and re-read this file when: editing a file that was not predicted; changing a test
that was not meant to change; making the same class of edit three times without committing; unable to
name the current task ID from memory; or leaving the tree red through more than one edit cycle.

---

## Next action

`feat/print-to-pdf` is merged and released as v1.6.0. PDF export was the agreed stopping point for
this programme, and the repository is at a clean checkpoint: tree clean, all channels verified, docs
matching the code.

Independent audit of v1.6.0 is the next step, before any further work.

Remaining scheduled work, in order, whenever it resumes:

1. `ux/features` — U6 (dark mode, session-only, following the OS preference), U10 (accessibility,
   confirmed outstanding by audit), U12, U15.
2. Backlog items B2, B3, B5, B7, B8 — each needs a decision, not just implementation.

Before starting anything, run the opening ritual above and confirm the tree is green.

## Backlog

Found during the work, deliberately not acted on because they fall outside the current scope.
Each needs a decision before it is scheduled.

**B8 — Successful Mermaid renders cannot be tested outside a real browser.**
Mermaid needs SVG layout APIs — `getBBox`, `getComputedTextLength` — that jsdom does not implement,
so a successful render cannot be exercised in the current suite; attempts hang rather than fail.
Parse failures happen before any of that and are covered. Closing the gap means browser-mode Vitest,
which adds Playwright as a dependency — a call to make against the standing policy on majors and
dependencies rather than by default. Until then, rendering, layout and CSP behaviour are verified by
the manual matrix in [TESTING.md](TESTING.md).

**B7 — `isExtensionMode` is unreachable in this app.**
The prop is threaded through Viewer, ViewerHeader, GridView, BackButton and SettingsPanel, and every
`isExtensionMode === true` branch is dead: nothing in this repository ever passes it. An audit flagged
it as dead code. It was deliberately left in place, because it is a seam for the separate VS Code
extension repositories rather than an accident, and removing it touches six files to save nothing a
user can perceive. Decide whether those extensions will ever share these components; if not, delete
the prop and its branches in one pass.

**B2 — The offline package ships a redundant copy of the server scripts.**
Vite copies all of `public/` into the build, which includes `public/offline-template/`, so the archive
contains both `start-server.js` and `offline-template/start-server.js`. Harmless but confusing, and it
means a user could edit the copy that is never run.

**B3 — `KeyboardShortcutsHelp` tests log React `act(...)` warnings.**
The tests pass, but the component's timer-driven state update is not wrapped, so every run prints a
warning. Noise that trains people to ignore test output.

**B4 — `scripts/validate-continuity.cjs` only checks that files exist.**
It does not verify that documentation links resolve, that README anchors are still valid, or that
version strings match `package.json`. Extending it is what would turn documentation drift into a build
failure rather than a matter of discipline — the reason the privacy claims were able to go stale in
the first place.

**B5 — There is no single release-prep command.**
Building `dist/`, building `offline-package/`, zipping the archive and running a local Docker build are
four separate steps done by hand before a merge. A script would make the pre-merge matrix in
[TESTING.md](TESTING.md) one command instead of a checklist to follow correctly.

**B6 — resolved.** The shields.io badges are gone, replaced with emoji and plain links. No image is
fetched, nothing needs hosting, and the row renders in any Markdown viewer including plain text. The
badges also carried a stale anchor (`#-privacy--security`) that no longer matched any heading.
