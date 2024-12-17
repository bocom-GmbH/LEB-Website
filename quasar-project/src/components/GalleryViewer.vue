<template>
    <div class="gallery-viewer">
        <div class="row items-center q-mb-lg">
            <q-btn
                icon="arrow_back"
                flat
                round
                color="primary"
                @click="$emit('back')"
                class="q-mr-md"
            />
            <div class="text-h4 text-center">{{ folderTitle }}</div>
        </div>

        <div class="row q-col-gutter-md justify-center">
            <div
                v-for="(image, index) in images"
                :key="index"
                class="col-6 col-sm-4 col-md-3"
            >
                <!-- @click="openLightbox(index)" -->
                <!-- class="cursor-pointer" -->
                <q-img
                    :src="`https://images.db-bocom.at/${image}`"
                    :ratio="1"
                    spinner-color="primary"
                    spinner-size="82px"
                />
            </div>
        </div>

        <!-- Lightbox -->
        <!--  <q-dialog v-model="lightboxOpen" full-width full-height>
            <q-card class="lightbox-card">
                <q-card-section class="row items-center q-pb-none">
                    <div class="text-h6">{{ folderTitle }}</div>
                    <q-space />
                    <q-btn icon="close" flat round dense v-close-popup />
                </q-card-section>

                <q-card-section class="q-pt-none">
                    <q-carousel
                        v-model="currentSlide"
                        animated
                        arrows
                        navigation
                        infinite
                        height="70vh"
                    >
                        <q-carousel-slide
                            v-for="(image, index) in images"
                            :key="index"
                            :name="index"
                            class="column no-wrap flex-center"
                        >
                            <q-img
                                :src="`https://images.db-bocom.at/${image}`"
                                fit="contain"
                                style="max-height: 70vh; width: auto"
                            />
                        </q-carousel-slide>
                    </q-carousel>
                </q-card-section>
            </q-card>
        </q-dialog> -->
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
    folderTitle: string;
    images: string[];
}>();

defineEmits<{
    (e: 'back'): void;
}>();

const lightboxOpen = ref(false);
const currentSlide = ref(0);

const openLightbox = (index: number) => {
    /* currentSlide.value = index;
    lightboxOpen.value = true; */
};
</script>

<style lang="scss" scoped>
.lightbox-card {
    background: rgba(0, 0, 0, 0.9);
    color: white;
}
</style>
