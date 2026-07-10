import assert from 'node:assert';
import test, { describe, it } from 'node:test';
import { normalizeOptions } from '../src/core/normalize-options.ts';

describe('normalizeOptions()', () => {
  it('defaults delimiters to ["---", "---"]', () => {
    const opts = normalizeOptions();
    assert.deepStrictEqual(opts.delimiters, ['---', '---']);
  });

  it('duplicates a single custom delimiter into open/close', () => {
    const opts = normalizeOptions({ delimiters: '~~~' });
    assert.deepStrictEqual(opts.delimiters, ['~~~', '~~~']);
  });

  it('accepts distinct open/close delimiters', () => {
    const opts = normalizeOptions({ delimiters: ['+++', '==='] });
    assert.deepStrictEqual(opts.delimiters, ['+++', '===']);
  });

  it('defaults language to "yaml" and lowercases it', () => {
    assert.strictEqual(normalizeOptions().language, 'yaml');
    assert.strictEqual(normalizeOptions({ language: 'JSON' }).language, 'json');
  });

  it('merges custom engines without dropping built-ins', () => {
    const opts = normalizeOptions({ engines: { toml: { parse: () => ({}), stringify: () => '' } } });
    const keys = Object.keys(opts.engines).sort();
    assert.deepStrictEqual(keys, ['json', 'toml', 'yaml']);
  });
});
