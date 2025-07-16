// version: 1.0.0
// Description: Apollo queries for directory data

import gql from 'graphql-tag';

const getDirectoryFolderToLoggedInClient = gql`
    query getDirectoryFolderToLoggedInClient {
        getDirectoryFolderToLoggedInClient(frontEndType: "desktop") {
            flat {
                id
                directory {
                    id
                    fileId
                    parentId
                    position
                    name
                    fixedNumberOfChildren
                    schemaOfChildren
                    client
                    schemaId
                    type
                    image
                    price
                    amount
                    url
                    linkFileId
                    alt
                }
            }
            nested {
                id
                directory {
                    id
                    fileId
                    parentId
                    position
                    name
                    fixedNumberOfChildren
                    schemaOfChildren
                    client
                    schemaId
                    type
                    image
                    price
                    amount
                    url
                    linkFileId
                    alt
                    children {
                        id
                        fileId
                        parentId
                        position
                        name
                        schemaOfChildren
                        fixedNumberOfChildren
                        client
                        schemaId
                        type
                        image
                        price
                        amount
                        url
                        linkFileId
                        alt
                        children {
                            id
                            fileId
                            parentId
                            position
                            name
                            schemaOfChildren
                            fixedNumberOfChildren
                            client
                            schemaId
                            type
                            image
                            price
                            amount
                            url
                            linkFileId
                            alt
                            children {
                                id
                                fileId
                                parentId
                                position
                                name
                                schemaOfChildren
                                fixedNumberOfChildren
                                client
                                schemaId
                                type
                                image
                                price
                                amount
                                url
                                linkFileId
                                alt
                                children {
                                    id
                                    fileId
                                    parentId
                                    position
                                    name
                                    schemaOfChildren
                                    fixedNumberOfChildren
                                    client
                                    schemaId
                                    type
                                    image
                                    price
                                    amount
                                    url
                                    linkFileId
                                    alt
                                    children {
                                        id
                                        fileId
                                        parentId
                                        position
                                        name
                                        schemaOfChildren
                                        fixedNumberOfChildren
                                        client
                                        schemaId
                                        type
                                        image
                                        price
                                        amount
                                        url
                                        linkFileId
                                        alt
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`;

export { getDirectoryFolderToLoggedInClient };
