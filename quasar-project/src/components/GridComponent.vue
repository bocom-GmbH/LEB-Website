<template>
    <div class="grid-container q-mt-xl">
        <!-- Stories Grid -->
        <template v-if="stories.length > 0">
            <div class="text-h4 text-center q-mb-lg">Ähnliche Stories</div>
            <div class="row q-col-gutter-md justify-center q-mb-xl">
                <div
                    v-for="(file, index) in limitedStories"
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
                    v-for="(file, index) in limitedProducts"
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
    fileId: string;
    name: string;
    image: string;
    type: string;
}

const props = defineProps<{
    relatedFiles: RelatedFile[];
    label?: string;
}>();

// // Szétválogatjuk a related elemeket típus szerint
// const stories = computed(
//     () => props.relatedFiles?.filter((file) => file.type === 'story') || []
// );

// const products = computed(
//     () => props.relatedFiles?.filter((file) => file.type === 'product') || []
// );


// Utility function to limit and randomize items
const getRandomizedItems = (items: RelatedFile[], maxItems: number) => {
    if (items.length <= maxItems) return items; // Return all if less than maxItems

    const weightedItems = items.flatMap((item, index) => {
        // Assign decreasing weight based on position: first item highest weight
        const weight = items.length - index;
        return Array.from({ length: Math.max(weight, 1) }, () => item);
    });

    // Shuffle items using Fisher-Yates algorithm
    for (let i = weightedItems.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [weightedItems[i], weightedItems[j]] = [weightedItems[j], weightedItems[i]];
    }

    // Deduplicate items and limit to maxItems
    const seen = new Set();
    const randomizedItems = [];
    for (const item of weightedItems) {
        if (!seen.has(item.fileId)) {
            seen.add(item.fileId);
            randomizedItems.push(item);
        }
        if (randomizedItems.length === maxItems) break;
    }

    return randomizedItems;
};

// Separate and process stories
const stories = computed(() => props.relatedFiles?.filter((file) => file.type === 'story') || []);
const limitedStories = computed(() => getRandomizedItems(stories.value, 4));

// Separate and process products
const products = computed(() => props.relatedFiles?.filter((file) => file.type === 'product') || []);
const limitedProducts = computed(() => getRandomizedItems(products.value, 4));
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
