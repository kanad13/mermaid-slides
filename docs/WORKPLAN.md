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
| 2     | `ux/foundations`      | B1, U13, U8, U3, U7, U9, U1        | v1.4.0  | in progress |
| 3     | `ux/features`         | U6, U10, U12                       | v1.5.0  | not started |
| 4     | `feat/print-to-pdf`   | Print stylesheet export            | v1.6.0  | not started |
| —     | `deps/majors`         | Major version migrations           | —       | parked      |

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
| U8   | Clean up the uncancelled timer in `GridView`                   | todo   |
| U3   | Remove the hardcoded layout arithmetic                         | todo   |
| U7   | One Mermaid instance, cache rendered diagrams                  | todo   |
| U9   | Debounce parsing                                               | todo   |
| U1   | Fix the silent no-op on paste-then-present                     | todo   |

**Measured severity of U7/U8.** Grid view does not finish rendering. Against the sample deck, the
production build leaves previews stuck on "Loading preview…" — 5 of 8 blank before the S7 dependency
update, 2 of 8 after it. The effect re-runs when `isLoaded` flips, starting a second render loop that
races the first, and each call clears the container the other is writing into. The dependency update
changed the timing but not the defect. Fixing U8 then U7 should close this; verify with the grid step
of the smoke checklist, not by eye on a three-slide deck.

## Branch 3 — `ux/features`

| ID   | Task                                                          | Status |
| ---- | ------------------------------------------------------------- | ------ |
| U6   | Dark mode and opt-in settings persistence                      | todo   |
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
| E1   | Print stylesheet, one slide per page, landscape                | todo   |

---

## Ordering constraints

These are not arbitrary. Changing the order breaks something concrete.

- **S8 before all UI work.** It changes how every later component gets written. Deferring it means
  writing new code under a typechecker that silently checks nothing, then fixing the same code twice.
- **U8 → U3 → U7.** All three touch `DiagramViewer` and `GridView`. Caching a wrongly-sized render is
  worse than not caching, so sizing is corrected before caching is introduced.
- **U7 before U6.** Dark mode passes a theme into Mermaid; U7 is what creates a single instance to
  pass it to.
- **S11 before U6.** S11 moves the privacy policy into a component. U6 introduces the first
  `localStorage` write in the app's history, which amends that policy — better to edit a component
  than an HTML string.
- **E1 last.** Print export renders every slide at once, which depends on the shared renderer from U7.

---

## Decisions

Recorded so they are not re-litigated in a later session.

**Dependencies — semver now, majors later.** Every one of the 23 advisories is fixable inside the
existing major versions. Majors (`tailwindcss` 4, `typescript` 7, `eslint` 10, `vitest` 4, `vite` 8,
`lucide-react` 1.x, `jsdom` 30) are parked on `deps/majors` so that a migration failure is never
confused with a security fix.

**Remote images are not blocked.** The CSP permits them. Users place remote images in their markdown
deliberately, and breaking those decks would be user-hostile. The consequence is that a remote image
does reach a third-party server and reveals the viewer's IP and user agent. The documentation states
this plainly rather than claiming otherwise.

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

`security/hardening` is merged and released as v1.3.0.

Next: start `ux/foundations` from a fresh branch off master, beginning with U13. Open a new session
for it — the branch is a clean boundary and nothing from this one needs to carry over beyond this
file.

Before starting, run the opening ritual above and confirm the tree is green.

## Backlog

Found during the work, deliberately not acted on because they fall outside the current scope.
Each needs a decision before it is scheduled.

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

**B6 — README badges load from `img.shields.io`.**
Six badges fetch images from a third party whenever the README is viewed. This affects GitHub's
rendering of the repository page, not the app, and no user of Mermaid Slides is exposed by it. Noted
only because it is the last third-party request anywhere in the project.
