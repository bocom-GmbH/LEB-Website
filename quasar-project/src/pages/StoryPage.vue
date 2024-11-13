<template>
    <div class="story-container">
        <q-img
            v-if="storyDirectoryItem?.image"
            :src="`https://images.db-bocom.at/${storyDirectoryItem.image}`"
            height="400px"
            class="full-width"
        >
        </q-img>

        <div class="q-pa-md q-mx-auto content-container">
            <div class="text-h3 text-center q-my-lg">
                {{ storyDirectoryItem?.name }}
            </div>

            <template v-if="storyFile?.data">
                <div
                    v-for="element in storyFile.data"
                    :key="element.elementId"
                    class="q-my-md"
                >
                    <div
                        v-if="
                            element.data.content &&
                            !element.data.content.startsWith('<') &&
                            !element.data.content.endsWith('.png') &&
                            !element.data.content.endsWith('.jpg') &&
                            !element.data.content.endsWith('.jpeg')
                        "
                        class="text-h6 text-weight-regular text-center q-mb-xl"
                    >
                        {{ element.data.content }}
                    </div>

                    <div
                        v-if="
                            element.data.content &&
                            element.data.content.startsWith('<')
                        "
                        class="text-body1 q-mb-xl story-content"
                        v-html="element.data.content"
                    ></div>
                </div>
            </template>
        </div>

        <grid-component style="margin-bottom: 200px" />
    </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useDirectoryStore } from '../stores/directory-store';
import { useFileStore } from '../stores/file-store';
import { computed, watch, ref } from 'vue';
import GridComponent from 'components/GridComponent.vue';

const route = useRoute();
const store = useDirectoryStore();
const fileStore = useFileStore();

const storyId = route.params.storyId as string;
const directoryId = route.params.directoryId as string;

const storyDirectoryItem = computed(() =>
    store.getNestedDirectoryItemById(directoryId)
);

const storyFile = ref<any>(null);

const getDataOfFile = async (fileId: string) => {
    const file = await fileStore.getFileById(fileId);
    storyFile.value = file;
    return file;
};

/* const isImageContent = (content: string): boolean => {
    return (
        content?.endsWith('.png') ||
        content?.endsWith('.jpg') ||
        content?.endsWith('.jpeg')
    );
}; */

watch(
    () => storyDirectoryItem.value?.fileId,
    async (newFileId) => {
        if (newFileId) {
            await getDataOfFile(storyId);
        }
    },
    { immediate: true }
);
</script>

<style lang="scss" scoped>
.story-container {
    max-width: 100%;
}

.content-container {
    max-width: 800px;
}

:deep(.story-content) {
    h3 {
        font-size: 1.5rem;
        font-weight: 500;
        margin: 2rem 0 1rem 0;
    }

    p {
        line-height: 1.6;
        margin: 1rem 0;
    }
}
</style>
