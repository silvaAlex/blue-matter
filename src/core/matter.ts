'use strict';

import type { FileInput, BlueMatterFile, BlueMatterOptions, MatterData } from '../domain/types.ts';
import { normalizeOptions } from './normalize-options.ts';
import { splitFrontMatter } from './split-front-matter.ts';
import { parseWithEngine } from './parse-engine.ts';
import { toFile } from './to-file.ts';
import { applyExcerpt } from './excerpt.ts';
import { stringify } from './stringify.ts';


export function matter(input: FileInput, options?: BlueMatterOptions): BlueMatterFile {
  const opts = normalizeOptions(options);
  const file = toFile(input);

  const { matterFound, block, content, language } = splitFrontMatter(file.content, opts);

  file.language = language ?? opts.language;
  file.content = content;

  if (matterFound) {
    file.matter = block;
    if (block.trim() !== '') {
      file.data = parseWithEngine(file.language, block, opts) as MatterData;
    }
  }

  file.isEmpty = file.content.trim().length === 0;

  file.stringify = function (data?: MatterData, stringifyOptions?: BlueMatterOptions): string {
    return stringify(file, data, stringifyOptions ?? options);
  };

  return applyExcerpt(file, opts);
}
