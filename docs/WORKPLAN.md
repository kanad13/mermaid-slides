# Work Plan

Active tracker for the hardening programme started 14 Aug 2026. Read this first at the start of any
session; it is the source of truth for what is done, what is next, and what was deliberately declined.

[docs/LATER.md](LATER.md) remains the long-range idea backlog. Where the two overlap, this file wins.

---

## Branch order

Branches run **strictly sequentially**. They must not be developed in parallel — the typing work in S8
rewrites props across fourteen component files and conflicts with every UI change.

| Order | Branch                | Contents                          | Target  | Status      |
| ----- | --------------------- | --------------------------------- | ------- | ----------- |
| 1     | `security/hardening`  | C0, S1, S7, S8, S5, S9, S10, S11   | v1.3.0  | in progress |
| 2     | `ux/foundations`      | U13, U14, U8, U3, U7, U9, U1       | v1.4.0  | not started |
| 3     | `ux/features`         | U6, U10, U12                       | v1.5.0  | not started |
| 4     | `feat/print-to-pdf`   | Print stylesheet export            | v1.6.0  | not started |
| —     | `deps/majors`         | Major version migrations           | —       | parked      |

Rollback floor for the whole programme: tag `checkpoint/pre-hardening-v1.2.1`.

---

## Branch 1 — `security/hardening`

| ID   | Task                                                          | Status |
| ---- | ------------------------------------------------------------- | ------ |
| —    | Work plan and manual test checklist                            | done   |
| C0   | Validation workflow for branches and pull requests             | todo   |
| S1   | Contain path traversal in the offline package's Node server    | todo   |
| S7   | Update dependencies within existing majors                     | todo   |
| S8   | Make TypeScript checking actually run, fix resulting errors    | todo   |
| S5   | Content-Security-Policy                                        | todo   |
| S9   | Docker image hardening                                         | todo   |
| S10  | Reproducible releases and pinned CI actions                    | todo   |
| S11  | Replace the `innerHTML` modals with React components           | todo   |

## Branch 2 — `ux/foundations`

Behaviour-preserving except the U1 bug fix. **Acceptance test: the app looks and behaves identically,
and the silent no-op is gone.** Any visible difference is a regression.

| ID   | Task                                                          | Status |
| ---- | ------------------------------------------------------------- | ------ |
| U13  | Remove dead components, de-duplicate `useFileHandler`          | todo   |
| U14  | Fix the Open Graph preview image path                          | todo   |
| U8   | Clean up the uncancelled timer in `GridView`                   | todo   |
| U3   | Remove the hardcoded layout arithmetic                         | todo   |
| U7   | One Mermaid instance, cache rendered diagrams                  | todo   |

**Measured severity of U7/U8.** Grid view does not finish rendering. Against the sample deck, the
production build leaves previews stuck on "Loading preview…" — 5 of 8 blank before the S7 dependency
update, 2 of 8 after it. The effect re-runs when `isLoaded` flips, starting a second render loop that
races the first, and each call clears the container the other is writing into. The dependency update
changed the timing but not the defect. Fixing U8 then U7 should close this; verify with the grid step
of the smoke checklist, not by eye on a three-slide deck.
| U9   | Debounce parsing                                               | todo   |
| U1   | Fix the silent no-op on paste-then-present                     | todo   |

## Branch 3 — `ux/features`

| ID   | Task                                                          | Status |
| ---- | ------------------------------------------------------------- | ------ |
| U6   | Dark mode and opt-in settings persistence                      | todo   |
| U10  | Accessibility pass                                             | todo   |
| U12  | Presenter affordances                                          | todo   |

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

Add the branch and pull-request validation workflow (C0).

## Backlog

Found during the work, deliberately not acted on yet.

_(empty)_
