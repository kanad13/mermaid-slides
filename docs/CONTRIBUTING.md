# Contributing and Code Standards

## Setup

Use a Node version allowed by `package.json`.

```bash
git clone https://github.com/kanad13/mermaid-slides.git
cd mermaid-slides
npm ci
npm run dev
```

Before editing, read the active task in [WORKPLAN.md](WORKPLAN.md) and select the required evidence in
[TESTING.md](TESTING.md).

## Architecture

- `src/App.tsx` owns top-level editor/viewer mode.
- `src/components/` contains React UI.
- `src/hooks/` contains reusable state and effects.
- `src/utils/` contains parsing and pure transformations.
- `src/styles/` contains shared and print styles.
- `public/` contains assets copied into web and offline builds.
- `scripts/` contains build preparation and repository validators.
- `config/` contains TypeScript, Vite, Tailwind, PostCSS, and ESLint configuration.

`dist/`, `offline-package/`, test reports, screenshots, and generated PDFs are disposable outputs, not
source files.

## Design and TypeScript

- Implement the smallest design that satisfies a current requirement.
- Keep components focused. A large component is a review signal; split by responsibility, not by an
  arbitrary line count.
- Put reusable stateful behavior in hooks and pure transformations in utilities.
- Keep props, hook returns, exports, and configuration surfaces as narrow as current callers need.
- Do not add speculative abstractions, compatibility layers, caches, or extension points.
- Strict TypeScript must cover every TypeScript source and test file.
- Narrow `unknown` at boundaries; do not use `any` to bypass a design problem.
- Remove a replaced implementation rather than retaining parallel paths.

## React, DOM, and CSS

- Use functional components and hooks.
- Effects clean up timers, listeners, pending work, and temporary DOM nodes.
- Async effects cancel or ignore stale results.
- Prefer observable events and state to timing guesses.
- Render user-controlled values through React text/attributes or explicit DOM properties, never by
  interpolating them into markup strings.
- Mermaid-produced SVG is the only markup allowed in a Mermaid render container.
- New or changed controls are keyboard-operable, labelled, and expose meaningful state.
- Prefer layout constraints to pixel arithmetic based on assumed viewport or header sizes.
- Handle flex shrinking explicitly with `min-width: 0` or `min-height: 0` when required.

## Errors, names, and comments

- A failed slide must not prevent remaining slides from rendering or printing.
- Show useful, bounded error states without exposing raw markup.
- Do not swallow unexpected errors to keep execution or tests green.
- Names describe what code does. Comments explain a non-obvious reason, invariant, browser behavior,
  or tradeoff.
- Do not narrate syntax or preserve development history in code comments.
- Update or remove comments when their underlying behavior changes.
- Avoid claims such as “always”, “exact”, or “cannot fail” unless an enforced and tested invariant is
  named.

## Dependencies and automation

- Add a dependency only for a concrete capability that is costly or unreliable to maintain locally.
- Major upgrades require a security, support-lifecycle, or product-capability reason.
- Use the lockfile and `npm ci` in automation.
- Pin CI actions to commit SHAs and keep the release tag in a comment.
- Audit, test, and build both web and offline artefacts after dependency changes.
- Remove a dependency in the same change that removes its last use.

## Documentation model

Each topic has one owner. Other files link to the owner instead of restating it.

| Topic | Owner |
| --- | --- |
| Product, features, quick start, public privacy summary, support | `README.md` |
| AI-agent start, approval, closure, and handoff protocol | `AGENTS.md` |
| Roadmap status, product decisions, acceptance criteria, next task | `docs/WORKPLAN.md` |
| Setup, architecture, code, comments, dependencies, documentation governance | `docs/CONTRIBUTING.md` |
| Test tools, change-to-test mapping, commands, fixtures, and gates | `docs/TESTING.md` |
| Build channels, current workflow, release operation, and post-release checks | `docs/DEPLOYMENT.md` |
| Extracted offline-package usage and safety | `public/offline-template/README.md` |
| Optional prior code snippets | `docs/IMPLEMENTATION_REFERENCE.md` |
| Bug and feature intake fields | `.github/ISSUE_TEMPLATE/*.md` |

Documentation rules:

- Describe the current product directly. Git history owns historical narrative.
- Update code and its owning documentation in the same commit.
- Do not duplicate command lists, version requirements, workflow mechanics, roadmap status, or
  privacy claims when a link to the owner supplies the needed context. A distribution-specific file
  may state the minimum subset required to operate that distribution safely.
- Link to the owning document when context is needed elsewhere.
- Avoid volatile counts of tests, hooks, components, checks, or files.
- Every local link and heading anchor resolves.
- Every Markdown document is reachable from an owning document, exposed by GitHub as an issue entry
  point, or explicitly marked with `<!-- documentation-integrity: optional -->` as internal
  reference material.
- Every documented npm command exists in `package.json`.
- Delete obsolete docs, examples, comments, commands, and references with the change that replaces
  them.

## Preventing orphans and drift

- Use `rg` before and after renaming or deleting a symbol, file, command, heading, or feature.
- Run the documentation validator after documentation, command, or path changes.
- Run Knip for unused files, exports, dependencies, and unresolved imports once it is configured.
- Configure real dynamic entry points explicitly; do not silence broad unused-code patterns.
- Reject sync-conflict copies and duplicate numbered source files in repository validation.
- A replacement is incomplete while the replaced code or documentation remains reachable.

## Commits

- Work on a non-default branch.
- Keep one concern per commit and avoid unrelated cleanup.
- Follow the verification gate in [TESTING.md](TESTING.md#change-verification-gate).
- Use a concise Conventional Commit prefix such as `feat:`, `fix:`, `test:`, `docs:`, or `build:`.
- Record any platform or distribution channel not checked.
