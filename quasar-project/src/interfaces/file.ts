interface FileItem {
    id: string;
    label: string;
    data: object[];
    schemaId: string;
}

interface ISaveResponse {
    data: {
        saveFile: boolean;
    };
}

interface IFile {
    id: string;
    data: IData[];
    schemaId: string;
    label?: string;
}

interface IData {
    data: {
        content: string;
    };
    elementId: string;
}

export type {
	FileItem,
	ISaveResponse,
	IFile,
	IData
}
