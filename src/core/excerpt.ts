import type { BlueMatterFile, NormalizedOptions } from '../domain/types.ts';

export function applyExcerpt(file: BlueMatterFile, options: NormalizedOptions): BlueMatterFile {
  if (typeof options.excerpt === 'function') {
    return options.excerpt(file, options as Required<Pick<typeof options, 'delimiters'>> & typeof options);
  }

  const sepFromData = file.data.excerpt_separator as string | undefined;
  const sep = sepFromData ?? options.excerpt_separator;

  if (sep === undefined && (options.excerpt === false || options.excerpt == null)) {
    return file;
  }

  const delimiter = typeof options.excerpt === 'string' ? options.excerpt : sep ?? (options.delimiters[0] as string);

  const idx = file.content.indexOf(delimiter);
  if (idx !== -1) {
    file.excerpt = file.content.slice(0, idx);
  }

  return file;
}
