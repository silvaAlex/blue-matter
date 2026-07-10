import type { BlueMatterOptions, NormalizedOptions } from '../domain/types.ts';
import { defaultEngines } from '../engines/index.ts';
import { arrayify } from '../utils/index.ts';

export function normalizeOptions(options?: BlueMatterOptions): NormalizedOptions {
  const opts: BlueMatterOptions = { ...options };

  const rawDelimiters = arrayify(opts.delimiters ?? '---');
  const delimiters = [...rawDelimiters];
  if (delimiters.length === 1) {
    delimiters.push(delimiters[0] as string);
  }

  const language = (opts.language ?? 'yaml').toLowerCase();
  const engines = { ...defaultEngines, ...opts.engines };

  return {
    ...opts,
    delimiters,
    language,
    engines
  };
}
