import { matter } from './core/matter.ts';
import { stringify } from './core/stringify.ts';
import { parseWithEngine } from './core/parse-engine.ts';
import { normalizeOptions } from './core/normalize-options.ts';
import { getEngine, resolveAlias } from './core/engine-resolver.ts';
import { defaultEngines, yamlEngine, jsonEngine } from './engines/index.ts';

export type {
  BlueMatterOptions,
  BlueMatterFile,
  MatterData,
  MatterEngine,
  EngineRegistry,
  EngineParseFn,
  NormalizedOptions,
  FileInput
} from './domain/types.ts';

export {
  matter,
  stringify,
  parseWithEngine,
  normalizeOptions,
  getEngine,
  resolveAlias,
  defaultEngines,
  yamlEngine,
  jsonEngine
};

/** Default export mirrors `require('gray-matter')` ergonomics: `matter(input, options)`. */
export default matter;
