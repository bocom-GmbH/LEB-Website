<template>
    <q-page class="q-pa-lg">
        <div class="text-h4 text-center text-weight-bold">Impressum</div>
        <div class="text-center text-h5" style="font-size: 1.5em; max-width: 1200px; margin: 0 auto">
            {{ getContentById(ELEMENT_IDS.COMPANY_NAME) }}<br />
            {{ getContentById(ELEMENT_IDS.STREET) }}
            {{ getContentById(ELEMENT_IDS.HOUSENUMBER) }}<br />
            {{ getContentById(ELEMENT_IDS.POSTAL_CODE) }},
            {{ getContentById(ELEMENT_IDS.CITY) }},
            {{ getContentById(ELEMENT_IDS.COUNTRY) }}<br /><br />
            Tel.: <a :href="'tel:' + getContentById(ELEMENT_IDS.PHONE_NUMBER)" class="text-black">{{
                getContentById(ELEMENT_IDS.PHONE_NUMBER) }}</a><br />
            Fax.: {{ getContentById(ELEMENT_IDS.FAX_NUMBER) }}<br />
            <a :href="'mailto:' + getContentById(ELEMENT_IDS.EMAIL)" class="text-black">{{
                getContentById(ELEMENT_IDS.EMAIL) }}</a><br /><br />
            <strong>Informationen lt. ECG</strong><br />
            UID Nummer: {{ getContentById(ELEMENT_IDS.UID) }}<br />
            Firmenbuch Nummer: {{ getContentById(ELEMENT_IDS.REGISTRY_NUMBER)
            }}<br />
            Firmenbuchgericht: {{ getContentById(ELEMENT_IDS.REGISTRY_COURT)
            }}<br />
            Zuständige Aufsichtsbehörde:<br />
            {{ getContentById(ELEMENT_IDS.SUPERVISORY_AUTHORITY) }}<br /><br />
            {{ getContentById(ELEMENT_IDS.DESCRIPTION) }}<br /><br />
            {{ getContentById(ELEMENT_IDS.ADDITIONAL_INFO) }}
        </div>
    </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useFileStore } from 'src/stores/file-store';

const fileStore = useFileStore();

const impressumFile = ref<any>(null);

const ELEMENT_IDS = {
    COMPANY_NAME: 'companyName',
    STREET: 'street',
    HOUSENUMBER: 'housenumber',
    POSTAL_CODE: 'postalCode',
    CITY: 'city',
    COUNTRY: 'country',
    PHONE_NUMBER: 'phoneNumber',
    FAX_NUMBER: 'faxNumber',
    EMAIL: 'email',
    UID: '120842bd-9310-4f15-9e7a-88fb8a669cf2',
    REGISTRY_NUMBER: '19f8246b-3e98-4e52-8c4c-d86b92b9aa1c',
    REGISTRY_COURT: 'e945e2bb-a4a1-4d59-86f7-382aed80a2eb',
    SUPERVISORY_AUTHORITY: 'db66a378-a122-4b7e-a8c1-539242fd1b1c',
    DESCRIPTION: '46bebb66-8da9-4a42-a736-00c4d286caaa',
} as const;

onMounted(async () => {
    impressumFile.value = await fileStore.getFileById(
        'f38628ea-610b-47b5-811c-9ec36c45ea28'
    );
});

const getContentById = (elementId: string): string => {
    if (!impressumFile.value) return '';

    const dataElement = (impressumFile.value.data || []).find(
        (item: any) => item.elementId === elementId
    );

    if (dataElement) return dataElement.data.content;

    const relatedFile = impressumFile.value.relatedFiles?.[0];
    if (relatedFile && elementId in relatedFile) {
        return relatedFile[elementId] || '';
    }

    return '';
};
</script>
