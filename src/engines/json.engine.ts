import type { MatterData, MatterEngine } from '../domain/types.ts';

export interface JsonEngineOptions {
  space?: string | number;
  replacer?: (key: string, value: unknown) => unknown;
}

export const jsonEngine: MatterEngine = {
  parse(input: string): MatterData {
    return JSON.parse(input) as MatterData;
  },
  stringify(data: MatterData, options?: JsonEngineOptions): string {
    return JSON.stringify(data, options?.replacer, options?.space ?? 2);
  }
};
