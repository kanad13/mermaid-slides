# Mermaid Slides — Agent Context

A browser app that turns a Markdown file's Mermaid diagrams and images into a navigable slideshow.
Everything runs client-side: there is no backend, no account, and no data leaves the device except
images the author referenced by URL.

**Live**: https://mermaid-slides.com/ · **Maintainer**: [Kunal Pathak](https://www.kunal-pathak.com)

> **Read [docs/WORKPLAN.md](docs/WORKPLAN.md) first.** It is the source of truth for what is in
> progress, what was decided, and what was deliberately declined. This file describes the codebase;
> the work plan describes the work.

---

## Before you touch anything

Merging to `master` **publishes**. A single push runs `deploy.yml`, which deploys to GitHub Pages,
creates a GitHub release tagged from `package.json`, and pushes to Docker Hub. There is no staging
step between a merge and users. Consequences:

- Run the full channel matrix in [docs/TESTING.md](docs/TESTING.md) before merging, not after.
- Bump the version once, in a commit immediately before the merge. The release action fails on a tag
  that already exists.
- Work on a branch. `validate.yml` runs on branches and pull requests and publishes nothing.

---

## Commands

```bash
npm run dev                   # Vite dev server
npm run typecheck             # tsc --noEmit
npm run lint                  # ESLint, zero warnings tolerated
npm run test:run              # Vitest, single run
npm test                      # Vitest, watch mode
npm run build                 # Web build -> dist/
npm run build:offline         # Offline package -> offline-package/
npm run validate:compatibility # Checks offline-package/ — needs build:offline first
npm run validate:continuity   # Checks documentation structure
npm run validate:all          # typecheck + lint + tests + both validators
```

The per-commit gate is `npm run typecheck && npm run lint && npm run test:run`. Note that
`validate:all` includes `validate:compatibility`, which fails unless `offline-package/` has been
built.

Requires **Node 22.12+**. Node 20 reached end of life in April 2026.

---

## Architecture

```
src/
  App.tsx              Two states: editor or viewer. That is the whole routing.
  main.tsx             Mount point
  components/
    Editor/            Paste or load markdown; owns the text, parses on demand
    FileUpload/        Drop zone, file input, action buttons
    Viewer/            Presentation shell: header, single-slide view, grid view
    Settings/          Session-only toggles (titles, auto-hide)
    Legal/             Privacy policy, legal notice, footer, shared modal
  hooks/               Six hooks (see below)
  utils/               mermaidParser, fileHandler, sampleData
  types/               Diagram and component prop types
  styles/index.css     Tailwind entry plus the html/body/#root height chain
config/                Vite, Vitest, Tailwind, PostCSS, ESLint, TypeScript
scripts/               prepare-offline-package.cjs, validate-compatibility.cjs,
                       validate-continuity.cjs
public/offline-template Server scripts bundled into the offline package
```

### Hooks

| Hook                    | Responsibility                                             |
| ----------------------- | ---------------------------------------------------------- |
| `useMermaid`            | Shared Mermaid instance and rendered-SVG cache             |
| `useDiagramParser`      | Background parse driving the editor's status message       |
| `useFileHandler`        | File selection, drag and drop, validation                  |
| `useViewerNavigation`   | Current slide index, grid toggle                           |
| `useKeyboardNavigation` | Arrow keys, Home, End, Escape                              |
| `useAutoHide`           | Hides the viewer header after inactivity                   |

### Things that are easy to get wrong

**One Mermaid instance, and rendering is cached.** `useMermaid` holds a module-level import promise
and a cache keyed by diagram source. A cached SVG keeps the element id it was first rendered under,
so a diagram first drawn in the grid carries a `grid-` prefixed id in single view. The id only scopes
Mermaid's own styles, but do not select on it.

