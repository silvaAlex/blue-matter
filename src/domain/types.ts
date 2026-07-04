export type MatterData = Record<string, unknown>;

export interface MatterEngine {
  parse(input: string, options?: BlueMatterOptions): MatterData;
  stringify(data: MatterData, options?: BlueMatterOptions): string;
}

export type EngineParseFn = (input: string, options?: BlueMatterOptions) => MatterData;

export type EngineRegistry = Record<string, MatterEngine | EngineParseFn>;

export interface BlueMatterOptions {
  /** Delimiter(s) that wrap the front matter block. Defaults to "---". */
  delimiters?: string | string[];
  /** @deprecated alias of `delimiters`, kept for backwards compatibility. */
  delims?: string | string[];
  /** Language used to parse/stringify front matter. Defaults to "yaml". */
  language?: string;
  /** @deprecated alias of `language`, kept for backwards compatibility. */
  lang?: string;
  /** Extra/override engines merged into the default registry. */
  engines?: EngineRegistry;
  /** @deprecated alias of `engines`, kept for backwards compatibility. */
  parsers?: EngineRegistry;
  /** Data merged into parsed front matter, or used when stringifying. */
  data?: MatterData;
  /**
   * Excerpt behaviour:
   *  - `true`  -> use the first delimiter as the excerpt separator
   *  - string  -> use this string as the excerpt separator
   *  - false/undefined -> excerpt disabled unless `excerpt_separator` is set in the data
   *  - function -> custom excerpt extraction
   */
  excerpt?: boolean | string | ((file: BlueMatterFile, options: Required<Pick<BlueMatterOptions, 'delimiters'>> & BlueMatterOptions) => BlueMatterFile);
  excerpt_separator?: string;
}


export interface NormalizedOptions extends BlueMatterOptions {
  delimiters: string[];
  language: string;
  engines: EngineRegistry;
}

export interface BlueMatterFile {
  content: string;
  data: MatterData;
  excerpt: string;
  isEmpty: boolean;
  language: string;
  matter: string;
  orig: Buffer;
  stringify(data?: MatterData, options?: BlueMatterOptions): string;
}

export type FileInput = string | Buffer | Partial<BlueMatterFile>;
