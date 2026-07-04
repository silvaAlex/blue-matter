import assert from 'node:assert';
import test, { describe, it } from 'node:test';
import { arrayify, define, isBuffer, isObject, startsWith, stripBom, toBuffer, toString, newline } from '../src/utils/index.ts';

describe('arrayify()', () => {
  it('wraps a single value in an array', () => {
    assert.deepStrictEqual(arrayify('a'), ['a']);
  });

  it('returns arrays unchanged', () => {
    assert.deepStrictEqual(arrayify(['a', 'b']), ['a', 'b']);
  });

  it('returns [] for null/undefined', () => {
    assert.deepStrictEqual(arrayify(null), []);
    assert.deepStrictEqual(arrayify(undefined), []);
  });

  it('BUG FIX: preserves falsy-but-valid values like 0, false, ""', () => {
    assert.deepStrictEqual(arrayify(0), [0]);
    assert.deepStrictEqual(arrayify(false), [false]);
    assert.deepStrictEqual(arrayify(''), ['']);
  });
});

describe('isBuffer() / isObject()', () => {
  it('detects buffers', () => {
    assert.strictEqual(isBuffer(Buffer.from('x')), true);
    assert.strictEqual(isBuffer('x'), false);
  });

  it('detects plain objects', () => {
    assert.strictEqual(isObject({}), true);
    assert.strictEqual(isObject([]), false);
    assert.strictEqual(isObject(null), false);
  });
});

describe('toBuffer() / toString() / stripBom()', () => {
  it('converts a string to a Buffer and back', () => {
    const buf = toBuffer('hello');
    assert.strictEqual(Buffer.isBuffer(buf), true);
    assert.strictEqual(toString(buf), 'hello');
  });

  it('strips a leading BOM', () => {
    assert.strictEqual(stripBom('\uFEFFhello'), 'hello');
    assert.strictEqual(toString('\uFEFFhello'), 'hello');
  });

  it('throws for non-string/buffer input', () => {
    assert.throws(() => toString(123 as unknown as string), TypeError);
  });
});

describe('startsWith() / newline()', () => {
  it('detects a prefix', () => {
    assert.strictEqual(startsWith('---abc', '---'), true);
    assert.strictEqual(startsWith('abc', '---'), false);
  });

  it('ensures exactly one trailing newline', () => {
    assert.strictEqual(newline('a'), 'a\n');
    assert.strictEqual(newline('a\n'), 'a\n');
  });
});

describe('define()', () => {
  it('sets a non-enumerable property', () => {
    const obj: Record<string, unknown> = {};
    define(obj, 'hidden', 42);
    assert.strictEqual(obj.hidden, 42);
    assert(!Object.keys(obj).includes('hidden'));
  });
});
