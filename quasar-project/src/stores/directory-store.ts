// version 1.0.0
// Description: (Pinia-)Directory store for managing the data-handling and -manipulation of the directory data.

import { defineStore } from 'pinia';
import { useQuery } from '@vue/apollo-composable';
import { useMutation } from '@vue/apollo-composable';
import { saveDirectory } from 'src/apollo/mutations/directory';
import {
    Idirectory,
    ISaveDirectoryResponse,
    IDirectoryNested,
} from 'src/apollo/interfaces/directory';
import { getDirectoryFolderToLoggedInClient } from 'src/apollo/queries/directory';

const saveFlatDirectoriesMutation = async (
    directories: any
): Promise<ISaveDirectoryResponse> => {
    const directory = directories.directory;
    const {
        mutate: saveDirectoryMutation,
        onError,
        onDone,
    } = useMutation(saveDirectory, {
        variables: {
            directory: directory,
        },
    });

    const result = saveDirectoryMutation(directory);

    return new Promise((resolve) => {
        onDone((data) => {
            if (data.data.saveDirectory) {
                fetchDirectory();
            }
            resolve(data as ISaveDirectoryResponse);
        });

        onError((error) => {
            console.log(error);
            resolve({
                data: {
                    savePartialDirectory: false,
                },
            });
        });
    });
};

const fetchDirectory = async (): Promise<{
    flat: Idirectory[];
    nested: Idirectory[];
} | null> => {
    const { onResult, onError } = useQuery(getDirectoryFolderToLoggedInClient);

    return new Promise((resolve) => {
        onResult((data) => {
            const result = data.data.getDirectoryFolderToLoggedInClient;
            resolve(result);
        });

        onError((error) => {
            console.log(error);
            resolve(null);
        });
    });
};

export const useDirectoryStore = defineStore('directory', {
    state: () => ({
        remoteDirectoryFlat: [] as Idirectory[],
        localDirectoryFlat: [] as Idirectory[],
        directoryNested: null as IDirectoryNested | null,
    }),

    getters: {
        getLocalDirectoryFlat(state): any[] {
            return state.localDirectoryFlat;
        },
        getRemoteDirectoryFlat(state): any[] {
            return state.remoteDirectoryFlat;
        },
        getDirectoryNested(state): any[] {
            return state.directoryNested;
        },
        getNestedDirectoryItemById: (state) => {
            return (id: string): Idirectory | undefined => {
                if (
                    !state.directoryNested ||
                    typeof state.directoryNested !== 'object'
                ) {
                    console.warn(
                        'directoryNested nem létezik vagy nem objektum',
                        state.directoryNested
                    );
                    return undefined;
                }

                const directoryArray = (state.directoryNested as any).directory;
                if (!Array.isArray(directoryArray)) {
                    console.warn('directory nem tömb típusú', directoryArray);
                    return undefined;
                }

                const findInNested = (
                    items: Idirectory[]
                ): Idirectory | undefined => {
                    if (!Array.isArray(items)) {
                        console.warn('A keresett items nem tömb típusú', items);
                        return undefined;
                    }

                    for (const item of items) {
                        if (item.id === id) {
                            return item;
                        }
                        if (
                            item.children &&
                            Array.isArray(item.children) &&
                            item.children.length > 0
                        ) {
                            const found = findInNested(item.children);
                            if (found) {
                                return found;
                            }
                        }
                    }
                    return undefined;
                };

                return findInNested(directoryArray);
            };
        },
    },

    actions: {
        clearDirectory(): void {
            this.localDirectoryFlat = [];
            this.remoteDirectoryFlat = [];
            this.directoryNested = [];
        },

        async fetchDirectory(): Promise<void> {
            const result = await fetchDirectory();
            if (result) {
                console.log(result);
                this.remoteDirectoryFlat = [];
                this.directoryNested = [];
                this.localDirectoryFlat = [];
                this.remoteDirectoryFlat = result.flat;
                this.directoryNested = result.nested;
                this.localDirectoryFlat = result.flat;
            } else {
                console.error('Failed to fetch directories');
            }
        },

        getDirectoryItemById(id: string): Idirectory | undefined {
            // @ts-ignore
            if (!Array.isArray(this.localDirectoryFlat.directory)) {
                return undefined;
            }
            // @ts-ignore
            return this.localDirectoryFlat.directory.find(
                // @ts-ignore
                (item) => item.id === id
            );
        },

        setVisibilityById(id: string, visibility: boolean): void {
            const itemInDirectory = this.localDirectoryFlat.find(
                (item) => item.id === id
            );
            if (itemInDirectory) {
                itemInDirectory.isVisible = visibility;
            }
        },
    },
});
