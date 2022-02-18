import { parser } from '../src';
import { Query } from './generated/types.generated';

const parseQuery = parser<Query>();

export const query = parseQuery(/* graphql */ `
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
`);

console.log(query);
