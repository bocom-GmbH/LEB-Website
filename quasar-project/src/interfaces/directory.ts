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
}

interface ISaveDirectoryResponse {
    data: {
        savePartialDirectory: boolean;
    };
}

export type {
	Idirectory,
	ISaveDirectoryResponse
}
