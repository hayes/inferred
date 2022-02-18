import { ParseNode } from '@inferred/parser';
import { GetOperation, MapSelections } from '../src';
import { QueryBlock } from '../src/grammar';
import { Query } from './generated/types.generated';

const query = /* graphql */ `
    query queryGiraffes {
        giraffe {
            foodPreference: diet
            ...giraffeFields
            friends {
                ...giraffeFields
            }
        }
    }

    fragment giraffeFields on Giraffe {
        name
        height
    }
` as const;

function parse<T extends string>(
  q: T,
): ParseNode<T, QueryBlock> extends { node: (infer Nodes)[] } ? GetOperation<Nodes> : never {
  throw new Error('Not implemented');
}

export const parsed = parse(query);

export type Test = MapSelections<Query, typeof parsed['selection']>;
