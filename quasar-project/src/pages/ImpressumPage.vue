<!-- <template>
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
            Firmenbuchgericht: Leoben<br />
            Zuständige Aufsichtsbehörde: {{ getContentById(ELEMENT_IDS.REGISTRY_COURT)
            }}<br />
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
    BARIEREFREIHEITSERKLÄRUNG: {
        GELTUNGSBEREICH: 'aa4c9446-f1b1-40a5-873a-df613f8d0efb',
        STAND: '46965598-f673-4142-a8bc-9261e3d4f301',
        ERSTELLUNG: 'cab0ca3c-9b17-4ccd-9b87-46dfd075dcac',
        FEEDBACK: '298ba82f-4876-44ac-b76d-b72a2d1c2c0a',
        DURCHSETZUNG: '518c917b-676a-4874-a42a-199687499c94',
        AKTUALISIERUNG: '3660bd3a-0af6-4e5f-8925-93b6579f6abf'
    }
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
</script> -->


<template>
  <q-page class="q-pa-lg" style="max-width: 1200px; margin: 0 auto">
    <div class="text-h4 text-weight-bold">Impressum</div>

    <!-- optional mini table of contents like in your screenshot -->
    <div class="q-mt-md">
      <ol class="text-body2" style="max-width: 1200px;">
        <li>
            <router-link :to="{ hash: '#anbieter-kontakt' }" class="text-primary">
                Anbieter & Kontakt
            </router-link>
        </li>
        <li>
            <router-link :to="{ hash: '#firmenbuch-aufsicht' }" class="text-primary">
                Firmenbuch & Aufsicht
            </router-link>
        </li>
        <li>
            <router-link :to="{ hash: '#berufsrecht' }" class="text-primary">
                Berufsrecht
            </router-link>
        </li>
        <li>
            <router-link :to="{ hash: '#weitere-info' }" class="text-primary">
                Weitere Informationen
            </router-link>
        </li>
        <li>
            <router-link :to="{ hash: '#barrierefreiheit' }" class="text-primary">
                Barrierefreiheitserklärung
            </router-link>
        </li>
      </ol>
    </div>

    <div style="max-width: 1200px; margin: 0 auto">

      <!-- 1. Anbieter & Kontakt -->
      <section id="anbieter-kontakt" class="q-mt-lg">
        <div class="text-h5 text-weight-bold">1. Anbieter & Kontakt<a class="heading-anchor" href="#anbieter" aria-label="Link zu 'Anbieter & Kontakt'">#</a></div>
        <div class="q-mt-sm">
          <div class="text-h6">{{ getContentById(ELEMENT_IDS.COMPANY_NAME) }}</div>
          {{ getContentById(ELEMENT_IDS.STREET) }} {{ getContentById(ELEMENT_IDS.HOUSENUMBER) }}<br>
          {{ getContentById(ELEMENT_IDS.POSTAL_CODE) }} {{ getContentById(ELEMENT_IDS.CITY) }}, {{ getContentById(ELEMENT_IDS.COUNTRY) }}<br><br>

          Tel.:
          <a :href="'tel:' + getContentById(ELEMENT_IDS.PHONE_NUMBER)" class="text-black">
            {{ getContentById(ELEMENT_IDS.PHONE_NUMBER) }}
          </a><br>
          Fax.: {{ getContentById(ELEMENT_IDS.FAX_NUMBER) }}<br>
          <a :href="'mailto:' + getContentById(ELEMENT_IDS.EMAIL)" class="text-black">
            {{ getContentById(ELEMENT_IDS.EMAIL) }}
          </a>
        </div>
      </section>


      <!-- 2. Firmenbuch & Aufsicht -->
      <section id="firmenbuch-aufsicht" class="q-mt-lg">
        <div class="text-h5 text-weight-bold">2. Firmenbuch & Aufsicht<a class="heading-anchor" href="#firmenbuch" aria-label="Link zu 'Firmenbuch & Aufsicht'">#</a></div>
        <div class="q-mt-sm">
          UID Nummer: {{ getContentById(ELEMENT_IDS.UID) }}<br>
          Firmenbuch Nummer: {{ getContentById(ELEMENT_IDS.REGISTRY_NUMBER) }}<br>
          Firmenbuchgericht: {{ getContentById(ELEMENT_IDS.REGISTRY_COURT) }}<br>
          Zuständige Aufsichtsbehörde: {{ getContentById(ELEMENT_IDS.SUPERVISORY_AUTHORITY) }}
        </div>
      </section>


      <!-- 3. Berufsrecht -->
      <section id="berufsrecht" class="q-mt-lg">
        <div class="text-h5 text-weight-bold">3. Berufsrecht<a class="heading-anchor" href="#berufsrecht" aria-label="Link zu 'Berufsrecht'">#</a></div>
        <div class="q-mt-sm">
          {{ getContentById(ELEMENT_IDS.SUPERVISORY_AUTHORITY) }}
        </div>
      </section>


      <!-- 4. Weitere Informationen -->
      <section id="weitere-info" class="q-mt-lg">
        <div class="text-h5 text-weight-bold">4. Weitere Informationen<a class="heading-anchor" href="#weitere-info" aria-label="Link zu 'Weitere Informationen'">#</a></div>
        <div class="q-mt-sm richtext" v-html="getContentById(ELEMENT_IDS.ADDITIONAL_INFO)"></div>
      </section>


      <!-- 5. Barrierefreiheitserklärung -->
      <section id="barrierefreiheit" class="q-mt-lg">
        <div class="text-h5 text-weight-bold">5. Barrierefreiheitserklärung<a class="heading-anchor" href="#barrierefreiheitserklärung" aria-label="Link zu 'Barrierefreiheitserklärung'">#</a></div>

        <div class="q-mt-md">
          <div class="text-subtitle1 text-weight-medium">5.1 Geltungsbereich<a class="heading-anchor" href="#geltungsbereich" aria-label="Link zu 'Geltungsbereich'">#</a></div>
          <div class="q-mt-sm richtext" v-html="getContentById(ELEMENT_IDS.BARIEREFREIHEITSERKLÄRUNG.GELTUNGSBEREICH)"></div>
        </div>

        <div class="q-mt-md">
          <div class="text-subtitle1 text-weight-medium">5.2 Stand der Vereinbarkeit<a class="heading-anchor" href="#stand" aria-label="Link zu 'Stand der Vereinbarkeit'">#</a></div>
          <div class="q-mt-sm richtext" v-html="getContentById(ELEMENT_IDS.BARIEREFREIHEITSERKLÄRUNG.STAND)"></div>
        </div>

        <div class="q-mt-md">
          <div class="text-subtitle1 text-weight-medium">5.3 Erstellung- und Testverfahren<a class="heading-anchor" href="#verfahren" aria-label="Link zu 'Erstellungs- und Testverfahren'">#</a></div>
          <div class="q-mt-sm richtext" v-html="getContentById(ELEMENT_IDS.BARIEREFREIHEITSERKLÄRUNG.ERSTELLUNG)"></div>
        </div>

        <div class="q-mt-md">
          <div class="text-subtitle1 text-weight-medium">5.4 Feedback & Kontakt<a class="heading-anchor" href="#feedback" aria-label="Link zu 'Feedback & Kontakt'">#</a></div>
          <div class="q-mt-sm richtext" v-html="getContentById(ELEMENT_IDS.BARIEREFREIHEITSERKLÄRUNG.FEEDBACK)"></div>
          <div class="q-mt-sm">
          <div class="q-mt-sm">{{ getContentById(ELEMENT_IDS.COMPANY_NAME) }}</div>
          {{ getContentById(ELEMENT_IDS.STREET) }} {{ getContentById(ELEMENT_IDS.HOUSENUMBER) }}<br>
          {{ getContentById(ELEMENT_IDS.POSTAL_CODE) }} {{ getContentById(ELEMENT_IDS.CITY) }}, {{ getContentById(ELEMENT_IDS.COUNTRY) }}<br>
          <a :href="'mailto:' + getContentById(ELEMENT_IDS.EMAIL)" class="text-black">
            {{ getContentById(ELEMENT_IDS.EMAIL) }}
          </a>
        </div>
        </div>

        <div class="q-mt-md">
          <div class="text-subtitle1 text-weight-medium">5.5 Durchsetzungsverfahren / Schlichtung<a class="heading-anchor" href="#durchsetzung" aria-label="Link zu 'Durchsetzungsverfahren / Schlichtung'">#</a></div>
          <div class="q-mt-sm richtext" v-html="getContentById(ELEMENT_IDS.BARIEREFREIHEITSERKLÄRUNG.DURCHSETZUNG)"></div>
        </div>

        <div class="q-mt-md">
          <div class="text-subtitle1 text-weight-medium">5.6 Aktualisierung der Erklärung<a class="heading-anchor" href="#aktualisierung" aria-label="Link zu 'Aktualisierung der Erklärung'">#</a></div>
          <div class="q-mt-sm richtext" v-html="getContentById(ELEMENT_IDS.BARIEREFREIHEITSERKLÄRUNG.AKTUALISIERUNG)"></div>
        </div>
      </section>

    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useFileStore } from 'src/stores/file-store'

