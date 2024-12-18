<template>
    <div class="container">
        <div class="q-mt-xl inner-container">
            <div class="info-container flex flex-center items-center">
                <q-img
                    :src="
                        'https://images.db-bocom.at/' +
                        getContentById(ELEMENT_IDS.IMAGE)
                    "
                    width="100%"
                    height="450px"
                    fit="scale-down"
                />
            </div>
            <!-- {{ productFile }} -->
            <q-card class="info-container q-pa-md bg-primary">
                <div class="text-h4">{{ productFile?.label }}</div>
                <div v-if="getContentById(ELEMENT_IDS.DESCRIPTION)">
                    <p>{{ getContentById(ELEMENT_IDS.DESCRIPTION) }}</p>
                </div>
                <!-- <div class="q-mt-md">
                    <p>{{ getContentById(ELEMENT_IDS.QUANTITY) }}</p>
                </div> -->
                <div class="text-h5 price_and_quantity">
                    <span>€ {{ getContentById(ELEMENT_IDS.PRICE) }}</span><span>{{ getContentById(ELEMENT_IDS.QUANTITY) }}</span>
                </div>
                <!-- <q-list class="q-mt-md"> -->
                    <q-expansion-item
                        expand-separator
                        label="Inhalt"
                        :header-style="{
                            fontSize: '18px',
                        }"
                        dense
                    >
                        <q-card class="bg-primary">
                            <q-card-section>
                                <p>
                                    {{
                                        getContentById(ELEMENT_IDS.INGREDIENTS)
                                    }}
                                </p>
                            </q-card-section>
                        </q-card>
                    </q-expansion-item>

                    <q-expansion-item
                        expand-separator
                        label="Anwendung"
                        :header-style="{
                            fontSize: '18px',
                        }"
                        dense
                    >
                        <q-card class="bg-primary">
                            <q-card-section>
                                <p>{{ getContentById(ELEMENT_IDS.USAGE) }}</p>
                            </q-card-section>
                        </q-card>
                    </q-expansion-item>

                    <q-expansion-item
                        expand-separator
                        label="Hinweise"
                        :header-style="{
                            fontSize: '18px',
                        }"
                        dense
                    >
                        <q-card class="bg-primary">
                            <q-card-section>
                                <p>{{ getContentById(ELEMENT_IDS.NOTICE) }}</p>
                            </q-card-section>
                        </q-card>
                    </q-expansion-item>
                <!-- </q-list> -->
            </q-card>
        </div>
    </div>
    <!-- <div class="w-full text-center">
        <h3>Interessante Produkte</h3>
    </div> -->
    <GridComponent
        style="margin-top: 96px"
        :relatedFiles="productFile?.relatedFiles"
        :label="'Interessante Beiträge'"
    />
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useDirectoryStore } from '../stores/directory-store';
import { computed, watch, ref } from 'vue';
import { useFileStore } from '../stores/file-store';
import GridComponent from '../components/GridComponent.vue';

const route = useRoute();
const store = useDirectoryStore();
const fileStore = useFileStore();

// Computed properties a route paraméterekhez
const productId = computed(() => route.params.productId as string);
const directoryId = computed(() => route.params.directoryId as string);

const productDirectoryItem = computed(() =>
    store.getNestedDirectoryItemById(directoryId.value)
);
const productFile = ref(null);

const isLoading = ref(true);

const getDataOfFile = async (fileId: string) => {
    isLoading.value = true;
    try {
        const file = await fileStore.getFileById(fileId);
        console.log(file);
        productFile.value = file;
        return file;
    } finally {
        isLoading.value = false;
    }
};

// Route változás figyelése
watch(
    () => route.params,
    async (newParams) => {
        if (newParams.productId) {
            await getDataOfFile(newParams.productId as string);
        }
    },
    { immediate: true }
);

