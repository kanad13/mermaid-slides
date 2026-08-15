import assert from 'node:assert/strict';
import { test } from 'node:test';

import createViteConfig from '../config/vite.config.js';

function coverageConfig() {
    const config = createViteConfig({ command: 'serve', mode: 'test' });
    return config.test?.coverage;
}

test('coverage includes every executable source file, including untested files', () => {
    const coverage = coverageConfig();

    assert.equal(coverage?.provider, 'v8');
    assert.equal(coverage?.all, true);
    assert.deepEqual(coverage?.include, ['src/**/*.{ts,tsx}']);
    assert.deepEqual(coverage?.exclude, [
        'src/**/*.d.ts',
        'src/**/*.test.{ts,tsx}',
        'src/**/__tests__/**',
        'src/test/**',
        'src/types/**',
    ]);
});

test('coverage thresholds preserve the measured all-source baseline', () => {
    assert.deepEqual(coverageConfig()?.thresholds, {
        statements: 46.81,
        branches: 75.24,
        functions: 46.15,
        lines: 46.81,
    });
});
