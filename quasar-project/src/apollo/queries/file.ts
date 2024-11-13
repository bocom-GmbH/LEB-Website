// verion: 1.0.0
// Description: Apollo queries for file data

import gql from 'graphql-tag';
// TODO: queryFileData makes a query by FileId, and not by id
// name should be getFileById
const getFileById = gql`
    query queryFileData($id: String!) {
        queryFileData(id: $id) {
            id
            label
            data
            schemaId
            relatedFiles
        }
    }
`;

const getFilesByFileIds = gql`
    query filesByFileIds($fileIds: [String!]) {
        filesByFileIds(fileIds: $fileIds) {
            id
            label
            data
            schemaId
        }
    }
`;

export { getFileById, getFilesByFileIds };
