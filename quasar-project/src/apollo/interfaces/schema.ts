interface ISchema {
    id: string,
	label: string,
	metadata: {
		isLeaf: boolean,
		metadata_elements: object[]
	},
	elements: object[]
}

export type {
	ISchema
}
