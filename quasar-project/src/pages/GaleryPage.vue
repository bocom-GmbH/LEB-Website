<template>
    <q-page class="q-pa-md">
        <!-- Mappa nézet -->
        <div v-if="!selectedFolder" class="content-container q-mx-auto">
            <div class="text-h3 text-center q-mb-xl">
                {{ galeryFile?.label }}
            </div>

            <div class="row q-col-gutter-xl justify-center">
                <div
                    v-for="(folder, index) in galeryFile?.data"
                    :key="index"
                    class="col-12 col-sm-6 col-md-4"
                >
                    <q-card
                        class="gallery-folder cursor-pointer"
                        @click="openFolder(index)"
                        flat
                        bordered
                    >
                        <q-img
                            :src="`https://images.db-bocom.at/${
                                folder.title_image || folder.titel_image
                            }`"
                            :ratio="1"
                            spinner-color="primary"
                            spinner-size="82px"
                        >
                            <div
                                class="absolute-bottom text-subtitle1 text-center bg-dark-dimmed"
                            >
                                {{ folder.title }}
                                <div class="text-caption">
                                    {{ folder.images.length }} Bilder
                                </div>
                            </div>
                        </q-img>
                    </q-card>
                </div>
            </div>
        </div>

        <!-- Galéria nézet -->
        <gallery-viewer
            v-else
            :folder-title="selectedFolder.title"
            :images="selectedFolder.images"
            @back="selectedFolder = null"
        />
    </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useFileStore } from 'src/stores/file-store';
import { useRoute } from 'vue-router';
import GalleryViewer from 'src/components/GalleryViewer.vue';

const route = useRoute();
const fileStore = useFileStore();
const galeryFile = ref<any>(null);
const selectedFolder = ref<any>(null);

const fileId = computed(() => route.params.fileId as string);

onMounted(async () => {
    if (fileId.value) {
        galeryFile.value = await fileStore.getFileById(fileId.value);
    }
});

const openFolder = (index: number) => {
    selectedFolder.value = galeryFile.value?.data[index];
};
</script>

<style lang="scss" scoped>
.content-container {
    max-width: 1200px;
}

.gallery-folder {
    transition: transform 0.2s ease;

    &:hover {
        transform: translateY(-4px);
    }
}

.bg-dark-dimmed {
    background: rgba(0, 0, 0, 0.6);
    padding: 1rem;
}
</style>
