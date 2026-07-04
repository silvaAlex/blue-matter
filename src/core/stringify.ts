import type { FileInput, BlueMatterFile, BlueMatterOptions, MatterData } from '../domain/types.ts';
import { isObject, newline } from '../utils/index.ts';
import { getEngine } from './engine-resolver.ts';
import { normalizeOptions } from './normalize-options.ts';

export function stringify(file: FileInput, data?: MatterData, options?: BlueMatterOptions): string {
  let resolvedFile: BlueMatterFile;
  let resolvedData = data;
  let resolvedOptions = options;

  if (resolvedData === undefined && resolvedOptions === undefined) {
    if (typeof file === 'string') {
      return file;
    }
    if (isObject(file)) {
      resolvedFile = file as BlueMatterFile;
      resolvedData = resolvedFile.data;
      resolvedOptions = {};
    } else {
      throw new TypeError('expected file to be a string or object');
    }
  } else {
    if (!isObject(file)) {
      throw new TypeError('expected file to be a string or object');
    }
    resolvedFile = file as BlueMatterFile;
  }

  const str = resolvedFile.content;
  const opts = normalizeOptions(resolvedOptions);

  if (resolvedData == null) {
    if (!opts.data) return resolvedFile.content;
    resolvedData = opts.data;
  }

  const language = resolvedFile.language || opts.language;
  const engine = getEngine(language, opts);
  if (typeof engine.stringify !== 'function') {
    throw new TypeError(`expected "${language}.stringify" to be a function`);
  }

  const mergedData = { ...resolvedFile.data, ...resolvedData };
  const open = opts.delimiters[0] as string;
  const close = opts.delimiters[1] as string;
  const matter = engine.stringify(mergedData, resolvedOptions).trim();
  let buf = '';

  if (matter !== '{}') {
    buf = newline(open) + newline(matter) + newline(close);
  }

  if (typeof resolvedFile.excerpt === 'string' && resolvedFile.excerpt !== '') {
    if (str.indexOf(resolvedFile.excerpt.trim()) === -1) {
      buf += newline(resolvedFile.excerpt) + newline(close);
    }
  }

  return buf + newline(str);
}
