<template>
    <q-page class="">
        <q-img
            v-if="homeFile"
            :src="`https://images.db-bocom.at/${homeFile?.data[0]?.data?.content}`"
            alt=""
            style="max-height: 1273px"
        />
        {{ homeFile }}
        <div class="grid-conteiner row q-col-gutter-md">
            <div
                v-for="relatedFile in homeFile?.relatedFiles"
                :key="relatedFile.id"
                class="col-12 col-sm-6 col-md-3"
            >
                asd
                {{ relatedFile }}
                <component
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
                />
            </div>
        </div>
    </q-page>
</template>

<script setup lang="ts">
import { useFileStore } from 'src/stores/file-store';
import { onMounted, ref, watch } from 'vue';
import { useDirectoryStore } from 'src/stores/directory-store';
import { useComponentStore } from 'src/stores/component-hub';
import ProductPreview from 'components/ProductPreview.vue';
import StoryPreview from 'components/StoryPreview.vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const directoryStore = useDirectoryStore();
const fileStore = useFileStore();
const componentStore = useComponentStore();
const homeFile = ref();

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
        homeFile.value = await fileStore.getFileById(file.linkFileId);
    }
);

const navigateTo = (item: any) => {
    const path = `/${item.id}/${item.type}/${item.fileId}`;
    router.push({ path });
};

defineOptions({
    name: 'IndexPage',
});
</script>

<style scoped>
.grid-conteiner {
    max-width: 1200px;
    margin: 0 auto;
}

.my-card {
    width: 100%;
}
</style>
