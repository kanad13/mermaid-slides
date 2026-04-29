## Future Work for Mermaid Slides

The items below are the recommended follow-ups, in order of value.

---

## 1. Dependency refresh and release reproducibility

### Why this is worth doing

- The current stack is on stable major lines: React 19, Mermaid 11, Vite 7, Vitest 3, Tailwind 3.4.
- There are safe patch/minor updates available for several direct dependencies.
- `npm audit` currently reports vulnerabilities, and most of the practical wins come from patch/minor updates first.
- The repo currently ignores `package-lock.json`, so automated deploys are **compatible** but not fully **reproducible**. GitHub Actions falls back to `npm install`, which can float to newer compatible versions over time.

### Code updates required

- Update direct dependencies with safe patch/minor bumps first:
  - `mermaid` → `11.14.0`
  - `react` / `react-dom` → `19.2.5`
  - `vite` → `7.3.2`
  - `postcss` → `8.5.12`
  - `@testing-library/react` → `16.3.2`
  - `autoprefixer` → `10.5.0`
  - `eslint` / `@eslint/js` → latest 9.x patches
  - `typescript-eslint` → latest 8.x patch/minor
- Decide whether to start tracking `package-lock.json` in git.
- If lockfile tracking is adopted:
  - remove the `package-lock.json` ignore rules from `.gitignore`
  - commit the lockfile
  - simplify CI from `npm ci || npm install` to `npm ci`
- Re-run `npm run test:run`, `npm run lint`, `npm run build`, `npm run build:offline`, `npm run validate:compatibility`, and `npm run validate:continuity`.

### Docs updates required

- Update dependency/version references in `README.md` and `docs/CONTRIBUTING.md` if versions are bumped.
- Update deployment notes if Node or Docker requirements change.
- Add a short note explaining whether builds are lockfile-pinned or semver-floating.

### Keep for later / separate branch

- Tailwind 4, Vite 8, Vitest 4, ESLint 10, TypeScript 6, and `lucide-react` 1.x should be handled in a dedicated upgrade branch, not mixed into the safer maintenance update.

---

## 2. Mermaid/rendering security hardening

### Why this is worth doing

- `src/hooks/useMermaid.ts` currently initializes Mermaid with `securityLevel: 'loose'`.
- `src/components/Viewer/DiagramViewer.tsx` and `src/components/Viewer/GridView.tsx` interpolate user-derived values into `innerHTML` strings.
- The current implementation is fine for many normal files, but this is the highest-value hardening pass for untrusted markdown input.

### Code updates required

- Re-evaluate Mermaid security mode and switch to a stricter option if feature compatibility allows it.
- Replace string-based DOM creation in viewer components with safer React rendering or explicit DOM APIs.
- Escape or avoid direct interpolation of:
  - image `src`
  - image `alt`
  - error messages
  - fallback content
- Audit other `innerHTML` paths and reduce them where practical.
- Add regression tests for malicious or malformed input.

### Docs updates required

- Update privacy/security sections in `README.md` and `docs/DEPLOYMENT.md` to reflect the hardened posture.
- Add a short note in `AGENTS.md` describing the current trust model for markdown input.

---

## 3. Dark mode and settings persistence

### Why this is worth doing

- Dark mode is a strong fit for presentation software and especially useful in meetings or low-light rooms.
- The UI currently uses hard-coded light classes throughout the editor/viewer.
- The settings panel exists, but preferences are session-only and not persisted.

### Code updates required

- Add a real theme state (likely via a small app-level hook or context).
- Enable Tailwind dark mode configuration.
- Persist theme, title visibility, and auto-hide preferences in `localStorage`.
- Add optional `prefers-color-scheme` detection for first load.
- Pass the resolved theme into Mermaid so diagram styling matches the app shell.
- Update core UI components for dark/light class support:
  - `src/App.tsx`
  - `src/components/Editor/**`
  - `src/components/Viewer/**`
  - `src/components/Settings/SettingsPanel.tsx`
- Rework any HTML-string-based modal/error UI so it themes correctly.

### Docs updates required

- Update `README.md` feature list and screenshots/GIFs if dark mode ships.
- Add theme behavior to `docs/CONTRIBUTING.md` test expectations.
- Mention persisted viewer settings in `AGENTS.md`.

---

## 4. Performance and UX polish

### Why this is worth doing

- Markdown parsing currently runs on every change with no debounce.
- Grid preview rendering uses a timeout-based approach that can be cleaned up.
- The test suite currently passes but still logs React `act(...)` warnings in the keyboard-shortcuts tests.
- There is unused navigation UI code that can probably be removed.

### Code updates required

- Debounce diagram parsing in `src/hooks/useDiagramParser.ts` or at the editor input boundary.
- Clean up `setTimeout` usage in `src/components/Viewer/GridView.tsx` and add proper cleanup.
- Fix `KeyboardShortcutsHelp` test warnings by wrapping timer-driven updates correctly.
- Confirm whether `src/components/Navigation/NavigationControls.tsx` and its related prop types are dead code; remove if unused.
- Consider centralizing Mermaid initialization so grid and single-view rendering share one configured instance.

### Docs updates required

- Minimal docs impact; note any removed dead code or new performance behavior in `docs/CONTRIBUTING.md` if it affects development expectations.

---

## 5. Deployment and documentation hardening

### Why this is worth doing

- Several docs originally drifted from the current Dockerfile and test workflow.
- The continuity validator checks for file existence, but not broken links or stale claims.
- Release automation can be made more trustworthy with stronger validation.

### Code updates required

- Decide whether to harden the Docker image itself (for example non-root user, read-only filesystem) or keep docs aligned with the current lightweight container approach.
- Expand `scripts/validate-continuity.cjs` to verify:
  - known doc links resolve to existing local files
  - key README anchors are still valid
  - planned/live product messaging stays consistent
- Consider adding a small release-prep script that:
  - builds `dist/`
  - builds `offline-package/`
  - zips the offline package
  - optionally runs a local Docker build

### Docs updates required

- Keep `README.md`, `AGENTS.md`, and `docs/DEPLOYMENT.md` aligned whenever release automation changes.
- Document the exact deploy/publish steps once the release flow is stabilized.

---

## Suggested order

1. Dependency refresh + lockfile decision
2. Security hardening
3. Dark mode + settings persistence
4. Performance/UX polish
5. Deployment/docs hardening
