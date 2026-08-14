# Agent Operating Guide

This file defines how an AI coding agent starts, verifies, closes, and hands off work in this
repository.

## Authoritative documents

Read these before changing code:

1. [Work plan](docs/WORKPLAN.md) — current milestone and next task
2. [Contributing guide](docs/CONTRIBUTING.md) — architecture, code standards, and documentation rules
3. [Testing strategy](docs/TESTING.md) — required evidence and commands

Read [deployment](docs/DEPLOYMENT.md) when a task affects builds, distribution, workflows, versions,
or releases. Read [implementation references](docs/IMPLEMENTATION_REFERENCE.md) only when the active
task names a relevant area; it is never a source of requirements.

## Start of a development turn

Before editing:

1. Run `git status --short --branch` and inspect recent commits.
2. Confirm the previous concern is committed and the tree is clean. If not, resolve or report it.
3. Read the work plan's status and exact next task.
4. Run the fastest relevant baseline from the testing strategy.
5. State one bounded concern, the expected files, and the evidence required for completion.
6. Identify the owning document for any product, command, workflow, or operational fact that may
   change.

Do not start a second concern merely because the first one finished quickly.

## During implementation

- Keep production code, tests, and owning documentation in the same concern.
- Add the failing behavioral test before implementing a bug fix or feature.
- Keep the user informed during long-running work.
- Put unrelated discoveries in the work-plan backlog.
- Do not preserve unused compatibility code, exports, files, comments, or documentation.
- Do not push, merge, tag, release, publish, or perform another external mutation without user
  authorization.

## Before presenting a change

Complete the change verification gate in [TESTING.md](docs/TESTING.md#change-verification-gate):

1. Run the focused test and every required test layer.
2. Run `git diff --check` and inspect the complete diff.
3. Search for stale references after renames, deletions, or command changes.
4. Run documentation and unused-code checks when available.
5. Build or exercise each affected distribution channel.
6. Update the work-plan status and record anything not checked.

Report outcomes and gaps; do not describe an unchecked channel as passing.

## When the user approves the change

Treat approval as a boundary between concerns:

1. Re-run any gate invalidated since the last result.
2. Confirm that replaced code, tests, exports, dependencies, comments, files, docs, links, and commands
   are gone.
3. Commit the accepted concern when authorized.
4. Confirm the working tree is clean.
5. Record one exact next task in `docs/WORKPLAN.md`.
6. Stop before changing the next concern unless the user explicitly asked to continue.

## End of a turn and next-session handoff

- Leave the tree green and preferably committed.
- State the branch, HEAD commit, checks run, and checks omitted.
- Provide a continuation prompt that points to the authoritative documents and exact next task.
- At the next session, repeat the start-of-turn protocol; do not rely on chat history as project state.
