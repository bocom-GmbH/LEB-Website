<template>
    <q-page class="q-pa-md">
        <!-- Mappa nézet -->
        <div v-if="!selectedFolder" class="container q-mx-auto">
            <div class="text-h3 text-center q-mb-xl">
                {{ galeryFile?.label }}
            </div>

            <div class="row q-col-gutter-md items-stretch justify-center">
                <div
                    v-for="(folder, index) in galeryFile?.data"
                    :key="index"
                    class="col-12 col-sm-6 col-md-4 col-lg-3"
                >
                    <q-card
                        class="gallery-folder cursor-pointer"
                        flat
                        @click="openFolder(index)"
                    >
                        <q-img
                            :src="`https://images.db-bocom.at/${
                                folder.title_image || folder.titel_image
                            }`"
                            spinner-color="primary"
                            spinner-size="82px"
                            height="280px"
                        >
                            <div
                                class="absolute-bottom text-h6 text-center bg-primary"
                            >
                                {{ folder.title }}
                                <div class="text-subtitle1">
                                    {{ folder.images.length }}
                                    {{
                                        folder.images.length > 1
                                            ? 'Bilder'
                                            : 'Bild'
                                    }}
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
.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

.gallery-folder {
    transition: transform 0.2s ease;
    width: 100%;
    max-width: 400px;
    margin: 0 auto;

    &:hover {
        transform: translateY(-4px);
    }
}

.q-img {
    min-height: 200px;
}

// Média lekérdezések a reszponzív viselkedéshez
@media (max-width: 599px) {
    .gallery-folder {
        max-width: 100%;
    }
}
</style>
