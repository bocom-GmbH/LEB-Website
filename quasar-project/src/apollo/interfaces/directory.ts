interface Idirectory {
    id: string;
    fileId: string;
    parentId: string;
    position: number;
    name?: string;
    fixedNumberOfChildren?: number;
    schemaOfChildren?: string[];
    client?: string;
    children?: Idirectory[];
    type?: string;
    schemaId?: string;
    image?: string;
    price?: number;
    amount?: number;
    url?: string;
    linkFileId?: string;
    relatedFiles?: object[];
}

interface ISaveDirectoryResponse {
    data: {
        savePartialDirectory: boolean;
    };
}

interface IDirectoryNested {
    id: string;
    directory: Idirectory[];
}

export type { Idirectory, ISaveDirectoryResponse, IDirectoryNested };
