<template>
    <q-page class="">
        {{ url }} halloi
        <q-img
            v-if="homeFile"
            :src="url + homeFile?.data[0]?.data?.content"
            :alt="homeFile?.data[1]?.data?.text"
            style="max-height: 1273px"
        />
        <!-- {{ homeFile }} -->
        <!--  <div class="grid-conteiner row q-col-gutter-md"> -->
        <!--  <div
                v-for="relatedFile in homeFile?.relatedFiles"
                :key="relatedFile.id"
                class="col-12 col-sm-6 col-md-3"
            > -->
        <grid-2
            v-if="homeFile?.relatedFiles.length"
            :relatedFiles="homeFile?.relatedFiles"
            class="grid-container"
            :label="''"
        />
        <!--    <component
                    v-if="
                        componentStore.getComponentById(relatedFile.type ?? '')
                    "
                    :is="
                        componentStore.getComponentById(relatedFile.type ?? '')
                    "
                    :item="{
                        id: relatedFile.fileId,
                        name: relatedFile.name,
                        image: relatedFile.image,
                        fileId: relatedFile.fileId,
                        amount: relatedFile.amount,
                        price: relatedFile.price,
                    }"
                    @click="navigateTo(relatedFile)"
                />-->
        <!-- </div> -->
        <!-- </div> -->
    </q-page>
</template>

<script setup lang="ts">
import { useFileStore } from 'src/stores/file-store';
import { onMounted, ref, watch, provide } from 'vue';
import { useDirectoryStore } from 'src/stores/directory-store';
import { useComponentStore } from 'src/stores/component-hub';
import ProductPreview from 'components/ProductPreview.vue';
import StoryPreview from 'components/StoryPreview.vue';
import { useRouter } from 'vue-router';
import Grid2 from 'src/components/Grid2.vue';

const router = useRouter();
const directoryStore = useDirectoryStore();
const fileStore = useFileStore();
const componentStore = useComponentStore();
const homeFile = ref();
const url = ref(import.meta.env.VITE_IMAGE_URL);
onMounted(async () => {
    if (directoryStore.getDirectoryNested?.directory) {
        const file =
            directoryStore.getDirectoryNested.directory[0].children.find(
                (item: any) => item.url === '/'
            );
        homeFile.value = await fileStore.getFileById(file.linkFileId);
    }
});

watch(
    () => directoryStore.getDirectoryNested,
    async (newValue) => {
        const file = newValue.directory[0].children.find(
            (item: any) => item.url === '/'
        );
        homeFile.value = await fileStore.getFileById(file?.linkFileId);
    }
);

defineOptions({
    name: 'IndexPage',
});
</script>

<style scoped>
.grid-container {
    margin-bottom: 200px;
    margin-top: 50px
}

@media (max-width: 599px) {
    .grid-container {
        margin-bottom: 20px;
    }
}

.my-card {
    width: 100%;
}
</style>
