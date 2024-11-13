<template>
    <div class="grid-container q-mt-xl">
        <div class="text-h5 text-center q-mb-lg">Interessante Beiträge</div>
        <div class="row q-col-gutter-md justify-center">
            <div
                v-for="story in stories"
                :key="story.id"
                class="col-12 col-sm-6 col-md-3"
            >
                <q-card
                    class="grid-item cursor-pointer"
                    @click="navigateToStory(story.id)"
                    flat
                >
                    <q-img
                        :src="`https://images.db-bocom.at/${story.image}`"
                        :ratio="1"
                        spinner-color="primary"
                        spinner-size="82px"
                    >
                        <div
                            class="absolute-bottom text-subtitle1 text-center bg-primary"
                        >
                            {{ story.name }}
                        </div>
                    </q-img>
                </q-card>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const stories = [
    {
        id: '1',
        name: 'Abnehmen mit System',
        image: 'TbMb5T8aBrRi9sAFz.png',
        type: 'story',
    },
    {
        id: '2',
        name: 'Detox-Leber',
        image: 'feSHvhfqJwSE3yxxF.png',
        type: 'story',
    },
    {
        id: '3',
        name: 'Natürlich frühlingsfrisch',
        image: 'DwCFkHp6DuoSv7QJZ.png',
        type: 'story',
    },
    {
        id: '4',
        name: 'Detox & Beauty',
        image: '5eypWWgqffXLGK5Ft.jpg',
        type: 'story',
    },
];

const navigateToStory = (id: string) => {
    router.push(`/story/${id}`);
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
