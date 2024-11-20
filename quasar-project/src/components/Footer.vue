<template>
    <q-footer class="bg-secondary" elevated>
        <q-toolbar class="q-px-lg">
            <div
                class="flex"
                style="width: 100%; justify-content: space-between"
            >
                <div class="flex flex-row justify-center items-center">
                    <div>
                        <q-btn
                            @click="navigateTo('/impressum')"
                            flat
                            label="Impressum"
                            class="text-white"
                        />
                    </div>
                    <div>© Lebenskreis Apotheke 2024</div>
                </div>
                <div class="flex flex-row">
                    <div>
                        <q-btn
                            @click="navigateTo('/contact-us')"
                            flat
                            label="Kontakt"
                            class="text-white"
                        />
                    </div>
                    <div>
                        <q-btn flat label="Öffnungszeiten" class="text-white">
                            <q-menu>
                                <div
                                    class="q-py-md q-px-lg bg-secondary text-white"
                                >
                                    {{ openingHours }}
                                </div>
                            </q-menu>
                        </q-btn>
                    </div>
                </div>
            </div>
        </q-toolbar>
    </q-footer>
</template>

<script setup lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useFileStore } from 'src/stores/file-store';

const fileStore = useFileStore();
const router = useRouter();

const navigateTo = (path: string) => {
    router.push(path);
};

const openingHours = ref<any>();

onMounted(() => {
    fileStore
        .getFileById('b6f6f64d-5847-46f2-ae7c-c07a24cce7fd')
        .then((fileData) => {
            openingHours.value =
                fileData.relatedFiles[0]?.openingTimes || 'N/A';
            console.log('Updated openingHours:', openingHours.value);
        });
});

watch(openingHours, (newValue) => {
    console.log(newValue);
});

defineComponent({
    name: 'Footer',
});
</script>
