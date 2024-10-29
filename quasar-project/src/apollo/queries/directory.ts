// version: 1.0.0
// Description: Apollo queries for directory data

import gql from 'graphql-tag';

const getDirectoryFolderToLoggedInClient = gql`
    query getDirectoryFolderToLoggedInClient {
        getDirectoryFolderToLoggedInClient {
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
