export type Whitespace = ' ' | '\n' | '\r' | '\t';

export type TrimLeft<T extends string> = T extends `${Whitespace}${infer Rest}`
  ? TrimLeft<Rest>
  : T;

export type TrimRight<T extends string> = T extends `${infer Rest}${Whitespace}`
  ? TrimRight<Rest>
  : T;

export type Trim<T extends string> = TrimRight<TrimLeft<T>>;

export type Normalize<T> = T extends object ? { [K in keyof T]: T[K] } : T;
