<template>
    <div class="story-container">
        <q-img
            v-if="storyFile"
            :src="`https://images.db-bocom.at/${getContentById(
                ELEMENT_IDS.IMAGE
            )}`"
            class="full-width image"
            :alt="getContentById(
                ELEMENT_IDS.ALT
            )"
        >
        </q-img>
        <div class="q-pa-md q-mx-auto content-container">
            <h1 class="text-h4 text-center q-my-lg title">
                {{ storyFile?.label }}
            </h1>
            <!-- <button @click="toggler = !toggler">Open the lightbox.</button>
            <FsLightbox :toggler="toggler" :sources="sources" /> -->

            <template v-if="storyFile?.data">
                <div
                    v-for="element in storyFile.data"
                    :key="element.elementId"
                    class="q-my-md"
                >
                    <h2
                        v-if="
                            element.data.content &&
                            !element.data.content.startsWith('<') &&
                            !element.data.content.endsWith('.png') &&
                            !element.data.content.endsWith('.jpg') &&
                            !element.data.content.endsWith('.jpeg')
                        "
                        class="text-h6 text-weight-regular q-mb-xl story-text"
                    >
                        {{ element.data.content }}
                    </h2>
                    <!-- <q-img width="50px" :src="'leaf.svg'" /> -->
                    <p
                        v-if="
                            element.data.content &&
                            element.data.content.startsWith('<')
                        "
                        class="text-body1 q-mb-xl story-content"
                        v-html="element.data.content"
                    ></p>
                </div>
            </template>
        </div>

        <grid-component
            style="margin-bottom: 48px"
            v-if="storyFile?.relatedFiles.length"
            :relatedFiles="storyFile?.relatedFiles"
            :label="'Interessante Beiträge'"
        />
    </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useDirectoryStore } from '../stores/directory-store';
import { useFileStore } from '../stores/file-store';
import { computed, watch, ref } from 'vue';
import GridComponent from 'components/GridComponent.vue';
//@ts-ignore
import FsLightbox from 'fslightbox-vue/v3';

const route = useRoute();
const store = useDirectoryStore();
const fileStore = useFileStore();

const toggler = ref(false);
const sources = ref([
    '/Images/Example.jpg',
    'https://i.imgur.com/fsyrScY.jpg',
    'https://www.youtube.com/watch?v=3nQNiWdeH2Q',
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
]);

const storyId = computed(() => route.params.storyId as string);
const directoryId = computed(() => route.params.directoryId as string);

const storyDirectoryItem = computed(() =>
    store.getNestedDirectoryItemById(directoryId.value)
);

const storyFile = ref<any>(null);

const getDataOfFile = async (fileId: string) => {
    const file = await fileStore.getFileById(fileId);
    storyFile.value = file;
    return file;
};

interface StoryData {
    content: string;
    text: string;
}
interface StoryElement {
    data: StoryData;
    elementId: string;
}

const ELEMENT_IDS = {
    IMAGE: '56f5bbc4-8638-4231-a790-8aab57f81304',
    ALT: 'ca02fea7-c29b-4389-ae0a-081622437298'
};

const getContentById = (elementId: string): string => {
    if (!storyFile.value?.data) return '';

    const element = (storyFile.value.data as StoryElement[]).find(
        (item) => item.elementId === elementId
    );

    return element?.data.content || element?.data.text || '';
};

/* const isImageContent = (content: string): boolean => {
    return (
        content?.endsWith('.png') ||
        content?.endsWith('.jpg') ||
        content?.endsWith('.jpeg')
    );
}; */

watch(
    () => route.params,
    async (newParams) => {
        if (newParams.storyId) {
            await getDataOfFile(newParams.storyId as string);
        }
    },
    { immediate: true }
);

watch(
    () => storyDirectoryItem.value?.fileId,
    async (newFileId) => {
        if (newFileId) {
            await getDataOfFile(storyId.value);
        }
    }
);
</script>

<style lang="scss" scoped>
.title {
    @media (max-width: 599px) {
        font-size: 2.3rem;
    }
}

.image {
    height: 400px;
    @media (max-width: 599px) {
        height: 50vw;
    }
}

.story-container {
    max-width: 100%;
}

.content-container {
    max-width: 800px;
}

.story-text {
    text-align: center;
    line-height: 1.6;

    @media (max-width: 599px) {
        text-align: left;
        line-height: 1.8;
    }
}

:deep(.story-content) {
    text-align: justify;
    line-height: 1.6;

    @media (max-width: 599px) {
        text-align: left;
        line-height: 1.8;
    }

    h3 {
        font-size: 1.45rem;
        font-weight: 500;
        margin: 2rem 0 1rem 0;
        line-height: 2.2rem;
    }

    p {
        line-height: 1.6;
        margin: 1rem 0;
        position: relative;

        @media (max-width: 599px) {
            line-height: 1.8;
        }

        &:first-of-type {
            &::before {
                content: '';
                display: block;
                float: left;
                width: 50px;
                height: 50px;
                margin-right: 10px;
                background-image: url('/leaf.svg');
                background-size: contain;
                background-repeat: no-repeat;
                background-position: center;
            }
        }
    }
}
</style>
