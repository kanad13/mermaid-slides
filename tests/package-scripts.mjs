import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';

const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const packageJson = JSON.parse(
    readFileSync(join(repositoryRoot, 'package.json'), 'utf8'),
);
const scripts = packageJson.scripts;

test('canonical commands use the configured unit and build tools', () => {
    assert.equal(scripts['test:unit'], 'vitest run --config config/vite.config.js');
    assert.equal(scripts['build:all'], 'npm run build && npm run build:offline');
    assert.equal(scripts['test:commands'], 'node --test tests/package-scripts.mjs');
    assert.equal(scripts['test:run'], undefined, 'test:run was replaced by test:unit');
});

test('validate:all runs every configured gate and builds before compatibility checks', () => {
    const expectedCommands = [
        'npm run typecheck',
        'npm run lint',
        'npm run test:unit',
        'npm run test:commands',
        'npm run test:workflows',
        'npm run build:all',
        'npm run validate:compatibility',
        'npm run validate:continuity',
    ];

    assert.equal(scripts['validate:all'], expectedCommands.join(' && '));
});
