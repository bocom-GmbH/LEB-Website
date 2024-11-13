<template>
    <q-card class="my-card" flat>
        <q-img
            :src="'https://images.db-bocom.at/' + item.image"
            fit="cover"
            width="100%"
            height="300px"
        >
            <div class="absolute-bottom text-subtitle1 text-center bg-primary">
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
