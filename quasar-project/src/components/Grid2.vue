<template>
    <div class="grid-container q-mt-xl">
        <!-- Stories Grid -->
        <template v-if="relatedFiles.length > 0">
            <div class="row q-col-gutter-md justify-center q-mb-xl">
                <div
                    v-for="(file, index) in relatedFiles"
                    :key="index"
                    class="col-12 col-sm-6 col-md-3"
                >
                    <StoryCard v-if="file.type === 'story'" :file="file" />
                    <ProductCard v-else-if="file.type === 'product'" :file="file" />
                </div>
            </div>
        </template>
    </div>
</template>

<script setup lang="ts">
import StoryCard from './relatedComponents/StoryCard.vue';
import ProductCard from './relatedComponents/ProductCard.vue';

interface RelatedFile {
    fileId: string;
    name: string;
    image: string;
    type: string;
}

const props = defineProps<{
    relatedFiles: RelatedFile[];
}>();

</script>

<style lang="scss" scoped>
.grid-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 16px;
}

.grid-item {
    transition: transform 0.2s ease;

    &:hover {
        transform: translateY(-4px);
    }
}
</style>
