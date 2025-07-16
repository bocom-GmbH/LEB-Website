<template>
    <q-card class="grid-item cursor-pointer" flat @click="navigateTo(file)">
        <q-img
            :src="`https://images.db-bocom.at/${file.image}`"
            :ratio="1"
            spinner-color="primary"
            spinner-size="82px"
            :alt="file.alt"
        >
            <div
                class="story-name absolute-bottom text-subtitle1 text-center bg-primary"
            >
                {{ file.name }}
            </div>
        </q-img>
    </q-card>
</template>

<style lang="scss" scoped>
.story-name {
    padding: 16px;

    @media (max-width: 599px) {
        padding: 4px;
    }
}
</style>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const props = defineProps<{
    file: {
        fileId: string;
        name: string;
        image: string;
        type: string;
        parentId: string;
        alt: string;
    };
}>();

const navigateTo = (item: any) => {
    const directoryId = item.parentId;
    const storyId = item.fileId;
    const path = `/${directoryId.toString()}/${item.type.toString()}/${storyId.toString()}`;

    router.push({ path }).catch((err) => {
        console.error('Navigation error:', err);
    });
};
</script>
