import assert from 'node:assert';
import test, { describe, it } from 'node:test';
import { yamlEngine, jsonEngine } from '../src/engines/index.ts';

describe('yamlEngine', () => {
  it('parses YAML into an object', () => {
    assert.deepStrictEqual(yamlEngine.parse('title: Hi\ncount: 3\n'), { title: 'Hi', count: 3 });
  });

  it('returns {} for empty/null YAML documents', () => {
    assert.deepStrictEqual(yamlEngine.parse(''), {});
    assert.deepStrictEqual(yamlEngine.parse('~'), {});
  });

  it('rejects scalar-only YAML (not an object)', () => {
    assert.throws(() => yamlEngine.parse('just a string'), TypeError);
  });

  it('stringifies an object back to YAML', () => {
    assert.strictEqual(yamlEngine.stringify({ title: 'Hi' }), 'title: Hi\n');
  });

  it('respects indent option', () => {
    const out = yamlEngine.stringify({ a: { b: 1 } }, { indent: 4 });
    assert.ok(out.includes('    b: 1'));
  });

  it('respects sortKeys option', () => {
    const out = yamlEngine.stringify({ z: 1, a: 2 }, { sortKeys: true });
    const lines = out.trim().split('\n');
    assert.ok(lines[0]!.startsWith('a:'));
    assert.ok(lines[1]!.startsWith('z:'));
  });

  it('defaults noRefs to true', () => {
    const obj = { a: 1 };
    const out = yamlEngine.stringify({ x: obj, y: obj });
    assert.ok(!out.includes('&'));
  });
});

describe('jsonEngine', () => {
  it('parses JSON', () => {
    assert.deepStrictEqual(jsonEngine.parse('{"a":1}'), { a: 1 });
  });

  it('stringifies with default 2-space indentation', () => {
    assert.strictEqual(jsonEngine.stringify({ a: 1 }), '{\n  "a": 1\n}');
  });

  it('respects space option', () => {
    const out = jsonEngine.stringify({ a: 1 }, { space: 4 });
    assert.strictEqual(out, '{\n    "a": 1\n}');
  });

  it('respects replacer option', () => {
    const out = jsonEngine.stringify({ a: 1, b: 2 }, { replacer: (_k: string, v: unknown) => (v === 2 ? undefined : v) });
    assert.ok(!out.includes('"b"'));
  });
});
