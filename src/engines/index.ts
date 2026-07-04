import type { EngineRegistry } from '../domain/types.ts';
import { yamlEngine } from './yaml.engine.ts';
import { jsonEngine } from './json.engine.ts';

export const defaultEngines: EngineRegistry = {
  yaml: yamlEngine,
  json: jsonEngine,
};

export { yamlEngine, jsonEngine };
