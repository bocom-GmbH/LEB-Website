<template>
    <q-header
        elevated
        class="bg-white flex column no-wrap items-center justify-center"
        :style="{ height: headerHeight, transition: 'height 0.5s ease' }"
    >
        <Transition name="fade">
            <q-img
                v-if="!isScrolled"
                width="150px"
                src="/public/logo.png"
                alt=""
            />
        </Transition>

        <div
            v-if="!isSmallScreen"
            class="flex flex-row items-center align-center"
        >
            <q-btn
                v-for="menuItem in newMenuItems"
                :key="menuItem.to"
                flat
                class="text-secondary q-my-md custom-btn-text"
                :label="menuItem.name"
                @click="
                    () => {
                        if (menuItem.url) {
                            router.push(menuItem.url);
                        } else if (menuItem.linkFileId) {
                            router.push(
                                `/${menuItem.url}/${menuItem.linkFileId}`
                            );
                        } else if (menuItem.to) {
                            router.push(menuItem.to);
                        }
                    }
                "
            >
                <q-menu>
                    <div
                        v-if="menuItem.children.length > 0"
                        class="row no-wrap q-pa-sm"
                    >
                        <q-item
                            v-for="child in menuItem.children"
                            :key="child.to"
                            clickable
                            v-ripple
                            class="text-secondary"
                            @click="
                                () => {
                                    if (child.url) {
                                        router.push(
                                            `${child.url}/${child.linkFileId}`
                                        );
                                    } else {
                                        handleItemClick(child);
                                    }
                                }
                            "
                        >
                            <q-item-section>
                                <q-item-label>{{ child.name }}</q-item-label>
                            </q-item-section>
                        </q-item>
                    </div>
                </q-menu>
            </q-btn>
        </div>
        <div style="width: 100%" class="flex flex-end">
            <q-space />
            <q-btn
                v-if="isSmallScreen"
                class="q-mr-sm q-my-md text-primary"
                flat
                @click="drawer = !drawer"
                round
                dense
                icon="menu"
            />
        </div>
    </q-header>
    <q-drawer
        :overlay="true"
        v-if="isSmallScreen"
        side="right"
        v-model="drawer"
        show-if-above
        :width="300"
        :breakpoint="1023"
    >
        <q-scroll-area class="fit">
            <q-list>
                <q-expansion-item
                    v-for="(menuItem, index) in newMenuItems"
                    :key="index"
                    :label="menuItem.name"
                    default-opened
                    class="text-black cursor-pointer custom-btn-text"
                    expand-icon="none"
                    @click="handleMobileItemClick(menuItem)"
                >
                    <q-expansion-item
                        v-for="child in menuItem.children"
                        :key="child.id"
                        :header-inset-level="1"
                        :label="child.name"
                        default-opened
                        expand-icon="none"
                        @click.stop="handleMobileItemClick(child)"
                        class="cursor-pointer"
                    >
                    </q-expansion-item>
                </q-expansion-item>
            </q-list>
        </q-scroll-area>
    </q-drawer>
</template>
<script setup lang="ts">
import {
    ref,
    computed,
    defineComponent,
    onMounted,
    onUnmounted,
    Transition,
    watch,
} from 'vue';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import { useDirectoryStore } from 'src/stores/directory-store';

defineComponent({
    name: 'NavigationBar',
});

const drawer = ref(false);

const $q = useQuasar();
const router = useRouter();
const isSmallScreen = computed(() => $q.screen.lt.md);
const isMobile = $q.platform.is.mobile;
const headerHeight = ref('230px');
const directoryStore = useDirectoryStore();
onMounted(() => {
    window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
});

function handleItemClick(item: { id: string }) {
    if (item.id) {
        router.push(`/${item.id}`);
    }
}

const isScrolled = ref(false);

function handleScroll() {
    isScrolled.value = window.scrollY > 0;
    headerHeight.value = scrollY > 0 ? '70px' : '230px';
}

const newMenuItems = ref(directoryStore.getDirectoryNested?.[0]?.children);

watch(
    () => directoryStore.getDirectoryNested,
    (newValue) => {
        /* console.log('watch:', newValue.directory[0].children); */
        if (newValue && newValue.directory) {
            newMenuItems.value = newValue.directory[0].children;
        }
    },
    { immediate: true }
);

const handleMobileItemClick = (item: any) => {
    if (item.url === '/') {
        router.push('/');
    } else if (item.url) {
        router.push(`${item.url}/${item.linkFileId}`);
    } else {
        router.push(`/${item.id}`);
    }
    drawer.value = false;
};
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.custom-btn-text {
    font-size: 1.1rem;
}

:deep(.q-btn__content) {
    font-size: 1.1rem;
}

:deep(.q-expansion-item__toggle-icon),
:deep(.q-item__label) {
    font-size: 1.1rem;
}
</style>
