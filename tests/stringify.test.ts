import assert from 'node:assert';
import test, { describe, it } from 'node:test';
import { matter } from '../src/core/matter.ts';
import { stringify } from '../src/core/stringify.ts';

describe('stringify()', () => {
  it('returns the input unchanged when it is a plain string with no data/options', () => {
    assert.strictEqual(stringify('just a string'), 'just a string');
  });

  it('rebuilds delimiters + matter + content', () => {
    const file = matter('---\ntitle: A\n---\nBody\n');
    const out = stringify(file, { title: 'B' });

    assert.strictEqual(out, '---\ntitle: B\n---\nBody\n');
  });

  it('omits the front-matter block entirely when data stringifies to "{}"', () => {
    const file = matter('Body only, no matter\n');
    const out = stringify(file, {});

    assert.strictEqual(out, 'Body only, no matter\n');
  });

  it('throws when file is neither a string nor an object', () => {
    // @ts-expect-error intentionally invalid input for the runtime check
    assert.throws(() => stringify(42), TypeError);
  });
});
