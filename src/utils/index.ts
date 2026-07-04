export function define<T extends object, K extends PropertyKey, V>(
  obj: T,
  key: K,
  val: V
): asserts obj is T & Record<K, V> {
  Reflect.defineProperty(obj, key, {
    enumerable: false,
    configurable: true,
    writable: true,
    value: val
  });
}

export function isBuffer(val: unknown): val is Buffer {
  return typeof Buffer !== 'undefined' && Buffer.isBuffer(val);
}

export function isObject(val: unknown): val is Record<string, unknown> {
  return Object.prototype.toString.call(val) === '[object Object]';
}

/** Cast a string to a Buffer; Buffers pass through unchanged. */
export function toBuffer(input: string | Buffer): Buffer {
  return typeof input === 'string' ? Buffer.from(input) : input;
}

/** Strip a leading UTF-8/UTF-16 BOM character, if present. */
export function stripBom(input: string): string {
  if (input.charCodeAt(0) === 0xfeff) {
    return input.slice(1);
  }
  return input;
}

/** Cast a Buffer or string to a BOM-stripped string. Throws for anything else. */
export function toString(input: unknown): string {
  if (isBuffer(input)) return stripBom(input.toString('utf8'));
  if (typeof input !== 'string') {
    throw new TypeError('expected input to be a string or buffer');
  }
  return stripBom(input);
}

/**
 * Cast `val` to an array. Fixed to only treat null/undefined as empty,
 * so falsy-but-meaningful values (0, false, '') are preserved.
 */
export function arrayify<T>(val: T | T[] | null | undefined): T[] {
  if (val === null || val === undefined) return [];
  return Array.isArray(val) ? val : [val];
}

/** Returns true if `str` starts with `substr`. */
export function startsWith(str: string, substr: string, len?: number): boolean {
  const n = typeof len === 'number' ? len : substr.length;
  return str.slice(0, n) === substr;
}

/** Ensure a string ends with exactly one trailing newline. */
export function newline(str: string): string {
  return str.slice(-1) !== '\n' ? str + '\n' : str;
}
