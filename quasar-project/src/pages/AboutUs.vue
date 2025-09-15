<template>
    <q-page class="q-pa-md">
        <div class="content-container q-mx-auto q-mb-xl">
            <div class="text-h3 text-center q-mb-xl">Über uns</div>
            <div class="text-body1 text-justify">
                {{ aboutUsFile?.data[0]?.data?.content }}
            </div>
        </div>

        <div class="team-container q-mx-auto">
            <div class="text-h4 text-center q-mb-xl">Unser Team</div>

            <div class="team-list">
                <q-card
                    v-for="member in aboutUsFile?.relatedFiles"
                    :key="member.first_name + member.last_name"
                    flat
                    class="team-card q-mb-lg"
                >
                    <div class="row no-wrap">
                        <div class="col-auto">
                            <q-img
                                :src="import.meta.env.VITE_IMAGE_URL + member.image"
                                :ratio="1"
                                width="200px"
                                spinner-color="primary"
                                spinner-size="82px"
                                :alt="member.alt"
                            />
                        </div>

                        <q-card-section class="col">
                            <div class="row q-mb-sm">
                                <div class="text-h6">
                                    {{ member.pre_nominal_title }}
                                    {{ member.first_name }}
                                    {{ member.last_name }}
                                    {{ member.post_nominal_title }}
                                </div>
                                <q-space />
                            </div>

                            <div v-if="member.role" class="">
                                {{ member.role }}
                            </div>
                            <q-separator class="q-my-sm" />

                            <div class="text-body2 description">
                                {{ member.description }}
                            </div>
                        </q-card-section>
                    </div>
                </q-card>
            </div>
        </div>
    </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useFileStore } from 'src/stores/file-store';
import { useRouter } from 'vue-router';

const router = useRouter();
const fileStore = useFileStore();
const aboutUsFile = ref<any>(null);

onMounted(async () => {
    aboutUsFile.value = await fileStore.getFileById(
        router.currentRoute.value.path.split('/')[2]
    );
});
</script>

<style lang="scss" scoped>
.content-container {
    max-width: 800px;
}

.team-container {
    max-width: 1000px;
}

.description {
    text-align: justify;
    hyphens: auto;
}

// Reszponzív beállítások
@media (max-width: 599px) {
    .team-card {
        .col {
            padding-top: 0;
        }

        .row {
            flex-direction: column;
        }

        .q-img {
            width: 70% !important;
            margin: 0 auto;
        }

        .col-auto {
            width: 100%;
            display: flex;
            justify-content: center;
            margin-bottom: 1rem;
        }
    }
}
</style>
