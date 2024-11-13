import { defineStore } from 'pinia';
/* import InputField from 'src/components/inputs/InputField.vue';
import ImageUpload from 'src/components/inputs/ImageUpload.vue';
import DataGroup from 'src/components/inputs/DataGroup.vue';
import InputSelector from 'src/components/inputs/InputSelector.vue'; */
import StoryPreview from 'src/components/StoryPreview.vue';
import ProductPreview from 'src/components/ProductPreview.vue';
interface ComponentPairs {
    componentId: string;
    component: any;
}

export const useComponentStore = defineStore('componentHub', {
    state: () => ({
        //this hub contains the components the front end should use by the component id
        hub: [
            /* { componentId: 'inputField', component: InputField },
            { componentId: 'imageUpload', component: ImageUpload },
            { componentId: 'dataGroup', component: DataGroup },
            { componentId: 'inputSelector', component: InputSelector }, */
            { componentId: 'story', component: StoryPreview },
            { componentId: 'product', component: ProductPreview },
        ] as ComponentPairs[],
    }),

    getters: {
        //returns the component by the component id
        getComponentById: (state) => (componentId: string) => {
            const componentPair = state.hub.find(
                (pair) => pair.componentId === componentId
            );
            if (componentPair) {
                return componentPair.component;
            }
            return null;
        },
    },
});
