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
                                    <div>Montag</div>
                                    <div>08:00 - 18:00</div>
                                    <div>Dienstag</div>
                                    <div>08:00 - 18:00</div>
                                    <div>Mittwoch</div>
                                    <div>08:00 - 18:00</div>
                                    <div>Donnerstag</div>
                                    <div>08:00 - 18:00</div>
                                    <div>Freitag</div>
                                    <div>08:00 - 18:00</div>
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
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();

const navigateTo = (path: string) => {
    router.push(path);
};

defineComponent({
    name: 'Footer',
});
</script>
