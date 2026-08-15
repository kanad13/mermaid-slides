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
    assert.equal(
        scripts['test:docs'],
        'node --test tests/documentation-integrity.mjs && node scripts/validate-documentation.cjs',
    );
    assert.equal(
        scripts['test:coverage'],
        'node --test tests/coverage-config.mjs && vitest run --config config/vite.config.js --coverage',
    );
    assert.equal(
        scripts['test:dead-code'],
        'node --test tests/knip-config.mjs && knip --config config/knip.json',
    );
    assert.equal(scripts['test:fixtures'], 'node --test tests/fixture-deck.mjs');
    assert.equal(scripts['test:run'], undefined, 'test:run was replaced by test:unit');
});

test('validate:all runs every configured gate and builds before compatibility checks', () => {
    const expectedCommands = [
        'npm run typecheck',
        'npm run lint',
        'npm run test:unit',
        'npm run test:coverage',
        'npm run test:commands',
        'npm run test:fixtures',
        'npm run test:docs',
        'npm run test:dead-code',
        'npm run test:workflows',
        'npm run build:all',
        'npm run validate:compatibility',
    ];

    assert.equal(scripts['validate:all'], expectedCommands.join(' && '));
});
