<template>
    <q-card class="my-card cursor-pointer" flat>
        <q-img
            :src="'https://images.db-bocom.at/' + item.image"
            fit="scale-down"
            width="100%"
            height="300px"
            :alt="item.alt"
        >
        </q-img>

        <q-card-section class="bg-primary">
            <div class="no-letter-spacing text-h6">{{ item.name }}</div>
            <div class="row justify-between">
                <div class="text-subtitle2">{{ item.amount }}</div>
                <div class="text-subtitle">{{ item.price }} EUR</div>
            </div>
        </q-card-section>
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

:deep(.q-card__section) {
    padding: 16px;

    @media (max-width: 599px) {
        padding: 8px;
    }
}
</style>