**Sizing is done by layout, never arithmetic.** The height chain in `index.css` reaches `#root`, the
viewer is `h-full`, and the slide area is a `flex-1 min-h-0` child. Nothing subtracts a header
height. An earlier version hardcoded 120px, which was wrong at every viewport. Do not reintroduce
viewport units here: on mobile they are measured with toolbars retracted and clip the bottom of the
slide.

**Async render passes must be cancellable.** Both viewer components render through `await`, and their
effects re-run when Mermaid finishes loading. Without a cancellation flag two passes interleave and
clear each other's containers. This is what used to leave grid previews blank.

**Presenting parses on demand.** The debounced parse in `Editor` only feeds the error message.
`handleViewDiagrams` parses the current text directly, because reading the debounced result made
paste-then-click silently do nothing.

---

## Security model

Markdown is untrusted input. A `.md` file can come from anywhere.

- A **Content-Security-Policy** ships in `index.html`, so it covers all three channels — none of
  which can set response headers. `script-src 'self'` refuses inline script, which is what stops a
  crafted image tag in markdown from executing.
- `style-src` needs `'unsafe-inline'`: Mermaid injects a `<style>` block per diagram.
- `img-src` is **deliberately permissive**. Remote images are placed by the author on purpose and
  refusing them would break real documents. The trade-off — that loading one reveals the viewer's IP
  to that host — is stated plainly in the README and the in-app privacy policy. Do not "fix" this by
  blocking them, and do not write documentation claiming the app makes zero network requests.
- The offline package's Node server resolves request paths and checks containment before serving.
  It previously did not, and served arbitrary files to the local network.
- The shipped HTML must contain **no absolute URLs**; `scripts/validate-compatibility.cjs`
  enforces it, and it is what lets the offline package promise it needs nothing from the network.

The app stores nothing: no cookies, no local storage, no session storage, no service worker. Settings
are session-only by design — losing preferences on reload is the intended behaviour, not a gap.

---

## Code style

- TypeScript strict mode, and it genuinely runs — `config/tsconfig.json` resolves paths relative to
  itself, so `include` is `../src`. It once read `src`, matched zero files, and hid 66 errors.
- Functional components with explicit prop types from `src/types/components.ts`.
- Tailwind utility classes; no CSS modules.
- ES modules only. The offline server scripts are CommonJS and ship with their own `package.json`
  declaring that.
- Comments explain **why**, not what. A comment restating the code should be deleted rather than
  updated.

---

## Testing

The suite mocks Mermaid entirely, so it covers parsing, hooks and component structure but **no
integration path** — nothing where a real diagram reaches the DOM. For rendering, layout and
distribution behaviour, the manual checklist in [docs/TESTING.md](docs/TESTING.md) is the test suite,
not a supplement to it.

When fixing a bug, confirm the new test fails against the old behaviour. A test that passes either
way documents nothing.

---

## Distribution

| Channel  | Artefact                              | Notes                                    |
| -------- | ------------------------------------- | ---------------------------------------- |
| Web      | `dist/` → GitHub Pages                | Absolute base path                       |
| Offline  | `offline-package/` → release archive  | Relative paths; Python and Node servers  |
| Docker   | `kunalpathak13/mermaid-slides`        | Unprivileged, digest-pinned, amd64+arm64 |

The offline package resolves assets relatively, so a change that works on Pages can still break it
and the Docker image. Steps 3 and 4 of the testing matrix are not optional for anything touching the
build, `index.html`, or asset references.

Related VS Code extensions live in separate repositories: **Mermaid Slideshow** and **Markdown
Presentation Tool**.

---

## Documentation map

- [README.md](README.md) — users: what it is, how to run it, what it discloses
- [docs/WORKPLAN.md](docs/WORKPLAN.md) — current work, decisions, declined items, backlog
- [docs/TESTING.md](docs/TESTING.md) — gates, channel matrix, smoke checklist
- [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) — release flow and channel specifics
- [docs/CONTRIBUTING.md](docs/CONTRIBUTING.md) — development workflow

Keep them aligned in the same commit as the change. The privacy claims in particular exist in more
than one place, and they have gone stale before.
