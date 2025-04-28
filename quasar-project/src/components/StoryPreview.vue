<template>
    <q-card class="my-card cursor-pointer" flat>
        <q-img
            :src="'https://images.db-bocom.at/' + item.image"
            fit="cover"
            class="story_container"
        >
            <div
                class="name-container absolute-bottom no-letter-spacing text-h6 text-center bg-primary"
            >
                {{ item.name }}
            </div>
        </q-img>
    </q-card>
</template>

<script setup lang="ts">
const props = defineProps({
    item: {
        type: Object,
        required: true,
    },
});
</script>

<style lang="scss" scoped>
.story_container {
    width: 100%;
    height: 300px;

    @media (max-width: 599px) {
        height: 43vw;
    }
}

.no-letter-spacing {
    letter-spacing: 0;
    line-height: 1.7rem;
}

:deep(.name-container) {
    padding: 16px;

    @media (max-width: 599px) {
        padding: 8px;
        font-size: 1rem;
    }
}
</style>
