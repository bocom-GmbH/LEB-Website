// version 1.0.0
// Description: (Pinia-)File store for managing the data-handling and -manipulation of the file data.

import { defineStore } from 'pinia';
import { useQuery } from '@vue/apollo-composable';
import { useMutation } from '@vue/apollo-composable';
import { getFileById } from '../apollo/queries/file';
import { saveFile } from 'src/apollo/mutations/file';
import { FileItem, ISaveResponse, IFile, IData } from '../interfaces/file';

const saveFileMutation = async (file: IFile): Promise<ISaveResponse> => {
    const {
        mutate: saveFileMutation,
        onError,
        onDone,
    } = useMutation(saveFile, {
        variables: {
            file: file,
        },
    });

    saveFileMutation({ file });

    return new Promise((resolve) => {
        onDone((data) => {
            resolve(data as ISaveResponse);
        });

        onError((error) => {
            console.log(error);
            resolve({
                data: {
                    saveFile: false,
                },
            });
        });
    });
};

const fetchFileById = async (id: string): Promise<any> => {
    console.log('fetchFileById', id);
    const { onResult, onError } = useQuery(getFileById, {
        id: id,
    });

    return new Promise((resolve) => {
        onResult((data) => {
            const result = data.data.queryFileData;
            resolve(result);
        });

        onError((error) => {
            console.log(error);
            resolve(null);
        });
    });
};

export const useFileStore = defineStore('file', {
    state: () => ({
        activeFileId: '',
        localFiles: [] as FileItem[],
        remoteFiles: [] as FileItem[],
    }),
    getters: {
        getActiveFileId: (state) => {
            return state.activeFileId;
        },

        getActiveFile: (state) => {
            return state.localFiles.find(
                (file) => file.id === state.activeFileId
            );
        },

        getContentById:
            (state) => (fileId: string, elementId: string, index: any) => {
                // console.log('getContentById', fileId, elementId, index)
                const file = state.localFiles.find(
                    (file) => file.id === fileId
                );
                if (file) {
                    if (index !== undefined) {
                        const element = file.data.find(
                            (element) =>
                                element.elementId === elementId + '_' + index
                        );
                        //console.log('element:', element);
                        if (element) {
                            return element.data.content;
                        }
                    } else {
                        const element = file.data.find(
                            (element) => element.elementId === elementId
                        );
                        //console.log('element:', element);
                        if (element) {
                            return element.data.content;
                        }
                    }
                }
                return '';
            },

        getElementOfFile: (state) => (fileId: string, elementId: string) => {
            const file = state.localFiles.find((file) => file.id === fileId);
            if (file) {
                return file.data.find(
                    (element) => element.elementId === elementId
                ).data.content;
            }
            return null;
        },

        getFileByFileId: (state) => (id: string) => {
            return state.localFiles.find((file) => file.id === id);
        },
    },

    actions: {
        setActiveFileId(id: string) {
            this.activeFileId = id;
        },

        async getFileById(id: string): Promise<any | null> {
            if (
                this.localFiles.some((file) => file.id === id) &&
                this.remoteFiles.some((file) => file.id === id)
            ) {
                return this.localFiles.find((file) => file.id === id);
            }
            const result = await fetchFileById(id);
            if (result) {
                console.log('result', result);
                this.remoteFiles = [...this.remoteFiles, result];
                this.localFiles = [...this.localFiles, result];
                return result;
            }
            return null;
        },

        async saveFile(fileId: string): Promise<ISaveResponse> {
            const file = await this.getFileByFileId(fileId);
            if (file) {
                return saveFileMutation(file);
            } else {
                return Promise.resolve({
                    data: {
                        saveFile: false,
                    },
                });
            }
        },
    },
});
