import assert from 'node:assert';
import test, { describe, it } from 'node:test';
import { matter } from '../src/core/matter.ts';

describe('matter()', () => {
  it('parses YAML front matter and separates it from content', () => {
    const input = '---\ntitle: Hello\nlayout: post\n---\n# Body content\n';
    const file = matter(input);

    assert.deepStrictEqual(file.data, { title: 'Hello', layout: 'post' });
    assert.strictEqual(file.content, '# Body content\n');
    assert.strictEqual(file.isEmpty, false);
  });

  it('returns empty data and original content when there is no front matter', () => {
    const input = '# Just a markdown file\n\nNo front matter here.';
    const file = matter(input);

    assert.deepStrictEqual(file.data, {});
    assert.strictEqual(file.content, input);
  });

  it('supports custom delimiters', () => {
    const input = '~~~\ntitle: Custom\n~~~\nBody\n';
    const file = matter(input, { delimiters: '~~~' });

    assert.deepStrictEqual(file.data, { title: 'Custom' });
    assert.strictEqual(file.content, 'Body\n');
  });

  it('supports the json engine', () => {
    const input = '---\n{"title": "JSON front matter"}\n---\nBody';
    const file = matter(input, { language: 'json' });

    assert.deepStrictEqual(file.data, { title: 'JSON front matter' });
  });

  it('marks isEmpty true when content is only whitespace', () => {
    const input = '---\ntitle: Solo\n---\n   \n';
    const file = matter(input);

    assert.strictEqual(file.isEmpty, true);
  });

  it('round-trips via file.stringify()', () => {
    const input = '---\ntitle: Round Trip\n---\nBody content\n';
    const file = matter(input);
    const out = file.stringify({ extra: 'field' });

    assert(out.includes('title: Round Trip'));
    assert(out.includes('extra: field'));
    assert(out.includes('Body content'));
  });

  it('extracts an excerpt when options.excerpt is true', () => {
    const input = '---\ntitle: With Excerpt\n---\nIntro paragraph.\n---\nRest of the body.\n';
    const file = matter(input, { excerpt: true });

    assert.strictEqual(file.excerpt.trim(), 'Intro paragraph.');
  });

  it('throws for an unregistered engine', () => {
    const input = '---\nfoo: bar\n---\nBody';
    assert.throws(() => matter(input, { language: 'toml' }), /not registered/);
  });
});
