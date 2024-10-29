// version 1.0.0
// Description: (Pinia-)Schema store for managing the data-handling and -manipulation of the schema data.

import { defineStore } from 'pinia';
import { useQuery } from '@vue/apollo-composable';
import fp from 'lodash/fp';
import { ISchema } from 'src/interfaces/schema';
import { getSchemaById, getAllSchemas } from 'src/apollo/queries/schema';

const fetchSchemaById = async (id: string): Promise<any> => {
    const { onResult, onError } = useQuery(getSchemaById, {
        id: id,
    });

    return new Promise((resolve) => {
        onResult((data) => {
            const result = data.data.querySchemaById;
            resolve(result);
        });

        onError((error) => {
            console.log(error);
            resolve(null);
        });
    });
};

const fetchAllSchemas = async (): Promise<any> => {
    const { onResult, onError } = useQuery(getAllSchemas);

    return new Promise((resolve) => {
        onResult((data) => {
            const result = data.data.schema;
            resolve(result);
        });

        onError((error) => {
            console.log(error);
            resolve(null);
        });
    });
};

export const useSchemaStore = defineStore('schema', {
    state: () => ({
		remoteSchemasFlat: [] as any[],
		localSchemasFlat: [] as any[],
		schemasNested: [] as any[]
    }),

    getters: {
		getSchemaLabelById: (state) => (id: string): string => {
			const schema = state.localSchemasFlat.find((schema) => schema.id === id);
			return schema ? schema.label : '';
		},

		getSchemaById: (state) => (id: string): ISchema | null => {
			return state.localSchemasFlat.find((schema) => schema.id === id) || null;
		},

		getSchemasForSelection: (state) => {
			console.log(state.localSchemasFlat);
			return state.localSchemasFlat.map((schema) => {
				return {
					label: schema.label,
					value: schema.id,
					icon: schema.metadata.isLeaf ? 'description' : 'folder',
					type: 'schema'
				}
			})
		}
	},

    actions: {
        clearSchemas(): void {
			this.remoteSchemasFlat = [];
            this.localSchemasFlat = [];
        },

		addSchemas(schemas: ISchema[]) {
            this.remoteSchemasFlat = fp.cloneDeep(schemas);
            this.localSchemasFlat = fp.cloneDeep(schemas);
        },

		async fetchAllSchemas(): Promise<any | null> {
			this.clearSchemas();
            const result = await fetchAllSchemas();
            if (result) {
				this.remoteSchemasFlat = result;
                this.localSchemasFlat = result;
                return result;
            }
			return null;
		}
    },
});
