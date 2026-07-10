import type { FileInput, BlueMatterFile } from '../domain/types.ts';
import { isObject, toBuffer, toString } from '../utils/index.ts';

/**
 * Normalizes the given value into a `BlueMatterFile` shell (content/data/etc
 * populated with sane defaults). `stringify` is attached later by `matter()`
 * once we know which engine/options apply.
 */
export function toFile(input: FileInput): BlueMatterFile {
  if (isObject(input)) {
    const partial = input as Partial<BlueMatterFile>;

    const rawContent = partial.content ?? (partial as { contents?: string | Buffer }).contents ?? '';
    const orig = toBuffer(rawContent as string | Buffer);
    const content = toString(rawContent);

    return {
      content,
      data: isObject(partial.data) ? partial.data : {},
      excerpt: partial.excerpt ?? '',
      isEmpty: content.trim().length === 0,
      language: partial.language ?? '',
      matter: partial.matter ?? '',
      orig,
      stringify() {
        throw new Error('stringify() has not been attached yet; use matter() to obtain a fully-initialized file.');
      }
    };
  }

  const rawContent = (input as string | Buffer) ?? '';
  const orig = toBuffer(rawContent);
  const content = toString(rawContent);

  return {
    content,
    data: {},
    excerpt: '',
    isEmpty: content.trim().length === 0,
    language: '',
    matter: '',
    orig,
    stringify() {
      throw new Error('stringify() has not been attached yet; use matter() to obtain a fully-initialized file.');
    }
  };
}
