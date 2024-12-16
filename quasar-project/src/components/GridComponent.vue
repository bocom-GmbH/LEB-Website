<template>
    <div class="grid-container q-mt-xl">
        <!-- Stories Grid -->
        <template v-if="stories.length > 0">
            <div class="text-h4 text-center q-mb-lg">Ähnliche Stories</div>
            <div class="row q-col-gutter-md justify-center q-mb-xl">
                <div
                    v-for="(file, index) in stories"
                    :key="index"
                    class="col-12 col-sm-6 col-md-3"
                >
                    <StoryCard :file="file" />
                </div>
            </div>
        </template>

        <!-- Products Grid -->
        <template v-if="products.length > 0">
            <div class="text-h4 text-center q-mb-lg">Empfohlene Produkte</div>
            <div class="row q-col-gutter-md justify-center">
                <div
                    v-for="(file, index) in products"
                    :key="index"
                    class="col-12 col-sm-6 col-md-3"
                >
                    <ProductCard :file="file" />
                </div>
            </div>
        </template>
    </div>
</template>

<script setup lang="ts">
import StoryCard from './relatedComponents/StoryCard.vue';
import ProductCard from './relatedComponents/ProductCard.vue';
import { computed } from 'vue';

interface RelatedFile {
    id: string;
    name: string;
    image: string;
    type: string;
}

const props = defineProps<{
    relatedFiles: RelatedFile[];
    label?: string;
}>();

// Szétválogatjuk a related elemeket típus szerint
const stories = computed(
    () => props.relatedFiles?.filter((file) => file.type === 'story') || []
);

const products = computed(
    () => props.relatedFiles?.filter((file) => file.type === 'product') || []
);
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
