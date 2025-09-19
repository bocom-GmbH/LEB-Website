<template>
    <q-card
        class="grid-item cursor-pointer"
        flat
        v-if="file"
        @click="navigateTo(file)"
        @keydown.enter.prevent="navigateTo(file)"
        @keydown.space.prevent="navigateTo(file)"
        tabindex="0"
        role="button"
    >
        <q-img
            :src="url + file.image"
            :ratio="1"
            spinner-color="primary"
            spinner-size="82px"
            fit="scale-down"
            :alt="file.alt"
        >
            <div
                class="product-name absolute-bottom text-subtitle1 text-center bg-primary"
            >
                {{ file.name }}
            </div>
        </q-img>
    </q-card>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();
const url = import.meta.env.VITE_IMAGE_URL;

const props = defineProps<{
    file: {
        id: string;
        name: string;
        image: string;
        type: string;
        alt: string;
    };
}>();

const navigateTo = (item: any) => {
    const directoryId = item.parentId;
    const productId = item.fileId;
    const path = `/${directoryId.toString()}/${item.type.toString()}/${productId.toString()}`;

    router.push({ path }).catch((err) => {
        console.error('Navigation error:', err);
    });
};
</script>

<style lang="scss" scoped>
.product-name {
    padding: 16px;

    @media (max-width: 599px) {
        padding: 4px;
    }
}
</style>
