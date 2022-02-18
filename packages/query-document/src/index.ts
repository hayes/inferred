import { parse } from 'graphql';
import { TypedDocumentNode } from '@graphql-typed-document-node/core';
import { ParseNode } from '@inferred/parser';
import { QueryBlock } from './grammar';
import { GetOperation, MapSelections } from './types';

export function parser<T>(): <Query extends string>(
  query: Query,
) => TypedDocumentNode<
  MapSelections<
    T,
    (ParseNode<Query, QueryBlock> extends { node: (infer Nodes)[] }
      ? GetOperation<Nodes>
      : never)['selection']
  >,
  {}
> {
  return parse as never;
}
