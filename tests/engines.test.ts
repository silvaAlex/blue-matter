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
});

describe('jsonEngine', () => {
  it('parses JSON', () => {
    assert.deepStrictEqual(jsonEngine.parse('{"a":1}'), { a: 1 });
  });

  it('stringifies with default 2-space indentation', () => {
    assert.strictEqual(jsonEngine.stringify({ a: 1 }), '{\n  "a": 1\n}');
  });
});
