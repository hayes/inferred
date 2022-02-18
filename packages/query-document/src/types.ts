export type Normalize<T> = T extends object ? { [K in keyof T]: T[K] } : T;

export type UnionToIntersection<T> = (T extends unknown ? (x: T) => unknown : never) extends (
  x: infer R,
) => unknown
  ? Normalize<R>
  : never;

type OperationKind = 'query' | 'mutation' | 'subscription';

interface ParsedOperation {
  kind: OperationKind;
  body: unknown[];
}

interface ParsedFragment {
  kind: 'fragment';
  name: string;
  type: string;
  body: unknown[];
}

export type GetOperation<T> = GetFragments<T> extends infer Frags
  ? T extends ParsedOperation
    ? {
        kind: T['kind'];
        selection: FormatSelection<T['body'][number], Frags>;
      }
    : never
  : never;

export type GetFragments<T> = T extends ParsedFragment
  ? {
      name: T['name'];
      type: T['type'];
      selection: FormatSelection<T['body'][number], never>;
    }
  : never;

type FormatSelection<T, Frags> = Normalize<
  UnionToIntersection<
    T extends { name: infer Name; alias?: { alias: infer Alias } }
      ? {
          [K in Alias extends string ? Alias : Name & string]: T extends { selections: unknown[] }
            ? {
                field: Name;
                selection: FormatSelection<T['selections'][number], Frags>;
              }
            : {
                field: Name;
                selection: true;
              };
        }
      :
          | never
          | (T extends { fragment: string & infer FragName }
              ? Frags & { name: FragName } extends { selection: infer S }
                ? S
                : never
              : {})
  >
>;

type MapSelection<T, S> = null extends T
  ? null | MapSelection<NonNullable<T>, S>
  : [T] extends [(infer U)[]]
  ? MapSelection<U, S>[]
  : MapSelections<T, S>;

export type MapSelections<T, S> = Normalize<{
  [K in keyof S]: S[K] extends { field: infer Field; selection: infer Sel }
    ? Sel extends true
      ? T[Field & keyof T]
      : MapSelection<T[Field & keyof T], Sel>
    : never;
}>;
