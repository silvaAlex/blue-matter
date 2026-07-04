import assert from 'node:assert';
import test, { describe, it } from 'node:test';
import { getEngine, resolveAlias } from '../src/core/engine-resolver.ts';
import { normalizeOptions } from '../src/core/normalize-options.ts';

describe('resolveAlias()', () => {
  it('resolves yml/yaml to "yaml"', () => {
    assert.strictEqual(resolveAlias('yml'), 'yaml');
    assert.strictEqual(resolveAlias('yaml'), 'yaml');
  });

  it('passes unknown names through unchanged', () => {
    assert.strictEqual(resolveAlias('toml'), 'toml');
  });
});

describe('getEngine()', () => {
  it('finds a built-in engine by exact name', () => {
    const opts = normalizeOptions();
    const engine = getEngine('yaml', opts);
    assert.strictEqual(typeof engine.parse, 'function');
  });

  it('finds a built-in engine via alias', () => {
    const opts = normalizeOptions();
    const engine = getEngine('yml', opts);
    assert.strictEqual(typeof engine.parse, 'function');
  });

  it('wraps a bare parse function registered as an engine', () => {
    const opts = normalizeOptions({
      engines: {
        custom: (str: string) => ({ raw: str })
      }
    });
    const engine = getEngine('custom', opts);
    assert.deepStrictEqual(engine.parse('hello'), { raw: 'hello' });
    assert.throws(() => engine.stringify({}), /does not support stringify/);
  });

  it('throws for an unknown engine name', () => {
    const opts = normalizeOptions();
    assert.throws(() => getEngine('nope', opts), /not registered/);
  });
});
