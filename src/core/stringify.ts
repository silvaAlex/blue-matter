import type { FileInput, BlueMatterFile, BlueMatterOptions, MatterData } from '../domain/types.ts';
import { isBuffer, isObject, newline } from '../utils/index.ts';
import { getEngine } from './engine-resolver.ts';
import { normalizeOptions } from './normalize-options.ts';

export function stringify(file: FileInput, data?: MatterData, options?: BlueMatterOptions): string {
  if (typeof file === 'string' && data === undefined && options === undefined) {
    return file;
  }

  if (isBuffer(file) && data === undefined && options === undefined) {
    return file.toString('utf8');
  }

  if (!isObject(file)) {
    throw new TypeError('expected file to be a string, buffer, or object');
  }

  const resolvedFile = file as BlueMatterFile;
  const resolvedData = data ?? resolvedFile.data;
  const opts = normalizeOptions(options);

  const language = resolvedFile.language || opts.language;
  const engine = getEngine(language, opts);
  if (typeof engine.stringify !== 'function') {
    throw new TypeError(`expected "${language}.stringify" to be a function`);
  }

  const mergedData = { ...resolvedFile.data, ...resolvedData };
  const open = opts.delimiters[0] as string;
  const close = opts.delimiters[1] as string;
  const matter = engine.stringify(mergedData, options as unknown as Record<string, unknown> | undefined).trim();
  let buf = '';

  if (matter !== '{}') {
    buf = newline(open) + newline(matter) + newline(close);
  }

  const str = resolvedFile.content;
  if (typeof resolvedFile.excerpt === 'string' && resolvedFile.excerpt !== '') {
    if (str.indexOf(resolvedFile.excerpt.trim()) === -1) {
      buf += newline(resolvedFile.excerpt) + newline(close);
    }
  }

  return buf + newline(str);
}
