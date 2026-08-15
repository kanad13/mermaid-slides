# Testing Strategy

Every change needs evidence capable of failing when that change is wrong. Test count and aggregate
coverage are supporting signals, not substitutes for behavioral assertions.

## Current test boundary

The repository currently uses strict TypeScript, Vitest, React Testing Library, jsdom, V8 coverage,
ESLint, production builds, and repository validators. The unit setup mocks Mermaid and returns a
trivial SVG, so it does not exercise successful Mermaid rendering, real layout, CSP, browser timing,
or PDF output.

The engineering-foundation milestone adds:

- **Playwright Test** for real Chromium rendering on every change and focused Firefox/WebKit release
  smoke tests;
- **Knip** for unused files, exports, dependencies, and unresolved imports;
- **actionlint** for GitHub Actions syntax, expressions, permissions, dependencies, and shell code;
- **Vitest V8 coverage** as a measured threshold that can only stay level or increase;
- **Poppler tools** during PDF development for page metadata, text extraction, and rendered pages;
- a local documentation validator for links, anchors, commands, ownership, and orphan files.

## Evidence by change type

| Change | Required evidence |
| --- | --- |
| Parser, utility, or hook logic | Focused Vitest test |
| React state or interaction | React Testing Library test using visible roles, labels, and outcomes |
| Successful Mermaid rendering | Playwright with the real Mermaid library |
| Layout, grid, auto-hide, or theme | Playwright structural assertions and a targeted screenshot when needed |
| CSP, injection, or untrusted Markdown | Playwright against a production build with hostile input |
| Offline server | Start the real server and send normal and hostile HTTP requests |
| Workflow or release configuration | Repository invariant test and actionlint |
| Docker runtime | Build and run; check serving, user, health, read-only mode, and dropped capabilities |
| Dependency update | Clean install, audit, static checks, unit/browser tests, and both builds |
| Documentation-only change | Documentation structure, link, anchor, command, and orphan checks |
| Rename, deletion, or refactor | Behavior tests, `rg`, Knip, and affected builds |
| PDF output | Generate PDF, inspect pages/text, render pages, and compare representative images |

A change matching several rows requires all corresponding evidence.

## Test-first behavior

For a bug or feature:

1. Write the smallest test expressing the required outcome.
2. Run it against the current implementation and observe the expected failure.
3. Implement the behavior.
4. Run the focused test and applicable gate.
5. Record the failing and passing commands in the commit or work-plan notes.

A behavior-preserving refactor starts with tests covering the behavior being preserved. If those tests
do not exist, add them first; a refactor does not need an artificial failure after coverage exists.

When validating an implementation inspired by prior code, reverse only the production change in a
disposable worktree while retaining its test. Do not destructively mutate the working branch.

## Shared fixture deck

Browser, visual, PDF, offline, and Docker tests use one deterministic deck with bundled local assets.
It covers:

- flowchart, sequence, ER, class, state, Gantt, pie, and git graph diagrams;
- tall, wide, tiny, large, empty, and malformed input;
- two identical sequence diagrams;
- normal, already-cached, delayed, and broken images;
- long titles, long error source, and hostile Markdown strings.

Tests may select relevant slides, but a visual or renderer change runs the complete deck before merge.
External network requests are blocked during tests except explicit local fixture routes.

## Browser and visual policy

- Chromium is required for browser tests on every pull request.
- Firefox and WebKit run focused navigation, rendering, image, and theme smoke tests before release.
- Use fixed desktop viewports, including `1280×800` and one narrow viewport near the supported desktop
  boundary.
- Prefer semantic and geometric assertions to screenshots.
- Use screenshots for clipping, overlap, diagram appearance, theme, and rendered PDF pages.
- Create and compare snapshots in the same pinned CI environment.
- Review every snapshot change; never update snapshots only to make CI pass.

## Coverage policy

- `test:coverage` includes every runtime TypeScript source file, including untested files. Tests,
  test setup, declarations, and type-only modules are excluded because they are not production
  runtime behavior.
- The measured all-source baseline is 46.81% statements, 75.24% branches, 46.15% functions, and
  46.81% lines; these values are enforced as global thresholds.
- Thresholds may stay level or increase; lowering one requires an explicit reason.
- New behavior is tested directly even when aggregate coverage passes.
- Browser-only behavior stays in browser tests rather than being distorted for unit coverage.

## Command contract

The currently configured foundation command surface includes:

```text
npm run typecheck          strict TypeScript
npm run test:unit          Vitest once
npm run test:coverage      Vitest once with enforced V8 thresholds
npm run test:commands      package-script contracts
npm run test:docs          documentation integrity
npm run test:workflows     workflow invariants and actionlint
npm run build:all          web and offline builds
npm run validate:all       every configured check and both builds
```

`validate:all` runs every configured local gate and creates generated artefacts before validating
them. It must continue to work after `npm ci` as browser, server, and dead-code gates are added.

The remaining foundation work adds browser, dead-code, server, fast-check, full-validation, and
release-validation commands as their underlying checks become executable.

`test:workflows` requires actionlint on `PATH`; CI installs the version pinned in the workflow. Use
the actionlint installation method for the local platform before running the command.

## Change verification gate

Before presenting a completed concern:

1. Run the focused test and every layer required by the evidence table.
2. Run the fastest applicable aggregate gate.
3. Run `git diff --check` and inspect the complete diff.
4. Search for stale references after renames, deletions, command changes, or documentation moves.
5. Run documentation and unused-code validation when available.
6. Build and exercise each affected distribution channel.
7. Record skipped platforms, browsers, artefacts, or manual checks.

After user approval and before another concern begins, re-run checks invalidated by later edits and
confirm the accepted concern is committed with a clean tree.

## Release evidence

Before creating a version tag:

- run `validate:release`;
- run the Windows offline-launcher smoke job;
- run Firefox and WebKit smoke projects;
- inspect the Docker runtime;
- run dependency audit;
- independently review the release diff;
- generate and inspect PDF artefacts once PDF export exists.

After publication, open the live app, verify the release checksum and extracted offline package, and
pull and run the versioned Docker image. Record any channel not checked.