const fileStore = useFileStore()
const impressumFile = ref<any>(null)

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
  ADDITIONAL_INFO: '46bebb66-8da9-4a42-a736-00c4d286caaa', // keep your original id if different
  BARIEREFREIHEITSERKLÄRUNG: {
    GELTUNGSBEREICH: 'aa4c9446-f1b1-40a5-873a-df613f8d0efb',
    STAND: '46965598-f673-4142-a8bc-9261e3d4f301',
    ERSTELLUNG: 'cab0ca3c-9b17-4ccd-9b87-46dfd075dcac',
    FEEDBACK: '298ba82f-4876-44ac-b76d-b72a2d1c2c0a',
    DURCHSETZUNG: '518c917b-676a-4874-a42a-199687499c94',
    AKTUALISIERUNG: '3660bd3a-0af6-4e5f-8925-93b6579f6abf'
  }
} as const

onMounted(async () => {
  impressumFile.value = await fileStore.getFileById('f38628ea-610b-47b5-811c-9ec36c45ea28')
})

const getContentById = (elementId: string): string => {
  if (!impressumFile.value) return ''
  const dataElement = (impressumFile.value.data || []).find(
    (item: any) => item.elementId === elementId
  )
  if (dataElement) return dataElement.data?.content ?? ''
  const relatedFile = impressumFile.value.relatedFiles?.[0]
  if (relatedFile && elementId in relatedFile) return relatedFile[elementId] || ''
  return ''
}
</script>

<style scoped>
ol { padding-left: 1.2rem; }
section a { text-decoration: underline; }
.heading-anchor { display: none; }
.text-h5, .text-h4, .text-subtitle1 {
    color: var(--q-primary, black)
}

/* works with <style scoped> */
.richtext :deep(a) {
  color: var(--q-primary, #1976d2);   /* falls back if CSS vars aren't enabled */
  text-decoration: underline;
  text-underline-offset: 0.15em;
  word-break: break-word;             /* long URLs wrap */
}

.richtext :deep(a:hover),
.richtext :deep(a:focus-visible) {
  text-decoration-thickness: 2px;
  outline: none;                      /* rely on underline change for focus */
}

.richtext :deep(a:visited) {
  color: var(--q-secondary, #9c27b0);
}

/* optional: external-link hint */
.richtext :deep(a[href^="http"]):after {
  content: "↗";
  font-size: 0.85em;
  margin-left: 0.15em;
}

/* dark mode (Quasar adds .body--dark on <body>) */
.body--dark .richtext :deep(a) {
  color: var(--q-primary, #90caf9);
}
</style>
