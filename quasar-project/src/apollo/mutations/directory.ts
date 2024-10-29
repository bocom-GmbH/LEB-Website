// verion: 1.0.0
// Description: Apollo mutations for directory data

import gql from 'graphql-tag';

const saveDirectory = gql`
    mutation savePartialDirectory($directory: JSON) {
        savePartialDirectory(directory: $directory)
    }
`;

export { saveDirectory };
