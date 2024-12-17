<template>
    <q-card class="my-card cursor-pointer" flat>
        <q-img
            :src="'https://images.db-bocom.at/' + item.image"
            fit="cover"
            width="100%"
            height="300px"
        >
            <div
                class="absolute-bottom no-letter-spacing text-h6 text-center bg-primary"
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
.no-letter-spacing {
    letter-spacing: 0;
    line-height: 1.7rem;
}
</style>
