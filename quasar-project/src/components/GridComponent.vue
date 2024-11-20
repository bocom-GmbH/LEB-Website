<template>
    <div class="grid-container q-mt-xl">
        <div class="text-h4 text-center q-mb-lg">{{ label }}</div>
        <div class="row q-col-gutter-md justify-center">
            <div
                v-for="(file, index) in relatedFiles"
                :key="index"
                class="col-12 col-sm-6 col-md-3"
            >
                <component :is="getComponentType(file.type)" :file="file" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

import StoryCard from './relatedComponents/StoryCard.vue';
import ProductCard from './relatedComponents/ProductCard.vue';

const router = useRouter();

const props = defineProps<{
    relatedFiles: {
        id: string;
        name: string;
        image: string;
        type: string;
    }[];
    label: string;
}>();

const getComponentType = (type: string) => {
    if (type === 'story') return StoryCard;
    if (type === 'product') return ProductCard;
};
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
