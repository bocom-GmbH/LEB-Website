import { gql } from '@apollo/client/core';

const request = gql`
    mutation customerRequest(
        $request: String!
        $name: String!
        $email: String!
    ) {
        customerRequest(request: $request, name: $name, email: $email)
    }
`;

export { request };
