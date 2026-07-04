import type { MatterEngine, NormalizedOptions } from '../domain/types.ts';


export function resolveAlias(name: string): string {
  switch (name.toLowerCase()) {
    case 'yaml':
    case 'yml':
      return 'yaml';
    default:
      return name;
  }
}

export function getEngine(name: string, options: NormalizedOptions): MatterEngine {
  const raw = options.engines[name] ?? options.engines[resolveAlias(name)];
  if (raw === undefined) {
    throw new Error(`blue-matter engine "${name}" is not registered`);
  }
  if (typeof raw === 'function') {
    return { parse: raw, stringify: unsupportedStringify(name) };
  }
  return raw;
}

function unsupportedStringify(name: string): MatterEngine['stringify'] {
  return () => {
    throw new Error(`blue-matter engine "${name}" does not support stringify`);
  };
}
