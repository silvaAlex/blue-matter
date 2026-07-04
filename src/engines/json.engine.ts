

import type { BlueMatterOptions, MatterData, MatterEngine } from '../domain/types.ts';

export const jsonEngine: MatterEngine = {
  parse(input: string): MatterData {
    return JSON.parse(input) as MatterData;
  },
  stringify(data: MatterData, options?: BlueMatterOptions): string {
    const space = (options as { space?: string | number } | undefined)?.space ?? 2;
    const replacer = (options as { replacer?: (key: string, value: unknown) => unknown } | undefined)?.replacer ?? undefined;
    return JSON.stringify(data, replacer, space);
  }
};
