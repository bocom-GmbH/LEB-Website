// veriosn: 1.0.0
// Description: Apollo mutations for file data

import gql from 'graphql-tag';

const saveFile = gql`
    mutation saveFile($file: JSON) {
        saveFile(file: $file)
    }
`;

const deleteFilesByIdsGql = gql`
    mutation deleteFilesByIds($fileIds: [String!]) {
        deleteFilesByIds(fileIds: $fileIds)
    }
`;

export { saveFile, deleteFilesByIdsGql };
