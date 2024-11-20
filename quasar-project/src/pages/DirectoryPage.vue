<template>
    <div class="text-h3 w-full text-center q-mt-lg">
        {{ directoryItem?.name }}
    </div>
    <br />
    <div class="content-wrapper q-px-md">
        <div class="row q-col-gutter-md justify-center">
            <div
                v-for="item of directoryItem?.children"
                :key="item.id"
                class="col-12 col-sm-6 col-md-3"
            >
                <component
                    v-if="componentStore.getComponentById(item.type ?? '')"
                    :is="componentStore.getComponentById(item.type ?? '')"
                    :item="item"
                    @click="navigateTo(item)"
                />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useDirectoryStore } from 'src/stores/directory-store';
import { computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import ProductPreview from 'components/ProductPreview.vue';
import StoryPreview from 'components/StoryPreview.vue';
import { useComponentStore } from 'src/stores/component-hub';

const route = useRoute();
const router = useRouter();
const directoryStore = useDirectoryStore();
const componentStore = useComponentStore();
const directoryId = computed(() => route.params.directoryId as string);

const directoryItem = computed(() =>
    directoryStore.getNestedDirectoryItemById(directoryId.value)
);

const navigateTo = (item: any) => {
    const path = `/${directoryId.value}/${item.type}/${item.fileId}`;
    console.log(path);

    router.push({ path });
};
</script>

<style lang="scss" scoped>
.content-wrapper {
    max-width: 1200px;
    margin: 0 auto;
}
</style>
