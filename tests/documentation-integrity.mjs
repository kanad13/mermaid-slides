import assert from 'node:assert/strict';
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';

const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const validatorPath = join(repositoryRoot, 'scripts/validate-documentation.cjs');

function writeFixtureFile(root, relativePath, content) {
    const filePath = join(root, relativePath);
    mkdirSync(dirname(filePath), { recursive: true });
    writeFileSync(filePath, content);
}

function createRepositoryFixture(t) {
    const root = mkdtempSync(join(tmpdir(), 'mermaid-slides-docs-'));
    t.after(() => rmSync(root, { recursive: true, force: true }));

    writeFixtureFile(root, 'package.json', JSON.stringify({
        scripts: {
            'test:unit': 'vitest run',
        },
    }));
    writeFixtureFile(root, 'README.md', `# Project

- [Agents](AGENTS.md)
- [Contributing](docs/CONTRIBUTING.md)
- [Testing](docs/TESTING.md)
- [Unit tests](docs/TESTING.md#unit-tests)
- [Deployment](docs/DEPLOYMENT.md)
- [Work plan](docs/WORKPLAN.md)
`);
    writeFixtureFile(root, 'AGENTS.md', `# Agents

- [Work plan](docs/WORKPLAN.md)
- [Contributing](docs/CONTRIBUTING.md)
- [Testing](docs/TESTING.md)
- [Deployment](docs/DEPLOYMENT.md)
- [Implementation reference](docs/IMPLEMENTATION_REFERENCE.md)
`);
    writeFixtureFile(root, 'docs/WORKPLAN.md', '# Work plan\n');
    writeFixtureFile(root, 'docs/CONTRIBUTING.md', '# Contributing\n');
    writeFixtureFile(root, 'docs/TESTING.md', `# Testing

## Unit tests

Run \`npm run test:unit\`.
`);
    writeFixtureFile(root, 'docs/DEPLOYMENT.md', `# Deployment

See the [offline guide](../public/offline-template/README.md).
`);
    writeFixtureFile(root, 'docs/IMPLEMENTATION_REFERENCE.md', '# Optional implementation reference\n');
    writeFixtureFile(root, 'public/offline-template/README.md', '# Offline package\n');
    writeFixtureFile(root, '.github/ISSUE_TEMPLATE/bug_report.md', '# Bug report\n');
    writeFixtureFile(root, '.github/ISSUE_TEMPLATE/feature_request.md', '# Feature request\n');
    writeFixtureFile(root, 'scripts/validate-compatibility.cjs', '');

    return root;
}

function runValidator(root) {
    return spawnSync(process.execPath, [validatorPath], {
        cwd: root,
        encoding: 'utf8',
    });
}

function assertRejected(result, messagePattern) {
    assert.notEqual(result.status, 0, 'documentation defect should fail validation');
    assert.match(`${result.stdout}\n${result.stderr}`, messagePattern);
}

test('rejects a local link whose target does not exist', (t) => {
    const root = createRepositoryFixture(t);
    writeFixtureFile(root, 'docs/WORKPLAN.md', `# Work plan

[Missing document](MISSING.md)
`);

    assertRejected(runValidator(root), /docs\/WORKPLAN\.md.*MISSING\.md/i);
});

test('rejects a local link whose heading anchor does not exist', (t) => {
    const root = createRepositoryFixture(t);
    writeFixtureFile(root, 'docs/WORKPLAN.md', `# Work plan

[Missing section](TESTING.md#missing-section)
`);

    assertRejected(runValidator(root), /docs\/WORKPLAN\.md.*missing-section/i);
});

test('rejects a reference link without a definition', (t) => {
    const root = createRepositoryFixture(t);
    writeFixtureFile(root, 'docs/WORKPLAN.md', `# Work plan

[Missing reference][unknown-guide]
`);

    assertRejected(runValidator(root), /docs\/WORKPLAN\.md.*unknown-guide/i);
});

test('rejects a documented npm command absent from package.json', (t) => {
    const root = createRepositoryFixture(t);
    writeFixtureFile(root, 'docs/TESTING.md', `# Testing

Run \`npm run test:missing\`.
`);

    assertRejected(runValidator(root), /docs\/TESTING\.md.*test:missing/i);
});

test('rejects a Markdown document unreachable from an ownership entry point', (t) => {
    const root = createRepositoryFixture(t);
    writeFixtureFile(root, 'docs/ORPHAN.md', '# Orphan\n');

    assertRejected(runValidator(root), /docs\/ORPHAN\.md.*(?:orphan|reachable)/i);
});

test('allows explicitly marked optional internal reference material', (t) => {
    const root = createRepositoryFixture(t);
    writeFixtureFile(
        root,
        'docs/OPTIONAL.md',
        '<!-- documentation-integrity: optional -->\n\n# Optional notes\n',
    );

    const result = runValidator(root);
    assert.equal(result.status, 0, `${result.stdout}\n${result.stderr}`);
});
