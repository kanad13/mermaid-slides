#!/usr/bin/env node

const { execFileSync } = require('node:child_process');
const { appendFileSync, readFileSync } = require('node:fs');
const { join } = require('node:path');

function fail(message) {
    console.error(`Release validation failed: ${message}`);
    process.exit(1);
}

const refType = process.env.GITHUB_REF_TYPE;
const refName = process.env.GITHUB_REF_NAME;
const commit = process.env.GITHUB_SHA;

if (refType !== 'tag') {
    fail(`expected a tag event, received ${refType || 'no ref type'}`);
}

const packageJson = JSON.parse(
    readFileSync(join(process.cwd(), 'package.json'), 'utf8'),
);
const version = packageJson.version;

if (typeof version !== 'string' || version.length === 0) {
    fail('package.json must contain a version');
}

const expectedTag = `v${version}`;
if (refName !== expectedTag) {
    fail(`tag ${refName || '(missing)'} must match package.json version ${version}`);
}

if (!commit) {
    fail('GITHUB_SHA is missing');
}

try {
    execFileSync(
        'git',
        ['merge-base', '--is-ancestor', commit, 'refs/remotes/origin/master'],
        { stdio: 'ignore' },
    );
} catch {
    fail(`tagged commit ${commit} does not belong to master history`);
}

if (process.env.GITHUB_OUTPUT) {
    appendFileSync(process.env.GITHUB_OUTPUT, `version=${version}\n`);
}

console.log(`Validated release ${expectedTag} at ${commit}.`);
