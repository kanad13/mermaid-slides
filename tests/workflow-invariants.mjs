import assert from 'node:assert/strict';
import { execFileSync, spawnSync } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { after, before, test } from 'node:test';
import { fileURLToPath } from 'node:url';

const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const workflow = readFileSync(
    join(repositoryRoot, '.github/workflows/deploy.yml'),
    'utf8',
);
const releaseValidator = join(repositoryRoot, 'scripts/validate-release-tag.cjs');

function indentedBlock(startLine, indentation) {
    const lines = workflow.split('\n');
    const start = lines.indexOf(startLine);
    assert.notEqual(start, -1, `Missing ${startLine}`);

    let end = start + 1;
    while (end < lines.length) {
        const line = lines[end];
        const currentIndentation = line.match(/^ */)[0].length;
        if (line && currentIndentation <= indentation) {
            break;
        }
        end++;
    }

    return `${lines.slice(start + 1, end).join('\n')}\n`;
}

function topLevelSection(name) {
    return indentedBlock(`${name}:`, 0);
}

function job(name) {
    topLevelSection('jobs');
    return indentedBlock(`  ${name}:`, 2);
}

test('branch pushes and pull requests validate without publishing', () => {
    const triggers = topLevelSection('on');
    const validationJob = job('build-and-test');

    assert.match(triggers, /^  push:/m);
    assert.match(triggers, /^    branches: \['\*\*'\]$/m);
    assert.match(triggers, /^    tags: \['v\*'\]$/m);
    assert.match(triggers, /^  pull_request:$/m);
    assert.doesNotMatch(triggers, /^  workflow_dispatch:/m);
    assert.doesNotMatch(validationJob, /^    if:/m);

    for (const validationCommand of [
        'npm run typecheck',
        'npm run test:run',
        'npm run lint',
        'npm run test:workflows',
        'npm run build',
        'npm run build:offline',
        'npm run validate:compatibility',
        'npm run validate:continuity',
    ]) {
        assert.match(validationJob, new RegExp(`run: ${validationCommand.replaceAll(':', '\\:')}`));
    }

    assert.match(
        validationJob,
        /name: Upload release build artifacts\n        if: github\.ref_type == 'tag'/,
    );

    for (const publishingJob of [
        'deploy-pages',
        'create-release',
        'docker-build-push',
    ]) {
        assert.match(
            job(publishingJob),
            /^    if: github\.ref_type == 'tag' && startsWith\(github\.ref_name, 'v'\)$/m,
            `${publishingJob} must reject branch and pull-request events`,
        );
    }
});

test('publishing depends on validated release metadata', () => {
    const releaseCheck = job('validate-release');

    assert.match(
        releaseCheck,
        /^    if: github\.ref_type == 'tag' && startsWith\(github\.ref_name, 'v'\)$/m,
    );
    assert.match(releaseCheck, /fetch-depth: 0/);
    assert.match(releaseCheck, /git fetch --no-tags origin master:refs\/remotes\/origin\/master/);
    assert.match(releaseCheck, /node scripts\/validate-release-tag\.cjs/);

    for (const publishingJob of [
        'deploy-pages',
        'create-release',
        'docker-build-push',
    ]) {
        assert.match(
            job(publishingJob),
            /needs: \[[^\]]*validate-release[^\]]*\]/,
            `${publishingJob} must depend on validate-release`,
        );
    }
});

test('workflow permissions are read-only except at the publishing job that needs them', () => {
    assert.match(workflow, /^permissions:\n  contents: read$/m);
    assert.match(job('deploy-pages'), /^    permissions:\n      pages: write\n      id-token: write$/m);
    assert.match(job('create-release'), /^    permissions:\n      contents: write$/m);
    assert.doesNotMatch(job('docker-build-push'), /^    permissions:/m);
});

test('third-party actions are pinned to immutable commits with version comments', () => {
    const actionReferences = [...workflow.matchAll(/^\s+-?\s*uses:\s*(\S+)(?:\s+#\s*(\S+))?$/gm)];

    assert.ok(actionReferences.length > 0, 'Expected the workflow to use actions');
    for (const [, reference, versionComment] of actionReferences) {
        assert.match(reference, /@[0-9a-f]{40}$/i, `${reference} is not pinned to a commit`);
        assert.match(versionComment ?? '', /^v\d/, `${reference} is missing its release tag comment`);
    }
});

const fixtureRoot = mkdtempSync(join(tmpdir(), 'mermaid-slides-release-'));
let masterCommit;
let featureCommit;

function git(...args) {
    return execFileSync('git', args, { cwd: fixtureRoot, encoding: 'utf8' }).trim();
}

function runReleaseValidator(overrides = {}) {
    return spawnSync(process.execPath, [releaseValidator], {
        cwd: fixtureRoot,
        encoding: 'utf8',
        env: {
            ...process.env,
            GITHUB_REF_TYPE: 'tag',
            GITHUB_REF_NAME: 'v1.2.1',
            GITHUB_SHA: masterCommit,
            GITHUB_OUTPUT: '',
            ...overrides,
        },
    });
}

before(() => {
    git('init', '--initial-branch=master');
    git('config', 'user.name', 'Workflow Test');
    git('config', 'user.email', 'workflow@example.com');
    writeFileSync(join(fixtureRoot, 'package.json'), '{"version":"1.2.1"}\n');
    git('add', 'package.json');
    git('commit', '-m', 'initial');
    masterCommit = git('rev-parse', 'HEAD');
    git('update-ref', 'refs/remotes/origin/master', masterCommit);
    git('switch', '--quiet', '-c', 'feature');
    writeFileSync(join(fixtureRoot, 'feature.txt'), 'feature\n');
    git('add', 'feature.txt');
    git('commit', '-m', 'feature');
    featureCommit = git('rev-parse', 'HEAD');
});

after(() => rmSync(fixtureRoot, { recursive: true, force: true }));

test('release validator accepts a matching tag on master history', () => {
    const outputPath = join(fixtureRoot, 'github-output');
    const result = runReleaseValidator({ GITHUB_OUTPUT: outputPath });

    assert.equal(result.status, 0, result.stderr);
    assert.match(result.stdout, /Validated release v1\.2\.1/);
    assert.equal(readFileSync(outputPath, 'utf8'), 'version=1.2.1\n');
});

test('release validator rejects a tag that does not match package.json', () => {
    const result = runReleaseValidator({ GITHUB_REF_NAME: 'v1.2.2' });

    assert.notEqual(result.status, 0);
    assert.match(result.stderr, /must match package\.json version 1\.2\.1/);
});

test('release validator rejects a commit outside master history', () => {
    const result = runReleaseValidator({ GITHUB_SHA: featureCommit });

    assert.notEqual(result.status, 0);
    assert.match(result.stderr, /does not belong to master history/);
});
