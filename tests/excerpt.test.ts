import assert from 'node:assert';
import test, { describe, it } from 'node:test';
import { matter } from '../src/core/matter.ts';

describe('excerpt extraction', () => {
  it('does nothing when excerpt is not requested', () => {
    const file = matter('---\ntitle: A\n---\nIntro\n---\nRest\n');
    assert.strictEqual(file.excerpt, '');
  });

  it('uses the first delimiter as the separator when excerpt: true', () => {
    const file = matter('---\ntitle: A\n---\nIntro\n---\nRest\n', { excerpt: true });
    assert.strictEqual(file.excerpt.trim(), 'Intro');
  });

  it('uses a custom string separator when excerpt is a string', () => {
    const file = matter('---\ntitle: A\n---\nIntro\n<!-- more -->\nRest\n', { excerpt: '<!-- more -->' });
    assert.strictEqual(file.excerpt.trim(), 'Intro');
  });

  it('prefers excerpt_separator declared in the front matter itself', () => {
    const file = matter('---\nexcerpt_separator: <!-- cut -->\n---\nIntro\n<!-- cut -->\nRest\n', {
      excerpt: true
    });
    assert.strictEqual(file.excerpt.trim(), 'Intro');
  });

  it('supports a custom excerpt function', () => {
    const file = matter('---\ntitle: A\n---\nFull body text here\n', {
      excerpt: (f) => {
        f.excerpt = f.content.slice(0, 4);
        return f;
      }
    });
    assert.strictEqual(file.excerpt, 'Full');
  });
});
