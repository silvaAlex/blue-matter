import type { FileInput, BlueMatterFile } from '../domain/types.ts';
import { isObject, toBuffer, toString } from '../utils/index.ts';

/**
 * Normalizes the given value into a `BlueMatterFile` shell (content/data/etc
 * populated with sane defaults). `stringify` is attached later by `matter()`
 * once we know which engine/options apply.
 */
export function toFile(input: FileInput): BlueMatterFile {
  const source: Partial<BlueMatterFile> = isObject(input) ? { ...(input as Partial<BlueMatterFile>) } : { content: input as string | Buffer as unknown as string };

  if (!isObject(source.data)) {
    source.data = {};
  }

  // Support `.contents` (vfile-style) as an alias for `.content`.
  const withContents = source as { contents?: string | Buffer };
  if (withContents.contents !== undefined && source.content === undefined) {
    source.content = withContents.contents as unknown as string;
  }

  const rawContent = source.content ?? '';
  const orig = toBuffer(rawContent as unknown as string | Buffer);
  const content = toString(rawContent);

  const file: BlueMatterFile = {
    content,
    data: source.data ?? {},
    excerpt: '',
    isEmpty: content.trim().length === 0,
    language: source.language ?? '',
    matter: source.matter ?? '',
    orig,
    stringify() {
      throw new Error('stringify() has not been attached yet; use matter() to obtain a fully-initialized file.');
    }
  };

  return file;
}
