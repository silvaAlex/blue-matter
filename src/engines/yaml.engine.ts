import * as yaml from 'js-yaml';
import type { MatterData, MatterEngine } from '../domain/types.ts';

export const yamlEngine: MatterEngine = {
  parse(input: string): MatterData {
    const result = yaml.load(input);
    if (result === null || result === undefined) return {};
    if (typeof result !== 'object') {
      throw new TypeError('expected front-matter YAML to parse to an object');
    }
    return result as MatterData;
  },
  stringify(data: MatterData): string {
    return yaml.dump(data);
  }
};
