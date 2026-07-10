import type { MatterData, NormalizedOptions } from '../domain/types.ts';
import { getEngine } from './engine-resolver.ts';

export function parseWithEngine(language: string, str: string, options: NormalizedOptions): MatterData {
  const engine = getEngine(language, options);
  if (typeof engine.parse !== 'function') {
    throw new TypeError(`expected "${language}.parse" to be a function`);
  }
  return engine.parse(str, options as unknown as Record<string, unknown>);
}
