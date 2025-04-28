<template>
    <q-header
        elevated
        class="bg-white flex column no-wrap items-center justify-center"
        :style="{ height: headerHeight, transition: 'height 0.5s ease' }"
    >
        <Transition name="fade" v-if="isSmallScreen">
            <q-img
                v-if="!isScrolled && route.path === '/'"
                width="150px"
                :src="logo"
                alt=""
            />
            <q-img
                v-else
                class="logo_small cursor-pointer"
                :src="logo_small"
                alt=""
                @click="router.push('/')"
            />
        </Transition>
        <Transition name="fade" v-else>
            <q-img
                v-if="isScrolled"
                class="logo_small cursor-pointer"
                :src="logo_small"
                alt=""
                @click="router.push('/')"
            />
            <q-img
                v-else
                width="150px"
                :src="logo"
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
        <div
            v-else
            style="width: 100%"
            class="flex justify-between items-center"
        >
            <div class="w-56"></div>
            <q-btn
                flat
                class="text-primary text-weight-bold"
                label="Apotheke"
                no-caps
                @click="drawer = !drawer"
            />
            <q-btn
                class="q-mr-sm q-my-md text-primary w-56"
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
                    @click="
                        menuItem.url ?? '/' ? router.push(menuItem.url) : null
                    "
                >
                    <q-item
                        v-for="child in menuItem.children"
                        :key="child.id"
                        clickable
                        :inset-level="1"
                        class="cursor-pointer"
                        @click="handleMobileItemClick(child)"
                    >
                        <q-item-section>
                            <q-item-label class="text-black custom-btn-text">
                                {{ child.name }}
                            </q-item-label>
                        </q-item-section>
                    </q-item>
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
import { is, useQuasar } from 'quasar';
import { useRouter, useRoute } from 'vue-router';
import { useDirectoryStore } from 'src/stores/directory-store';
import logo from '../../public/logo.png';
import logo_small from '../../public/logo_small.png';

defineComponent({
    name: 'NavigationBar',
});

const drawer = ref(false);

const $q = useQuasar();
const router = useRouter();
const route = useRoute();
const isSmallScreen = computed(() => $q.screen.lt.md);
const isMobile = $q.platform.is.mobile;
const headerHeight = ref(isSmallScreen.value ? '70px' : '230px');
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
    console.log(isScrolled.value);
    if (route.path !== '/' && isSmallScreen.value) {
        headerHeight.value = '70px';
    } else {
        headerHeight.value = scrollY > 0 ? '70px' : '230px';
    }
}

watch(
    () => route.path,
    (newPath) => {
        if (isSmallScreen.value) {
            if (newPath !== '/') {
                headerHeight.value = '70px';
            } else {
                headerHeight.value = '230px';
            }
        } else {
            headerHeight.value = '230px';
        }
    }
);

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
    console.log('item', item);
    /*  if (!item.children || item.children.length === 0) { */
    if (item.url === '/') {
        router.push('/');
    } else if (item.url) {
        router.push(`${item.url}/${item.linkFileId}`);
    } else {
        router.push(`/${item.id}`);
    }
    drawer.value = false;
    /*  } */
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

.logo_small {
    width: 50px;
    height: 50px;
    position: absolute;
    left: 10px;
    top: 10px;
}

.text-weight-bold {
    font-weight: 600;
}

.absolute-center {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
}

.z-top {
    z-index: 1;
}

.no-pointer-events {
    pointer-events: none;
}

.w-56 {
    width: 56px;
}
</style>