// Eredeti watch megtartása is a directory változásokhoz
watch(
    () => productDirectoryItem.value?.fileId,
    async (newFileId) => {
        if (newFileId) {
            await getDataOfFile(productId.value);
        }
    }
);

interface ProductData {
    content: string;
}

interface ProductElement {
    data: ProductData;
    elementId: string;
}

const ELEMENT_IDS = {
    PRICE: '29fa4b38-9436-4fa1-93e7-18c46f601aac',
    QUANTITY: '0742d52f-8790-4287-9948-f10c13da8080',
    INGREDIENTS: '080d2923-6831-4212-b790-f526f57e7f56',
    USAGE: 'da862ed6-1fd3-4908-a6f7-31f254cdafa5',
    NOTICE: '5fe6d87c-4ec2-4954-91cb-4a883fa3d662',
    MANUFACTURER: '75e01196-ca8c-4f07-948f-73f1b8573bb3',
    IMAGE: '56f5bbc4-8638-4231-a790-8aab57f81304',
    DESCRIPTION: '3917b97c-d37c-43fc-9a18-c11fa708a86d',
} as const;

const getContentById = (elementId: string): string => {
    if (!productFile.value?.data) return '';

    const element = (productFile.value.data as ProductElement[]).find(
        (item) => item.elementId === elementId
    );

    return element?.data.content || '';
};

// Computed property a data mappeléshez
const productDataMap = computed(() => {
    if (!productFile.value?.data) return null;

    const dataArray = productFile.value.data as ProductElement[];
    return dataArray.reduce(
        (acc, item) => ({
            ...acc,
            [item.elementId]: item.data.content,
        }),
        {} as Record<string, string>
    );
});

// Computed properties a tabok láthatóságához
const hasHinweis = computed(() => {
    const content = getContentById(ELEMENT_IDS.HINWEIS);
    return content && content.trim() !== '';
});

const hasAnwendung = computed(() => {
    const content = getContentById(ELEMENT_IDS.ANWENDUNG);
    return content && content.trim() !== '';
});

const hasInhaltsstoffe = computed(() => {
    const content = getContentById(ELEMENT_IDS.INHALTSSTOFFE);
    return content && content.trim() !== '';
});

const hasAnyTabContent = computed(
    () => hasHinweis.value || hasAnwendung.value || hasInhaltsstoffe.value
);

// Ha nincs tartalom az aktív tabban, válasszuk az első elérhető tabot
watch([hasHinweis, hasAnwendung, hasInhaltsstoffe], () => {
    if (!hasHinweis.value && tab.value === 'hinweis') {
        if (hasAnwendung.value) tab.value = 'anwendung';
        else if (hasInhaltsstoffe.value) tab.value = 'inhaltsstoffe';
    }
    if (!hasAnwendung.value && tab.value === 'anwendung') {
        if (hasHinweis.value) tab.value = 'hinweis';
        else if (hasInhaltsstoffe.value) tab.value = 'inhaltsstoffe';
    }
    if (!hasInhaltsstoffe.value && tab.value === 'inhaltsstoffe') {
        if (hasHinweis.value) tab.value = 'hinweis';
        else if (hasAnwendung.value) tab.value = 'anwendung';
    }
});
</script>

<style scoped>
p {
    font-size: 18px;
}
.container {
    display: flex;
    justify-content: center;
}

.info-container {
    width: 100%;
    max-width: 600px;
}

.price_and_quantity {
    display: flex;
    justify-content: space-between;
}

.inner-container {
    max-width: 1024px;
    padding: 16px;
    width: 100%;
    display: flex;
    flex-direction: row; /* Row layout by default */
    justify-content: center;
}

@media (max-width: 768px) {
    .inner-container {
        flex-direction: column; /* Stack boxes vertically on medium or smaller screens */
        align-items: center;
    }
}

:deep(.q-item) {
    padding: 0;
}

:deep(.q-expansion-item .q-item) {
    padding: 0;
}
</style>
