import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';

const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');

test('Knip analyzes every real runtime, tool, validation, and test entry point', () => {
    const config = JSON.parse(
        readFileSync(join(repositoryRoot, 'config/knip.json'), 'utf8'),
    );

    assert.deepEqual(config, {
        $schema: 'https://unpkg.com/knip@6/schema.json',
        entry: [
            'config/*.config.js',
            'tests/*.mjs',
            'public/offline-template/start-server.js',
        ],
        project: [
            'src/**/*.{ts,tsx}',
            'src/**/*.css',
            'config/**/*.js',
            'scripts/**/*.{cjs,js}',
            'tests/**/*.mjs',
        ],
        ignoreBinaries: ['actionlint'],
        treatConfigHintsAsErrors: true,
    });
});
