import type { NormalizedOptions } from '../domain/types.ts';
import { startsWith } from '../utils/index.ts';

export interface SplitResult {
  matterFound: boolean;
  block: string;
  content: string;
  language: string | null;
}

export function splitFrontMatter(input: string, options: NormalizedOptions): SplitResult {
  const open = options.delimiters[0] as string;
  const close = options.delimiters[1] as string;

  const none: SplitResult = { matterFound: false, block: '', content: input, language: null };

  if (!input || !startsWith(input, open, open.length)) {
    return none;
  }
  const afterOpen = input.slice(open.length);
  const firstNewline = afterOpen.indexOf('\n');
  const firstLine = firstNewline === -1 ? afterOpen : afterOpen.slice(0, firstNewline);
  const languageMatch = /^([a-zA-Z0-9_-]+)\s*$/.exec(firstLine.trim());
  const language = firstLine.trim().length > 0 && languageMatch ? languageMatch[1] ?? null : null;

  const bodyStart = language !== null && firstNewline !== -1 ? open.length + firstNewline + 1 : open.length;

  const closeIndex = input.indexOf('\n' + close, bodyStart);
  if (closeIndex === -1) {
    return none;
  }

  const block = input.slice(bodyStart, closeIndex);
  const afterCloseIdx = closeIndex + 1 + close.length;
  const content = input[afterCloseIdx] === '\n' ? input.slice(afterCloseIdx + 1) : input.slice(afterCloseIdx);

  return { matterFound: true, block, content, language };
}
