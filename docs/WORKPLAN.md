# Development Roadmap

Implementation follows [CONTRIBUTING.md](CONTRIBUTING.md), verification follows
[TESTING.md](TESTING.md), and agent handoffs follow [`AGENTS.md`](../AGENTS.md).

## Product decisions

- Process Markdown and render diagrams in the browser; do not add an application backend.
- Keep remote images supported and disclose that the browser requests them from their hosts.
- Do not persist content, settings, or preferences.
- Support PDF as the only export format.
- Use the browser print pipeline; do not send content to a conversion service.
- Keep the viewer desktop-first and avoid unsupported mobile claims.
- Require a concrete security, support, or product reason for major dependency upgrades.
- Publish only through an explicit, validated release operation.

## 1. Engineering foundation

Status: **in progress**

Completed:

- Publishing runs only from validated `v*` tags whose version matches `package.json` and whose
  commit belongs to `master` history.
- Repository invariants and actionlint protect non-publishing validation on branches, pull requests,
  and `master`.
- Strict TypeScript covers every source and test file and runs during repository validation.

Remaining:

- Make validation commands work from a clean checkout and build artefacts before checking them.
- Add Playwright, Knip, actionlint, coverage thresholds, documentation integrity checks, workflow
  invariant tests, and the shared fixture deck described in [TESTING.md](TESTING.md).
- Define and run the fast, full, and release gates in `package.json` and CI.

Acceptance: each new gate rejects a representative defect, all documented commands exist, and a
merge cannot publish.

## 2. Security and correctness

Status: **not started**

- Contain offline-server paths and test real normal and hostile requests.
- Update dependencies within supported major versions and make automation reproducible.
- Add CSP to every distribution and render Markdown-derived values without interpolated markup.
- Harden and test the Docker runtime.
- Correct grid cancellation, slide sizing, editor settling, auto-hide layout, and failed Mermaid
  cleanup.
- Coordinate Mermaid rendering without an SVG markup cache.
- Bundle sample assets, replace string-built legal UI, and make privacy disclosures accurate.
- Remove dead code, conflict copies, unused exports/dependencies, stale comments, and stale docs.

Acceptance: the complete fixture deck passes unit, browser, server, security, offline, and container
tests; an independent audit has no unresolved release blocker; all three channels are verified.

Publish the completed foundation under the next unused version, at least `v1.7.0`.

## 3. PDF export

Status: **not started**

- Build an off-screen print tree with one bounded landscape slide per page.
- Wait for image load, decode, failure, or bounded timeout.
- Print useful error cards for malformed diagrams and broken images.
- Keep duplicate diagrams independent, preserve selectable text, and force a light print theme.
- Generate and inspect real PDFs from web, offline, and Docker builds.

Acceptance: PDF page count, order, extracted text, rendered pages, and visual bounds pass for the full
fixture deck.

## 4. Theme

Status: **not started**

- Add `System`, `Light`, and `Dark` settings held only in React memory.
- Follow live `prefers-color-scheme` changes while using `System`.
- Apply the correct first paint without violating CSP.
- Re-render Mermaid for theme changes and serialize screen/print configuration.
- Cover editor, viewer, grid, controls, legal UI, errors, and PDF output.

Acceptance: browser tests protect system and manual choices, no storage API is used, and a dark app
still produces a light PDF.

## Next task

Make validation commands work from a clean checkout and build required artefacts before checking
them, first adding command-contract tests that fail for the current incomplete and order-dependent
scripts.

## Backlog

- Parse balanced parentheses in Markdown image destinations.
- Complete an accessibility audit beyond controls changed by planned work.
- Add presenter affordances and display the loaded filename.
- Repair or remove the unused Vitest UI command.
- Reconsider SVG caching only after correctness work; any design must pass duplicate sequence-diagram
  browser tests and account for every generated ID and reference.
