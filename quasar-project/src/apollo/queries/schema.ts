// version: 1.0.0
// Description: Apollo queries for schema data

import gql from 'graphql-tag';

const getSchemaById = gql`
    query querySchemaById($id: String!) {
        querySchemaById(id: $id) {
            id
            label
            metadata
            elements
        }
    }
`;

const getAllSchemas = gql`
    query schema {
        schema {
            id
            label
            metadata
            elements
        }
    }
`;

export {
	getSchemaById,
	getAllSchemas
};
