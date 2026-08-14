# Optional Implementation References

This index points to candidate code snippets only. Requirements come from [WORKPLAN.md](WORKPLAN.md),
code standards from [CONTRIBUTING.md](CONTRIBUTING.md), and evidence from [TESTING.md](TESTING.md).
Inspect only the named commit and relevant file; do not merge the prior branch or copy its planning,
status, release, comment, or documentation claims.

| Area | Candidate | Keep in mind |
| --- | --- | --- |
| Offline path containment | `8081e35` | Add current HTTP integration tests |
| Dependencies | `88c33e4` | Re-run audit; do not reuse old totals |
| TypeScript | `22d134e`, `224cd54` | Prove source inclusion before relying on the gate |
| CSP | `52b96f1` | CSP does not make interpolated markup safe |
| Docker and CI | `689367c`, `c09900c`, `a77de35` | Preserve new tag-only release design and test current pins/digest |
| Legal UI | `46a206a`, `0e9bcc2` | Recheck every disclosure |
| Viewer correctness | `44a8f0c`, `627f806`, `c1ae3c4`, `455ae02` | Require browser and extracted-package tests |
| Mermaid coordination | `5ba4248`, `f918dfd` | Keep shared loading and scratch cleanup; reject cache and ID rewriting |
| Editor settling | `d8d1307`, `42ab371` | Test the settled outcome, not timer implementation |
| Safe rendering | `51d7a8e`, `edc96bf` | Use bundled assets and React values; test hostile input in production browser |
| Cleanup and validators | `329464f`, `15cc70b`, `437daf0`, `a767dda` | Confirm with current `rg`, Knip, and doc checks |
| PDF shape | `a367793` | Architecture sketch only; do not copy implementation or CSS |
