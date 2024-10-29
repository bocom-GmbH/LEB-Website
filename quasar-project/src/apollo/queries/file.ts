// verion: 1.0.0
// Description: Apollo queries for file data

import gql from 'graphql-tag';

const getFileById = gql`
	query queryFileData($id: String!) {
		queryFileData(id: $id) {
			id
			label
			data
			schemaId
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

export {
    getFileById,
	getFilesByFileIds
}
